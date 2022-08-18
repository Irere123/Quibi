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
      isMod: false,
      isCreator: false,
      isSpeaker: false,
      canSpeak: false,
    };
  }

  let isMod = false;
  let isSpeaker = false;

  const { users } = data;

  const me = conn.user;

  for (const u of users) {
    if (u.id === me.id) {
      if (u.quizPermissions?.isSpeaker) {
        isSpeaker = true;
      }
      if (u.quizPermissions?.isMod) {
        isMod = true;
      }
      break;
    }
  }

  const isCreator = me.id === data.quiz.creatorId;

  return {
    isCreator,
    isMod,
    isSpeaker,
    canSpeak: isCreator || isSpeaker,
  };
};
