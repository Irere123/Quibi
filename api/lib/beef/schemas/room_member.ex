defmodule Beef.Schemas.RoomMember do
  use Ecto.Schema
  import Ecto.Changeset

  alias Beef.Schemas.User
  alias Beef.Schemas.Room

  @derive {Jason.Encoder, ~w(roomId userId)a}
  @primary_key {:id, :binary_id, []}
  schema "room_members" do
    belongs_to(:room, Room, foreign_key: :roomId, type: :binary_id)
    belongs_to(:user, User, foreign_key: :userId, type: :binary_id)

    timestamps()
  end

  def insert_changeset(room_member, attrs) do
    room_member
    |> cast(attrs, ~w(userId roomId)a)
    |> validate_required([:userId, :roomId])
  end
end
