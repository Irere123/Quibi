defmodule Beef.Mutations.Quizes do
  import Ecto.Query

  alias Beef.Repo
  alias Beef.Schemas.Quiz
  alias Beef.Users
  # alias Beef.Schemas.User

  def delete_quiz_by_id(quiz_id) do
    %Quiz{id: quiz_id} |> Repo.delete()
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
          delete_quiz_by_id(quiz.id)
          {:bye, quiz}
        end
      end
    end
  end

  def increment_quiz_people_count(quiz_id) do
    from(q in Quiz,
      where: q.id == ^quiz_id,
      update: [
        inc: [
          numPeopleInside: 1
        ]
      ]
    )
    |> Repo.update_all([])
  end

  def increment_quiz_people_count(quiz_id, new_people_list) do
    from(q in Quiz,
      where: q.id == ^quiz_id,
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
    from(q in Quiz,
      where: q.id == ^quiz_id,
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

  def raw_insert(data, peoplePreviewList) do
    %Quiz{peoplePreviewList: peoplePreviewList}
    |> Quiz.insert_changeset(data)
    |> Repo.insert(returning: true)
  end

  def create(data) do
    user = Users.get_by_id(data.creatorId)

    peoplePreviewList = [
      %{
        id: user.id,
        displayName: user.displayName,
        numFollowers: user.numFollowers,
        username: user.username,
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

    # IO.inspect(resp)

    case resp do
      {:ok, quiz} ->
        Users.set_current_quiz(data.creatorId, quiz.id)

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