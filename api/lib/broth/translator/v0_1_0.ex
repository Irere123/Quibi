defmodule Broth.Translator.V0_1_0 do
  import Okra.Utils.Version

  ############################################################################
  ## INBOUND MESSAGES

  @operator_translations %{
    "auth" => "auth:request",
    "get_user_profile" => "user:get_info",
    "edit_profile" => "user:update",
    "search" => "search:search",
    "get_online" => "user:get_online",
    "create_room" => "room:create",
    "create_quiz" => "quiz:create",
    # follow needs to arbitrate if it becomes follow or unfollow.
    "follow" => nil,
    # get_follow_list needs to arbitrate if its followers or following.
    "get_follow_list" => nil,
    "follow_info" => "user:get_relationship",
    "get_my_following" => "user:get_following",
    "get_top_public_quizes" => "quiz:get_top",
    "join_quiz_and_get_info" => "quiz:join"
  }

  @operators Map.keys(@operator_translations)

  defguard translates(message) when :erlang.map_get("op", message) in @operators

  def translate_inbound(message = %{"op" => operator}) do
    message
    |> translate_operation
    |> translate_in_body(operator)
    |> add_in_ref(operator)
    |> add_version
  end

  def translate_operation(message = %{"op" => operator}) do
    put_in(message, ["op"], @operator_translations[operator])
  end

  def translate_in_body(message, "create_room") do
    is_forum = get_in(message, ["d", "type"]) == "forum"
    put_in(message, ["d", "isForum"], is_forum)
  end

  def translate_in_body(message, "create_quiz") do
    is_private = get_in(message, ["d", "privacy"]) == "private"
    put_in(message, ["d", "isPrivate"], is_private)
  end

  def translate_in_body(message, "edit_profile") do
    put_in(message, ["d"], get_in(message, ["d", "data"]))
  end

  # def translate_in_body(message, "join_quiz_and_get_info") do
  #   put_in(message, ["d"], get_in(message, ["d", "quizId"]))
  # end

  def translate_in_body(message, "get_user_profile") do
    put_in(message, ["d", "userIdOrUsername"], get_in(message, ["d", "userId"]))
  end

  def translate_in_body(message, "follow") do
    # this one has to also alter the operation.
    operation = if get_in(message, ["d", "value"]), do: "user:follow", else: "user:unfollow"
    put_in(message, ["op"], operation)
  end

  def translate_in_body(message, "get_follow_list") do
    # this one has to also alter the operation.
    operation =
      if get_in(message, ["d", "isFollowing"]),
        do: "user:get_following",
        else: "user:get_followers"

    put_in(message, ["op"], operation)
  end

  def translate_in_body(message, _op), do: message

  # these casts need to be instrumented with fetchId in order to be treated
  # as a cast.
  @casts_to_calls ~w(auth)

  def add_in_ref(message, op) when op in @casts_to_calls do
    Map.put(message, "fetchId", UUID.uuid4())
  end

  def add_in_ref(message, _op), do: message

  def add_version(message), do: Map.put(message, "version", ~v(0.1.0))

  ############################################################################
  ## OUTBOUND MESSAGES

  def translate_outbound(message, original) do
    %{op: "fetch_done", d: message.p}
    |> add_out_ref(message)
    |> add_out_err(message)
    |> translate_out_body(original.inbound_operator || message.op)
  end

  defp add_out_ref(message, %{ref: ref}), do: Map.put(message, :fetchId, ref)
  defp add_out_ref(message, _), do: message

  defp add_out_err(message, %{e: err}), do: Map.put(message, :e, err)
  defp add_out_err(message, _), do: message

  def translate_out_body(message, "auth:request") do
    %{message | op: "auth-good", d: message.d}
  end

  def translate_out_body(message, "room:create") do
    %{message | d: %{room: message.d}}
  end

  def translate_out_body(message, "quiz:create") do
    %{message | d: %{quiz: message.d}}
  end

  def translate_out_body(message, "user:get_following") do
    data = %{users: message.d.following, nextCursor: message.d.nextCursor}
    %{message | d: data}
  end

  def translate_out_body(message, "user:get_followers") do
    data = %{users: message.d.followers, nextCursor: message.d.nextCursor}
    %{message | d: data}
  end

  def translate_out_body(message, "user:get_online") do
    data = %{users: message.d.followers}
    %{message | d: data}
  end

  def translate_out_body(message, "quiz:jojn") do
    data = %{quiz: message.d}
    %{message | d: data}
  end

  def translate_out_body(message, "user:get_relationship") do
    new_data =
      case message.d.relationship do
        nil -> %{followsYou: false, youAreFollowing: false}
        :follower -> %{followsYou: true, youAreFollowing: false}
        :following -> %{followsYou: false, youAreFollowing: true}
        :mutual -> %{followsYou: true, youAreFollowing: true}
      end

    %{message | d: new_data}
  end

  #################################################################
  # pure outbound messages

  def translate_out_body(message, _), do: message
end
