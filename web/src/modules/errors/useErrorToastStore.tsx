import create from "zustand";
import { combine } from "zustand/middleware";
import { AlertDurations, AlertTypes } from "../../ui/Alert";

type Toast = {
  id: string;
  type?: AlertTypes;
  duration?: AlertDurations;
  message: string;
};

export const useErrorToastStore = create(
  combine(
    {
      toasts: [] as Toast[],
    },
    (set) => ({
      hideToast: (id: string) =>
        set((x) => ({ toasts: x.toasts.filter((y) => y.id !== id) })),
      showToast: (t: Omit<Toast, "id">) =>
        set((x) => {
          const currentRemovedToasts: Toast[] = x.toasts.filter(
            (y) => y.message !== t.message
          );
          return {
            toasts: [
              ...currentRemovedToasts,
              { ...t, id: Math.random().toString() },
            ],
          };
        }),
    })
  )
);
