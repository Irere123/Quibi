defmodule Beef.Schemas.ScheduledQuizCohost do
  use Ecto.Schema
  import Ecto.Changeset
  alias Beef.Schemas.User
  alias Beef.Schemas.ScheduledQuiz
  @timestamps_opts [type: :utc_datetime_usec]

  @primary_key false
  schema "scheduled_quiz_cohosts" do
    belongs_to(:user, User, foreign_key: :userId, type: :binary_id)
    belongs_to(:scheduledQuiz, ScheduledQuiz, foreign_key: :scheduledQuizId, type: :binary_id)

    timestamps()
  end

  @doc false
  def insert_changeset(follow, attrs) do
    follow
    |> cast(attrs, [:userId, :scheduledQuizId])
    |> validate_required([:userId, :scheduledQuizId])
    |> unique_constraint(:already_cohost, name: "scheduled_quiz_cohosts_pkey")
  end
end
