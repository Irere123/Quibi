import EctoEnum

alias Broth.Message.Auth
alias Broth.Message.User
alias Broth.Message.Misc
alias Broth.Message.Quiz

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
     # quiz commands and casts: 64..127
     {Quiz.Create, 64},
    # auth and maintenance commands 192..254
    {Auth.Request, 193},
    {Misc.Search, 210}
  ]
)
