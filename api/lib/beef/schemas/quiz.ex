defmodule Beef.Schemas.Quiz do
  use Ecto.Schema
  import Ecto.Changeset
  @timestamps_opts [type: :utc_datetime_usec]

  alias Beef.Schemas.User

  @primary_key {:id, :binary_id, []}
  schema "quizes" do
    field(:name, :string)
    field(:description, :string, default: "")
    field(:numPeopleInside, :integer)
    field(:isPrivate, :boolean)
    field(:autoSpeaker, :boolean, default: false)
    field(:chatThrottle, :integer, default: 1000)
    field(:chatMode, Ecto.Enum, values: [:default, :disabled, :follower_only])

    belongs_to(:user, User, foreign_key: :creatorId, type: :binary_id)
    embeds_many(:peoplePreviewList, User.Preview)

    timestamps()
  end

  @doc false
  def insert_changeset(quiz, attrs) do
    quiz
    |> cast(attrs, [
      :id,
      :name,
      :creatorId,
      :isPrivate,
      :numPeopleInside,
      :description,
      :chatMode,
      :chatThrottle,
      :autoSpeaker
    ])
    |> validate_required([:name, :creatorId])
    |> validate_length(:name, min: 2, max: 60)
    |> validate_length(:description, max: 500)
    |> unique_constraint(:creatorId)
  end

  def edit_changeset(quiz, attrs) do
    quiz
    |> cast(attrs, [:id, :name, :isPrivate, :description, :autoSpeaker, :chatMode, :chatThrottle])
    |> validate_required([:name])
    |> validate_length(:name, min: 2, max: 60)
    |> validate_number(:chatThrottle, greater_than_or_equal_to: 0)
    |> validate_length(:description, max: 500)
  end

  defimpl Jason.Encoder do
    @fields ~w(
      id name description creatorId
      numPeopleInside isPrivate peoplePreviewList
      inserted_at chatMode chatThrottle autoSpeaker
    )a

    def encode(user, opts) do
      user
      |> Map.take(@fields)
      |> Jason.Encoder.encode(opts)
    end
  end
end
