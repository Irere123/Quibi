defmodule Beef.Access.Rooms do
  import Ecto.Query, warn: false

  alias Beef.Schemas.Room
  alias Beef.Repo

  def get_user_rooms(user_id) do
    from(r in Room,
      where: r.creatorId == ^user_id,
      inner_join: u in assoc(r, :creator),
      preload: [
        creator: u
      ]
    )
    |> Repo.all()
  end
end
