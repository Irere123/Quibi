defmodule Beef.Repo.Migrations.RoomsHasSchool do
  use Ecto.Migration

  def change do
    alter table(:rooms) do
      add :has_school, :boolean, default: false
      remove :schoolId
      add :schoolId, references(:schools, on_delete: :delete_all, type: :uuid), null: true
    end
  end
end
