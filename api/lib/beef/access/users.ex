defmodule Beef.Access.Users do
  import Ecto.Query, warn: false

  alias Beef.Queries.Users, as: Query
  alias Beef.Repo
  alias Beef.Quizes
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

  def get_by_username(username) do
    Query.start()
    |> Query.filter_by_username(username)
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

  def get_by_id_with_current_quiz(user_id) do
    from(u in User,
      left_join: a0 in assoc(u, :currentQuiz),
      where: u.id == ^user_id,
      limit: 1,
      preload: [
        currentQuiz: a0
      ]
    )
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

  def get_users_in_current_quiz(user_id) do
    case tuple_get_current_quiz_id(user_id) do
      {:ok, nil} ->
        {nil, []}

      {:ok, current_quiz_id} ->
        {current_quiz_id,
         from(u in User,
           where: u.currentQuizId == ^current_quiz_id,
           left_join: rp in Beef.Schemas.QuizPermission,
           on: rp.userId == u.id and rp.quizId == u.currentQuizId,
           select: %{u | quizPermissions: rp}
         )
         |> Repo.all()}

      _ ->
        {nil, []}
    end
  end

  # NB: Anything that touches Gen will have to be refactored away
  # out of the database layer, but we are keeping it here for now
  # to keep the transition smooth.
  def tuple_get_current_quiz_id(user_id) do
    # DO NOT COPY/PASTE THIS FUNCTION
    case Onion.UserSession.get_current_quiz_id(user_id) do
      {:ok, nil} ->
        {nil, nil}

      x ->
        {:ok, x}
    end
  end

  def get_current_quiz(user_id) do
    quiz_id = get_current_quiz_id(user_id)

    case quiz_id do
      nil -> nil
      id -> Quizes.get_quiz_by_id(id)
    end
  end

  def get_current_quiz_id(user_id) do
    # DO NOT COPY/PASTE THIS FUNCTION
    try do
      Onion.UserSession.get_current_quiz_id(user_id)
    catch
      _, _ ->
        case get_by_id(user_id) do
          nil -> nil
          %{currentQuizId: id} -> id
        end
    end
  end
end
