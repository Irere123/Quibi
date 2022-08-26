defmodule Broth.Message.Quiz.Leave do
  use Broth.Message.Call

  @primary_key false
  embedded_schema do
  end

  def changeset(initializer \\ %__MODULE__{}, data) do
    change(initializer, data)
  end

  defmodule Reply do
    use Broth.Message.Push

    @derive {Jason.Encoder, only: []}

    @primary_key false
    embedded_schema do
    end
  end

  def execute(_, state) do
    case Kousa.Quiz.leave_quiz(state.user.id) do
      {:ok, _} ->
        {:reply, %Reply{}, state}

      _ ->
        {:noreply, state}
    end
  end
end
