defmodule Okra.QuizBlock do
  alias Beef.Users
  alias Beef.QuizBlocks

  def unban(user_id, user_id_to_unban) do
    with {:ok, id} <- Users.tuple_get_current_quiz_id(user_id) do
      QuizBlocks.unban(id, user_id_to_unban)
    end
  end

  def get_blocked_users(user_id, offset) do
    with {:ok, id} <- Users.tuple_get_current_quiz_id(user_id) do
      QuizBlocks.get_blocked_users(id, offset)
    end
  end
end
