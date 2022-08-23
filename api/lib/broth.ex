defmodule Broth do
  import Plug.Conn

  alias Broth.Routes.DevOnly
  alias Broth.Routes.Stats
  alias Broth.Routes.User
  use Plug.Router

  if Mix.env() == :test do
    plug(:set_callers)

    defp get_callers(%Plug.Conn{req_headers: req_headers}) do
      {_, request_bin} = Enum.find(req_headers, fn {key, _} -> key == "user-agent" end)

      List.wrap(
        if is_binary(request_bin) do
          request_bin
          |> Base.decode16!()
          |> :erlang.binary_to_term()
        end
      )
    end

    defp set_callers(conn, _params) do
      Process.put(:"$callers", get_callers(conn))
      conn
    end
  end

  use Sentry.PlugCapture
  plug(Kousa.Metric.PrometheusExporter)
  plug(Broth.Plugs.Cors)
  plug(:match)
  plug(:dispatch)

  forward("/dev", to: DevOnly)
  forward("/stats", to: Stats)
  forward("/user", to: User)

  options _ do
    send_resp(conn, 200, "")
  end

  get _ do
    send_resp(conn, 404, "not found")
  end

  post _ do
    send_resp(conn, 404, "not found")
  end
end
