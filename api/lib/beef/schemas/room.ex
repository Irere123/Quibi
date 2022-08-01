defmodule Beef.Schemas.Room do
  use Ecto.Schema
  import Ecto.Changeset

  alias Beef.Schemas.User
  alias Beef.Schemas.School

  @derive {Jason.Encoder, ~w(
    id
    name
    description
    isPrivate
    isForum
    creatorId
    schoolId
  )a}
  @primary_key {:id, :binary_id, []}
  schema "rooms" do
    field(:name, :string)
    field(:description, :string, default: "")
    field(:isPrivate, :boolean, default: true)
    field(:isForum, :boolean)

    belongs_to(:creator, User, foreign_key: :creatorId, type: :binary_id)
    belongs_to(:school, School, foreign_key: :schoolId, type: :binary_id)

    timestamps()
  end

  def changeset(room, attrs) do
    room
    |> cast(attrs, ~w(name description isPrivate isForum)a)
    |> validate_required([:name])
  end
end
