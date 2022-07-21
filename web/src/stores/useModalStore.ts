import create from "zustand";
import { combine } from "zustand/middleware";

export const useModalStore = create(
  combine(
    {
      openMembersModal: false,
      openAccountModal: false,
      openUserAccountModal: false,
      openAddRoomModal: false,
      openAddPersonModal: false,
    },
    (set) => ({
      setOpenMembersModal: (openMembersModal: boolean) =>
        set({ openMembersModal }),
      setOpenUserAccountModal: (openUserAccountModal: boolean) =>
        set({ openUserAccountModal }),
      setOpenAccountModal: (openAccountModal: boolean) =>
        set({ openAccountModal }),
      setAddRoomModal: (openAddRoomModal: boolean) => set({ openAddRoomModal }),
      setAddPersonModal: (openAddPersonModal: boolean) =>
        set({ openAddPersonModal }),
    })
  )
);
