defmodule Beef.QuizPermissions do
  import Ecto.Query

  def insert(data) do
    %Beef.Schemas.QuizPermission{}
    |> Beef.Schemas.QuizPermission.insert_changeset(data)
    |> Beef.Repo.insert(on_conflict: :nothing)
  end

  def upsert(data, set, returning \\ true) do
    %Beef.Schemas.QuizPermission{}
    |> Beef.Schemas.QuizPermission.insert_changeset(data)
    |> Beef.Repo.insert(
      on_conflict: [set: set],
      conflict_target: [:userId, :roomId],
      returning: returning
    )
  end

  def speaker?(user_id, quiz_id) do
    not is_nil(
      Beef.Repo.one(
        from(qp in Beef.Schemas.QuizPermission,
          where: qp.quizId == ^quiz_id and qp.userId == ^user_id and qp.isSpeaker == true
        )
      )
    )
  end

  def listener?(user_id, quiz_id) do
    not speaker?(user_id, quiz_id)
  end

  def mod?(user_id, quiz_id) do
    not is_nil(
      Beef.Repo.one(
        from(qp in Beef.Schemas.QuizPermission,
          where: qp.quizId == ^quiz_id and qp.userId == ^user_id and qp.isMod == true
        )
      )
    )
  end

  def asked_to_speak?(user_id, quiz_id) do
    not is_nil(
      Beef.Repo.one(
        from(qp in Beef.Schemas.QuizPermission,
          where: qp.quizId == ^quiz_id and qp.userId == ^user_id and qp.askedToSpeak == true
        )
      )
    )
  end

  def get(user_id, quiz_id) do
    from(qp in Beef.Schemas.QuizPermission,
      where: qp.userId == ^user_id and qp.quizId == ^quiz_id,
      limit: 1
    )
    |> Beef.Repo.one()
  end

  def ask_to_speak(user_id, quiz_id) do
    upsert(%{quizId: quiz_id, userId: user_id, askedToSpeak: true}, askedToSpeak: true)
  end

  def set_speaker(user_id, quiz_id, speaker?, returning \\ false) do
    upsert(
      %{quizId: quiz_id, userId: user_id, isSpeaker: speaker?},
      [isSpeaker: speaker?],
      returning
    )
  end

  def set_is_mod(user_id, quiz_id, is_mod) do
    upsert(
      %{quizId: quiz_id, userId: user_id, isMod: is_mod},
      [isMod: is_mod],
      false
    )
  end

  def make_listener(user_id, quiz_id) do
    upsert(
      %{quizId: quiz_id, userId: user_id, isSpeaker: false, askedToSpeak: false},
      [isSpeaker: false, askedToSpeak: false],
      false
    )
  end
end
