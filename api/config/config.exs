use Mix.Config

config :okra, ecto_repos: [Beef.Repo]
config :okra, message_character_limit: 512

config :extwitter, :json_library, Poison

import_config "#{Mix.env()}.exs"
