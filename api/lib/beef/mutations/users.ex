defmodule Beef.Mutations.Users do
  import Ecto.Query, warn: false

  alias Beef.Repo
  alias Beef.Schemas.User
  # alias Beef.Queries.Users, as: Query

  def google_find_or_create(user) do
    googleId = Integer.to_string(user["id"])

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
           email: if(user.email == "", do: nil, else: user.email),
           googleId: googleId,
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
           username: Okra.Utils.Random.big_ascii_id(),
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

end
