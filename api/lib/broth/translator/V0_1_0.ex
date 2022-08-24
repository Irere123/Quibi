defmodule Broth.Translator.V0_1_0 do
  @moduledoc """
  Version 0.1.0
  """

  ############################################################################
  ## INBOUND MESSAGES

  def translate_in_body(message, _op), do: message

  ############################################################################
  ## OUTBOUND MESSAGES
  def translate_out_body(message, _), do: message

  #################################################################
  # autogenous messages
end
