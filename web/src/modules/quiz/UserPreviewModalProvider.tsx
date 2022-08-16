import React, { ReactNode, useMemo, useState } from "react";
import { QuizChatMessage } from "./chat/useQuizChatStore";

interface UserProfileOverlayProviderProps {
  children: ReactNode;
}

type Data = { userId: string; message?: QuizChatMessage };

export const UserPreviewModalContext = React.createContext<{
  data?: Data | null;
  setData: (x: Data | null) => void;
}>({ setData: () => {} });

export const UserPreviewModalProvider: React.FC<
  UserProfileOverlayProviderProps
> = ({ children }) => {
  const [data, setData] = useState<Data | null>(null);
  return (
    <UserPreviewModalContext.Provider
      value={useMemo(() => ({ data, setData }), [data, setData])}
    >
      {children}
    </UserPreviewModalContext.Provider>
  );
};
