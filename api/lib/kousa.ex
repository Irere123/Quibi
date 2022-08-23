defmodule Kousa do
  @moduledoc """
    Kousa Application
  """
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    Kousa.Metric.PrometheusExporter.setup()
    Kousa.Metric.PipelineInstrumenter.setup()
    Kousa.Metric.UserSessions.setup()

    children = [
      # top-level supervisor for UserSession group
      Onion.Supervisors.UserSession,
      Onion.Supervisors.QuizSession,
      Onion.Supervisors.Chat,
      Onion.StatsCache,
      {Beef.Repo, []},
      {Phoenix.PubSub, name: Onion.PubSub},
      Onion.Telemetry,
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
        {"/socket", Broth.SocketHandler, []},
         {:_, Plug.Cowboy.Handler, {Broth, []}}
       ]}
    ]
  end
end
