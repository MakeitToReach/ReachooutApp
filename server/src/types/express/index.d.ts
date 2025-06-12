import { Profile } from "passport-google-oauth20";

interface CustomUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  accessToken: string;
  refreshToken: string;
  profile: Profile;
}

declare global {
  namespace Express {
    interface User extends CustomUser {}
  }
}

export {};
