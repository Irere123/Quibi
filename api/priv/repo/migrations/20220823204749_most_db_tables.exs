defmodule Beef.Repo.Migrations.MostDbTables do
  use Ecto.Migration

  def change do
    execute("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";", "")

    create table(:users, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :githubId, :text, null: true
      add :twitterId, :text, null: true
      add :username, :text, null: false
      add :displayName, :text, default: ""
      add :bio, :text, default: ""
      add :ip, :text
      add :apiKey, :uuid
      add :email, :text, null: true
      add :avatarUrl, :text, null: false
      add :bannerUrl, :text
      add :tokenVersion, :integer, default: 1
      add :numFollowing, :integer, default: 0
      add :numFollowers, :integer, default: 0
      add :online, :boolean, default: false
      add :lastOnline, :naive_datetime
      add :githubAccessToken, :text
      add :discordId, :string, null: true, default: nil
      add :discordAccessToken, :string, null: true, default: nil
      add :reasonForBan, :text

      add :inserted_at, :utc_datetime_usec, null: false, default: fragment("now()")
      add :updated_at, :utc_datetime_usec, null: false, default: fragment("now()")
    end

    create unique_index(:users, [:githubId])
    create unique_index(:users, [:twitterId])
    # case insensitive username and displayName
    execute("create unique index users_username_index on users(lower(username));", "")

    create table(:quizes, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :name, :string, null: false
      add :numPeopleInside, :integer, default: 0
      add :autoSpeaker, :boolean, default: false
      add :chatMode, :string, default: "default"
      add :chatThrottle, :int, default: 1000
      add :isPrivate, :boolean, default: true
      add(:peoplePreviewList, {:array, :map}, default: [])

      add :creatorId, references(:users, on_delete: :delete_all, type: :uuid), null: false

      timestamps()
    end


    create unique_index(:quizes, [:creatorId])

    create table(:followers, primary_key: false) do
      add :userId, references(:users, on_delete: :delete_all, type: :uuid), null: false, primary_key: true
      add :followerId, references(:users, on_delete: :delete_all, type: :uuid), null: false, primary_key: true

      add :inserted_at, :utc_datetime_usec, null: false, default: fragment("now()")
      add :updated_at, :utc_datetime_usec, null: false, default: fragment("now()")
    end

    create table(:quiz_blocks, primary_key: false) do
      add :userId, references(:users, on_delete: :delete_all, type: :uuid), null: false, primary_key: true
      add :quizId, references(:quizes, on_delete: :delete_all, type: :uuid), null: false, primary_key: true
      add :modId, references(:users, on_delete: :delete_all, type: :uuid), null: false

      add :inserted_at, :utc_datetime_usec, null: false, default: fragment("now()")
      add :updated_at, :utc_datetime_usec, null: false, default: fragment("now()")
    end

    create table(:user_blocks, primary_key: false) do
      add :userId, references(:users, on_delete: :delete_all, type: :uuid), null: false, primary_key: true
      add :userIdBlocked, references(:users, on_delete: :delete_all, type: :uuid), null: false, primary_key: true

      add :inserted_at, :utc_datetime_usec, null: false, default: fragment("now()")
      add :updated_at, :utc_datetime_usec, null: false, default: fragment("now()")
    end

    create table(:scheduled_quizes, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :name, :text, null: false
      add :numAttending, :integer, default: 0
      add :scheduledFor, :utc_datetime_usec, null: false
      add :description, :text, null: false, default: ""

      add :creatorId, references(:users, on_delete: :delete_all, type: :uuid), null: false
      add :quizId, references(:quizes, on_delete: :nilify_all, type: :uuid), null: true

      add :inserted_at, :utc_datetime_usec, null: false, default: fragment("now()")
      add :updated_at, :utc_datetime_usec, null: false, default: fragment("now()")
    end

    create table(:attending_scheduled_quizes, primary_key: false) do
      add :userId, references(:users, on_delete: :delete_all, type: :uuid), null: false, primary_key: true
      add :scheduledQuizId, references(:scheduled_quizes, on_delete: :delete_all, type: :uuid), null: false, primary_key: true

      add :inserted_at, :utc_datetime_usec, null: false, default: fragment("now()")
      add :updated_at, :utc_datetime_usec, null: false, default: fragment("now()")
    end

    create table(:scheduled_quiz_cohosts, primary_key: false) do
      add :userId, references(:users, on_delete: :delete_all, type: :uuid), null: false, primary_key: true
      add :scheduledQuizId, references(:scheduled_quizes, on_delete: :delete_all, type: :uuid), null: false, primary_key: true

      add :inserted_at, :utc_datetime_usec, null: false, default: fragment("now()")
      add :updated_at, :utc_datetime_usec, null: false, default: fragment("now()")
    end

  end
end
