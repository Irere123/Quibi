defmodule Beef.Mutations.Users do
  import Ecto.Query, warn: false

  alias Beef.Repo
  alias Beef.Schemas.User
  alias Beef.Queries.Users, as: Query

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
           username: Kousa.Utils.Random.big_ascii_id(),
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
end
