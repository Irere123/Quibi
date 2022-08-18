defmodule Beef.Schemas.Message do
  use Ecto.Schema

  import Ecto.Changeset
  alias Beef.Schemas.User
  alias Beef.Schemas.Room

  @derive {Jason.Encoder, only: [:roomId, :creator, :creatorId, :message, :inserted_at]}
  @primary_key {:id, :binary_id, []}
  schema "messages" do
    field(:message, :string)

    belongs_to(:creator, User, foreign_key: :creatorId, type: :binary_id)
    belongs_to(:room, Room, foreign_key: :roomId, type: :binary_id)

    timestamps()
  end

  def insert_changeset(message, attrs) do
    message
    |> cast(attrs, [:message, :roomId, :creatorId])
    |> validate_required([:message, :roomId, :creatorId])
  end
end
