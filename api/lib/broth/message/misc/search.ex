defmodule Broth.Message.Misc.Search do
  use Broth.Message.Call

  @primary_key false
  embedded_schema do
    field(:query, :string)
    # not used currently, but will be used in the future:
    field(:cursor, :integer)
    field(:limit, :integer)
  end

  @impl true
  def changeset(initializer \\ %__MODULE__{}, data) do
    initializer
    |> cast(data, [:query])
    |> validate_required([:query])
    |> validate_length(:query, min: 3, max: 100)
  end

  defmodule Reply do
    use Broth.Message.Push

    @derive {Jason.Encoder, only: ~w(
        items
        quizes
        users
        nextCursor
      )a}

    @primary_key false
    embedded_schema do
      # the types of this is Quiz | User.
      # currently not enforced, but once we have real Displayquiz and
      # DisplayUser schemas we'll make sure Search.search outputs those.
      field(:items, {:array, :map})
      embeds_many(:quizes, Beef.Schemas.Quiz)
      embeds_many(:users, Beef.Schemas.User)
      field(:nextCursor, :integer)
    end
  end

  alias Beef.Users
  alias Beef.Quizes

  @impl true
  def execute(changeset, state) do
    case apply_action(changeset, :validate) do
      {:ok, %{query: query}} ->
        quizes = Quizes.search_name(query)
        users = Users.search_username(query)
        items = Enum.concat(quizes, users)

        {:reply, %Reply{items: items, quizes: quizes, users: users, nextCursor: nil}, state}

      error ->
        error
    end
  end
end
