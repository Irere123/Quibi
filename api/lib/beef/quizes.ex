defmodule Beef.Quizes do
  @moduledoc """
  Empty context module for Quizes
  """

  # ACCESS functions
  defdelegate search_name(start_of_name), to: Beef.Access.Quizes
  defdelegate all_quizes(), to: Beef.Access.Quizes

end
