import * as React from "react";
import { Modal } from "../ui/Modal";
import create from "zustand";
import { combine } from "zustand/middleware";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useTypeSafeTranslation } from "../hooks/useTypeSafeTranslation";

interface Props {}

type Fn = (v: string) => void;

const usePromptModalStore = create(
  combine(
    {
      message: "",
      value: "",
      onConfirm: undefined as undefined | Fn,
    },
    (set) => ({
      close: () => set({ onConfirm: undefined, message: "", value: "" }),
      set,
    })
  )
);

export const modalPrompt = (
  message: string,
  onConfirm: Fn,
  defaultValue = ""
) => {
  usePromptModalStore
    .getState()
    .set({ onConfirm, message, value: defaultValue });
};

export const PromptModal: React.FC<Props> = () => {
  const { onConfirm, message, close, value, set } = usePromptModalStore();
  const { t } = useTypeSafeTranslation();
  return (
    <Modal isOpen={!!onConfirm} onRequestClose={() => close()}>
      <div className={`mb-4 text-primary-100`}>{message}</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          close();
          onConfirm?.(value);
        }}
      >
        <Input
          autoFocus
          value={value}
          onChange={(e) => set({ value: e.target.value })}
        />
        <div className={`flex gap-4 mt-12`}>
          <Button type="submit" size="medium">
            {t("common.ok")}
          </Button>
          <Button type="button" size="medium" onClick={close} color="secondary">
            {t("common.cancel")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
