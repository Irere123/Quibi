defmodule Onion.Chat do
  use GenServer, restart: :temporary

  alias Onion.PubSub
end
