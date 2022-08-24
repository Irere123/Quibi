defmodule Beef.Schemas.User do
  use Ecto.Schema

  use Broth.Message.Push
  import Ecto.Changeset
  alias Beef.Schemas.Quiz

  defmodule Preview do
    use Ecto.Schema

    # TODO: Make this a separate Schema that sees the same table.

    @derive {Jason.Encoder, only: [:id, :displayName, :numFollowers, :avatarUrl]}

    @primary_key false
    embedded_schema do
      field(:id, :binary_id)

      field(:displayName, :string)
      field(:numFollowers, :integer)
      field(:avatarUrl, :string)
    end
  end

  @timestamps_opts [type: :utc_datetime_usec]
  @primary_key {:id, :binary_id, []}
  schema "users" do
    field(:githubId, :string)
    field(:twitterId, :string)
    field(:discordId, :string)
    field(:username, :string)
    field(:email, :string)
    field(:githubAccessToken, :string)
    field(:discordAccessToken, :string)
    field(:displayName, :string)
    field(:avatarUrl, :string)
    field(:bannerUrl, :string)
    field(:bio, :string, default: "")
    field(:reasonForBan, :string)
    field(:tokenVersion, :integer)
    field(:numFollowing, :integer)
    field(:numFollowers, :integer)
    field(:online, :boolean)
    field(:lastOnline, :utc_datetime_usec)
    field(:youAreFollowing, :boolean, virtual: true)
    field(:followsYou, :boolean, virtual: true)
    field(:quizPermissions, :map, virtual: true)
    field(:apiKey, :binary_id)
    field(:ip, :string)
    field(:theyBlockedMe, :boolean, virtual: true)
    field(:iBlockedThem, :boolean, virtual: true)

    belongs_to(:botOwner, Beef.Schemas.User, foreign_key: :botOwnerId, type: :binary_id)
    belongs_to(:currentQuiz, Quiz, foreign_key: :currentQuizId, type: :binary_id)

    many_to_many(:blocked_by, __MODULE__,
      join_through: "user_blocks",
      join_keys: [userIdBlocked: :id, userId: :id]
    )

    many_to_many(:blocking, __MODULE__,
      join_through: "user_blocks",
      join_keys: [userId: :id, userIdBlocked: :id]
    )

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, ~w(username githubId avatarUrl bannerUrl)a)
    |> validate_required([:username, :githubId, :avatarUrl, :bannerUrl])
  end

  def api_key_changeset(user, attrs) do
    user
    |> cast(attrs, [
      :apiKey
    ])
  end

  def edit_changeset(user, attrs) do
    user
    |> cast(attrs, [
      :id,
      :username,
      :bio,
      :displayName,
      :avatarUrl,
      :bannerUrl,
      :apiKey
    ])
    |> validate_required([:username, :displayName, :avatarUrl])
    |> update_change(:displayName, &String.trim/1)
    |> validate_length(:bio, min: 0, max: 160)
    |> validate_length(:displayName, min: 2, max: 50)
    |> validate_format(:username, ~r/^[\w\.]{4,15}$/)
    |> unique_constraint(:username)
  end

  defimpl Jason.Encoder do
    @fields ~w(id username avatarUrl bannerUrl bio online
    lastOnline displayName numFollowing numFollowers
    youAreFollowing followsYou quizPermissions iBlockedThem
    botOwnerId currentQuizId currentQuiz
  )a

    defp transform_current_quiz(fields = %{currentQuiz: %Ecto.Association.NotLoaded{}}) do
      Map.delete(fields, :currentQuiz)
    end

    defp transform_current_quiz(fields), do: fields

    def encode(user, opts) do
      user
      |> Map.take(@fields)
      |> transform_current_quiz()
      |> Jason.Encoder.encode(opts)
    end
  end
end
