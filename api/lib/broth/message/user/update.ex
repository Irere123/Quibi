defmodule Broth.Message.User.Update do
  alias Beef.Schemas.User

  use Broth.Message.Call,
    reply: __MODULE__

  @derive {Jason.Encoder, only: ~w(
      id
      username
      email
      displayName
      avatarUrl
      bannerUrl
      bio
      online
      last_online
      inserted_at
    )a}

  @primary_key {:id, :binary_id, []}
  schema "users" do
    field(:username, :string)
    field(:displayName, :string)
    field(:email, :string)
    field(:avatarUrl, :string)
    field(:bannerUrl, :string)
    field(:bio, :string, default: "")
    field(:online, :boolean)
    field(:last_online, :utc_datetime_usec)
    field(:inserted_at, :utc_datetime_usec)
    field(:error, :string, virtual: true)
  end

  @impl true
  def initialize(state) do
    state.user
  end

  @impl true
  def changeset(initializer \\ %User{}, data) do
    initializer
    |> cast(data, [:bio, :displayName])
  end

  @impl true
  def execute(changeset, state) do
    # TODO: make this a proper changeset-mediated alteration.
    case Okra.User.update_with(changeset) do
      {:ok, user} -> {:reply, user, %{state | user: user}}
      error -> error
    end
  end
end
