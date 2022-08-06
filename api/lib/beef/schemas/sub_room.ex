defmodule Beef.Schemas.SubRoom do
  use Ecto.Schema
  import Ecto.Changeset

  alias Beef.Schemas.Room
  alias Beef.Schemas.User

  @derive {Jason.Encoder, ~w(
    id
    name
    description
    isPrivate
    creatorId
    roomId
  )a}
  @primary_key {:id, :binary_id, []}
  schema "sub_rooms" do
    field(:name, :string)
    field(:description, :string)
    field(:isPrivate, :string)

    belongs_to(:user, User, foreign_key: :creatorId, type: :binary_id)
    belongs_to(:room, Room, foreign_key: :roomId, type: :binary_id)

    timestamps()
  end

  def changeset(sub_room, attrs) do
    sub_room
    |> cast(attrs, ~w(name description isPrivate)a)
    |> validate_required(:name)
  end
end
