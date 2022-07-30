defmodule Beef.Users do
  @moduledoc """
  Context module for Users.  This module acts as a "gateway" module defining
  the "boundary" for Users database access.  Consider Beef.Users.* modules
  to be "private modules".  If in the future we would like to enforce these
  boundary conditions at compile time, consider using Sasa Juric's Boundary
  library:

  https://hex.pm/packages/boundary

  NB (5 Mar 2021): these functions are probably going to get streamlined =D
  """

  # ACCESS Functions
  defdelegate get_by_username(username), to: Beef.Access.Users
  defdelegate get_by_id(user_id), to: Beef.Access.Users
  defdelegate get(user_id), to: Beef.Access.Users

  # MUTATIONS
  defdelegate delete(user_id), to: Beef.Mutations.Users
  defdelegate bulk_insert(users), to: Beef.Mutations.Users
  defdelegate set_offline(user_id), to: Beef.Mutations.Users
  defdelegate set_online(user_id), to: Beef.Mutations.Users

  # Authentications stuff
  defdelegate google_find_or_create(user), to: Beef.Mutations.Users
  defdelegate twitter_find_or_create(user), to: Beef.Mutations.Users
  defdelegate discord_find_or_create(user, discord_access_token), to: Beef.Mutations.Users
end
