defmodule Beef.Mutations.Rooms do
  alias Beef.Repo
  alias Beef.Schemas.Room

  def insert(data) do
    %Room{}
    |> Room.insert_changeset(data)
    |> Repo.insert(returning: true)
  end
end
