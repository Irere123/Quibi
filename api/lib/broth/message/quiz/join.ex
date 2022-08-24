defmodule Broth.Message.Quiz.Join do
  use Broth.Message.Call

  @primary_key false
  embedded_schema do
    field(:quizId, :binary_id)
  end

  alias Kousa.Utils.UUID

  def changeset(initializer \\ %__MODULE__{}, data) do
    initializer
    |> cast(data, [:quizId])
    |> validate_required([:quizId])
    |> UUID.normalize(:quizId)
  end

  defmodule Reply do
    use Broth.Message.Push

    @derive {Jason.Encoder, only: [:id, :name, :description, :isPrivate]}

    @primary_key {:id, :binary_id, []}
    schema "quizes" do
      field(:name, :string)
      field(:description, :string)
      field(:isPrivate, :boolean)
    end
  end

  def execute(changeset, state) do
    with {:ok, %{quizId: quiz_id}} <- apply_action(changeset, :validate) do
      case Kousa.Quiz.join_quiz(state.user.id, quiz_id) do
        %{error: error} ->
          {:error, error, state}

        %{quiz: quiz} ->
          {quiz_id, users} = Beef.Users.get_users_in_current_quiz(state.user.id)

          case Onion.QuizSession.lookup(quiz_id) do
            [] ->
              {:error, %{error: "Quiz no longer exists"}}

            _ ->
              {autoSpeaker, activeSpeakerMap} = Onion.QuizSession.get_maps(quiz_id)

              {:reply,
               %{
                 quiz: quiz,
                 users: users,
                 activeSpeakerMap: activeSpeakerMap,
                 quizId: quiz_id,
                 autoSpeaker: autoSpeaker,
                 chatMode: "default"
               }, state}
          end
      end
    end
  end
end
