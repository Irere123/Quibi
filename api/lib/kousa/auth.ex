defmodule Kousa.Auth do
  alias Onion.PubSub
  alias Kousa.Utils.TokenUtils

  def authenticate(request, ip) do
    case TokenUtils.tokens_to_user_id(request.accessToken, request.refreshToken) do
      nil ->
        {:error, "invalid_authentication"}

      {:existing_claim, user_id} ->
        do_auth(Beef.Users.get(user_id), nil, request, ip)

      # TODO: streamline this since we're duplicating user_id and user.
      {:new_tokens, _user_id, tokens, user} ->
        do_auth(user, tokens, request, ip)
    end
  end

  defp do_auth(user, tokens, request, ip) do
    alias Onion.UserSession
    alias Onion.QuizSession
    alias Beef.Quizes

    if user do
      # note that this will start the session and will be ignored if the
      # session is already running.
      UserSession.start_supervised(
        user_id: user.id,
        ip: ip,
        username: user.username,
        avatar_url: user.avatarUrl,
        banner_url: user.bannerUrl,
        display_name: user.displayName,
        current_quiz_id: user.currentQuizId
      )

      if user.ip != ip do
        Beef.Users.set_ip(user.id, ip)
      end

      # currently we only allow one active websocket connection per-user
      # at some point soon we're going to make this multi-connection, and we
      # won't have to do this.
      UserSession.set_active_ws(user.id, self())

      if tokens do
        UserSession.new_tokens(user.id, tokens)
      end

      quizIdFromFrontend = request.currentQuizId

      cond do
        user.currentQuizId ->
          # TODO: move to quiz business logic
          quiz = Quizes.get_quiz_by_id(user.currentQuizId)

          QuizSession.start_supervised(
            quiz_id: user.currentQuizId,
            chat_mode: quiz.chatMode,
            quiz_creator_id: quiz.creatorId
          )

          PubSub.subscribe("chat:" <> quiz.id)
          QuizSession.join_quiz(quiz.id, user.id)

        quizIdFromFrontend ->
          Kousa.Quiz.join_quiz(user.id, quizIdFromFrontend)

        true ->
          :ok
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
