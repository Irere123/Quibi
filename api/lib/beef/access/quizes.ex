defmodule Beef.Access.Quizes do
  import Ecto.Query
  @fetch_limit 16

  alias Beef.Queries.Quizes, as: Query
  alias Beef.Repo
  alias Beef.Schemas.Quiz
  alias Beef.QuizPermissions
  alias Beef.Schemas.User
  alias Beef.Schemas.UserBlock
  alias Beef.UserBlocks
  alias Beef.QuizBlocks
  alias Beef.Users

  def get_quiz_status(user_id) do
    quiz = Users.get_current_quiz(user_id)

    cond do
      is_nil(quiz) ->
        {nil, nil}

      quiz.creatorId == user_id ->
        {:creator, quiz}

      true ->
        {case QuizPermissions.get(user_id, quiz.id) do
           %{isMod: true} -> :mod
           %{isSpeaker: true} -> :speaker
           %{askedToSpeak: true} -> :askedToSpeak
           _ -> :listener
         end, quiz}
    end
  end

  def owner?(quiz_id, user_id) do
    not is_nil(
      Query.start()
      |> Query.filter_by_quiz_id_and_creator_id(quiz_id, user_id)
      |> Repo.one()
    )
  end

  def can_join_quiz(quiz_id, user_id) do
    quiz = get_quiz_by_id(quiz_id)
    max_quiz_size = Application.fetch_env!(:okra, :max_quiz_size)

    case quiz do
      nil ->
        {:error, "quiz doesn't exist anymore"}

      _ ->
        cond do
          quiz.numPeopleInside >= max_quiz_size ->
            {:error, "quiz is full"}

          QuizBlocks.blocked?(quiz_id, user_id) ->
            {:error, "you are blocked from the quiz"}

          true ->
            if UserBlocks.blocked?(quiz.creatorId, user_id) do
              {:error, "the creator of the quiz blocked you"}
            else
              {:ok, quiz}
            end
        end
    end
  end

  def get_quiz_by_id(quiz_id) do
    Repo.get(Quiz, quiz_id)
  end

  def get_top_public_quizes(user_id, offset \\ 0) do
    max_room_size = Application.fetch_env!(:okra, :max_quiz_size)

    items =
      from(q in Quiz,
        left_join: ub in UserBlock,
        on:
          (q.creatorId == ub.userIdBlocked and ub.userId == ^user_id) or
            (q.creatorId == ub.userId and ub.userIdBlocked == ^user_id),
        where:
          is_nil(ub.userIdBlocked) and q.isPrivate == false and
            q.numPeopleInside < ^max_room_size,
        order_by: [desc: q.numPeopleInside],
        offset: ^offset,
        limit: ^@fetch_limit
      )
      |> Repo.all()

    {Enum.slice(items, 0, -1 + @fetch_limit),
     if(length(items) == @fetch_limit, do: -1 + offset + @fetch_limit, else: nil)}
  end

  @user_order """
    (case
      when ? then 1
      else 2
    end)
  """
  def get_next_creator_for_quiz(quiz_id) do
    from(u in User,
      inner_join: qp in Beef.Schemas.QuizPermission,
      on: qp.quizId == ^quiz_id and qp.userId == u.id and u.currentQuizId == ^quiz_id,
      where: qp.isSpeaker == true,
      limit: 1,
      order_by: [
        asc: fragment(@user_order, qp.isMod)
      ]
    )
    |> Repo.one()
  end

  def get_quiz_by_creator_id(creator_id) do
    Query.start()
    |> Query.filter_by_creator_id(creator_id)
    |> Query.limit_one()
    |> Repo.one()
  end

  def search_name(start_of_name) do
    search_str = start_of_name <> "%"

    Query.start()
    |> where([r], ilike(r.name, ^search_str) and r.isPrivate == false)
    |> limit([], 15)
    |> Repo.all()
  end

  def all_quizes() do
    Repo.all(Quiz)
  end
end
