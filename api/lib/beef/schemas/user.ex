defmodule Beef.Schemas.User do
  use Ecto.Schema

  import Ecto.Changeset

  defmodule Preview do
    use Ecto.Schema

     @derive {Poison.Encoder, only: [:id, :displayName, :username, :avatarUrl]}
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

  @derive {Poison.Encoder, only: ~w(id username avatarUrl bannerUrl bio online
             lastOnline displayName)a}

  @primary_key {:id, :binary_id, []}
  schema "users" do
    field(:googleId, :string)
    field(:twitterId, :string)
    field(:facebookId, :string)
    field(:username, :string)
    field(:displayName, :string)
    field(:email, :string)
    field(:avatarUrl, :string)
    field(:bannerUrl, :string)
    field(:bio, :string, default: "")
    field(:tokenVersion, :integer)
    field(:online, :boolean)
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
