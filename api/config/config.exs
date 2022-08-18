use Mix.Config

config :okra, ecto_repos: [Beef.Repo]
config :okra, websocket_auth_timeout: 10_000
config :okra, message_character_limit: 1000
config :okra, max_quiz_size: 512

config :extwitter, :json_library, Poison

import_config "#{Mix.env()}.exs"
