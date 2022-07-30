defmodule Beef.Repo.Migrations.AddDiscord do
  use Ecto.Migration

  def change do
    alter table(:users) do
      remove(:facebookId)
      add :discordId, :text, null: true
      add :discordAccessToken, :text, null: true
     end
  end
end
