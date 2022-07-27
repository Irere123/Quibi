defmodule Beef.Queries.Users do
  @moduledoc """
  all functions in this module should be "Query builder" functions,
  they should not touch the database.
  """

  import Ecto.Query, warn: false
  alias Beef.Schemas.User

  def start do
    from(u in User)
  end

  def filter_by_username(query, username) do
    where(query, [u], u.username == ^username)
  end
end
