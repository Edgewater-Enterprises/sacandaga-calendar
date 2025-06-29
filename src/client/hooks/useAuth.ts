import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { TAuth } from "@/shared/types";

export const useAuth = create<TAuth>()(
  persist(
    set => ({
      token: null,
      setToken: (token: string) => set(() => ({ token })),
      isAdmin: false,
      setIsAdmin: (isAdmin: boolean) => set(() => ({ isAdmin })),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
