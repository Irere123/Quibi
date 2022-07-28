defmodule Okra.AccessToken do
  def __default_signer__ do
    Joken.Signer.create("HS256", Application.fetch_env!(:okra, :access_token_secret))
  end

  use Joken.Config

  # 1hour
  def token_config, do: default_claims(default_exp: 60 * 60)
end
