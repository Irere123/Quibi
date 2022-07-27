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

  defdelegate get_by_username(username), to: Beef.Access.Users

end