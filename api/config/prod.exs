use Mix.Config

config :logger, level: :info, backends: [:console, Sentry.LoggerBackend]
config :okra, env: :prod

config :sentry,
  dsn: "https://601022a68ef1466b90b31be108a5c4a2@o1366532.ingest.sentry.io/6663191",
  environment_name: :prod,
  enable_source_code_context: true,
  root_source_code_path: File.cwd!(),
  tags: %{
    env: "production"
  },
  included_environments: [:prod]
