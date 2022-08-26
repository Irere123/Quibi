defmodule Beef.Repo.Migrations.QuizPermissions do
  use Ecto.Migration

  def change do
    create table(:quiz_permissions, primary_key: false) do
      add :userId, references(:users, on_delete: :delete_all, type: :uuid), null: false, primary_key: true
      add :quizId, references(:quizes, on_delete: :delete_all, type: :uuid), null: false, primary_key: true
      add :isSpeaker, :boolean, default: false
      add :isMod, :boolean, default: false
      add :askedToSpeak, :boolean, default: false

      timestamps()
    end
  end
end
