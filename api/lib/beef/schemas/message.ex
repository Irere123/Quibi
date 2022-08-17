defmodule Beef.Schemas.Message do
  use Ecto.Schema

  import  Ecto.Changeset
  alias Beef.Schemas.User
  alias Beef.Schemas.Room

  defmodule Token do
    use Ecto.Schema

    @derive {Jason.Encoder, only: [:t, :v]}

    @primary_key false
    embedded_schema do
      field(:t, :string)
      field(:v, :string)
    end
  end

  @primary_key {:id, :binary_id, []}
  schema "messages" do
    embeds_many(:tokens, Token)

    belongs_to(:creator, User, foreign_key: :creatorId, type: :binary_id)
    belongs_to(:room, Room, foreign_key: :roomId, type: :binary_id)

    timestamps()
  end

  def insert_changeset(message, attrs) do
    message
    |> cast(attrs, [:roomId, :creatorId])
    |> validate_required([:roomId, :creatorId])
  end

end
