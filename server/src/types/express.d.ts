import { Profile } from "passport-google-oauth20";

export interface CustomUser {
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
        interface User {
            id: string;
            name: string;
            email: string;
            avatarUrl: string;
            accessToken: string;
            refreshToken: string;
            profile: Profile;
        }
        interface Request {
            user?: Express.User;
        }
    }
}

export { };
