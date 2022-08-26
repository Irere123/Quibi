defmodule Kousa.Utils.Urls do
  def is_beta_site_url(url) do
    case URI.parse(url) do
      %URI{
        host: "beta.quibi.me"
      } ->
        true

      _ ->
        false
    end
  end
end
