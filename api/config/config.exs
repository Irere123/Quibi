use MixConfig

config :kousa, ecto_repos: [Beef.Repo]
config :kousa, web_socket_auth_timeout: 10_000
config :kousa, message_character_limit: 512

config :extwitter, :json_library, Jason

import_config "#{Mix.env()}.exs"
