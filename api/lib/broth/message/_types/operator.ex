import EctoEnum

alias Broth.Message.Auth
alias Broth.Message.User

defenum(
  Broth.Message.Types.Operator,
  [
    # user commands and casts: 0..63
    {User.GetInfo, 6},
    # auth and maintenance commands 192..254
    {Auth.Request, 193}
  ]
)
