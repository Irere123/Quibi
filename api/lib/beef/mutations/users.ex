defmodule Beef.Mutations.Users do
  import Ecto.Query, warn: false

  alias Beef.Repo
  alias Beef.Schemas.User
  alias Beef.Queries.Users, as: Query

  def delete(user_id) do
    %User{id: user_id} |> Repo.delete()
  end

  def edit_profile(user_id, data) do
    user_id
    |> Beef.Users.get_by_id()
    |> User.edit_changeset(data)
    |> Repo.update()
  end

  def bulk_insert(users) do
    Repo.insert_all(
      User,
      users,
      on_conflict: :nothing
    )
  end

  def set_online(user_id) do
    Query.start()
    |> Query.filter_by_id(user_id)
    |> Query.update_set_online_true()
    |> Repo.update_all([])
  end

  def set_offline(user_id) do
    Query.start()
    |> Query.filter_by_id(user_id)
    |> Query.update_set_online_false()
    |> Query.update_set_last_online_to_now()
    |> Repo.update_all([])
  end

  def google_find_or_create(user) do
    googleId = user["sub"]

    db_user =
      from(u in User, where: u.googleId == ^googleId, limit: 1)
      |> Repo.one()

    if db_user do
      if is_nil(db_user.googleId) do
        from(u in User,
          where: u.id == ^db_user.id,
          update: [
            set: [
              googleId: ^googleId
            ]
          ]
        )
        |> Repo.update_all([])
      end

      {:find, db_user}
    else
      {:create,
       Repo.insert!(
         %User{
           username: Okra.Utils.Random.big_ascii_id(),
           email: if(user["email"] == "", do: nil, else: user["email"]),
           googleId: googleId,
           avatarUrl: user["picture"],
           bannerUrl: user["picture"],
           displayName:
             if(is_nil(user["name"]) or String.trim(user["name"]) == "",
               do: "Novice",
               else: user["name"]
             ),
           bio: user["bio"],
           hasLoggedIn: true
         },
         returning: true
       )}
    end
  end

  def twitter_find_or_create(user) do
    db_user =
      from(u in User,
        where: u.twitterId == ^user.twitterId,
        limit: 1
      )
      |> Repo.one()

    if db_user do
      if is_nil(db_user.twitterId) do
        from(u in User,
          where: u.id == ^db_user.id,
          update: [
            set: [
              displayName: ^user.displayName,
              twitterId: ^user.twitterId
            ]
          ]
        )
        |> Repo.update_all([])
      end

      {:find, db_user}
    else
      {:create,
       Repo.insert!(
         %User{
           username: user.username,
           email: if(user.email == "", do: nil, else: user.email),
           twitterId: user.twitterId,
           avatarUrl: user.avatarUrl,
           bannerUrl: user.bannerUrl,
           displayName:
             if(is_nil(user.displayName) or String.trim(user.displayName) == "",
               do: "Novice",
               else: user.displayName
             ),
           bio: user.bio,
           hasLoggedIn: true
         },
         returning: true
       )}
    end
  end

  def discord_find_or_create(user, discord_access_token) do
    discordId = user["id"]

    db_user =
      from(u in User,
        where: u.discordId == ^discordId,
        limit: 1
      )
      |> Repo.one()

    if db_user do
      if is_nil(db_user.discordId) do
        from(u in User,
          where: u.id == ^db_user.id,
          update: [
            set: [
              discordId: ^discordId,
              discordAccessToken: ^discord_access_token
            ]
          ]
        )
        |> Repo.update_all([])
      end

      {:find, db_user}
    else
      {:create,
       Repo.insert!(
         %User{
           username: user["username"],
           discordId: discordId,
           email: if(user["email"] == "", do: nil, else: user["email"]),
           discordAccessToken: discord_access_token,
           avatarUrl: Okra.Discord.get_avatar_url(user),
           displayName: Okra.Utils.Random.big_ascii_id(),
           hasLoggedIn: true
         },
         returning: true
       )}
    end
  end
end
