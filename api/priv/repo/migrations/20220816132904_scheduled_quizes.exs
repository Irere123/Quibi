defmodule Beef.Repo.Migrations.ScheduledQuizes do
  use Ecto.Migration

  def change do
    create table(:quiz_blocks, primary_key: false) do
      add :userId, references(:users, on_delete: :delete_all, type: :uuid), null: false, primary_key: true
      add :quizId, references(:quizes, on_delete: :delete_all, type: :uuid), null: false, primary_key: true
      add :modId, references(:users, on_delete: :delete_all, type: :uuid), null: false

      add :inserted_at, :utc_datetime_usec, null: false, default: fragment("now()")
      add :updated_at, :utc_datetime_usec, null: false, default: fragment("now()")
    end

    create table(:scheduled_quizes, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :name, :text, null: false
      add :numAttending, :integer, default: 0
      add :scheduledFor, :utc_datetime_usec, null: false
      add :description, :text, null: false, default: ""

      add :creatorId, references(:users, on_delete: :delete_all, type: :uuid), null: false
      add :quizId, references(:quizes, on_delete: :nilify_all, type: :uuid), null: true

      add :inserted_at, :utc_datetime_usec, null: false, default: fragment("now()")
      add :updated_at, :utc_datetime_usec, null: false, default: fragment("now()")
    end

    create table(:attending_scheduled_quizes, primary_key: false) do
      add :userId, references(:users, on_delete: :delete_all, type: :uuid), null: false, primary_key: true
      add :scheduledQuizId, references(:scheduled_quizes, on_delete: :delete_all, type: :uuid), null: false, primary_key: true

      add :inserted_at, :utc_datetime_usec, null: false, default: fragment("now()")
      add :updated_at, :utc_datetime_usec, null: false, default: fragment("now()")
    end

    create table(:scheduled_quiz_cohosts, primary_key: false) do
      add :userId, references(:users, on_delete: :delete_all, type: :uuid), null: false, primary_key: true
      add :scheduledQuizId, references(:scheduled_quizes, on_delete: :delete_all, type: :uuid), null: false, primary_key: true

      add :inserted_at, :utc_datetime_usec, null: false, default: fragment("now()")
      add :updated_at, :utc_datetime_usec, null: false, default: fragment("now()")
    end
  end
end
