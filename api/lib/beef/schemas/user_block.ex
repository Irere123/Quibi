defmodule Beef.Schemas.UserBlock do
  use Ecto.Schema
  import Ecto.Changeset

  alias Beef.Schemas.User

  @derive {Jason.Encoder, only: [:userId, :userIdBlocked]}
  @primary_key false
  schema "user_block" do
    belongs_to(:user, User, foreign_key: :userId, type: :binary_id)
    belongs_to(:blockedUser, User, foreign_key: :userIdBlocked, type: :binary_id)

    timestamps()
  end

  @doc false
  def insert_changeset(userBlock, attrs) do
    userBlock
    |> cast(attrs, [:userId, :userIdBlocked])
    |> validate_required([:userId, :userIdBlocked])
  end
end
