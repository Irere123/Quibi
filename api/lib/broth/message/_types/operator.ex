import EctoEnum

alias Broth.Message.Auth
alias Broth.Message.User
alias Broth.Message.Misc
alias Broth.Message.Quiz
alias Broth.Message.QuizChat

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
    {Quiz.Create, 65},
    {Quiz.Join, 66},
    {Quiz.GetTop, 67},
    {Quiz.Leave, 68},
    {Quiz.Update, 69},
    {Quiz.GetInviteList, 70},
    {Quiz.GetBannedUsers, 71},
    # quiz chat commands and casts: 128..191
    {QuizChat.Ban, 129},
    {QuizChat.Send, 130},
    {QuizChat.Delete, 131},
    {QuizChat.Unban, 132},
    # auth and maintenance commands 192..254
    {Auth.Request, 193},
    {Misc.Search, 210}
  ]
)
