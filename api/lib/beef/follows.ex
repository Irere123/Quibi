defmodule Beef.Follows do
  import Ecto.Query

  @fetch_limit 21

  alias Beef.Schemas.Follow
  alias Beef.Schemas.User

  def get_followers_online(user_id) do
    from(
      f in Follow,
      inner_join: u in User,
      on: f.followerId == u.id,
      where: f.userId == ^user_id and u.online == true,
      order_by: [desc: u.last_online]
    )
    |> Beef.Repo.all()
  end

  def get_users_online(user_id) do
    from(
      u in User,
      inner_join: f in Follow,
      on: f.userId == u.id,
      left_join: f2 in Follow,
      on: f2.userId == ^user_id,
      where: f.followerId == ^user_id and u.online == true,
      order_by: [desc: u.last_online]
    )
    |> Beef.Repo.all()
  end

  def bulk_insert(follows) do
    Beef.Repo.insert_all(
      Follow,
      follows,
      on_conflict: :nothing
    )
  end

  def following_me?(user_id, user_id_to_check) do
    not is_nil(
      from(
        f in Follow,
        where: f.userId == ^user_id and f.followerId == ^user_id_to_check
      )
      |> Beef.Repo.one()
    )
  end

  # fetch all the users
  def get_my_following(user_id, offset \\ 0, limit \\ 7) do
    items =
      from(
        f in Follow,
        inner_join: u in User,
        on: f.userId == u.id,
        left_join: f2 in Follow,
        on: f2.userId == ^user_id and f2.followerId == u.id,
        where: f.followerId == ^user_id,
        select: %{
          u
          | followsYou: not is_nil(f2.userId),
            youAreFollowing: true
        },
        limit: ^limit,
        offset: ^offset,
        order_by: [desc: u.online]
      )
      |> Beef.Repo.all()

    {Enum.slice(items, 0, -1 + @fetch_limit),
     if(length(items) == @fetch_limit, do: -1 + offset + @fetch_limit, else: nil)}
  end

  def get_followers(user_id, user_id_to_get_followers_for, offset \\ 20) do
    items =
      from(
        f in Follow,
        where: f.userId == ^user_id_to_get_followers_for,
        inner_join: u in User,
        on: f.followerId == u.id,
        left_join: f2 in Follow,
        on: f2.userId == u.id and f2.followerId == ^user_id,
        select: %{u | youAreFollowing: not is_nil(f2.userId)},
        limit: ^@fetch_limit,
        offset: ^offset,
        order_by: [desc: f.inserted_at]
      )
      |> Beef.Repo.all()

    {Enum.slice(items, 0, -1 + @fetch_limit),
     if(length(items) == @fetch_limit, do: -1 + offset + @fetch_limit, else: nil)}
  end

  def get_following(user_id, user_id_to_get_following_for, offset \\ 20) do
    items =
      from(
        f in Follow,
        where: f.followerId == ^user_id_to_get_following_for,
        inner_join: u in User,
        on: f.userId == u.id,
        left_join: f2 in Follow,
        on: f2.userId == u.id and f2.followerId == ^user_id,
        select: %{u | youAreFollowing: not is_nil(f2.userId)},
        limit: ^@fetch_limit,
        offset: ^offset,
        order_by: [desc: f.inserted_at]
      )
      |> Beef.Repo.all()

    {Enum.slice(items, 0, -1 + @fetch_limit),
     if(length(items) == @fetch_limit, do: -1 + offset + @fetch_limit, else: nil)}
  end

  def delete(user_id, follower_id) do
    {rows_affected, _} =
      from(f in Follow, where: f.userId == ^user_id and f.followerId == ^follower_id)
      |> Beef.Repo.delete_all()

    if rows_affected == 1 do
      from(u in User,
        where: u.id == ^user_id,
        update: [
          inc: [
            numFollowers: -1
          ]
        ]
      )
      |> Beef.Repo.update_all([])

      from(u in User,
        where: u.id == ^follower_id,
        update: [
          inc: [
            numFollowing: -1
          ]
        ]
      )
      |> Beef.Repo.update_all([])
    end
  end

  def insert(data) do
    %Follow{}
    |> Follow.insert_changeset(data)
    |> Beef.Repo.insert()
    |> case do
      {:ok, _} ->
        # TODO: eliminate N+1 by setting up changesets
        # in an idiomatic fashion.

        from(u in User,
          where: u.id == ^data.userId,
          update: [
            inc: [
              numFollowers: 1
            ]
          ]
        )
        |> Beef.Repo.update_all([])

        from(u in User,
          where: u.id == ^data.followerId,
          update: [
            inc: [
              numFollowing: 1
            ]
          ]
        )
        |> Beef.Repo.update_all([])

      error ->
        error
    end
  end

  def get_info(me_id, other_user_id) do
    from(f in Follow,
      where:
        (f.userId == ^me_id and f.followerId == ^other_user_id) or
          (f.userId == ^other_user_id and f.followerId == ^me_id),
      limit: 2
    )
    |> Beef.Repo.all()
    |> case do
      # when both follow each other there should be two results.
      [_, _] ->
        %{followsYou: true, youAreFollowing: true}

      # when following is unidirectional, there should be one result.
      # this susses out the direction of that relationship
      [%{userId: ^me_id, followerId: ^other_user_id}] ->
        %{followsYou: true, youAreFollowing: false}

      [%{userId: ^other_user_id, followerId: ^me_id}] ->
        %{followsYou: false, youAreFollowing: true}

      # no relationship, no entries.
      [] ->
        %{followsYou: false, youAreFollowing: false}
    end
  end
end
