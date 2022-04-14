import { KeyMap } from "react-hotkeys";
import create from "zustand";
import { combine } from "zustand/middleware";

const keyMap: KeyMap = {
  HOME: "Control+/",
  ACCOUNT: "Control+Shift+6",
  CHAT: "Shift+Alt+c",
  SETTINGS: "Shift+Alt+s",
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
          keyMap: { ...x.keyMap, ACCOUNT: id },
        }));
      },
      setChatKeybind: (id: string) => {
        set((x) => ({
          keyMap: { ...x.keyMap, CHAT: id },
        }));
      },
      setSettingsKeybind: (id: string) => {
        set((x) => ({
          keyMap: { ...x.keyMap, SETTINGS: id },
        }));
      },
    })
  )
);
