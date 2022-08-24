import EctoEnum

alias Broth.Message.Auth
alias Broth.Message.User

defenum(
  Broth.Message.Types.Operator,
  [
    # user commands and casts: 0..63
    {User.GetFollowing, 1},
    {User.GetFollowers, 2},
    {User.Follow, 3},
    {User.Ban, 4},
    {User.Update, 5},
    {User.GetInfo, 6},
    {User.Block, 10},
    {User.Unblock, 11},
    {User.Unfollow, 12},
    # auth and maintenance commands 192..254
    {Auth.Request, 193}
  ]
)
