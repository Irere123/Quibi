defmodule Kousa.Utils.Urls do
  def beta_site_url?(url) do
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
