defmodule Beef.Repo.Migrations.Changes do
  use Ecto.Migration

  def change do
    alter table(:quizes) do
      add :autoSpeaker, :boolean, default: false
      add :chatMode, :string, default: "default"
      add :chatThrottle, :int, default: 1000
    end

    alter table(:users) do
      add :ip, :text
    end
  end
end
