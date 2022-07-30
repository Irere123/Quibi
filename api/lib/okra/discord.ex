defmodule Okra.Discord do
  def get_avatar_url(user) do
    if not is_nil(user["avatar"]),
      do: "https://cdn.discordapp.com/avatars/" <> user["id"] <> "/" <> user["avatar"] <> ".png",
      else: "https://picsum.photos/seed/picsum/200/200"
  end
end
