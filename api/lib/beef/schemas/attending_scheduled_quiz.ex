defmodule Beef.Schemas.AttendingScheduledQuiz do
  use Ecto.Schema

  import Ecto.Changeset
  alias Beef.Schemas.User
  alias Beef.Schemas.ScheduledQuiz
  @timestamps_opts [type: :utc_datetime_usec]

  @derive {Jason.Encoder, only: [:userId, :scheduledQuizId]}
  @primary_key false
  schema "attending_scheduled_quizes" do
    belongs_to(:user, User, foreign_key: :userId, type: :binary_id)
    belongs_to(:scheduledQuiz, ScheduledQuiz, foreign_key: :scheduledQuizId, type: :binary_id)

    timestamps()
  end

  @doc false
  def insert_changeset(follow, attrs) do
    follow
    |> cast(attrs, [:userId, :scheduledQuizId])
    |> validate_required([:userId, :scheduledQuizId])
    |> unique_constraint(:already_attending, name: "attending_scheduled_quizes_pkey")
  end
end
