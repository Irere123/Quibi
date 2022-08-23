defmodule Kousa do
  @moduledoc """
    Kousa Application
  """
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    children = [
      # top-level supervisor for UserSession group
      {Beef.Repo, []},
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

    opts = [strategy: :one_for_one, name: Kousa.Supervisor]

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
         {:_, Plug.Cowboy.Handler, {Broth, []}}
       ]}
    ]
  end
end
