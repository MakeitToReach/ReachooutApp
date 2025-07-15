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
    user: USER | null;
    setUser: (user: USER | null) => void;
}

export const useUserStore = create<User>((set) => ({
    user: null,
    setUser: (user: USER | null) => set({ user: user }),
}));
