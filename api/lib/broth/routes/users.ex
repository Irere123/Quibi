defmodule Broth.Routes.Users do
  import Plug.Conn

  alias Beef.Repo
  alias Beef.Users
  alias Beef.Schemas.User

  use Plug.Router

  plug(Broth.Plugs.Cors)
  plug(:match)
  plug(:dispatch)

  get "/" do
    users = Repo.all(User)

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(%{users: users}))
  end

  get "/:username" do
    %Plug.Conn{params: %{"username" => username}} = conn

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(
      200,
      Jason.encode!(%{user: Users.get_by_username(username)})
    )
  end
end
