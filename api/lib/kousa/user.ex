defmodule Kousa.User do
  alias Beef.Users
  # alias Beef.Schemas.User
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

  def edit_profile(user_id, data) do
    case Users.edit_profile(user_id, data) do
      {:error, %Ecto.Changeset{errors: [{_, {"has already been taken", _}}]}} ->
        :username_taken

      {:ok, user} ->
        Onion.UserSession.set_state(
          user_id,
          %{
            display_name: user.displayName,
            username: user.username,
            avatar_url: user.avatarUrl,
            banner_url: user.bannerUrl
          }
        )

        PubSub.broadcast("user:update:" <> user.id, user)
        {:ok, user}

      _ ->
        :ok
    end
  end

  @doc """
  bans a user from the platform.  Must be an admin operator (currently irere) to run
  this function.  Authorization passed in via the opts (:admin_id) field.

  If someone that isn't ben tries to use it, it won't leak a meaningful error message
  (to prevent side channel knowledge of authorization status)
  """
  def ban(user_id_to_ban, reason_for_ban, opts) do
    authorized_github_id = Application.get_env(:kousa, :irere_github_id, "")

    with %{githubId: ^authorized_github_id} <- Users.get_by_id(opts[:admin_id]),
         _user_to_ban = %{} <- Users.get_by_id(user_id_to_ban) do
      # Kousa.Room.leave_room(user_id_to_ban, user_to_ban.currentRoomId)
      Users.set_reason_for_ban(user_id_to_ban, reason_for_ban)
      Onion.UserSession.send_ws(user_id_to_ban, nil, %{op: "banned", d: %{}})
      :ok
    else
      _ -> {:error, "tried to ban #{user_id_to_ban} but that user didn't exist"}
    end
  end

  def admin_update_with(changeset, admin) do
    authorized_github_id = Application.get_env(:kousa, :irere_github_id, "")

    if admin.staff == true or admin.githubId == authorized_github_id do
      case Users.update(changeset) do
        {:ok, user} ->
          {:ok, user}

        error ->
          error
      end
    else
      {:error, "not authorized"}
    end
  end
end
