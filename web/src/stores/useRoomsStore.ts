import create from "zustand";
import { combine } from "zustand/middleware";

export const useRoomsStore = create(
  combine(
    {
      rooms: [] as any,
    },
    (set) => ({
      setRooms: (room: any) => {
        set((x) => ({
          rooms: [{ ...room }, ...x.rooms],
        }));
      },
    })
  )
);
