defmodule Okra.Utils.TokenUtils do
  alias Beef.Schemas.User

  def create_tokens(user) do
    %{
      accessToken: Okra.AccessToken.generate_and_sign!(%{"userId" => user.id}),
      refreshToken:
        Okra.RefreshToken.generate_and_sign!(%{
          "userId" => user.id,
          "tokenVersion" => user.tokenVersion
        })
    }
  end

  def tokens_to_user_id(accessToken, refreshToken) do
    accessToken = if is_nil(accessToken), do: "", else: accessToken
    refreshToken = if is_nil(refreshToken), do: "", else: refreshToken

    case Okra.AccessToken.verify_and_validate(accessToken) do
      {:ok, claims} ->
        {claims["userId"], nil}

      _ ->
        case Okra.RefreshToken.verify_and_validate(refreshToken) do
          {:ok, refreshClaims} ->
            user = User |> Beef.Repo.get(refreshClaims["userId"])

            if is_nil(user) or
                 user.tokenVersion != refreshClaims["tokenVersion"] do
              {nil, nil}
            else
              {user.id, create_tokens(user), user}
            end

          _ ->
            {nil, nil}
        end
    end
  end
end
