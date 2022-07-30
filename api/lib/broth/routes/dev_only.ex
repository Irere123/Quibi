defmodule Broth.Routes.DevOnly do
  import Plug.Conn

  alias Beef.Schemas.User

  use Plug.Router

  plug(:match)
  plug(:dispatch)

  get "/test-info" do
    env = Application.fetch_env!(:okra, :env)
    staging? = Application.get_env(:okra, :staging?)

    if env == :dev || staging? do
      username = fetch_query_params(conn).query_params["username"]
      user = Beef.Users.get_by_username(username)

      conn
      |> put_resp_content_type("application/json")
      |> send_resp(
        200,
        Poison.encode!(
          Okra.Utils.TokenUtils.create_tokens(
            if(is_nil(user),
              do:
                Beef.Repo.insert!(
                  %User{
                    username: username,
                    email: username <> "@test.com",
                    googleId: "id:" <> username,
                    avatarUrl: "https://placekitten.com/200/200",
                    bannerUrl: "https://picsum.photos/100/300",
                    displayName: Okra.Utils.Random.big_ascii_id(),
                    bio:
                      "This is some interesting info about the ex-founder of nothing, welcome to the bio of such a cool person !"
                  },
                  returning: true
                ),
              else: user
            )
          )
        )
      )
    else
      conn
      |> put_resp_content_type("application/json")
      |> send_resp(400, Poison.encode!(%{"error" => "no"}))
    end
  end
end
