defmodule Beef.Queries.Rooms do
  import Ecto.Query, warn: false

  alias Beef.Schemas.Room

  def start() do
    from(r in Room)
  end
end
