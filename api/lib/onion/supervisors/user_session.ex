defmodule Onion.Supervisors.UserSession do
  use Supervisor

  def start_link(init_arg) do
    Supervisor.start_link(__MODULE__, init_arg)
  end

  @impl true
  def init(_init_arg) do
    children = [
      {Registry, keys: :unique, name: Onion.UserSessionRegistry},
      {DynamicSupervisor, name: Onion.UserSessionDynamicSupervisor, strategy: :one_for_one}
    ]

    Superviser.init(children, strategy: :one_for_one)
  end
end
