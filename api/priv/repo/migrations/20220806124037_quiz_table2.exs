defmodule Beef.Repo.Migrations.QuizTable2 do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :currentQuizId, references(:quizes, type: :uuid, on_delete: :nilify_all)
    end


    alter table(:quizes) do
      add :description, :text, null: true
    end
  end
end
