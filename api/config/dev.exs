use Mix.Config

config :logger, level: :info

database_url =
  System.get_env("DATABASE_URL") ||
    "postgres://postgres:postgres@localhost/quibi_repo"

config :okra, Beef.Repo, url: database_url

# TODO: remove system environment variables and make
# dev deployment easier

config :okra,
  web_url: System.get_env("WEB_URL") || "http://localhost:3000",
  api_url: System.get_env("API_URL") || "http://localhost:4001",
  secret_key_base:
    "213lo12j3kl21j3kl21alaksjdklasjdklajsldjsaldjlasdlaksjdklasjdklajsldjsaldjlasdlaksjdklasjdklajsldjsaldjlasdadjlasjddlkijoqwijdoqwjd12loki3jhl12jelk12jekl1221099dj120",
  env: :dev,
  access_token_secret:
    System.get_env("ACCESS_TOKEN_SECRET") ||
      raise("""
      environment variable ACCESS_TOKEN_SECRET is missing.
      type some random characters to create one
      """),
  refresh_token_secret:
    System.get_env("REFRESH_TOKEN_SECRET") ||
      raise("""
      environment variable REFRESH_TOKEN_SECRET is missing.
      type some random characters to create one
      """)

config :joken,
  access_token_secret: System.fetch_env!("ACCESS_TOKEN_SECRET"),
  refresh_token_secret: System.fetch_env!("REFRESH_TOKEN_SECRET")

config :ueberauth, Ueberauth.Strategy.Google.OAuth,
  client_id: "331770950925-kcebjolgcka56l6oali75dknrigr44q9.apps.googleusercontent.com",
  client_secret: "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"
  redirect_uri: "http://localhost:4001/auth/google/callback"

config :ueberauth, Ueberauth.Strategy.Twitter.OAuth,
  consumer_key:
    "zAzhaCUlZSmzOxLNirD63g4D0" ||
      raise("""
      environment variable TWITTER_API_KEY is missing.
      Create an oauth application on Twitter to get one
      """),
  consumer_secret:
    "6UTIrg80iQbVHXP7JUbVq84sVqye6TShn70ad11jQuVk2wTpZP" ||
      raise("""
        environment variable TWITTER_SECRET_KEY is missing.
        Create an oauth application on Twitter to get one
      """)

config :extwitter, :oauth,
  consumer_key:
    "zAzhaCUlZSmzOxLNirD63g4D0" ||
      raise("""
      environment variable TWITTER_API_KEY is missing.
      Create an oauth application on Twitter to get one
      """),
  consumer_secret:
    "6UTIrg80iQbVHXP7JUbVq84sVqye6TShn70ad11jQuVk2wTpZP" ||
      raise("""
      environment variable TWITTER_SECRET_KEY is missing.
      Create an oauth application on Twitter to get one
      """),
  access_token:
    "AAAAAAAAAAAAAAAAAAAAAD4tfQEAAAAAh8bUZXRtP4Ln2%2BVQ3RxkdwG9FQQ%3DXeiAYeJLkEBaALASCKRTpobOA3G9Ny9s7xuyXklQy8qIGzlfNY" ||
      raise("""
      environment variable TWITTER_BEARER_TOKEN is missing.
      Create an oauth application on Twitter to get one
      """),
  access_token_secret: ""
