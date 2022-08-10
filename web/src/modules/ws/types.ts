export type WsParam = {
  op: string;
  d: any;
};

export type UUID = string;

export type User = {
  id: UUID;
  displayName: string;
  username: string;
  bio: string | null;
  email: string;
  online: boolean;
  last_online: boolean;
  numFollowing: number;
  numFollowers: number;
  youAreFollowing?: boolean;
  lastOnline: string;
  followsYou?: boolean;
  iBlockedThem: boolean;
  avatarUrl: string;
  bannerUrl: string | null;
  inserted_at: string;
};
