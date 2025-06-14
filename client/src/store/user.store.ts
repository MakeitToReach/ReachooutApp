import { create } from "zustand";
// import { persist } from "zustand/middleware";

export type USER = {
    id: string;
    name: string;
    email: string;
    googleId?: string;
    avatarUrl?: string;
};
interface User {
    user: USER | undefined;
    setUser: (user: USER) => void;
}

export const useUserStore = create<User>((set) => ({
    user: undefined,
    setUser: (user: USER) => set({ user: user }),
}));
