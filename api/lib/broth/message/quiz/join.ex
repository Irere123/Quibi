defmodule Broth.Message.Quiz.Join do
  use Broth.Message.Call
  alias Beef.Repo

  @primary_key false
  embedded_schema do
    field(:quizId, :binary_id)
  end


  def changeset(initializer \\ %__MODULE__{}, data) do
    initializer
    |> cast(data, [:quizId])
    |> validate_required([:quizId])
    |> Okra.Utils.UUID.normalize(:quizId)
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
      case Okra.Quiz.join_quiz(state.user.id, quiz_id) do
        %{error: error} ->
          IO.inspect(error)
          {:error, error, state}

        _ ->
          {:reply, Repo.get(Reply, quiz_id), state}
      end
    end
  end
end
