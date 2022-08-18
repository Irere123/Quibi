defmodule Beef.Rooms do
  @moduledoc """
  Context module for Rooms.  This module acts as a "gateway" module defining
  the "boundary" for Rooms database access.  Consider Beef.Rooms.* modules
  to be "private modules".
  """

  # ACCESS
  defdelegate get_my_rooms(user_id), to: Beef.Access.Rooms
  defdelegate get_room_by_id(room_id), to: Beef.Access.Rooms

  # MUTATIONS
  defdelegate insert(data), to: Beef.Mutations.Rooms
end
