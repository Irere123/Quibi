defmodule Okra do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    children = [
      {Beef.Repo, []},
      {Phoenix.PubSub, name: Onion.PubSub},
      Plug.Cowboy.child_spec(
        scheme: :http,
        plug: Broth,
        options: [
          port: String.to_integer(System.get_env("PORT") || "4001"),
          dispatch: dispatch(),
          protocol_options: [idle_timeout: :infinity]
        ]
      )
    ]

    opts = [strategy: :one_for_one, name: Okra.Supervisor]

    # TODO: make these into tasks

    case Supervisor.start_link(children, opts) do
      {:ok, pid} ->
        {:ok, pid}

      error ->
        error
    end
  end

  defp dispatch do
    [
      {:_,
       [
         {"/socket", Broth.SocketHandler, []},
         {:_, Plug.Cowboy.Handler, {Broth, []}}
       ]}
    ]
  end
end
