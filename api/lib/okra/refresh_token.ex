defmodule Okra.RefreshToken do
  use Joken.Config

  def __default_signer__,
    do: Joken.Signer.create("HS256", Application.fetch_env!(:okra, :refresh_token_secret))

  # 30 days
  def token_config, do: default_claims(default_exp: 60 * 60 * 24 * 30)
end
