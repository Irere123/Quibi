defmodule Beef.Access.Quizes do
  import Ecto.Query
  @fetch_limit 16

  alias Beef.Queries.Quizes, as: Query
  alias Beef.Repo
  alias Beef.Schemas.Quiz
  alias Beef.Schemas.UserBlock
  alias Beef.UserBlocks

  def can_join_quiz(quiz_id, user_id) do
    IO.inspect(quiz_id)
    quiz = get_quiz_by_id(quiz_id)
    # max_quiz_size = Application.fetch_env!(:okra, :max_quiz_size)

    case quiz do
      nil ->
        {:error, "quiz doesn't exist anymore"}

      _ ->
        cond do
          # quiz.numPeopleInside >= max_quiz_size ->
          #   {:error, "quiz is full"}

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
