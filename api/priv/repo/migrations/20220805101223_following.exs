defmodule Beef.Repo.Migrations.Following do
  use Ecto.Migration

  def change do
    alter table(:users)  do
      add :numFollowing, :integer, default: 0
      add :numFollowers, :integer, default: 0
      modify :inserted_at, :naive_datetime, null: false, default: fragment("now()")
      modify :updated_at, :naive_datetime, null: false, default: fragment("now()")
    end

    create table(:followers, primary_key: false) do
      add :userId, references(:users, on_delete: :delete_all, type: :uuid), null: false, primary_key: true
      add :followerId, references(:users, on_delete: :delete_all, type: :uuid), null: false, primary_key: true

      add :inserted_at, :naive_datetime, null: false, default: fragment("now()")
      add :updated_at, :naive_datetime, null: false, default: fragment("now()")
    end

    create table(:user_blocks, primary_key: false) do
      add :userId, references(:users, on_delete: :delete_all, type: :uuid), null: false, primary_key: true
      add :userIdBlocked, references(:users, on_delete: :delete_all, type: :uuid), null: false, primary_key: true

      add :inserted_at, :naive_datetime, null: false, default: fragment("now()")
      add :updated_at, :naive_datetime, null: false, default: fragment("now()")
    end
  end
end
