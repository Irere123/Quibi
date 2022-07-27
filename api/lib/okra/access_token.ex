defmodule Okra.AccessToken do
  use Joken.Config

  def __default_signer__,
    do: Joken.Signer.create("HS256", Application.fetch_env!(:okra, :access_token_secret))

  # 1 hour
  def token_config, do: default_claims(default_exp: 60 * 60)
end
