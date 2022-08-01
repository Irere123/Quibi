defmodule Beef.Schemas.School do
  use Ecto.Schema
  import Ecto.Changeset

  alias Beef.Schemas.User

  @derive {Jason.Encoder, ~w(
    id
    name
    description
    isPrivate
    creatorId
  )a}
  @primary_key {:id, :binary_id, []}
  schema "schools" do
    field(:name, :string)
    field(:description, :string)
    field(:isPrivate, :boolean)

    belongs_to(:creator, User, foreign_key: :creatorId, type: :binary_id)

    timestamps()
  end

  def changeset(school, attrs) do
    school
    |> cast(attrs, ~w(name description)a)
    |> validate_required([:name, :description, :isPrivate])
    |> unique_constraint(:name)
  end
end
