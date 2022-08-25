defmodule Kousa.QuizChat do
  alias Beef.Quizes
  alias Onion.QuizChat

  def send_msg(payload) do
    # TODO: pull quiz information from passed parameters from ws_session.
    case Beef.Users.get_current_quiz_id(payload.from) do
      nil ->
        :noop

      quiz_id ->
        Onion.QuizChat.send_msg(quiz_id, payload)
    end

    :ok
  end

  @ban_roles [:creator, :mod]

  def ban_user(user_id, user_id_to_ban) do
    quiz =
      case Quizes.get_quiz_status(user_id) do
        {role, quiz = %{creatorId: creator_id}}
        when role in @ban_roles and creator_id != user_id_to_ban ->
          quiz

        _ ->
          nil
      end

    if quiz do
      QuizChat.ban_user(quiz.id, user_id_to_ban)
      :ok
    else
      {:error, "#{user_id} not authorized to ban #{user_id_to_ban}"}
    end
  end

  def unban_user(user_id, user_id_to_unban) do
    case Quizes.get_quiz_status(user_id) do
      {role, quiz} when role in @ban_roles ->
        QuizChat.unban_user(quiz.id, user_id_to_unban)

      _ ->
        nil
    end
  end

  # Delete quiz chat messages
  def delete_msg(deletion, opts) do
    user_id = opts[:by]

    quiz =
      case Quizes.get_quiz_status(user_id) do
        {:creator, quiz} ->
          quiz

        # Mods cannot delete creator's messages
        {:mod, quiz = %{creatorId: creator_id}}
        when user_id != creator_id ->
          quiz

        {:listener, quiz} when user_id == deletion.userId ->
          quiz

        _ ->
          nil
      end

    if quiz do
      Onion.QuizChat.delete_message(quiz.id, deletion)
    else
      {:error, "#{user_id} not authorized to delete the selected message"}
    end
  end
end
