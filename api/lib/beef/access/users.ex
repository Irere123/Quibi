defmodule Beef.Access.Users do
  import Ecto.Query, warn: false

  alias Beef.Repo
  alias Beef.Queries.Users, as: Query
  alias Beef.Schemas.User

  def get(user_id) do
    Repo.get(User, user_id)
  end

  def get_by_username(username) do
    Query.start()
    |> Query.filter_by_username(username)
    |> Repo.one()
  end

  def get_by_id(user_id) do
    Repo.get(User, user_id)
  end
end
