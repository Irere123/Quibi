defmodule Okra.Quiz do
  alias Onion.PubSub
  alias Beef.Quizes
  alias Beef.Users

  def create_quiz(
        user_id,
        quiz_name,
        quiz_description,
        is_private
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
        Onion.QuizSession.start_supervised(quiz_id: quiz.id)

        Onion.QuizSession.join_quiz(quiz.id, user_id)

        # subscribe to this room's chat
        Onion.PubSub.subscribe("chat:" <> id)

        {:ok, %{quiz: quiz}}

      {:error, x} ->
        {:error, Okra.Utils.Errors.changeset_to_first_err_message_with_field_name(x)}
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
          # private rooms can now be joined by anyone who has the link
          # they are functioning closer to an "unlisted" room
          if currentQuizId do
            leave_quiz(user_id, currentQuizId)
          end

          # subscribe to the new room chat
          PubSub.subscribe("chat:" <> quiz_id)

          Onion.QuizSession.join_quiz(quiz_id, user_id)
          %{quiz: quiz}
      end
    end
  catch
    _, _ ->
      {:error, "that room doesn't exist"}
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

      # unsubscribe to the room chat
      PubSub.unsubscribe("chat:" <> current_quiz_id)

      {:ok, %{quizId: current_quiz_id}}
    else
      {:error, "you are not in a quiz"}
    end
  end
end
