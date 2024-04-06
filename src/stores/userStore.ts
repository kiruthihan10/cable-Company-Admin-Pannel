import { IUser, userType } from "@/interfaces/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUserStoreState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  setUserType: (userType: userType) => void;
  setToken: (token: string) => void;
  removeUser: () => void;
}

const setUserType = (user: IUser | null, userType: userType) => {
  if (user) {
    return { ...user, userType: userType };
  }
  return user;
};

const setToken = (user: IUser | null, token: string) => {
  if (user) {
    return { ...user, token: token };
  }
  return user;
};

export const useUserStore = create<IUserStoreState>()(
  persist(
    (set, get) => ({
      user: {
        username: "",
        password: "",
      },
      setUser: (user: IUser) => set({ user: user }),
      removeUser: () =>
        set({
          user: null,
        }),
      setUserType: (userType: userType) =>
        set({ user: setUserType(get().user, userType) }),
      setToken: (token: string) => set({ user: setToken(get().user, token) }),
    }),
    {
      name: "SKPT", // name of the item in the storage (must be unique),
      partialize: (state) => ({ user: state.user }),
    }
  )
);
