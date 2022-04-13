import { KeyMap } from "react-hotkeys";
import create from "zustand";
import { combine } from "zustand/middleware";

const keyMap: KeyMap = {
  HOME: "Control+Shift+h",
  ACCOUNT: "Control+Shift+6",
  CHAT: "Control+Alt+h",
};

export const useKeyMapStore = create(
  combine(
    {
      keyMap,
    },
    (set) => ({
      setHomeKeybind: (id: string) => {
        set((x) => ({
          keyMap: { ...x.keyMap, HOME: id },
        }));
      },
      setAccountKeybind: (id: string) => {
        set((x) => ({
          keyMap: { ...x.keyMap, Account: id },
        }));
      },
      setChatKeybind: (id: string) => {
        set((x) => ({
          keyMap: { ...x.keyMap, Account: id },
        }));
      },
    })
  )
);
