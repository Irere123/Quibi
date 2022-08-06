import EctoEnum

alias Broth.Message.Auth
alias Broth.Message.User
alias Broth.Message.Search
alias Broth.Message.Quiz
alias Broth.Message.Room

defenum(
  Broth.Message.Types.Operator,
  [
    # user commands and casts: 0..90
    {User.GetInfo, 5},
    {User.Update, 6},
    {User.Unfollow, 11},
    {User.GetFollowing, 1},
    {User.GetFollowers, 2},
    {User.Unblock, 8},
    {User.Block, 9},
    {User.Follow, 3},
    {User.Online, 4},
    {User.GetRelationship, 7},
    # room commands and casts: 91..181
    {Room.Create, 91},
    # auth and maintenance commands 182..210
    {Auth.Request, 183},
    {Search, 184},

    # quiz commands and casts: 210..250
    {Quiz.Create, 210},
    {Quiz.GetTop, 211},
    {Quiz.Join, 212}
  ]
)
