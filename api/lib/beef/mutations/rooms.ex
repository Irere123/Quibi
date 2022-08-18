defmodule Beef.Mutations.Rooms do
  alias Beef.Repo
  alias Beef.Schemas.Room
  alias Beef.Schemas.RoomMember

  def insert(data) do
    room =
      %Room{}
      |> Room.insert_changeset(data)
      |> Repo.insert(returning: true)

    case room do
      {:ok, r} ->
        %RoomMember{}
        |> RoomMember.insert_changeset(%{"userId" => r.creatorId, "roomId" => r.id})
        |> Repo.insert(returning: false)

        {:ok, r}

      {:error, err} ->
        {:error, err}
    end
  end
end
