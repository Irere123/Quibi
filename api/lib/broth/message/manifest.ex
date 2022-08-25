defmodule Broth.Message.Manifest do
  alias Broth.Message.Auth
  alias Broth.Message.User
  alias Broth.Message.Misc
  alias Broth.Message.Quiz
  alias Broth.Message.QuizChat

  @actions %{
    "misc:search" => Misc.Search,
    "quiz:create" => Quiz.Create,
    "quiz:join" => Quiz.Join,
    "quiz:get_top" => Quiz.GetTop,
    "quiz:leave" => Quiz.Leave,
    "quiz:update" => Quiz.Update,
    "quiz:get_invite_list" => Quiz.GetInviteList,
    "quiz_chat:ban" => QuizChat.Ban,
    "quiz_chat:unban" => QuizChat.Unban,
    "quiz_chat:send_msg" => QuizChat.Send,
    "quiz_chat:delete" => QuizChat.Delete,
    "auth:request" => Auth.Request,
    "user:get_info" => User.GetInfo,
    "user:ban" => User.Ban,
    "user:block" => User.Block,
    "user:unblock" => User.Unblock,
    "user:follow" => User.Follow,
    "user:get_following" => User.GetFollowing,
    "user:get_followers" => User.GetFollowers,
    "user:unfollow" => User.Unfollow,
    "user:update" => User.Update
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
