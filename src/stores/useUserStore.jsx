import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user",
    }
  )
);

export const useName = () => useUserStore((state) => state.user?.name);
export const useAvatar = () => useUserStore((state) => state.user?.avatar);
export const useToken = () => useUserStore((state) => state.user?.accessToken);
export const useBanner = () => useUserStore((state) => state.user?.banner);

export const useUserActions = () => {
  const { setUser, clearUser } = useUserStore();
  return { setUser, clearUser };
};
