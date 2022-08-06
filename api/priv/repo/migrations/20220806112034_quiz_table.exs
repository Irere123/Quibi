defmodule Beef.Repo.Migrations.QuizTable do
  use Ecto.Migration

  def change do

    create table(:quizes, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :name, :string, null: false
      add :numPeopleInside, :integer, default: 0
      add :isPrivate, :boolean, default: true
      add(:peoplePreviewList, {:array, :map}, default: [])

      add :creatorId, references(:users, on_delete: :delete_all, type: :uuid), null: false

      timestamps()
    end

    create unique_index(:quizes, [:creatorId])

  end
end
