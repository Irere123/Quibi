defmodule Beef.Repo.Migrations.AlterRooms2 do
  use Ecto.Migration

  def change do
    alter table(:rooms) do
      remove :isForum
    end
  end
end
