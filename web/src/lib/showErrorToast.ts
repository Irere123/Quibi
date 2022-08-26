import { useErrorToastStore } from "../modules/errors/useErrorToastStore";
import { AlertTypes } from "../ui/Alert";

export const showErrorToast = (m: string, t: AlertTypes) => {
  useErrorToastStore.getState().showToast({ message: m, type: t });
};
