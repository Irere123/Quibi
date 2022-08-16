defmodule Broth do
  import Plug.Conn

  alias Broth.Routes.Stats
  alias Broth.Routes.DevOnly
  alias Broth.Routes.Users
  alias Broth.Routes.Quiz
  alias Broth.Routes.GoogleAuth
  alias Broth.Routes.TwitterAuth
  alias Broth.Routes.DiscordAuth

  use Plug.Router
  use Sentry.PlugCapture
  plug(Okra.Metric.PrometheusExporter)
  plug(Broth.Plugs.Cors)
  plug(:match)
  plug(:dispatch)

  options _ do
    send_resp(conn, 200, "")
  end

  forward("/auth/twitter", to: TwitterAuth)
  forward("/auth/discord", to: DiscordAuth)
  forward("/auth/google", to: GoogleAuth)
  forward("/dev", to: DevOnly)
  forward("/users", to: Users)
  forward("/quiz", to: Quiz)
  forward("/stats", to: Stats)

  get _ do
    send_resp(conn, 404, "not found")
  end

  post _ do
    send_resp(conn, 404, "not found")
  end
end
