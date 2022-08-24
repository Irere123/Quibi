defmodule Broth.Message.User.Update do
  alias Beef.Schemas.User

  use Broth.Message.Call,
    schema: User,
    reply: User

  @impl true
  def initialize(state) do
    state.user
  end

  @impl true
  def changeset(initializer \\ %User{}, data) do
    initializer
    |> cast(data, [
      :username,
      :bio,
      :displayName
    ])
    |> validate_required([:username])
    |> update_change(:displayName, &String.trim/1)
    |> validate_length(:bio, min: 0, max: 160)
    |> validate_length(:displayName, min: 2, max: 50)
    |> validate_format(:username, ~r/^[\w\.]{4,15}$/)
    |> unique_constraint(:username)
  end

  @impl true
  def execute(changeset, state) do
    # TODO: make this a proper changeset-mediated alteration.
    case Kousa.User.update_with(changeset) do
      {:ok, user} -> {:reply, user, %{state | user: user}}
      error -> error
    end
  end
end
