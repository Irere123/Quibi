import create from "zustand";
import { combine } from "zustand/middleware";

export const useModalStore = create(
  combine(
    {
      openMembersModal: false,
      openAccountModal: false,
      openAddGroupModal: false,
      openUserAccountModal: false,
      openAddPersonModal: false,
    },
    (set) => ({
      setOpenMembersModal: (openMembersModal: boolean) =>
        set({ openMembersModal }),
      setOpenUserAccountModal: (openUserAccountModal: boolean) =>
        set({ openUserAccountModal }),
      setOpenAccountModal: (openAccountModal: boolean) =>
        set({ openAccountModal }),
      setAddGroupModal: (openAddGroupModal: boolean) =>
        set({ openAddGroupModal }),
      setAddPersonModal: (openAddPersonModal: boolean) =>
        set({ openAddPersonModal }),
    })
  )
);
