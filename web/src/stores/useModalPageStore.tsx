import { combine } from "zustand/middleware";
import create from "zustand";

export const useModalPageStore = create(
  combine(
    {
      createRoomPage: 1,
    },
    (set) => ({
      setCreateRoomPage: (page: number) => set({ createRoomPage: page }),
    })
  )
);
