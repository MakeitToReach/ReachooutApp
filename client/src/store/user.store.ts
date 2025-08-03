import { create } from "zustand";

// Non-sensitive user data that can be safely stored client-side
export type PUBLIC_USER = {
    id: string;
    name: string;
    email: string;
    googleId?: string;
    avatarUrl?: string;
};

// Full user data including sensitive fields (only for server responses)
export type USER = PUBLIC_USER & {
    isTrialUser: boolean;
};

interface User {
    user: PUBLIC_USER | null;
    setUser: (user: PUBLIC_USER | null) => void;
    // Method to update user from server response (strips sensitive data)
    updateUserFromServer: (user: USER | null) => void;
}

export const useUserStore = create<User>((set) => ({
    user: null,
    setUser: (user: PUBLIC_USER | null) => set({ user: user }),
    updateUserFromServer: (user: USER | null) => {
        if (!user) {
            set({ user: null });
            return;
        }
        // Strip sensitive data before storing
        // eslint-disable-next-line
        const { isTrialUser, ...publicUser } = user;
        set({ user: publicUser });
    },
}));
