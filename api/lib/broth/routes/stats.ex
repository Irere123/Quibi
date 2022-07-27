defmodule Broth.Routes.Stats do
  import Plug.Conn

  use Plug.Router
  plug(Broth.Plugs.Cors)
  plug(:match)
  plug(:dispatch)

  get "/" do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Poison.encode!(%{"numActive" => "12334"}))
  end
end
