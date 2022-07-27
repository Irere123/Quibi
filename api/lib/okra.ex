defmodule Okra do
  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Starts a worker by calling: Api.Worker.start_link(arg)
      # {Api.Worker, arg}
    ]

    opts = [strategy: :one_for_one, name: Okra.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
