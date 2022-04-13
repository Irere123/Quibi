export type BaseUser = {
  username: string;
  online: boolean;
  email: string;
  id: string;
  phoneNumber: string | null;
  avatar: string;
  location: string | null;
  interests: any;
  device: string | null;
  createdAt: Date;
  updatedAt: Date;
  isDeveloper: boolean;
  activatedAccount: boolean;
  googleId: string;
  facebookIdL: string;
};
