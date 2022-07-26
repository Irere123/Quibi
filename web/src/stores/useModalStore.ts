import create from "zustand";
import { combine } from "zustand/middleware";

export const useModalStore = create(
  combine(
    {
      openMembersModal: false,
      openAccountModal: false,
      openUserAccountModal: false,
      addQuizModal: false,
      openAddPersonModal: false,
    },
    (set) => ({
      setOpenMembersModal: (openMembersModal: boolean) =>
        set({ openMembersModal }),
      setOpenUserAccountModal: (openUserAccountModal: boolean) =>
        set({ openUserAccountModal }),
      setOpenAccountModal: (openAccountModal: boolean) =>
        set({ openAccountModal }),
      setAddQuizModal: (addQuizModal: boolean) => set({ addQuizModal }),
      setAddPersonModal: (openAddPersonModal: boolean) =>
        set({ openAddPersonModal }),
    })
  )
);
