defmodule Beef.Repo.Migrations.RoomsRelations do
  use Ecto.Migration

  def change do
    alter table(:rooms) do
      add :creatorId, references(:users, on_delete: :delete_all, type: :uuid), null: false
      add :schoolId, references(:schools, on_delete: :delete_all, type: :uuid), null: false
    end

    alter table(:sub_rooms) do
      add :creatorId, references(:users, on_delete: :delete_all, type: :uuid), null: false
      add :roomId, references(:rooms, on_delete: :delete_all, type: :uuid), null: false
    end

    alter table(:schools) do
      add :creatorId, references(:users, on_delete: :delete_all, type: :uuid), null: false
    end

    alter table(:room_members) do
      add :userId, references(:users, on_delete: :delete_all, type: :uuid), null: false
      add :roomId, references(:rooms, on_delete: :delete_all, type: :uuid), null: false
    end
  end
end
