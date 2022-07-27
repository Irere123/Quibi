defmodule Beef.Repo.Migrations.DeleteOnline do
  use Ecto.Migration

  def change do
   alter table(:users) do
    remove(:lastOnline)
   end
  end
end
