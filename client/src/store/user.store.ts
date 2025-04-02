import { create } from "zustand";

type USER = {
    id: string;
    name: string;
    email: string;
};
interface User {
    user: USER | null;
    setUser: (user: USER) => void;
}

export const useUserStore = create<User>((set) => ({
    user: null,
    setUser: (user: USER) => set({ user: user }),
}));
