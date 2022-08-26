defmodule Broth.Message.Quiz.GetInfo do
  use Broth.Message.Call
  alias Beef.Repo

  @primary_key false
  embedded_schema do
    # not required.  If you don't supply it, you get the quiz id of the
    # current quiz you're in (if you are in one)
    field(:quizId, :binary_id)
  end

  alias Kousa.Utils.UUID

  def changeset(initializer \\ %__MODULE__{}, data) do
    initializer
    |> cast(data, [:quizId])
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
    with {:ok, request} <- apply_action(changeset, :validate) do
      quiz_id = request.quizId || Beef.Users.get_current_quiz_id(state.user.id)

      if quiz = quiz_id && Repo.get(Reply, quiz_id) do
        {:reply, quiz, state}
      else
        {:error, "the quiz doesn't exist"}
      end
    end
  end
end
