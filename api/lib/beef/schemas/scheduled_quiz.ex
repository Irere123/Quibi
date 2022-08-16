defmodule Beef.Schemas.ScheduledQuiz do
  use Ecto.Schema

  import Ecto.Changeset
  alias Beef.Schemas.User
  alias Beef.Schemas.Quiz
  @timestamps_opts [type: :utc_datetime_usec]

  @derive {Jason.Encoder,
  only: [
    :id,
    :name,
    :numAttending,
    :scheduledFor,
    :description,
    :quizId,
    :creator,
    :creatorId
  ]}
  @primary_key {:id, :binary_id, []}
  schema "scheduled_quizes" do
    field(:name, :string)
    field(:numAttending, :integer)
    field(:scheduledFor, :utc_datetime_usec)
    field(:description, :string, default: "")
    field(:started, :boolean)

    belongs_to(:creator, User, foreign_key: :creatorId, type: :binary_id)
    belongs_to(:quiz, Quiz, foreign_key: :quizId, type: :binary_id)

    timestamps()
  end

  def validate_future_date(%{changes: changes} =  changeset, field) do
    if date =  changes[field] do
      if DateTime.compare(date, DateTime.utc_now()) == :gt do
        changeset
      else
        changeset
        |> add_error(field, "Date needs to be in the future")
      end
    end
  end

  def validate_not_too_far_into_future_date(%{changes: changes} =  changeset, field) do
    if date = changes[field] do
       # 1 extra day to avoid conflicts with frontend
       max_date = DateTime.utc_now() |> Timex.shift(months: 6, days: 1)

       if DateTime.compare(date, max_date) == :lt do
        changeset
      else
        changeset
        |> add_error(field, "Date can't be further than 6 month in advance")
      end
    else
      changeset
    end
  end

  def common_validation(attrs) do
    attrs
    |> validate_future_date(:scheduledFor)
    |> validate_not_too_far_into_future_date(:scheduleFor)
    |> validate_length(:name, min: 2, max: 60)
    |> validate_length(:description, max: 200)
  end

  def insert_changeset(quiz, attrs) do
    quiz
    |> cast(attrs, [:id, :name, :creatorId, :scheduledFor, :description])
    |> validate_required([:name, :creatorId, :scheduledFor])
    |> common_validation()
  end

  def edit_changeset(quiz, attrs) do
    quiz
    |> cast(attrs, [:id, :name, :scheduledFor, :description])
    |> validate_required([:name, :scheduledFor])
    |> common_validation()
  end
end
