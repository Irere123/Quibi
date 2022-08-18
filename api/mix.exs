defmodule Okra.MixProject do
  use Mix.Project

  def project do
    [
      app: :okra,
      version: "0.1.0",
      elixir: "~> 1.12",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      elixirc_paths: elixirc_paths(Mix.env()),
      aliases: aliases()
    ]
  end

  def application do
    dev_only_apps = List.wrap(if Mix.env() == :dev, do: :remix)

    [
      extra_applications:
        [:ueberauth_google, :logger, :ueberauth_facebook, :prometheus_ex] ++ dev_only_apps,
      mod: {Okra, []}
    ]
  end

  defp deps do
    [
      {:poison, "~> 5.0"},
      {:plug_cowboy, "~> 2.5.2"},
      {:phoenix_pubsub, "~> 2.1.1"},
      {:ecto_sql, "~> 3.8.3"},
      {:ecto_enum, "~> 1.4"},
      {:jason, "~> 1.3"},
      {:joken, "~> 2.0"},
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
      {:ueberauth_discord, "~> 0.6"},
      {:prometheus_ex, "~> 3.0"},
      {:prometheus_plugs, "~> 1.1"},
      {:timex, "~> 3.7"},
      # style ENFORCEMENT
      {:credo, "~> 1.6"},
      # test helpers
      {:faker, "~> 0.16.0", only: :test},
      {:excoveralls, "~> 0.10", only: :test},
      {:websockex, "~> 0.4.3", only: :test}
    ]
  end

  defp elixirc_paths(:test), do: ["lib", "test/_support"]
  defp elixirc_paths(_), do: ["lib"]

  defp aliases do
    [
      "ecto.setup": ["ecto.create", "ecto.migrate"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      test: ["ecto.create --quiet", "ecto.migrate", "test"]
    ]
  end
end
