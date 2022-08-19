defmodule Okra.RoomChat do
  alias Beef.Repo
  alias Beef.Messages

  def send_msg(user_id, room_id, message) do
    case Messages.create(%{"creatorId" => user_id, "roomId" => room_id, "message" => message}) do
      {:ok, d} ->
        message =
          d
          |> Repo.preload(:creator)

        {:ok, message}

      {:error, d} ->
        d
    end
  end
end
