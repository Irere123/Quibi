defmodule Beef.Repo do
  use Ecto.Repo,
    otp_app: :okra,
    adapter: Ecto.Adapters.Postgres
end
