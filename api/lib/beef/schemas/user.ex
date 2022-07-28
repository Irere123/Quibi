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
    end
  end

  @derive {Jason.Encoder,
           only: [:id, :username, :displayName, :avatarUrl, :bannerUrl, :bio, :online]}
  @primary_key {:id, :binary_id, []}
  schema "users" do
    field(:twitterId, :string)
    field(:googleId, :string)
    field(:facebookId, :string)
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

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    # TODO: amend this to accept *either* githubId or twitterId and also
    # pipe edit_changeset into this puppy.
    user
    |> cast(attrs, ~w(username githubId avatarUrl bannerUrl)a)
    |> validate_required([:username, :githubId, :avatarUrl, :bannerUrl])
  end
end
