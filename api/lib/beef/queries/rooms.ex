defmodule Beef.Queries.Rooms do
  import Ecto.Query, warn: false

  alias Beef.Schemas.Room

  def start() do
    from(r in Room)
  end

  def filter_room_by_id(query, room_id) do
    where(query, [r], r.id == ^room_id)
  end

  def limit_one(query) do
    limit(query, [r], 1)
  end
end
