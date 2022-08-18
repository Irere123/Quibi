defmodule Beef.QuizBlocks do
  import Ecto.Query
  alias Okra.Utils.Pagination
  alias Beef.Schemas.User
  alias Beef.Schemas.QuizBlock
  alias Beef.Repo

  def unban(quiz_id, user_id) do
    from(qb in QuizBlock, where: qb.userId == ^user_id and qb.quizId == ^quiz_id)
    |> Repo.delete_all()
  end

  def blocked?(quiz_id, user_id) do
    not is_nil(
      from(qb in QuizBlock,
        where: qb.userId == ^user_id and qb.quizId == ^quiz_id,
        limit: 1
      )
      |> Beef.Repo.one()
    )
  end

  @fetch_limit 31

  def get_blocked_users(quiz_id, offset) do
    from(u in User,
      inner_join: qb in QuizBlock,
      on: u.id == qb.userId,
      where: qb.quizId == ^quiz_id,
      offset: ^offset,
      limit: @fetch_limit
    )
    |> Beef.Repo.all()
    |> Pagination.items_to_offset_tuple(offset, @fetch_limit)
  end

  def insert(data) do
    %QuizBlock{}
    |> QuizBlock.insert_changeset(data)
    |> Beef.Repo.insert(on_conflict: :nothing)
  end
end
