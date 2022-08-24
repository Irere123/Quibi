defmodule Beef.Mutations.Users do
  import Ecto.Query, warn: false

  alias Beef.Repo
  alias Beef.Queries.Users, as: Query
  alias Beef.Schemas.User
  alias Beef.QuizPermissions

  def edit_profile(user_id, data) do
    # TODO: make this not perform a db query
    user_id
    |> Beef.Users.get_by_id()
    |> User.edit_changeset(data)
    |> Repo.update()
  end

  def delete(user_id) do
    %User{id: user_id} |> Repo.delete()
  end

  def bulk_insert(users) do
    Repo.insert_all(
      User,
      users,
      on_conflict: :nothing
    )
  end

  def inc_num_following(user_id, n) do
    Query.start()
    |> Query.filter_by_id(user_id)
    |> Query.inc_num_following_by_n(n)
    |> Repo.update_all([])
  end

  def set_reason_for_ban(user_id, reason_for_ban) do
    Query.start()
    |> Query.filter_by_id(user_id)
    |> Query.update_reason_for_ban(reason_for_ban)
    |> Repo.update_all([])
  end

  def set_ip(user_id, ip) do
    Query.start()
    |> Query.filter_by_id(user_id)
    |> Query.update_set_ip(ip)
    |> Repo.update_all([])
  end

  def set_user_left_current_quiz(user_id) do
    Onion.UserSession.set_current_quiz_id(user_id, nil)

    Query.start()
    |> Query.filter_by_id(user_id)
    |> Query.update_set_current_quiz_nil()
    |> Repo.update_all([])
  end

  def set_current_quiz(user_id, quiz_id, can_speak \\ false, returning \\ false) do
    quizPermissions =
      case can_speak do
        true ->
          case QuizPermissions.set_speaker(user_id, quiz_id, true, true) do
            {:ok, x} -> x
            _ -> nil
          end

        _ ->
          QuizPermissions.get(user_id, quiz_id)
      end

    Onion.UserSession.set_current_quiz_id(user_id, quiz_id)

    q =
      from(u in User,
        where: u.id == ^user_id,
        update: [
          set: [
            currentQuizId: ^quiz_id
          ]
        ]
      )

    q = if returning, do: select(q, [u], u), else: q

    case Repo.update_all(q, []) do
      {_, [user]} -> %{user | quizPermissions: quizPermissions}
      _ -> nil
    end
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
           username: Kousa.Utils.Random.big_ascii_id(),
           email: if(user.email == "", do: nil, else: user.email),
           twitterId: user.twitterId,
           avatarUrl: user.avatarUrl,
           bannerUrl: user.bannerUrl,
           displayName:
             if(is_nil(user.displayName) or String.trim(user.displayName) == "",
               do: "Novice",
               else: user.displayName
             ),
           bio: user.bio
         },
         returning: true
       )}
    end
  end

  def github_find_or_create(user, github_access_token) do
    githubId = Integer.to_string(user["id"])

    db_user =
      from(u in User,
        where: u.githubId == ^githubId,
        limit: 1
      )
      |> Repo.one()

    if db_user do
      if is_nil(db_user.githubId) do
        from(u in User,
          where: u.id == ^db_user.id,
          update: [
            set: [
              githubId: ^githubId,
              githubAccessToken: ^github_access_token
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
           githubId: githubId,
           email: if(user["email"] == "", do: nil, else: user["email"]),
           githubAccessToken: github_access_token,
           avatarUrl: user["avatar_url"],
           bannerUrl: user["banner_url"],
           displayName:
             if(is_nil(user["name"]) or String.trim(user["name"]) == "",
               do: "Novice",
               else: user["name"]
             ),
           bio: user["bio"]
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
           username: Kousa.Utils.Random.big_ascii_id(),
           discordId: discordId,
           email: if(user["email"] == "", do: nil, else: user["email"]),
           discordAccessToken: discord_access_token,
           avatarUrl: Kousa.Discord.get_avatar_url(user),
           displayName: user["username"]
         },
         returning: true
       )}
    end
  end
end
