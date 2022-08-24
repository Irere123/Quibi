defmodule Beef.Repo.Migrations.CurrentQuizId do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :botOwnerId, references(:users, on_delete: :delete_all, type: :uuid)
      add :currentQuizId, references(:quizes, type: :uuid, on_delete: :nilify_all)
    end
  end
end
