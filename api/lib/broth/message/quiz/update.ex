defmodule Broth.Message.Quiz.Update do
  alias Beef.Schemas.Quiz

  use Broth.Message.Call,
    reply: Quiz,
    schema: Quiz

    @impl true
    def initialize(state) do
      Beef.Quizes.get_quiz_by_creator_id(state.user.id)
    end

    @impl true
  def changeset(nil, _) do
    %Ecto.Changeset{}
    # generally 404 on an auth error
    |> add_error(:id, "does not exist")
  end

  @impl true
  def changeset(initializer, data) do
    initializer
    |> cast(data, ~w(description isPrivate name autoSpeaker chatMode chatThrottle)a)
    |> validate_required([:name])
    |> validate_number(:chatThrottle, greater_than_or_equal_to: 0)
  end

  @impl true
  def execute(changeset, state) do
    # TODO: move this changeset stuff into Kousa itself.
    with {:ok, update} <- apply_action(changeset, :validate),
         {:ok, quiz} <- Kousa.Quiz.update(state.user.id, Map.from_struct(update)) do
      changes = changeset.changes

      if Map.has_key?(changes, :isPrivate) do
        # send the quiz_privacy_change message.
        Onion.QuizSession.broadcast_ws(
          quiz.id,
          %{
            op: "quiz_privacy_change",
            d: %{quizId: quiz.id, name: quiz.name, isPrivate: changes.isPrivate}
          }
        )
      end

      if Map.has_key?(changes, :chatThrottle) do
        # send the quiz_privacy_change message.
        Onion.QuizSession.broadcast_ws(
          quiz.id,
          %{
            op: "quiz_chat_throttle_change",
            d: %{quizId: quiz.id, name: quiz.name, chatThrottle: changes.chatThrottle}
          }
        )

        Onion.QuizChat.set(
          quiz.id,
          :chat_throttle,
          changes.chatThrottle
        )
      end

      if Map.has_key?(changes, :autoSpeaker) do
        Onion.QuizSession.set_auto_speaker(
          quiz.id,
          changes.autoSpeaker
        )
      end

      if Map.has_key?(changes, :chatMode) do
        # send the quiz_privacy_change message.
        Onion.QuizChat.set(
          quiz.id,
          :chat_mode,
          changes.chatMode
        )

        Onion.QuizSession.broadcast_ws(
          quiz.id,
          %{
            op: "quiz_chat_mode_changed",
            d: %{quizId: quiz.id, chatMode: changes.chatMode}
          }
        )
      end

      {:reply, quiz, state}
    end
  end
end
