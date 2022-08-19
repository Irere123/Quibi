defmodule Beef.Messages do
  import Ecto.Query

  # alias Beef.Users
  alias Beef.Repo
  alias Beef.Schemas.Message

  def create(data) do
    %Message{}
    |> Message.insert_changeset(data)
    |> Repo.insert(returning: true)
  end

  def get_messages(room_id) do
    messages =
      from(m in Message,
        where: m.roomId == ^room_id,
        inner_join: u in assoc(m, :creator),
        preload: [
          creator: u
        ]
      )
      |> Repo.all()

    messages
  end
end
