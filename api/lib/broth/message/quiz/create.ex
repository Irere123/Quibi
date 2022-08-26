defmodule Broth.Message.Quiz.Create do
  use Broth.Message.Call,
    reply: __MODULE__

  @derive {Jason.Encoder,
           only: [
             :id,
             :creatorId,
             :name,
             :description,
             :isPrivate
           ]}

  @primary_key {:id, :binary_id, []}
  schema "quizes" do
    field(:creatorId, :binary_id)
    field(:name, :string)
    field(:description, :string)
    field(:isPrivate, :boolean, default: false)
    field(:autoSpeaker, :boolean)
  end

  # inbound data.
  def changeset(initializer \\ %__MODULE__{}, data) do
    initializer
    |> cast(data, [
      :name,
      :description,
      :isPrivate,
      :autoSpeaker
    ])
    |> validate_required([:name])
  end

  def execute(changeset!, state) do
    changeset! = put_change(changeset!, :creatorId, state.user.id)

    # TODO: pass the changeset to the create_quiz and avoid the validation
    # step.
    with {:ok, quiz_spec} <- apply_action(changeset!, :validation),
         {:ok, %{quiz: quiz}} <-
           Kousa.Quiz.create_quiz(
             state.user.id,
             quiz_spec.name,
             quiz_spec.description || "",
             quiz_spec.isPrivate,
             quiz_spec.autoSpeaker
           ) do
      # case Ecto.UUID.cast(quiz_spec.scheduledQuizId) do
      #   {:ok, _} ->
      #     ScheduledQuizs.quiz_started(state.user.id, quiz_spec.scheduledQuizId, quiz.id)

      #   _ ->
      #     nil
      # end

      {:reply, %{quiz: struct(__MODULE__, Map.from_struct(quiz))}, state}
    end
  end
end
