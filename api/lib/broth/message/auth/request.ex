defmodule Broth.Message.Auth.Request do
  use Broth.Message.Call,
    needs_auth: false

  @primary_key false
  embedded_schema do
    field(:accessToken, :string)
    field(:refreshToken, :string)
    field(:platform, :string)
  end

  @impl true
  def changeset(initializer \\ %__MODULE__{}, data) do
    initializer
    |> cast(data, [:accessToken, :refreshToken, :platform])
    |> validate_required([:accessToken])
  end

  defmodule Reply do
    use Broth.Message.Push

    @derive {Jason.Encoder, only: ~w(
      id
      username
      displayName
      avatarUrl
      bannerUrl
      bio
      online
      lastOnline
    )a}

    @primary_key {:id, :binary_id, []}
    schema "users" do
      field(:username, :string)
      field(:displayName, :string)
      field(:avatarUrl, :string)
      field(:bannerUrl, :string)
      field(:bio, :string, default: "")
      field(:online, :boolean)
      field(:lastOnline, :utc_datetime_usec)
    end
  end

  @impl true
  def execute(changeset, state) do
    with {:ok, request} <- apply_action(changeset, :validate),
         {:ok, user} <- Okra.Auth.authenticate(request) do
      {:reply, user, %{state | user: user}}
    else
      # don't tolerate malformed requests with any response besides closing
      # out websocket.
      _ -> {:close, 4001, "invalid_authentication"}
    end
  end
end
