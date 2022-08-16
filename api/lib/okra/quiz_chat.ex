defmodule Okra.QuizChat do
  alias Beef.Quizes
  alias Onion.QuizChat

  @message_character_limit 512

  def unban_user(user_id, user_id_to_unban) do
    case Quizes.get_quiz_status(user_id) do
      {:creator, quiz} ->
        if quiz.creatorId != user_id_to_unban do
          QuizChat.unban_user(quiz.id, user_id_to_unban)
        end

      _ ->
        nil
    end

    :ok
  end

  def send_msg(user_id, tokens) do
    tokens = validate_tokens(tokens)

    # NB: length(list) is O(N) so use a match for stuff like this
    if length(tokens) > 0 do
      case Beef.Users.get_current_quiz_id(user_id) do
        nil ->
          nil

        current_quiz_id ->
          with {avatar_url, display_name, username} <-
                 Onion.UserSession.get_info_for_msg(user_id) do
            Onion.QuizChat.new_msg(
              current_quiz_id,
              user_id,
              %{
                id: Ecto.UUID.generate(),
                avatarUrl: avatar_url,
                displayName: display_name,
                username: username,
                userId: user_id,
                tokens: tokens,
                sentAt: DateTime.utc_now()
              }
            )
          end
      end
    end
  end

  defp validate_tokens(tokens) when is_list(tokens) do
    if Enum.reduce_while(tokens, 0, &count_message_characters/2) <= @message_character_limit do
      tokens
      |> Enum.reduce([], &validate_tokens/2)
      |> Enum.reverse()
    else
      []
    end
  end

  defp validate_tokens(_), do: []

  defp validate_tokens(token, acc) do
    case validate_token(token) do
      {:ok, token} -> [token | acc]
      _ -> acc
    end
  end

  defp count_message_characters(%{"v" => v}, acc) do
    if acc <= @message_character_limit, do: {:cont, String.length(v) + acc}, else: {:halt, acc}
  end

  defp validate_token(token = %{"t" => type, "v" => _})
       when type in ["text", "mention", "block"],
       do: {:ok, token}

  defp validate_token(token = %{"t" => "link", "v" => link}) do
    link
    |> URI.parse()
    |> valid_url?()
    |> case do
      true -> {:ok, token}
      _ -> :invalid
    end
  end

  defp validate_token(_), do: :invalid

  defp valid_url?(%URI{host: host, scheme: scheme}) when is_binary(host) and is_binary(scheme),
    do: true

  defp valid_url?(_), do: false

  @ban_roles [:creator, :mod]

  def ban_user(user_id, user_id_to_ban) do
    quiz =
      case Quizes.get_quiz_status(user_id) do
        {role, quiz = %{creatorId: creator_id}}
        when role in @ban_roles and creator_id != user_id_to_ban ->
          quiz

        _ ->
          nil
      end

    if quiz do
      Onion.QuizChat.ban_user(quiz.id, user_id_to_ban)
      :ok
    else
      {:error, "#{user_id} not authorized to ban #{user_id_to_ban}"}
    end
  end

  # Delete message
  def delete_message(deleter_id, message_id, user_id) do
    quiz =
      case Quizes.get_quiz_status(deleter_id) do
        {:creator, quiz} ->
          quiz

        # Mods can delete other mod' messages
        {:mod, quiz = %{creatorId: creator_id}}
        when user_id != creator_id ->
          quiz

        {:listener, quiz} when user_id == deleter_id ->
          quiz
        _ ->
          nil
      end

    if quiz do
      Onion.QuizChat.message_deleted(quiz.id, deleter_id, message_id)
      :ok
    else
      {:error, "#{user_id} not authorized to delete the selected message"}
    end
  end
end
