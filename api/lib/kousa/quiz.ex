defmodule Kousa.Quiz do
  alias Beef.Follows
  alias Onion.PubSub
  alias Beef.Quizes
  alias Beef.Users
  alias Broth.SocketHandler
  alias Onion.UserSession
  alias Beef.QuizBlocks
  alias Beef.QuizPermissions

  def set_auto_speaker(user_id, value) do
    if quiz = Quizes.get_quiz_by_creator_id(user_id) do
      Onion.QuizSession.set_auto_speaker(quiz.id, value)
    end
  end

  def make_quiz_public(user_id, new_name) do
    # this needs to be refactored if a user can have multiple quizs
    case Beef.Quizes.set_quiz_privacy_by_creator_id(user_id, false, new_name) do
      {1, [quiz]} ->
        Onion.QuizSession.broadcast_ws(
          quiz.id,
          %{op: "quiz_privacy_change", d: %{quizId: quiz.id, name: quiz.name, isPrivate: false}}
        )

      _ ->
        nil
    end
  end

  def make_quiz_private(user_id, new_name) do
    # this needs to be refactored if a user can have multiple quizs
    case Quizes.set_quiz_privacy_by_creator_id(user_id, true, new_name) do
      {1, [quiz]} ->
        Onion.QuizSession.broadcast_ws(
          quiz.id,
          %{op: "quiz_privacy_change", d: %{quizId: quiz.id, name: quiz.name, isPrivate: true}}
        )

      _ ->
        nil
    end
  end

  def invite_to_quiz(user_id, user_id_to_invite) do
    user = Beef.Users.get_by_id(user_id)

    if user.currentQuizId && Follows.is_following_me(user_id, user_id_to_invite) do
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
            bannerUrl: user.bannerUrl,
            type: "invite"
          }
        )
      end
    end
  end

  defp internal_kick_from_quiz(user_id_to_kick, quiz_id) do
    case UserSession.lookup(user_id_to_kick) do
      [{_, _}] ->
        ws_pid = UserSession.get(user_id_to_kick, :pid)

        if ws_pid do
          SocketHandler.unsub(ws_pid, "chat:" <> quiz_id)
        end

      _ ->
        nil
    end

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
        QuizBlocks.upsert(%{
          modId: user_id,
          userId: user_id_to_block_from_quiz,
          quizId: quiz.id
        })

        internal_kick_from_quiz(user_id_to_block_from_quiz, quiz.id)
      end
    end
  end

  ###################################################################
  ## AUTH

  @doc """
  sets the authorization level of the user in the quiz that they're in.
  This could be 'user', 'mod', or 'owner'.

  Authorization to do so is pulled from the options `:by` keyword.

  TODO: move quiz into the opts field, and have it be passed in by the
  socket.
  """
  def set_auth(user_id, auth, opts) do
    quiz_id = Beef.Users.get_current_quiz_id(user_id)

    case auth do
      _ when is_nil(quiz_id) ->
        :noop

      :owner ->
        set_owner(quiz_id, user_id, opts[:by])

      :mod ->
        set_mod(quiz_id, user_id, opts[:by])

      :user ->
        set_user(quiz_id, user_id, opts[:by])
    end
  end

  ####################################################################
  # owner

  def set_owner(quiz_id, user_id, setter_id) do
    with {:creator, _} <- Quizes.get_quiz_status(setter_id),
         {1, _} <- Quizes.replace_quiz_owner(setter_id, user_id) do
      Onion.QuizSession.set_quiz_creator_id(quiz_id, user_id)
      internal_set_speaker(setter_id, quiz_id)

      Onion.QuizSession.broadcast_ws(
        quiz_id,
        %{
          op: "new_quiz_creator",
          d: %{quizId: quiz_id, userId: user_id}
        }
      )
    end
  end

  ####################################################################
  # mod

  # only creators can set someone to be mod.
  defp set_mod(quiz_id, user_id, setter_id) do
    # TODO: refactor this to pull from preloads.
    case Quizes.get_quiz_status(setter_id) do
      {:creator, _} ->
        QuizPermissions.set_is_mod(user_id, quiz_id, true)

        Onion.QuizSession.broadcast_ws(
          quiz_id,
          %{
            op: "mod_changed",
            d: %{quizId: quiz_id, userId: user_id, isMod: true}
          }
        )

      _ ->
        :noop
    end
  end

  ####################################################################
  # plain user

  # mods can demote their own mod status.
  defp set_user(quiz_id, user_id, user_id) do
    case Quizes.get_quiz_status(user_id) do
      {:mod, _} ->
        QuizPermissions.set_is_mod(user_id, quiz_id, true)

        Onion.QuizSession.broadcast_ws(
          quiz_id,
          %{
            op: "mod_changed",
            d: %{quizId: quiz_id, userId: user_id, isMod: false}
          }
        )

      _ ->
        :noop
    end
  end

  # only creators can demote mods
  defp set_user(quiz_id, user_id, setter_id) do
    case Quizes.get_quiz_status(setter_id) do
      {:creator, _} ->
        QuizPermissions.set_is_mod(user_id, quiz_id, false)

        Onion.QuizSession.broadcast_ws(
          quiz_id,
          %{
            op: "mod_changed",
            d: %{quizId: quiz_id, userId: user_id, isMod: false}
          }
        )

      _ ->
        :noop
    end
  end

  ####################################################################
  ## ROLE

  @doc """
  sets the role of the user in the quiz that they're in.  Authorization
  to do so is pulled from the options `:by` keyword.

  TODO: move quiz into the opts field, and have it be passed in by the
  socket.
  """
  def set_role(user_id, role, opts) do
    quiz_id = Beef.Users.get_current_quiz_id(user_id)

    case role do
      _ when is_nil(quiz_id) ->
        :noop

      :listener ->
        set_listener(quiz_id, user_id, opts[:by])

      :speaker ->
        set_speaker(quiz_id, user_id, opts[:by])

      :raised_hand ->
        set_raised_hand(quiz_id, user_id, opts[:by])
    end
  end

  ####################################################################
  ## listener

  defp set_listener(nil, _, _), do: :noop
  # you are always allowed to set yourself as listener
  defp set_listener(quiz_id, user_id, user_id) do
    internal_set_listener(user_id, quiz_id)
  end

  defp set_listener(quiz_id, user_id, setter_id) do
    # TODO: refactor this to be simpler.  The list of
    # creators and mods should be in the preloads of the quiz.
    with {auth, _} <- Quizes.get_quiz_status(setter_id),
         {role, _} <- Quizes.get_quiz_status(user_id) do
      if auth == :creator or (auth == :mod and role not in [:creator, :mod]) do
        internal_set_listener(user_id, quiz_id)
      end
    end
  end

  defp internal_set_listener(user_id, quiz_id) do
    QuizPermissions.make_listener(user_id, quiz_id)
    Onion.QuizSession.remove_speaker(quiz_id, user_id)
  end

  ####################################################################
  ## speaker
  defp set_speaker(nil, _, _), do: :noop

  defp set_speaker(quiz_id, user_id, setter_id) do
    if not QuizPermissions.asked_to_speak?(user_id, quiz_id) do
      :noop
    else
      case Quizes.get_quiz_status(setter_id) do
        {_, nil} ->
          :noop

        {:mod, _} ->
          internal_set_speaker(user_id, quiz_id)

        {:creator, _} ->
          internal_set_speaker(user_id, quiz_id)

        {_, _} ->
          :noop
      end
    end
  end

  defp internal_set_speaker(user_id, quiz_id) do
    case QuizPermissions.set_speaker(user_id, quiz_id, true) do
      {:ok, _} ->
        # Onion.Chat.set_can_chat(quiz_id, user_id)
        # kind of horrible to have to make a double genserver call
        # here, we'll have to think about how this works (who owns muting)
        Onion.QuizSession.add_speaker(
          quiz_id,
          user_id
        )

      err ->
        {:err, err}
    end
  catch
    _, _ ->
      {:error, "quiz not found"}
  end

  # NB this function does not correctly return an updated quiz struct if the
  # action is valid.

  # NB2, this function has an non-idiomatic parameter order.  quiz_id should
  # come first.
  def join_quiz(user_id, quiz_id) do
    currentQuizId = Beef.Users.get_current_quiz_id(user_id)

    if currentQuizId == quiz_id do
      %{quiz: Quizes.get_quiz_by_id(quiz_id)}
    else
      case Quizes.can_join_quiz(quiz_id, user_id) do
        {:error, message} ->
          %{error: message}

        {:ok, quiz} ->
          # private quizs can now be joined by anyone who has the link
          # they are functioning closer to an "unlisted" quiz
          if currentQuizId do
            leave_quiz(user_id, currentQuizId)
          end

          # subscribe to the new quiz chat
          PubSub.subscribe("chat:" <> quiz_id)

          Quizes.join_quiz(quiz, user_id)

          Onion.QuizSession.join_quiz(quiz_id, user_id)

          %{quiz: quiz}
      end
    end
  catch
    _, _ ->
      {:error, "that quiz doesn't exist"}
  end

  # only you can raise your own hand
  defp set_raised_hand(quiz_id, user_id, setter_id) do
    if user_id == setter_id do
      if Onion.QuizSession.get(quiz_id, :auto_speaker) do
        internal_set_speaker(user_id, quiz_id)
      else
        case QuizPermissions.ask_to_speak(user_id, quiz_id) do
          {:ok, %{isSpeaker: true}} ->
            internal_set_speaker(user_id, quiz_id)

          _ ->
            Onion.QuizSession.broadcast_ws(
              quiz_id,
              %{
                op: "hand_raised",
                d: %{userId: user_id, quizId: quiz_id}
              }
            )
        end
      end
    end
  end

  ######################################################################
  ## UPDATE

  def update(user_id, data) do
    if quiz = Quizes.get_quiz_by_creator_id(user_id) do
      case Quizes.edit(quiz.id, data) do
        ok = {:ok, quiz} ->
          Onion.QuizSession.broadcast_ws(quiz.id, %{
            op: "new_quiz_details",
            d: %{
              name: quiz.name,
              description: quiz.description,
              chatThrottle: quiz.chatThrottle,
              isPrivate: quiz.isPrivate,
              quizId: quiz.id
            }
          })

          ok

        error = {:error, _} ->
          error
      end
    end
  end

  def create_quiz(
        user_id,
        quiz_name,
        quiz_description,
        is_private,
        auto_speaker \\ nil
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
          auto_speaker: auto_speaker,
          chat_throttle: quiz.chatThrottle,
          chat_mode: quiz.chatMode,
          quiz_creator_id: quiz.creatorId
        )

        Onion.QuizSession.join_quiz(quiz.id, user_id, no_fan: true)

        # if not is_private do
        #   Kousa.Follow.notify_followers_you_created_a_quiz(user_id, quiz)
        # end

        # if not is_nil(user_id_to_invite) do
        #   # TODO: change this to Task.Supervised
        #   Task.start(fn ->
        #     Kousa.Quiz.invite_to_quiz(user_id, user_id_to_invite)
        #   end)
        # end

        # subscribe to this quiz's chat
        Onion.PubSub.subscribe("chat:" <> id)

        {:ok, %{quiz: quiz}}

      {:error, x} ->
        {:error, Kousa.Utils.Errors.changeset_to_first_err_message_with_field_name(x)}
    end
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

        # the quiz stays alive with new quiz creator
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

      # unsubscribe to the quiz chat
      PubSub.unsubscribe("chat:" <> current_quiz_id)

      {:ok, %{quizId: current_quiz_id}}
    else
      {:error, "you are not in a quiz"}
    end
  end
end
