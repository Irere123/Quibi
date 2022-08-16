import { useContext } from "react";
import { isServer } from "../lib/isServer";
import { WebSocketContext } from "../modules/ws/WebSocketProvider";
import { useCurrentQuizIdStore } from "../stores/useCurentQuizIdStore";
import { useTypeSafeQuery } from "./useTypeSafeQuery";

export const useCurrentQuizInfo = () => {
  const { currentQuizId } = useCurrentQuizIdStore();

  const { data } = useTypeSafeQuery(
    ["joinQuizAndGetInfo", currentQuizId || ""],
    {
      enabled: !!currentQuizId && !isServer,
    },
    [currentQuizId || ""]
  );

  const { conn } = useContext(WebSocketContext);

  if (!data || !conn || !currentQuizId || "error" in data) {
    return {
      isCreator: false,
    };
  }

  const me = conn.user;

  const isCreator = me.id === data.quiz.creatorId;

  return { isCreator: isCreator, me };
};
