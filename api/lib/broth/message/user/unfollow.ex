defmodule Broth.Message.User.Unfollow do
  use Broth.Message.Call

  @primary_key false
  embedded_schema do
    field(:userId, :binary_id)
  end

  def changeset(initializer \\ %__MODULE__{}, data) do
    initializer
    |> cast(data, [:userId])
    |> validate_required([:userId])
  end

  defmodule Reply do
    use Broth.Message.Push

    @derive {Jason.Encoder, only: []}

    @primary_key false
    embedded_schema do
    end
  end

  def execute(changeset, state) do
    with {:ok, %{userId: user_id}} <- apply_action(changeset, :validate) do
      Kousa.Follow.unfollow(state.user.id, user_id)
      {:reply, %Reply{}, state}
    end
  end
end
