defmodule Beef.Schemas.Room do
  use Ecto.Schema
  import Ecto.Changeset

  alias Beef.Schemas.User
  alias Beef.Schemas.School

  @primary_key {:id, :binary_id, []}
  schema "rooms" do
    field(:name, :string)
    field(:isPrivate, :boolean, default: true)

    belongs_to(:creator, User, foreign_key: :creatorId, type: :binary_id)
    belongs_to(:school, School, foreign_key: :schoolId, type: :binary_id)

    timestamps()
  end

  def changeset(room, attrs) do
    room
    |> cast(attrs, ~w(creatorId name isPrivate schoolId)a)
    |> validate_required([:name])
  end

  def insert_changeset(room, attrs) do
    room
    |> cast(attrs, ~w(creatorId name isPrivate schoolId)a)
    |> validate_required([:name])
  end

  defimpl Jason.Encoder do
    @fields ~w(id name isPrivate creatorId inserted_at)a
    def encode(room, opts) do
      room
      |> Map.take(@fields)
      |> Jason.Encoder.encode(opts)
    end
  end
end
