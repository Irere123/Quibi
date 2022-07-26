defmodule Api.MixProject do
  use Mix.Project

  def project do
    [
      app: :api,
      version: "0.1.0",
      elixir: "~> 1.12",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger],
      mod: {Api.Application, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:plug_cowboy, "~> 2.5.2"},
      {:poison, "~> 5.0"},
      {:phoenix_pubsub, "~> 2.1.1"},
      {:ecto_sql, "~> 3.8.3"},
      {:ecto_enum, "~> 1.4"},
      {:jason, "~> 1.3"},
      {:joken, "~> 2.5"},
      {:elixir_uuid, "~> 1.2.1"},
      {:net_address, "~> 0.3"},
      # TODO: switch off of httpoison to, e.g. Mojito or Finch
      {:httpoison, "~> 1.8"},
      {:finch, "~> 0.12"},
      {:sentry, "~> 8.0.6"},
      {:postgrex, ">= 0.16.3"},
      {:remix, "~> 0.0.2", only: :dev},
      {:ueberauth, "~> 0.7"},
      {:oauther, "~> 1.3"},
      {:extwitter, "~> 0.13.0"},
      {:ueberauth_twitter, "~> 0.4.1"},
      {:ueberauth_google, "~> 0.10.1"},
      {:ueberauth_facebook, "~> 0.10.0"},
      {:prometheus_ex, "~> 3.0"},
      {:prometheus_plugs, "~> 1.1"},
      {:timex, "~> 3.7"},
      # style ENFORCEMENT
      {:credo, "~> 1.6"},
    ]
  end
end
