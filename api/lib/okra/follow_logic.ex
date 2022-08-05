defmodule Okra.Follow do
  alias Beef.Follows
  alias Beef.Users


  def get_follow_list(user_id, user_id_to_get_list_for, get_following_list, cursor) do
    if get_following_list do
      Follows.get_following(user_id, user_id_to_get_list_for, cursor)
    else
      Follows.get_followers(user_id, user_id_to_get_list_for, cursor)
    end
  end

  # probably can be refactored into a single db query
  def get_follow_list_by_username(user_id, username, get_following_list, cursor) do
    user = Users.get_by_username(username)

    case user do
      %{id: id} ->
        if get_following_list do
          Follows.get_following(user_id, id, cursor)
        else
          Follows.get_followers(user_id, id, cursor)
        end

      _ ->
        %{users: [], nextCursor: nil}
    end
  end

   # TODO: break this out into assertive "follow" and "unfollow" commands, instead of
  # ambiguous "should_follow"
  def follow(user_id, user_you_want_to_follow_id, should_follow) do
    if should_follow do
      if user_id != user_you_want_to_follow_id  do
        Follows.insert(%{userId: user_you_want_to_follow_id, followerId: user_id})
      end
    else
      Follows.delete(
        user_you_want_to_follow_id,
        user_id
      )
    end
  end

end
