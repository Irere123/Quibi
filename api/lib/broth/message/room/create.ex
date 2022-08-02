defmodule Broth.Message.Room.Create do
  use Broth.Message.Call,
    reply: __MODULE__

  @derive {Jason.Encoder, only: [:id, :name, :isPrivate, :isForum]}

  @primary_key {:id, :binary_id, []}
  schema "rooms" do
    field(:name, :string)
    field(:isPrivate, :boolean, default: false)
    field(:isForum, :boolean, default: false)
  end

  # inbound data.
  def changeset(initializer \\ %__MODULE__{}, data) do
    initializer
    |> cast(data, [
      :name,
      :isPrivate,
      :isForum
    ])
    |> validate_required([:name])
  end

  def execute(changeset!, state) do
    with {:ok, room_spec} <- apply_action(changeset!, :validation),
         {:ok, %{room: room}} <-
           Okra.Room.create_room(state.user.id, %{
             "name" => room_spec.name,
             "isForum" => room_spec.isForum,
             "isPrivate" => room_spec.isPrivate
           }) do
      reply = %__MODULE__{
        id: room.id,
        name: room.name,
        isForum: room.isForum
      }

      {:reply, reply, state}
    end
  end
end
