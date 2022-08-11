defmodule Okra.User do
  alias Beef.Users

  def edit_profile(user_id, data) do
    case Users.edit_profile(user_id, data) do
      {:ok, _user} ->
        :ok
      _ ->
        :ok
    end
  end
end
