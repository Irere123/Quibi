defmodule Broth.Translator do
  import Kousa.Utils.Version
  alias Broth.Translator.V0_1_0
  require V0_1_0

  # V0_1_0 abstraction layer here
  def translate_inbound(message), do: message
  def translate_outbound(message, _), do: message
end
