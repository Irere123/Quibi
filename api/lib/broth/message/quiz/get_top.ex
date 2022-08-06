defmodule Broth.Message.Quiz.GetTop do
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

    @derive {Jason.Encoder, only: [:quizes, :nextCursor, :initial]}

    @primary_key false
    embedded_schema do
      embeds_many(:quizes, Beef.Schemas.Quiz)
      field(:nextCursor, :integer)
      field(:initial, :boolean)
    end
  end

  alias Beef.Quizes

  def execute(changeset, state) do
    with {:ok, request} <- apply_action(changeset, :validate),
         {quizes, nextCursor} <- Quizes.get_top_public_quizes(state.user.id, request.cursor) do
      {:reply, %Reply{quizes: quizes, nextCursor: nextCursor, initial: request.cursor == 0},
       state}
    end
  end
end
