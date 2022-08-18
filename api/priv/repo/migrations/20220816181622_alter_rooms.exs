defmodule Beef.Repo.Migrations.AlterRooms do
  use Ecto.Migration

  def change do
     alter table(:rooms) do
       remove :has_school
       remove :description
     end

     alter table(:sub_rooms) do
       remove :description
     end
  end
end
