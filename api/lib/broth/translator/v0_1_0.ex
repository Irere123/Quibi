defmodule Broth.Translator.V0_1_0 do
  import Okra.Utils.Version

  ############################################################################
  ## INBOUND MESSAGES

  @operator_translations %{
    "auth" => "auth:request",
    "get_user_profile" => "user:get_info"
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

  def translate_in_body(message, "get_user_profile") do
    put_in(message, ["d", "userIdOrUsername"], get_in(message, ["d", "userId"]))
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
    %{message | op: "auth-good", d: %{user: message.d}}
  end

  #################################################################
  # pure outbound messages

  def translate_out_body(message, _), do: message
end
