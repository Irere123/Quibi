defmodule Beef.Access.Quizes do
  import Ecto.Query

  alias Beef.Repo
  alias Beef.Schemas.Quiz
  alias Beef.Queries.Quizes, as: Query

  def search_name(start_of_name) do
    search_str = start_of_name <> "%"

    Query.start()
    |> where([q], ilike(q.name, ^search_str) and q.isPrivate == false)
    |> order_by([q], desc: q.numPeopleInside)
    |> limit([], 15)
    |> Repo.all()
  end

  def all_quizes() do
    Repo.all(Quiz)
  end
end
