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

  def search_username(<<first_letter>> <> rest) when first_letter == ?@ do
    search_username(rest)
  end

  def search_username(start_of_username) do
    search_str = start_of_username <> "%"

    Query.start()
    |> where([u], ilike(u.username, ^search_str) or ilike(u.displayName, ^search_str))
    |> limit([], 15)
    |> Repo.all()
  end

  def get_by_id(user_id) do
    Repo.get(User, user_id)
  end

  @fetch_limit 16
  def search(query, offset) do
    query_with_percent = "%" <> query <> "%"

    items =
      from(u in User,
        where:
          ilike(u.username, ^query_with_percent) or
            ilike(u.displayName, ^query_with_percent),
        limit: @fetch_limit,
        offset: ^offset
      )
      |> Repo.all()

    {Enum.slice(items, 0, -1 + @fetch_limit),
     if(length(items) == @fetch_limit, do: -1 + offset + @fetch_limit, else: nil)}
  end

  def get_by_id_with_follow_info(me_id, them_id) do
    Query.start()
    |> Query.filter_by_id(them_id)
    |> select([u], u)
    |> Query.follow_info(me_id)
    |> Query.limit_one()
    |> Repo.one()
  end

  def get_by_username_with_follow_info(user_id, username) do
    Query.start()
    |> Query.filter_by_username(username)
    |> select([u], u)
    |> Query.follow_info(user_id)
    |> Query.limit_one()
    |> Repo.one()
  end
end
