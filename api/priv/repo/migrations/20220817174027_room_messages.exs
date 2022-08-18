defmodule Beef.Repo.Migrations.RoomMessages do
  use Ecto.Migration

  def change do
    create table(:messages, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :message, :text, null: true
      add :creatorId, references(:users, on_delete: :nilify_all, type: :uuid), null: false
      add :roomId, references(:rooms, on_delete: :delete_all, type: :uuid), null: false

      add :inserted_at, :naive_datetime, null: false, default: fragment("now()")
      add :updated_at, :naive_datetime, null: false, default: fragment("now()")
    end
  end
end
