import EctoEnum

alias Broth.Message.Auth
alias Broth.Message.User

defenum(
  Broth.Message.Types.Operator,
  [
     # user commands and casts: 0..90
    {User.GetInfo, 5},
    # auth and maintenance commands 182..240
    {Auth.Request, 183}
  ]
)
