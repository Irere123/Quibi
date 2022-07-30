defmodule Beef.Repo.Migrations.AddDiscord2 do
  use Ecto.Migration

  def change do
    alter table(:users) do
      modify :discordId, :text, null: true
      modify :discordAccessToken, :text, null: true
     end
  end
end
