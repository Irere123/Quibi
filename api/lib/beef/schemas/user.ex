defmodule Beef.Schemas.User do
  use Ecto.Schema

  import Ecto.Changeset

  defmodule Preview do
    use Ecto.Schema

    @derive {Jason.Encoder, only: [:id, :displayName, :username, :avatarUrl]}

    @primary_key false
    embedded_schema do
      # does User.Preview really need an id?
      field(:id, :binary_id)

      field(:displayName, :string)
      field(:username, :string)
      field(:avatarUrl, :string)
      field(:numFollowers, :integer)
    end
  end

  @primary_key {:id, :binary_id, []}
  schema "users" do
    field(:twitterId, :string)
    field(:googleId, :string)
    field(:discordId, :string)
    field(:discordAccessToken, :string)
    field(:username, :string)
    field(:displayName, :string)
    field(:bio, :string, default: "")
    field(:email, :string)
    field(:avatarUrl, :string)
    field(:bannerUrl, :string)
    field(:tokenVersion, :integer)
    field(:online, :boolean)
    field(:hasLoggedIn, :boolean)
    field(:last_online, :utc_datetime_usec)
    field(:numFollowing, :integer)
    field(:numFollowers, :integer)
    field(:youAreFollowing, :boolean, virtual: true)
    field(:followsYou, :boolean, virtual: true)
    field(:theyBlockedMe, :boolean, virtual: true)
    field(:iBlockedThem, :boolean, virtual: true)

    belongs_to(:currentQuiz, Beef.Schemas.Quiz, foreign_key: :currentQuizId, type: :binary_id)

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
    # TODO: amend this to accept *either* githubId or twitterId and also
    # pipe edit_changeset into this puppy.
    user
    |> cast(attrs, ~w("username twitterId avatarUrl bannerUrl")a)
    |> validate_required([:username, :avatarUrl, :bannerUrl])
  end

  defimpl Jason.Encoder do
    @fields ~w(
      id username email displayName avatarUrl bannerUrl bio online
      last_online  inserted_at youAreFollowing followsYou iBlockedThem
      numFollowing numFollowers currentQuizId currentQuiz
    )a

    defp transform_current_quiz(fields = %{currentQuiz: %Ecto.Association.NotLoaded{}}) do
      Map.delete(fields, :currentQuiz)
    end

    defp transform_current_quiz(fields), do: fields

    def encode(user, opts) do
      user
      |> Map.take(@fields)
      |> transform_current_quiz
      |> Jason.Encoder.encode(opts)
    end
  end
end
