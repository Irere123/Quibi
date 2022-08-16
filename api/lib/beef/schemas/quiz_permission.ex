defmodule Beef.Schemas.QuizPermission do
  use Ecto.Schema
  import Ecto.Changeset

  alias Beef.Schemas.Quiz
  alias Beef.Schemas.User

  @derive {Jason.Encoder, only: [:isSpeaker, :isMod, :askedToSpeak]}
  @primary_key false
  schema "quiz_permissions" do
    belongs_to(:user, User, foreign_key: :userId, type: :binary_id)
    belongs_to(:quiz, Quiz, foreign_key: :quizId, type: :binary_id)
    field(:isSpeaker, :boolean)
    field(:isMod, :boolean)
    field(:askedToSpeak, :boolean)

    timestamps()
  end

  @doc false
  def insert_changeset(quizPerm, attrs) do
    quizPerm
    |> cast(attrs, [:userId, :quizId, :isSpeaker, :isMod, :askedToSpeak])
    |> validate_required([:userId, :quizId])
  end
end
