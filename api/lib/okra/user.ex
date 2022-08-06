defmodule Okra.User do
  alias Beef.Users
  alias Onion.PubSub

  def update_with(changeset = %Ecto.Changeset{}) do
    case Users.update(changeset) do
      {:ok, user} ->
        # TODO: clean this up by making Onion.UserSession adopt the User schema and having it
        # accept pubsub broadcast messages.

        Onion.UserSession.set_state(
          user.id,
          %{
            display_name: user.displayName,
            username: user.username,
            avatar_url: user.avatarUrl,
            banner_url: user.bannerUrl
          }
        )

        PubSub.broadcast("user:update:" <> user.id, user)
        {:ok, user}

      {:error, %Ecto.Changeset{errors: [username: {"has already been taken, _"}]}} ->
        {:error, "that user name is taken"}

      error ->
        error
    end
  end
end
