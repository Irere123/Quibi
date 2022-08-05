defmodule Beef.Schemas.Follow do
  use Ecto.Schema
  import Ecto.Changeset

  @timestamps_opts [type: :utc_datetime_usec]

  alias Beef.Schemas.User

  @derive {Jason.Encoder, only: [:userId, :followerId]}
  @primary_key false
  schema "followers" do
    # person who is being followed
    belongs_to(:user, User, foreign_key: :userId, type: :binary_id)

    # person who is following
    belongs_to(:follower, User, foreign_key: :followerId, type: :binary_id)

    timestamps()
  end

  @doc false
  def insert_changeset(follow, attrs) do
    follow
    |> cast(attrs, [:userId, :followerId])
    |> validate_required([[:followerId, :userId]])
    |> unique_constraint(:already_following, name: "followers_pkey")
  end
end
