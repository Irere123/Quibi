defmodule Okra.Auth do
  alias Onion.PubSub

  alias Okra.Utils.TokenUtils

  def authenticate(request) do
    case TokenUtils.tokens_to_user_id(request.accessToken, request.refreshToken) do
      nil ->
        {:error, "invalid_authentication"}

      {:existing_claim, user_id} ->
        do_auth(Beef.Users.get(user_id), nil)

      # TODO: streamline this since we're duplicating user_id and user.
      {:new_tokens, _user_id, tokens, user} ->
        do_auth(user, tokens)
    end
  end

  defp do_auth(user, tokens) do
    alias Onion.UserSession

    if user do
      # note that this will start the session and will be ignored if the
      # session is already running.
      UserSession.start_supervised(
        user_id: user.id,
        username: user.username,
        avatar_url: user.avatarUrl,
        banner_url: user.bannerUrl,
        display_name: user.displayName
      )

      # currently we only allow one active websocket connection per-user
      # at some point soon we're going to make this multi-connection, and we
      # won't have to do this.
      UserSession.set_active_ws(user.id, self())

      if tokens do
        UserSession.new_tokens(user.id, tokens)
      end

      # subscribe to chats directed to oneself.
      PubSub.subscribe("chat:" <> user.id)
      # subscribe to user updates
      PubSub.subscribe("user:update:" <> user.id)

      {:ok, user}
    else
      {:close, 4001, "invalid_authentication"}
    end
  end
end
