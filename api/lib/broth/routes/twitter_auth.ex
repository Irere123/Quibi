defmodule Broth.Routes.TwitterAuth do
  import Plug.Conn
  use Plug.Router

  require Logger
  alias Beef.Users
  alias Okra.Utils.Urls
  alias Broth.Plugs.Redirect

  plug(:put_secret_key_base)

  plug(Plug.Session,
    store: :cookie,
    key: "_quibi_session",
    signing_salt: "YaQoOWg5"
  )

  plug(:match)
  plug(:dispatch)

  def put_secret_key_base(conn, _) do
    put_in(conn.secret_key_base, Application.get_env(:okra, :secret_key_base))
  end

  get "/web" do
    token =
      ExTwitter.request_token(
        Application.get_env(:okra, :api_url) <>
          "/auth/twitter/callback"
      )

    {:ok, authenticate_url} = ExTwitter.authenticate_url(token.oauth_token)

    conn
    |> fetch_session()
    |> put_session(
      :redirect_to_next,
      Enum.any?(conn.req_headers, fn {k, v} ->
        k == "referer" and Urls.next_site_url?(v)
      end)
    )
    |> Redirect.redirect(authenticate_url)
  end

  get "/callback" do
    conn_with_qp =
      conn
      |> fetch_query_params
      |> fetch_session()

    base_url = get_base_url(conn_with_qp)

    with %{"oauth_token" => oauth_token, "oauth_verifier" => oauth_verifier} <-
           conn_with_qp.query_params,
         {:ok, access_token} <- ExTwitter.access_token(oauth_verifier, oauth_token),
         _ <-
           ExTwitter.configure(
             consumer_key: System.get_env("TWITTER_API_KEY"),
             consumer_secret: System.get_env("TWITTER_SECRET_KEY"),
             access_token: access_token.oauth_token,
             access_token_secret: access_token.oauth_token_secret
           ),
         %ExTwitter.Model.User{
           screen_name: username,
           description: bio,
           name: displayName,
           id_str: twitterId,
           raw_data: %{email: email},
           profile_image_url_https: avatarUrl,
           profile_banner_url: bannerUrl
         } <- ExTwitter.verify_credentials(include_email: true),
         {_, db_user} <-
           Users.twitter_find_or_create(%{
             username: username,
             bio: bio,
             displayName: displayName,
             twitterId: twitterId,
             bannerUrl: bannerUrl,
             email: email,
             avatarUrl: avatarUrl
           }) do
      conn
      |> Redirect.redirect(
        base_url <>
          "/?accessToken=" <>
          Okra.AccessToken.generate_and_sign!(%{"userId" => db_user.id}) <>
          "&refreshToken=" <>
          Okra.RefreshToken.generate_and_sign!(%{
            "userId" => db_user.id,
            "tokenVersion" => db_user.tokenVersion
          })
      )
    end
  end

  def get_base_url(conn) do
    case conn |> get_session(:redirect_to_next) do
      true ->
        "https://next.dogehouse.tv"

      _ ->
        Application.fetch_env!(:okra, :web_url)
    end
  end
end
