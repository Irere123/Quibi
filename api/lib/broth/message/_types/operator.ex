import EctoEnum

alias Broth.Message.Auth
alias Broth.Message.User

defenum(
  Broth.Message.Types.Operator,
  [
    {User.GetInfo, 6},
    # auth and maintenance commands 182..240
    {Auth.Request, 183}
  ]
)
