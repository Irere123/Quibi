defmodule Beef.Quizes do
  @moduledoc """
  Empty context module for Quizes
  """

  # ACCESS functions
  defdelegate get_quiz_status(user_id), to: Beef.Access.Quizes
  defdelegate can_join_quiz(quiz_id, user_id), to: Beef.Access.Quizes
  defdelegate get_top_public_quizs(user_id, offset \\ 0), to: Beef.Access.Quizes
  defdelegate get_quiz_by_id(quiz_id), to: Beef.Access.Quizes
  defdelegate get_next_creator_for_quiz(quiz_id), to: Beef.Access.Quizes
  defdelegate get_a_user_for_quiz(quiz_id), to: Beef.Access.Quizes
  defdelegate get_quiz_by_creator_id(creator_id), to: Beef.Access.Quizes
  defdelegate owner?(quiz_id, user_id), to: Beef.Access.Quizes
  defdelegate search_name(start_of_name), to: Beef.Access.Quizes
  defdelegate all_quizes(), to: Beef.Access.Quizes

  # MUTATION functions
  defdelegate set_quiz_privacy_by_creator_id(user_id, isPrivate, new_name),
    to: Beef.Mutations.Quizes

  defdelegate replace_quiz_owner(user_id, new_creator_id), to: Beef.Mutations.Quizes
  defdelegate join_quiz(quiz, user_id), to: Beef.Mutations.Quizes
  defdelegate increment_quiz_people_count(quiz_id), to: Beef.Mutations.Quizes
  defdelegate increment_quiz_people_count(quiz_id, new_people_list), to: Beef.Mutations.Quizes
  defdelegate delete_quiz_by_id(quiz_id), to: Beef.Mutations.Quizes
  defdelegate decrement_quiz_people_count(quiz_id, new_people_list), to: Beef.Mutations.Quizes
  defdelegate set_quiz_owner_and_dec(quiz_id, user_id, new_people_list), to: Beef.Mutations.Quizes
  defdelegate kick_from_quiz(user_id, quiz_id), to: Beef.Mutations.Quizes
  defdelegate leave_quiz(user_id, quiz_id), to: Beef.Mutations.Quizes
  defdelegate raw_insert(data, peoplePreviewList), to: Beef.Mutations.Quizes
  defdelegate update_name(user_id, name), to: Beef.Mutations.Quizes
  defdelegate create(data), to: Beef.Mutations.Quizes
  defdelegate edit(quiz_id, data), to: Beef.Mutations.Quizes
end
