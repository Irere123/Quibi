defmodule Broth.Message.User.Online do
  use Broth.Message.Call

  @primary_key false
  embedded_schema do
    field(:userId, :binary_id)
  end

  def changeset(initializer \\ %__MODULE__{}, data) do
    initializer
    |> cast(data, [:userId])
    |> validate_required([:userId])
    |> Okra.Utils.UUID.normalize(:userId)
  end

  defmodule Reply do
    use Broth.Message.Push

    @derive {Jason.Encoder, only: [:followers]}
    @primary_key false
    embedded_schema do
      embeds_many(:followers, Beef.Schemas.User)
    end
  end

  def execute(changeset, state) do
    with {:ok, %{userId: userId}} <-
           apply_action(changeset, :validate) do
      users = Beef.Follows.get_users_online(userId)

      {:reply, %Reply{followers: users}, state}
    end
  end
end
