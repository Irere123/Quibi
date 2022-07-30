use Mix.Config

config :okra, ecto_repos: [Beef.Repo]
config :okra, websocket_auth_timeout: 10_000
config :okra, message_character_limit: 512

config :extwitter, :json_library, Poison

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Ueberauth config
config :ueberauth, Ueberauth,
  providers: [
    google: {Ueberauth.Strategy.Google, []},
    facebook: {Ueberauth.Strategy.Facebook, []},
    twitter: {Ueberauth.Strategy.Twitter, []}
  ]

import_config "#{Mix.env()}.exs"
