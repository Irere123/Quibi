defmodule Beef.Repo.Migrations.Timestamps do
  use Ecto.Migration

  def change do
     alter table(:rooms) do
      timestamps()
     end

     alter table(:schools) do
      timestamps()
     end

     alter table(:room_members) do
      timestamps()
     end

     alter table(:sub_rooms) do
      timestamps()
     end
  end
end
