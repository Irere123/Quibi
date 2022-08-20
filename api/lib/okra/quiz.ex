defmodule Okra.Quiz do
  alias Beef.Quizes
  alias Beef.Users
  alias Beef.QuizPermissions
  alias Beef.QuizBlocks

  def set_auto_speaker(user_id, value) do
    if quiz = Quizes.get_quiz_by_creator_id(user_id) do
      Onion.QuizSession.set_auto_speaker(quiz.id, value)
    end
  end

  def set_chat_mode(user_id, value) do
    if quiz = Quizes.get_quiz_by_creator_id(user_id) do
      Onion.QuizSession.set_chat_mode(quiz.id, value)
    end
  end

  defp internal_kick_from_quiz(user_id_to_kick, quiz_id) do
    current_quiz_id = Beef.Users.get_current_quiz_id(user_id_to_kick)

    if current_quiz_id == quiz_id do
      Quizes.kick_from_quiz(user_id_to_kick, current_quiz_id)
      Onion.QuizSession.kick_from_quiz(current_quiz_id, user_id_to_kick)
    end
  end

  def block_from_quiz(user_id, user_id_to_block_from_quiz) do
    with {status, quiz} when status in [:creator, :mod] <-
           Quizes.get_quiz_status(user_id) do
      if quiz.creatorId != user_id_to_block_from_quiz do
        QuizBlocks.insert(%{
          modId: user_id,
          userId: user_id_to_block_from_quiz,
          quizId: quiz.id
        })

        internal_kick_from_quiz(user_id_to_block_from_quiz, quiz.id)
      end
    end
  end

  def create_quiz(
        user_id,
        quiz_name,
        quiz_description,
        is_private,
        auto_speaker \\ nil,
        chat_mode \\ nil
      ) do
    quiz_id = Users.get_current_quiz_id(user_id)

    if not is_nil(quiz_id) do
      leave_quiz(user_id, quiz_id)
    end

    id = Ecto.UUID.generate()

    case Quizes.create(%{
           id: id,
           name: quiz_name,
           description: quiz_description,
           creatorId: user_id,
           numPeopleInside: 1,
           isPrivate: is_private
         }) do
      {:ok, quiz} ->
        Onion.QuizSession.start_supervised(
          quiz_id: quiz.id,
          chatMode: chat_mode,
          auto_speaker: auto_speaker
        )

        if not is_private do
          Okra.Follow.notify_followers_you_created_a_quiz(user_id, quiz)
        end

        Onion.QuizSession.join_quiz(quiz.id, user_id, no_fan: true)

        {:ok, %{quiz: quiz}}

      {:error, x} ->
        {:error, Okra.Utils.Errors.changeset_to_first_err_message_with_field_name(x)}
    end
  end

  def invite_to_quiz(user_id, user_id_to_invite) do
    user = Beef.Users.get_by_id(user_id)

    if user.currentQuizId do
      # @todo store quiz name in QuizSession to avoid db lookups
      quiz = Quizes.get_quiz_by_id(user.currentQuizId)

      if not is_nil(quiz) do
        Onion.QuizSession.create_invite(
          user.currentQuizId,
          user_id_to_invite,
          %{
            quizName: quiz.name,
            displayName: user.displayName,
            username: user.username,
            avatarUrl: user.avatarUrl,
            type: "invite"
          }
        )
      end
    end
  end

  def join_quiz(user_id, quiz_id) do
    currentQuizId = Beef.Users.get_current_quiz_id(user_id)

    if currentQuizId == quiz_id do
      %{quiz: Quizes.get_quiz_by_id(quiz_id)}
    else
      case Quizes.can_join_quiz(quiz_id, user_id) do
        {:error, message} ->
          %{error: message}

        {:ok, quiz} ->
          private_check =
            if quiz.isPrivate do
              case Onion.QuizSession.redeem_invite(quiz.id, user_id) do
                :error ->
                  {:error, "the quiz is private, ask someone inside to invite you"}

                :ok ->
                  :ok
              end
            else
              :ok
            end

          case private_check do
            {:error, m} ->
              %{error: m}

            :ok ->
              if currentQuizId do
                leave_quiz(user_id, currentQuizId)
              end

              Quizes.join_quiz(quiz, user_id)
              Onion.QuizSession.join_quiz(quiz_id, user_id)
              %{quiz: quiz}
          end
      end
    end
  catch
    _, _ ->
      {:error, "that quiz doesn't exist"}
  end

  def internal_set_speaker(user_id_to_make_speaker, quiz_id) do
    case QuizPermissions.set_speaker(user_id_to_make_speaker, quiz_id, true) do
      {:ok, _} ->
        # kind of horrible to have to make a double genserver call
        # here, we'll have to think about how this works (who owns muting)
        Onion.QuizSession.add_speaker(
          quiz_id,
          user_id_to_make_speaker
        )

      err ->
        {:err, err}
    end
  catch
    _, _ ->
      {:error, "room not found"}
  end

  defp internal_set_listener(user_id_to_make_listener, quiz_id) do
    QuizPermissions.make_listener(user_id_to_make_listener, quiz_id)
    Onion.QuizSession.remove_speaker(quiz_id, user_id_to_make_listener)
  end

  def set_listener(user_id, user_id_to_set_listener) do
    if user_id == user_id_to_set_listener do
      internal_set_listener(
        user_id_to_set_listener,
        Beef.Users.get_current_quiz_id(user_id_to_set_listener)
      )
    else
      {status, quiz} = Quizes.get_quiz_status(user_id)
      is_creator = user_id_to_set_listener == not is_nil(quiz) and quiz.creatorId

      if not is_creator and (status == :creator or status == :mod) do
        internal_set_listener(
          user_id_to_set_listener,
          Beef.Users.get_current_quiz_id(user_id_to_set_listener)
        )
      end
    end
  end

  def make_speaker(user_id, user_id_to_make_speaker) do
    with {status, quiz} when status in [:creator, :mod] <-
           Quizes.get_quiz_status(user_id),
         true <- QuizPermissions.asked_to_speak?(user_id_to_make_speaker, quiz.id) do
      internal_set_speaker(user_id_to_make_speaker, quiz.id)
    end
  end

  def change_quiz_creator(old_creator_id, new_creator_id) do
    # get current quiz id
    current_quiz_id = Beef.Users.get_current_quiz_id(new_creator_id)
    is_speaker = Beef.QuizPermissions.speaker?(new_creator_id, current_quiz_id)

    # get old creator's room id for validation
    old_creator_quiz_id = Beef.Users.get_current_quiz_id(old_creator_id)

    if is_speaker and not is_nil(current_quiz_id) and new_creator_id != old_creator_id and
         current_quiz_id == old_creator_quiz_id do
      case Quizes.replace_quiz_owner(old_creator_id, new_creator_id) do
        {1, _} ->
          internal_set_speaker(old_creator_id, current_quiz_id)
          Beef.QuizPermissions

          Onion.QuizSession.broadcast_ws(
            current_quiz_id,
            %{op: "new_quiz_creator", d: %{quizId: current_quiz_id, userId: new_creator_id}}
          )

        _ ->
          nil
      end
    end

    nil
  end

  def leave_quiz(user_id, current_quiz_id \\ nil) do
    current_quiz_id =
      if is_nil(current_quiz_id),
        do: Beef.Users.get_current_quiz_id(user_id),
        else: current_quiz_id

    if current_quiz_id do
      case Quizes.leave_quiz(user_id, current_quiz_id) do
        # the quiz should be destroyed
        {:bye, _quiz} ->
          Onion.QuizSession.destroy(current_quiz_id, user_id)

        # the room stays alive with new room creator
        x ->
          case x do
            {:new_creator_id, creator_id} ->
              Onion.QuizSession.broadcast_ws(
                current_quiz_id,
                %{op: "new_quiz_creator", d: %{quizId: current_quiz_id, userId: creator_id}}
              )

            _ ->
              nil
          end

          Onion.QuizSession.leave_quiz(current_quiz_id, user_id)
      end

      {:ok, %{quizId: current_quiz_id}}
    else
      {:error, "you are not in a quiz"}
    end
  end

  def edit_quiz(
        user_id,
        new_name,
        new_description,
        is_private
      ) do
    if quiz = Quizes.get_quiz_by_creator_id(user_id) do
      case Quizes.edit(quiz.id, %{
             name: new_name,
             description: new_description,
             isPrivate: is_private
           }) do
        {:ok, quiz} ->
          Onion.QuizSession.broadcast_ws(quiz.id, %{
            op: "new_quiz_details",
            d: %{
              name: new_name,
              description: new_description,
              isPrivate: is_private,
              quizId: quiz.id
            }
          })

        {:error, x} ->
          {:error, Okra.Utils.Errors.changeset_to_first_err_message_with_field_name(x)}
      end
    end
  end
end
