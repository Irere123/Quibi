defmodule Broth.Message.Quiz.Ban do
  use Broth.Message.Cast

  @primary_key false
  embedded_schema do
    field(:userId, :binary_id)
  end

  alias Kousa.Utils.UUID

  def changeset(initializer \\ %__MODULE__{}, data) do
    initializer
    |> cast(data, [:userId])
    |> validate_required([:userId])
    |> UUID.normalize(:userId)
  end

  def execute(changeset, state) do
    with {:ok, %{userId: user_id}} <-
           apply_action(changeset, :validate) do
      # TODO: change to auth: format.
      Kousa.Quiz.block_from_quiz(state.user.id, user_id)
      {:noreply, state}
    end
  end
end
