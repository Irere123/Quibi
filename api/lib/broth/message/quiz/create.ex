defmodule Broth.Message.Quiz.Create do
  use Broth.Message.Call,
    reply: __MODULE__

  @derive {Jason.Encoder, only: [:id, :creatorId, :name, :description, :isPrivate]}

  @primary_key {:id, :binary_id, []}
  schema "rooms" do
    field(:creatorId, :binary_id)
    field(:name, :string)
    field(:description, :string)
    field(:isPrivate, :boolean, default: false)
  end

  # inbound data.
  def changeset(initializer \\ %__MODULE__{}, data) do
    initializer
    |> cast(data, [
      :name,
      :description,
      :isPrivate
    ])
    |> validate_required([:name])
  end

  def execute(changeset!, state) do
    with {:ok, quiz_spec} <- apply_action(changeset!, :validation),
         {:ok, %{quiz: quiz}} <-
           Okra.Quiz.create_quiz(
             state.user.id,
             quiz_spec.name,
             quiz_spec.description,
             quiz_spec.isPrivate
           ) do
      reply = %__MODULE__{
        id: quiz.id,
        name: quiz.name,
        description: quiz.description,
        isPrivate: quiz.isPrivate
      }

      {:reply, reply, state}
    end
  end
end
