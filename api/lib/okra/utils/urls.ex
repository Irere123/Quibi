defmodule Okra.Utils.Urls do
  def next_site_url?(url) do
    case URI.parse(url) do
      %URI{
        host: "next.quibi.me"
      } ->
        true

      _ ->
        false
    end
  end
end
