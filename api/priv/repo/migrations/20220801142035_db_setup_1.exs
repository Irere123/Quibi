defmodule Beef.Repo.Migrations.DbSetup1 do
  use Ecto.Migration

  def change do
    execute("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";", "")

    create table(:users, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :googleId, :text, null: true
      add :discordId, :text, null: true
      add :discordAccessToken, :text, null: true
      add :twitterId, :text, null: true
      add :username, :text, null: false
      add :displayName, :text, null: true
      add :email, :text, null: true
      add :bio, :text, default: ""
      add :avatarUrl, :text, null: false
      add :bannerUrl, :text, null: true
      add :tokenVersion, :integer, default: 1
      add :online, :boolean, default: false
      add :last_online, :naive_datetime
      add :hasLoggedIn, :boolean, default: false

      timestamps()
    end

    create unique_index(:users, [:username])
    create unique_index(:users, [:displayName])
    create unique_index(:users, [:twitterId])
    create unique_index(:users, [:googleId])
    create unique_index(:users, [:discordId])

    create table(:rooms, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :name, :text, null: false
      add :description, :text, null: true
      add :isPrivate, :boolean, default: true
      add :isForum, :boolean, default: false

    end

    create table(:room_members, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")

    end

    create table(:sub_rooms, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :name, :text, null: false
      add :description, :text, null: true
      add :isPrivate, :boolean, default: true

    end

    create table(:schools, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :name, :text, null: false
      add :description, :text, null: true
      add :isPrivate, :boolean, default: true
    end
  end
end
