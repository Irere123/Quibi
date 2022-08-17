defmodule Beef.Access.Rooms do
  import Ecto.Query, warn: false

  alias Beef.Schemas.Room
  alias Beef.Schemas.RoomMember
  alias Beef.Repo

  def get_my_rooms(user_id) do
    from(r in Room,
      left_join: rm in RoomMember,
      on: rm.userId == ^user_id,
      where: r.creatorId == ^user_id or rm.userId == ^user_id,
      inner_join: u in assoc(r, :creator),
      preload: [
        creator: u
      ]
    )
    |> Repo.all()
  end
end
