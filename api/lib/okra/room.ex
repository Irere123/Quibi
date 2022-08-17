defmodule Okra.Room do
  alias Okra.Utils.Errors
  alias Beef.Rooms

  def get_my_rooms(user_id) do
    Rooms.get_my_rooms(user_id)
  end

  def create_room(user_id, room_name, is_private) do
    # @TODO: added to friends notifications
    case Rooms.insert(%{"name" => room_name, "isPrivate" => is_private, "creatorId" => user_id}) do
      {:ok, db_room} ->
        room =
          db_room
          |> Beef.Repo.preload(:creator)
          |> Beef.Repo.preload(:school)

        {:ok, %{room: room}}

      {:error, err} ->
        {:error, Errors.changeset_to_first_err_message(err)}
    end
  end
end
