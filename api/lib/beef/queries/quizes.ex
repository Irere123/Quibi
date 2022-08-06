defmodule Beef.Queries.Quizes do
  import Ecto.Query
  alias Beef.Schemas.User
  alias Beef.Schemas.Quiz

  def start do
    from(q in Quiz)
  end

  def userStart do
    from(u in User)
  end

  def filter_by_current_quiz_id(query, quiz_id) do
    where(query, [u], u.currentQuizId == ^quiz_id)
  end

  def filter_by_creator_id(query, creator_id) do
    where(query, [q], q.creatorId == ^creator_id)
  end

  def filter_by_quiz_id_and_creator_id(query, quiz_id, user_id) do
    where(query, [q], q.id == ^quiz_id and q.creatorId == ^user_id)
  end

  def limit_one(query) do
    limit(query, [q], 1)
  end
end
