import create from "zustand";
import { combine } from "zustand/middleware";

type State = "init" | "ws-disconnected" | "bad-auth" | "killed";

export const useStatus = create(
  combine(
    {
      status: "init" as State,
    },
    (set) => ({
      setStatus: (status: State) => set({ status }),
    })
  )
);
