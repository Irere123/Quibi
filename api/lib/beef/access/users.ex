defmodule Beef.Access.Users do
  import Ecto.Query, warn: false

  alias Beef.Repo
  alias Beef.Queries.Users, as: Query
  alias Beef.Schemas.User
  alias Beef.Quizes

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

  def get_by_id_with_quiz_permissions(user_id) do
    from(u in User,
      where: u.id == ^user_id,
      left_join: qp in Beef.Schemas.QuizPermission,
      on: qp.userId == u.id and qp.quizId == u.currentQuizId,
      select: %{u | quizPermissions: qp},
      limit: 1
    )
    |> Repo.one()
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
    |> Query.i_blocked_them_info(me_id)
    |> Query.they_blocked_me_info(me_id)
    |> Query.limit_one()
    |> Repo.one()
  end

  def get_by_username_with_follow_info(user_id, username) do
    Query.start()
    |> Query.filter_by_username(username)
    |> select([u], u)
    |> Query.follow_info(user_id)
    |> Query.i_blocked_them_info(user_id)
    |> Query.they_blocked_me_info(user_id)
    |> Query.limit_one()
    |> Repo.one()
  end

  def get_current_quiz(user_id) do
    quiz_id = get_current_quiz_id(user_id)

    case quiz_id do
      nil -> nil
      id -> Quizes.get_quiz_by_id(id)
    end
  end

  def get_current_quiz_id(user_id) do
    try do
      Onion.UserSession.get_current_quiz_id(user_id)
    catch
      _, _ ->
        case get_by_id(user_id) do
          nil -> nil
          %{currentRoomId: id} -> id
        end
    end
  end

  def get_users_in_current_quiz(user_id) do
    case tuple_get_current_quiz_id(user_id) do
      {:ok, nil} ->
        {nil, []}

      {:ok, current_quiz_id} ->
        {current_quiz_id,
         from(u in User,
           where: u.currentQuizId == ^current_quiz_id,
           left_join: qp in Beef.Schemas.QuizPermission,
           on: qp.userId == u.id and qp.quizId == u.currentQuizId,
           select: %{u | quizPermissions: qp}
         )
         |> Repo.all()}

      _ ->
        {nil, []}
    end
  end

  def tuple_get_current_quiz_id(user_id) do
    case Onion.UserSession.get_current_quiz_id(user_id) do
      {:ok, nil} ->
        {nil, nil}

      x ->
        {:ok, x}
    end
  end
end
