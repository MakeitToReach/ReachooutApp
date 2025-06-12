import { create } from "zustand";
// import { persist } from "zustand/middleware";

type USER = {
    id: string;
    name: string;
    email: string;
    googleId?: string;
    avatarUrl?: string;
};
interface User {
    user: USER | null;
    setUser: (user: USER) => void;
}

export const useUserStore = create<User>((set) => ({
    user: null,
    setUser: (user: USER) => set({ user: user }),
}));
