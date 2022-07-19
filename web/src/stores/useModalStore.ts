import create from "zustand";
import { combine } from "zustand/middleware";

export const useModalStore = create(
  combine(
    {
      openMembersModal: false,
      openAccountModal: false,
      openAddGroupModal: false,
      openAddPersonModal: false,
    },
    (set) => ({
      setOpenMembersModal: (openMembersModal: boolean) =>
        set({ openMembersModal }),
      setOpenAccountModal: (openAccountModal: boolean) =>
        set({ openAccountModal }),
      setAddGroupModal: (openAddGroupModal: boolean) =>
        set({ openAddGroupModal }),
      setAddPersonModal: (openAddPersonModal: boolean) =>
        set({ openAddPersonModal }),
    })
  )
);
