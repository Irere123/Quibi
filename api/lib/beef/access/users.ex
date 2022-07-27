defmodule Beef.Access.Users do
  import Ecto.Query, warn: false

  alias Beef.Repo
  alias Beef.Queries.Users, as: Query

  def get_by_username(username) do
    Query.start()
    |> Query.filter_by_username(username)
    |> Repo.one()
  end

end
