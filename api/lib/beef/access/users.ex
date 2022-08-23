defmodule Beef.Access.Users do
  import Ecto.Query, warn: false

  alias Beef.Queries.Users, as: Query
  alias Beef.Repo
  alias Beef.Schemas.User

  def get(user_id) do
    Repo.get(User, user_id)
  end

  def find_by_github_ids(ids) do
    Query.start()
    |> Query.filter_by_github_ids(ids)
    |> Query.select_id()
    |> Repo.all()
  end

  def search_username(<<first_letter>> <> rest) when first_letter == ?@ do
    search_username(rest)
  end

  def search_username(start_of_username) do
    search_str = start_of_username <> "%"

    Query.start()
    # here
    |> where([u], ilike(u.username, ^search_str))
    |> order_by([u], desc: u.numFollowers)
    |> limit([], 15)
    |> Repo.all()
  end

  def get_by_id(user_id) do
    Repo.get(User, user_id)
  end

  def get_by_username(username) do
    Query.start()
    |> Query.filter_by_username(username)
    |> Repo.one()
  end

  def get_ip(user_id) do
    # DO NOT COPY/PASTE THIS FUNCTION
    try do
      Onion.UserSession.get(user_id, :ip)
    catch
      _, _ ->
        case get_by_id(user_id) do
          nil -> nil
          %{ip: ip} -> ip
        end
    end
  end

  def get_by_api_key(api_key) do
    Repo.get_by(User, apiKey: api_key)
  end
end
