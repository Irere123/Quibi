defmodule Broth.Routes.Quiz do
  import Plug.Conn

  alias Beef.Quizes

  use Plug.Router

  plug(Broth.Plugs.Cors)
  plug(:match)
  plug(:dispatch)

  get "/:id" do
    %Plug.Conn{params: %{"id" => id}} = conn

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(
      200,
      Jason.encode!(%{quiz: Quizes.get_quiz_by_id(id)})
    )
  end
end
