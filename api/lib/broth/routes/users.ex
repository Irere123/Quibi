defmodule Broth.Routes.Users do
  import Plug.Conn

  alias Beef.Repo
  alias Beef.Users
  alias Beef.Schemas.User
  alias Beef.Schemas.Room

  use Plug.Router

  plug(Broth.Plugs.Cors)
  plug(:match)
  plug(:dispatch)

  # @TODO: remove this in prod
  get "/" do
    users = Repo.all(User)

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(%{users: users}))
  end

  # @TODO: remove this in prod
  get "/rooms" do
    rooms =
      Room
      |> Repo.all()

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(%{rooms: rooms}))
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
