import { useRouter } from "next/router";
import { useMemo } from "react";
import { GlobalHotKeys } from "react-hotkeys";
import { useKeyMapStore } from "../../store/useKeyMapStore";

function ListenerBrowser() {
  const { push } = useRouter();
  const { keyMap } = useKeyMapStore();
  return (
    <GlobalHotKeys
      allowChanges={true}
      keyMap={keyMap}
      handlers={useMemo(() => {
        return {
          HOME: () => {
            push("/dash");
          },
          ACCOUNT: () => {
            push("/account");
          },
          CHAT: () => {
            push("/chat");
          },
        };
      }, [push])}
    />
  );
}

export const KeybindListener: React.FC = ({}) => {
  return (
    <>
      <ListenerBrowser />
    </>
  );
};
