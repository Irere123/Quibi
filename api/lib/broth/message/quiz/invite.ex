defmodule Broth.Message.Quiz.Invite do
  use Broth.Message.Cast

  @primary_key false
  embedded_schema do
    field(:userId, :binary_id)
  end

  def changeset(initializer \\ %__MODULE__{}, data) do
    initializer
    |> cast(data, [:userId])
    |> validate_required([:userId])
  end

  def execute(data, state) do
    case apply_action(data, :validate) do
      {:ok, invite} ->
        Kousa.Quiz.invite_to_quiz(state.user.id, invite.userId)
        {:noreply, state}

      error = {:error, _} ->
        error
    end
  end
end
