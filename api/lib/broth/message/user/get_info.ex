defmodule Broth.Message.User.GetInfo do
  use Broth.Message.Call

  @primary_key false
  embedded_schema do
    field(:userIdOrUsername, :string)
  end

  # userId is either a uuid or username
  def changeset(initializer \\ %__MODULE__{}, data) do
    initializer
    |> cast(data, [:userIdOrUsername])
    |> validate_required([:userIdOrUsername])
  end

  defmodule Reply do
    use Broth.Message.Push

    @derive {Jason.Encoder, only: ~w(
      id
      username
      email
      displayName
      avatarUrl
      bannerUrl
      bio
      online
      numFollowing
      numFollowers
      last_online
      inserted_at
      iBlockedThem
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
      field(:numFollowing, :integer)
      field(:numFollowers, :integer)
      field(:youAreFollowing, :boolean, virtual: true)
      field(:followsYou, :boolean, virtual: true)
      field(:iBlockedThem, :boolean, virtual: true)
    end
  end

  alias Beef.Users

  def execute(changeset, state) do
    case apply_action(changeset, :validate) do
      {:ok, %{userIdOrUsername: userIdOrUsername}} ->
        user =
          case Ecto.UUID.cast(userIdOrUsername) do
            {:ok, _} ->
              Users.get_by_id(userIdOrUsername)

            _ ->
              Users.get_by_username(userIdOrUsername)
          end

        case user do
          nil ->
            {:reply, %{error: "could not find user"}, state}

          %{theyBlockedMe: true} ->
            {:reply, %{error: "blocked"}, state}

          _ ->
            {:reply, user, state}
        end

      error ->
        error
    end
  end
end
