defmodule Broth do
  import Plug.Conn

  alias Broth.Routes.Stats

  use Plug.Router
  use Sentry.PlugCapture
  plug(Broth.Plugs.Cors)
  plug(:match)
  plug(:dispatch)

  options _ do
    send_resp(conn, 200, "")
  end

  forward("/stats", to: Stats)

  get _ do
    send_resp(conn, 404, "not found")
  end

  post _ do
    send_resp(conn, 404, "not found")
  end
end
