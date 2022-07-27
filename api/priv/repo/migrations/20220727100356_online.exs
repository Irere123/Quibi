defmodule Beef.Repo.Migrations.Online do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add(:last_online, :naive_datetime)
    end
  end
end
