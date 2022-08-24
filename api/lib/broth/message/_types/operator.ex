import EctoEnum

alias Broth.Message.Auth

defenum(
  Broth.Message.Types.Operator,
  [
    # auth and maintenance commands 192..254
    {Auth.Request, 193}
  ]
)
