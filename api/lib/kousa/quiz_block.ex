defmodule Kousa.QuizBlock do
  alias Beef.Users
  alias Beef.Quizes
  alias Beef.QuizBlocks

  def unban(user_id, user_id_to_unban) do
    with {:ok, id} when not is_nil(id) <- Users.tuple_get_current_quiz_id(user_id),
         true <- Quizes.owner?(id, user_id) do
      QuizBlocks.unban(id, user_id_to_unban)
    else
      _ -> nil
    end
  end

  def get_blocked_users(user_id, offset) do
    with {:ok, id} when not is_nil(id) <- Users.tuple_get_current_quiz_id(user_id),
         true <- Quizes.owner?(id, user_id) do
      QuizBlocks.get_blocked_users(id, offset)
    else
      _ -> nil
    end
  end
end
