defmodule Beef.Mutations.Quizes do
  import Ecto.Query

  alias Beef.Repo
  alias Beef.Schemas.Quiz
  alias Beef.Users
  alias Beef.Schemas.User

  def set_quiz_privacy_by_creator_id(user_id, isPrivate, new_name) do
    from(q in Quiz,
      where: q.creatorId == ^user_id,
      update: [
        set: [
          isPrivate: ^isPrivate,
          name: ^new_name
        ]
      ],
      select: q
    )
    |> Repo.update_all([])
  end

  def join_quiz(quiz, user_id) do
    user = Users.set_current_quiz(user_id, quiz.id, quiz.isPrivate, true)

    if (length(quiz.peoplePreviewList) < 10 or
          not is_nil(
            Enum.find(quiz.peoplePreviewList, fn x ->
              x.numFollowers < user.numFollowers
            end)
          )) and is_nil(Enum.find(quiz.peoplePreviewList, &(&1.id === user_id))) do
      list =
        [
          %User.Preview{
            id: user.id,
            displayName: user.displayName,
            numFollowers: user.numFollowers,
            avatarUrl: user.avatarUrl
          }
          | quiz.peoplePreviewList
        ]
        |> Enum.sort(&(&1.numFollowers >= &2.numFollowers))
        |> Enum.slice(0, 10)

      increment_quiz_people_count(quiz.id, list)
    else
      increment_quiz_people_count(quiz.id)
    end

    user
  end

  def increment_quiz_people_count(quiz_id) do
    from(u in Quiz,
      where: u.id == ^quiz_id,
      update: [
        inc: [
          numPeopleInside: 1
        ]
      ]
    )
    |> Repo.update_all([])
  end

  def increment_quiz_people_count(quiz_id, new_people_list) do
    from(u in Quiz,
      where: u.id == ^quiz_id,
      update: [
        inc: [
          numPeopleInside: 1
        ],
        set: [
          peoplePreviewList: ^new_people_list
        ]
      ]
    )
    |> Repo.update_all([])
  end

  def delete_quiz_by_id(quiz_id) do
    %Quiz{id: quiz_id} |> Repo.delete()
  end

  def decrement_quiz_people_count(quiz_id, new_people_list) do
    from(r in Quiz,
      where: r.id == ^quiz_id,
      update: [
        inc: [
          numPeopleInside: -1
        ],
        set: [
          peoplePreviewList: ^new_people_list
        ]
      ]
    )
    |> Beef.Repo.update_all([])
  end

  def set_quiz_owner_and_dec(quiz_id, user_id, new_people_list) do
    from(u in Quiz,
      where: u.id == ^quiz_id,
      update: [
        set: [
          creatorId: ^user_id,
          peoplePreviewList: ^new_people_list
        ],
        inc: [
          numPeopleInside: -1
        ]
      ]
    )
    |> Repo.update_all([])
  end

  def replace_quiz_owner(user_id, new_creator_id) do
    from(r in Quiz,
      where: r.creatorId == ^user_id,
      update: [
        set: [
          creatorId: ^new_creator_id
        ]
      ]
    )
    |> Repo.update_all([])
  end

  # trusts that the user is in the quiz
  def kick_from_quiz(user_id, quiz_id) do
    quiz = Beef.Quizes.get_quiz_by_id(quiz_id)
    Beef.Users.set_user_left_current_quiz(user_id)
    new_people_list = Enum.filter(quiz.peoplePreviewList, fn x -> x.id != user_id end)

    decrement_quiz_people_count(
      quiz.id,
      new_people_list
    )
  end

  # trusts that the user is in the quiz
  def leave_quiz(user_id, quiz_id) do
    quiz = Beef.Quizes.get_quiz_by_id(quiz_id)

    if not is_nil(quiz) do
      if quiz.numPeopleInside <= 1 do
        delete_quiz_by_id(quiz.id)
        {:bye, quiz}
      else
        Beef.Users.set_user_left_current_quiz(user_id)
        new_people_list = Enum.filter(quiz.peoplePreviewList, fn x -> x.id != user_id end)

        if quiz.creatorId != user_id do
          decrement_quiz_people_count(
            quiz.id,
            new_people_list
          )
        else
          newCreator = Beef.Quizes.get_next_creator_for_quiz(quiz.id)

          if newCreator do
            set_quiz_owner_and_dec(quiz.id, newCreator.id, new_people_list)
            {:new_creator_id, newCreator.id}
          else
            delete_quiz_by_id(quiz.id)
            {:bye, quiz}
          end
        end
      end
    end
  end

  def raw_insert(data, peoplePreviewList) do
    %Quiz{peoplePreviewList: peoplePreviewList}
    |> Quiz.insert_changeset(data)
    |> Repo.insert(returning: true)
  end

  def update_name(user_id, name) do
    from(r in Quiz,
      where: r.creatorId == ^user_id,
      update: [
        set: [
          name: ^name
        ]
      ]
    )
    |> Repo.update_all([])
  end

  def create(data) do
    user = Beef.Users.get_by_id(data.creatorId)

    peoplePreviewList = [
      %{
        id: user.id,
        displayName: user.displayName,
        numFollowers: user.numFollowers,
        avatarUrl: user.avatarUrl
      }
    ]

    resp = raw_insert(data, peoplePreviewList)

    resp =
      case resp do
        {:error, %{errors: [{:creatorId, {"has already been taken", _}}]}} ->
          raw_insert(data, peoplePreviewList)

        _ ->
          resp
      end

    case resp do
      {:ok, quiz} ->
        Beef.Users.set_current_quiz(data.creatorId, quiz.id)

      _ ->
        nil
    end

    resp
  end

  def edit(quiz_id, data) do
    %Quiz{id: quiz_id}
    |> Quiz.edit_changeset(data)
    |> Repo.update()
  end
end
