defmodule Broth.Message.Manifest do
  alias Broth.Message.Auth
  alias Broth.Message.User

  @actions %{
    "auth:request" => Auth.Request,
    "user:get_info" => User.GetInfo
  }

  # verify that all of the actions are accounted for in the
  # operators list
  alias Broth.Message.Types.Operator
  require Operator

  @actions
  |> Map.values()
  |> Enum.each(fn module ->
    Operator.valid_value?(module) ||
      raise CompileError,
        description: "the module #{inspect(module)} is not a member of #{inspect(Operator)}"
  end)

  def actions, do: @actions
end
