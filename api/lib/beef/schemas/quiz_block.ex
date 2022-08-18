defmodule Beef.Schemas.QuizBlock do
  use Ecto.Schema

  import Ecto.Changeset
  alias Beef.Schemas.User
  alias Beef.Schemas.Quiz
  @timestamps_opts [type: :utc_datetime_usec]

  @primary_key false
  schema "quiz_blocks" do
    belongs_to(:user, User, foreign_key: :userId, type: :binary_id)
    belongs_to(:quiz, Quiz, foreign_key: :quizId, type: :binary_id)
    belongs_to(:mod, User, foreign_key: :modId, type: :binary_id)

    timestamps()
  end

  def insert_changeset(quizBlock, attrs) do
    quizBlock
    |> cast(attrs, [:userId, :quizId, :modId])
    |> validate_required([:userId, :quizId, :modId])
  end
end
