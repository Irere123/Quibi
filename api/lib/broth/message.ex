defmodule Broth.Message do
  alias Broth.SocketHandler
  alias Beef.Follows

  #######################################################################
  #### HANDLER FUNCTIONS

  def handler("set_auto_speaker", %{"value" => value}, state) do
    Okra.Quiz.set_auto_speaker(state.user_id, value)
    {:ok, state}
  end

  def handler("set_quiz_chat_mode", %{"value" => value}, state) do
    Okra.Quiz.set_chat_mode(state.user_id, value)

    {:ok, state}
  end

  def handler("ban_from_quiz_chat", %{"userId" => user_id_to_ban}, state) do
    Okra.QuizChat.ban_user(state.user_id, user_id_to_ban)
    {:ok, state}
  end

  def handler("send_quiz_chat_msg", %{"tokens" => tokens}, state) do
    Okra.QuizChat.send_msg(state.user_id, tokens)
    {:ok, state}
  end

  def handler(
        "delete_quiz_chat_message",
        %{"messageId" => message_id, "userId" => user_id},
        state
      ) do
    Okra.QuizChat.delete_message(state.user_id, message_id, user_id)
    {:ok, state}
  end

  def handler("leave_quiz", _data, state) do
    case Okra.Quiz.leave_quiz(state.user_id) do
      {:ok, d} ->
        {:reply, SocketHandler.prepare_socket_msg(%{op: "you_left_quiz", d: d}, state), state}

      _ ->
        {:ok, state}
    end
  end

  def handler("invite_to_quiz", %{"userId" => user_id_to_invite}, state) do
    Okra.Quiz.invite_to_quiz(state.user_id, user_id_to_invite)
    {:ok, state}
  end

  def handler(
        "block_from_quiz",
        %{"userId" => user_id_to_block_from_quiz},
        state
      ) do
    Okra.Quiz.block_from_quiz(state.user_id, user_id_to_block_from_quiz)
    {:ok, state}
  end

  #######################################################################
  #### FETCH HANDLER FUNCTIONS

  def f_handler("create_quiz", data, state) do
    case Okra.Quiz.create_quiz(
           state.user_id,
           data["name"],
           data["description"] || "",
           data["privacy"] == "private",
           nil,
           true
         ) do
      {:ok, d} ->
        d

      {:error, d} ->
        %{
          error: d
        }
    end
  end

  def f_handler("create_room", data, state) do
    Okra.Room.create_room(state.user_id, data)
  end

  def f_handler("get_top_public_quizes", data, state) do
    {quizes, next_cursor} =
      Beef.Quizes.get_top_public_quizes(
        state.user_id,
        data["cursor"]
      )

    %{quizes: quizes, nextCursor: next_cursor, initial: data["cursor"] == 0}
  end

  def f_handler("get_user_profile", %{"userIdOrUsername" => userIdOrUsername}, state) do
    user =
      case Ecto.UUID.cast(userIdOrUsername) do
        {:ok, uuid} ->
          Beef.Users.get_by_id_with_follow_info(state.user_id, uuid)

        _ ->
          Beef.Users.get_by_username_with_follow_info(state.user_id, userIdOrUsername)
      end

    case user do
      nil ->
        %{error: "could not find user"}

      %{theyBlockedMe: true} ->
        %{error: "blocked"}

      _ ->
        user
    end
  end

  def f_handler("edit_profile", %{"data" => data}, state) do
    %{
      isOk: Okra.User.edit_profile(state.user_id, data)
    }
  end

  def f_handler("search", %{"query" => query}, _state) do
    quizes = Beef.Quizes.search_name(query)
    users = Beef.Users.search_username(query)

    items = Enum.concat(quizes, users)
    %{items: items, users: users, quizes: quizes}
  end

  def f_handler("follow", %{"userId" => userId, "value" => value}, state) do
    Okra.Follow.follow(state.user_id, userId, value)
    %{}
  end

  def f_handler("get_invite_list", %{"cursor" => cursor}, state) do
    {users, next_cursor} = Follows.fetch_invite_list(state.user_id, cursor)

    %{users: users, nextCursor: next_cursor}
  end

  def f_handler("get_my_following", %{"limit" => limit}, state) do
    {users, _} = Beef.Follows.get_my_following(state.user_id, 0, limit)
    %{users: users}
  end

  def f_handler("block", %{"userId" => userId, "value" => value}, state) do
    Okra.UserBlock.block(state.user_id, userId, value)
    %{}
  end

  def f_handler("join_quiz_and_get_info", %{"quizId" => quiz_id_to_join}, state) do
    case Okra.Quiz.join_quiz(state.user_id, quiz_id_to_join) do
      %{error: err} ->
        %{error: err}

      %{quiz: quiz} ->
        {quiz_id, users} = Beef.Users.get_users_in_current_quiz(state.user_id)

        case Onion.QuizSession.lookup(quiz_id) do
          [] ->
            %{error: "Quiz no longer exists."}

          _ ->
            {chatMode, autoSpeaker, activeSpeakerMap} =
              if quiz_id do
                Onion.QuizSession.get_maps(quiz_id)
              else
                {%{}, false, %{}}
              end

            %{
              quiz: quiz,
              users: users,
              activeSpeakerMap: activeSpeakerMap,
              quizId: quiz_id,
              autoSpeaker: autoSpeaker,
              chatMode: chatMode
            }
        end

      _ ->
        %{error: "you should never see this, email this to @irere_emmanauel"}
    end
  end

  def f_handler(
        "edit_quiz",
        %{
          "name" => name,
          "description" => description,
          "privacy" => privacy
        },
        state
      ) do
    case Okra.Quiz.edit_quiz(
           state.user_id,
           name,
           description,
           privacy == "private"
         ) do
      {:error, message} ->
        %{
          error: message
        }

      _ ->
        true
    end
  end

  def f_handler("unban_from_quiz", %{"userId" => user_id}, state) do
    Okra.QuizBlock.unban(state.user_id, user_id)
    %{}
  end

  def f_handler("get_blocked_from_quiz_users", %{"offset" => offset}, state) do
    case Okra.QuizBlock.get_blocked_users(state.user_id, offset) do
      {users, next_cursor} ->
        %{users: users, nextCursor: next_cursor}

      _ ->
        %{users: [], nextCursor: nil}
    end
  end
end
