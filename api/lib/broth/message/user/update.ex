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
    with {:ok, data} <- apply_action(changeset, :validate) do
      {:ok, user} = Kousa.User.edit_profile(state.user.id, %{
        "displayName" => data.displayName,
        "bio" => data.bio
      })
      {:reply, user, %{state | user: user}}
    else
      error -> error
    end
  end
end
