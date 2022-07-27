defmodule Broth do
  import Plug.Conn

  alias Broth.Routes.Stats
  alias Broth.Routes.DevOnly


  use Plug.Router
  use Sentry.PlugCapture
  plug(Okra.Metric.PrometheusExporter)
  plug(Broth.Plugs.Cors)
  plug(:match)
  plug(:dispatch)

  options _ do
    send_resp(conn, 200, "")
  end

  forward("/dev", to: DevOnly)
  forward("/stats", to: Stats)

  get _ do
    send_resp(conn, 404, "not found")
  end

  post _ do
    send_resp(conn, 404, "not found")
  end
end
