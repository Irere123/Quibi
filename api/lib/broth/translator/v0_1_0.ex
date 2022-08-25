defmodule Broth.Translator.V0_1_0 do
  @moduledoc """
  Version 0.1.0: Translates some messages
  """

  import Kousa.Utils.Version, only: [sigil_v: 2]

  ############################################################################
  ## INBOUND MESSAGES

  @operator_translations %{
    "send_quiz_chat_msg" => "quiz_chat:send_msg",
    "auth" => "auth:request",
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

  def translate_in_body(message, "edit_profile") do
    put_in(message, ["d"], get_in(message, ["d", "data"]))
  end

  def translate_in_body(message, _op), do: message

  # this cast need to be instrumented with fetchId in order to be treated
  # as a cast.
  @casts_to_calls ~w(auth)

  def add_in_ref(message, op) when op in @casts_to_calls do
    Map.put(message, "fetchId", UUID.uuid4())
  end

  def add_in_ref(message, _op), do: message

  def add_version(message), do: Map.put(message, "version", ~v(0.0.1))

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
    %{message | op: "auth-good", d: %{user: message.d}}
  end

  #################################################################
  # autogenous messages

  def translate_out_body(message, "chat:send") do
    user_info =
      message.d.from
      |> Beef.Users.get_by_id()
      |> Map.take([:avatarUrl, :displayName, :username])

    chat_msg =
      message.d
      |> Map.take([:id, :isWhisper, :sentAt, :tokens])
      |> Map.merge(user_info)
      |> Map.put(:userId, message.d.from)

    %{
      message
      | d: %{
          "msg" => chat_msg,
          "userId" => message.d.from
        },
        op: "new_quiz_chat_msg"
    }
  end

  def translate_out_body(message, "chat:delete") do
    %{op: "message_deleted", d: message.d}
  end

  #################################################################
  # pure outbound messages

  def translate_out_body(message, _), do: message
end
