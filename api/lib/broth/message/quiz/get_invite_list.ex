defmodule Broth.Message.Quiz.GetInviteList do
  use Broth.Message.Call


  @primary_key false
  embedded_schema do
    field(:cursor, :integer, default: 0)
    field(:limit, :integer, default: 100)
  end

  def changeset(initializer \\ %__MODULE__{}, data) do
    initializer
    |> cast(data, [:cursor, :limit])
    |> validate_number(:limit, greater_than: 0, message: "too low")
  end

  defmodule Reply do
    use Broth.Message.Push

    @derive {Jason.Encoder, only: [:users, :nextCursor]}

    @primary_key false
    embedded_schema do
      embeds_many(:users, Beef.Schemas.User)
      field(:nextCursor, :integer)
      field(:initial, :boolean)
    end
  end

  def execute(changeset, state) do
    with {:ok, request} <- apply_action(changeset, :validate),
         {users, nextCursor} <- Beef.Follows.fetch_invite_list(state.user.id, request.cursor) do
      {:reply, %Reply{users: users, nextCursor: nextCursor, initial: request.cursor == 0},
       state}
    end
  end
end
