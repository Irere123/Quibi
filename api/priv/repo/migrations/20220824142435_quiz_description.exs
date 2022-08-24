defmodule Beef.Repo.Migrations.QuizDescription do
  use Ecto.Migration

  def change do
    alter table(:quizes) do
      add :description, :text, default: "", null: false
    end
  end
end
