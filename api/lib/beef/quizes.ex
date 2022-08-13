defmodule Beef.Quizes do
  @moduledoc """
  Context module for Rooms.  This module acts as a "gateway" module defining
  the "boundary" for Rooms database access.  Consider Beef.Rooms.* modules
  to be "private modules".
  """

  # ACCESS
  defdelegate search_name(start_of_name), to: Beef.Access.Quizes
  defdelegate get_quiz_by_id(quiz_id), to: Beef.Access.Quizes
  defdelegate can_join_quiz(quiz_id, user_id), to: Beef.Access.Quizes
  defdelegate get_top_public_quizes(user_id, offset \\ 0), to: Beef.Access.Quizes
  defdelegate all_quizes(), to: Beef.Access.Quizes

  # MUTATIONS
  defdelegate create(data), to: Beef.Mutations.Quizes
  defdelegate join_quiz(quiz, user_id), to: Beef.Mutations.Quizes
  defdelegate leave_quiz(user_id, quiz_id), to: Beef.Mutations.Quizes
end
