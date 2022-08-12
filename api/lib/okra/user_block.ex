defmodule Okra.UserBlock do
  alias Beef.UserBlocks
  alias Beef.Follows

  def block(user_id, user_id_to_block, should_block) do
    if should_block do
      Follows.delete(user_id, user_id_to_block)
      UserBlocks.insert(%{userId: user_id, userIdBlocked: user_id_to_block})
    else
      UserBlocks.delete(user_id, user_id_to_block)
    end
  end
end
