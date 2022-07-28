defmodule Broth.Routes.GoogleAuth do
  import Plug.Conn
  use Plug.Router

  alias Beef.Users

  plug(:match)
  plug(:dispatch)

  get "/web" do
    state =
      if Application.get_env(:okra, :staging?) do
        %{
          redirect_base_url: fetch_query_params(conn).query_params["redirect_after_base"]
        }
        |> Poison.encode!()
        |> Base.encode64()
      else
        "web"
      end

    %{conn | params: Map.put(conn.params, "state", state)}
    |> Plug.Conn.put_private(:ueberauth_request_options, %{
      callback_url: Application.get_env(:okra, :api_url) <> "/auth/google/callback",
      options: [
        default_scope: "profile email"
      ]
    })
    |> Ueberauth.Strategy.Google.handle_request!()
  end

  get "/callback" do
    conn
    |> fetch_query_params()
    |> Plug.Conn.put_private(:ueberauth_request_options, %{
      callback_url: Application.get_env(:okra, :api_url) <> "/auth/google/callback",
      options: []
    })
    |> Ueberauth.Strategy.Google.handle_callback!()
    |> handle_callback()
  end

  def get_base_url(conn) do
    with true <- Application.get_env(:okra, :staging?),
         state <- Map.get(conn.query_params, "state", ""),
         {:ok, json} <- Base.decode64(state),
         {:ok, %{"redirect_base_url" => redirect_base_url}} when is_binary(redirect_base_url) <-
           Jason.decode(json) do
      redirect_base_url
    else
      _ ->
        Application.fetch_env!(:okra, :web_url)
    end
  end

  def handle_callback(
        %Plug.Conn{assigns: %{ueberauth_failure: %{errors: [%{message_key: "missing_code"}]}}} =
          conn
      ) do
    conn
    |> Broth.Plugs.Redirect.redirect(
      get_base_url(conn) <>
        "/?error=" <>
        URI.encode("try again")
    )
  end

  def handle_callback(%Plug.Conn{assigns: %{ueberauth_failure: failure}} = conn) do
    IO.puts("Google oauth failure")
    IO.inspect(failure)

    conn
    |> Broth.Plugs.Redirect.redirect(
      get_base_url(conn) <>
        "/?error=" <>
        URI.encode(
          "something went wrong, try again and if the error persists, tell ben to check the server logs"
        )
    )
  end

  def handle_callback(
        %Plug.Conn{private: %{google_user: user}} =
          conn
      ) do
    try do
      {_, db_user} = Users.google_find_or_create(user)

      conn
      |> Broth.Plugs.Redirect.redirect(
        get_base_url(conn) <>
          "/?accessToken=" <>
          Okra.AccessToken.generate_and_sign!(%{"userId" => db_user.id}) <>
          "&refreshToken=" <>
          Okra.RefreshToken.generate_and_sign!(%{
            "userId" => db_user.id,
            "tokenVersion" => db_user.tokenVersion
          })
      )
    rescue
      e in RuntimeError ->
        conn
        |> Broth.Plugs.Redirect.redirect(
          get_base_url(conn) <>
            "/?error=" <>
            URI.encode(e.message)
        )
    end
  end
end
