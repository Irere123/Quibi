defmodule Beef.Repo.Migrations.Changes do
  use Ecto.Migration

  def change do

    alter table(:users) do
      add :ip, :text
      add :githubId, :text, null: true
      add :githubAccessToken, :text, null: true
    end
  end
end
