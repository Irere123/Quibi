defmodule Beef.ScheduledQuizes do
  import Ecto.Query
  import Ecto.Changeset
  alias Okra.Utils.Pagination
  alias Beef.Schemas.ScheduledQuiz
  alias Beef.Repo

  @fetch_limit 16

  def get_by_id(id) do
    from(sq in ScheduledQuiz,
      where: sq.id == ^id,
      inner_join: u in assoc(sq, :creator),
      preload: [
        creator: u
      ]
    )
    |> Repo.one()
  end

  def delete(user_id, id) do
    from(sq in ScheduledQuiz, where: sq.creatorId == ^user_id and sq.id == ^id)
    |> Repo.delete_all()
  end

  def insert(data) do
    %ScheduledQuiz{} |> ScheduledQuiz.insert_changeset(data) |> Repo.insert(returning: true)
  end

  def quiz_started(user_id, id, quiz_id) do
    from(sq in ScheduledQuiz,
      where: sq.creatorId == ^user_id and sq.id == ^id,
      update: [
        set: [
          quizId: ^quiz_id,
          started: true
        ]
      ]
    )
    |> Repo.update_all([])
  end

  def edit(user_id, id, data) do
    case ScheduledQuiz.edit_changeset(%ScheduledQuiz{}, data) |> apply_action(:update) do
      {:ok, cleaned_data} ->
        from(sq in ScheduledQuiz,
          where: sq.creatorId == ^user_id and sq.id == ^id,
          update: [
            set: [
              name: ^cleaned_data.name,
              description: ^cleaned_data.description,
              scheduledFor: ^cleaned_data.scheduledFor
            ]
          ]
        )
        |> Repo.update_all([])

        :ok

      error ->
        error
    end
  end


  def add_cursor(q, "") do
    q
  end

  def add_cursor(q, nil) do
    q
  end

  def add_cursor(q, cursor) do
    with [iso, id] <- String.split(cursor, "|"),
         {:ok, dt} <- Timex.parse(iso, "{ISO:Basic:Z}") do
      where(q, [sq], {^dt, ^id} < {sq.scheduledFor, sq.id})
    else
      _ ->
        q
    end
  end

  def get_my_scheduled_quizes_about_to_start(user_id) do
    from(sq in ScheduledQuiz,
      inner_join: u in assoc(sq, :creator),
      preload: [
        creator: u
      ],
      where:
        sq.creatorId == ^user_id and is_nil(sq.quizId) and
          sq.started ==
            false and
          fragment(
            "? - interval '1 hours' < now() and ? + interval '2 hours' > now()",
            sq.scheduledFor,
            sq.scheduledFor
          ),
      order_by: [asc: sq.scheduledFor],
      limit: ^@fetch_limit
    )
    |> Repo.all()
  end

  def get_feed(user_id, get_only_my_scheduled_quizes, cursor) do
    q =
      from(sq in ScheduledQuiz,
        inner_join: u in assoc(sq, :creator),
        order_by: [asc: sq.scheduledFor, asc: sq.id],
        where: sq.started == false,
        limit: ^@fetch_limit,
        preload: [
          creator: u
        ]
      )

    get_only_my_scheduled_quizes
    |> if(
      do:
        where(
          q,
          [sq],
          sq.creatorId == ^user_id and sq.scheduledFor > fragment("now() - interval '2 hours'")
        ),
      else: where(q, [sq], sq.scheduledFor > fragment("now()"))
    )
    |> add_cursor(cursor)
    |> Repo.all()
    |> Pagination.items_to_cursor_tuple(
      @fetch_limit,
      &(Timex.format!(&1.scheduledFor, "{ISO:Basic:Z}") <> "|" <> &1.id)
    )
  end


  def get_mine(user_id) do
    from(sq in ScheduledQuiz,
      inner_join: u in assoc(sq, :creator),
      on: sq.creatorId == u.id,
      where: sq.scheduledFor > fragment("now()") and sq.creatorId == ^user_id,
      limit: 1,
      preload: [
        creator: u
      ]
    )
    |> Repo.one()
  end

end
