defmodule Beef.UserBlocks do
  @moduledoc """
  Empty context module for UserBlocks
  """

  # ACCESS
  defdelegate blocked?(user_id, user_id_blocked), to: Beef.Access.UserBlocks
  defdelegate username_blocked?(username, user_id_blocked), to: Beef.Access.UserBlocks

  # MUTATIONS
  defdelegate insert(data), to: Beef.Mutations.UserBlocks
  defdelegate delete(user_id, user_id_blocked), to: Beef.Mutations.UserBlocks
end
