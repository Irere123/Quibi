defmodule Okra.Room do
  alias Okra.Utils.Errors
  alias Beef.Rooms

  def create_room(user_id, data) do
    # @TODO: added to friends notifications
    case Rooms.insert(Map.put(data, "creatorId", user_id)) do
      {:ok, db_room} ->
        room =
          db_room
          |> Beef.Repo.preload(:creator)
          |> Beef.Repo.preload(:school)

        {:ok, %{room: %{id: room.id, name: room.name, isForum: room.isForum}}}

      {:error, err} ->
        {:error, Errors.changeset_to_first_err_message(err)}
    end
  end
end
