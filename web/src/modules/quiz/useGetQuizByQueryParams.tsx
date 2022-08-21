import { useRouter } from "next/router";
import { useEffect } from "react";
import { validate as uuidValidate } from "uuid";
import { useTypeSafeQuery } from "../../hooks/useTypeSafeQuery";
import { isServer } from "../../lib/isServer";
import { showErrorToast } from "../../lib/showErrorToast";
import { useCurrentQuizIdStore } from "../../stores/useCurentQuizIdStore";
import { useQuizChatStore } from "./chat/useQuizChatStore";

export const useGetQuizByQueryParams = () => {
  const { currentQuizId, setCurrentQuizId } = useCurrentQuizIdStore();
  const { query } = useRouter();
  const quizId = typeof query.id === "string" ? query.id : "";
  const reset = useQuizChatStore((s) => s.reset);
  const { data, isLoading } = useTypeSafeQuery(
    ["joinQuizAndGetInfo", quizId || ""],
    {
      enabled: uuidValidate(quizId) && !isServer,
      refetchOnMount: "always",
      onSuccess: ((d: any) => {
        if (d && !("error" in d) && d.room) {
          if (currentQuizId !== d.quiz.id) {
            reset();
          }
          setCurrentQuizId(() => d.quiz.id);
        }
      }) as any,
    },
    [quizId]
  );

  const { push } = useRouter();

  useEffect(() => {
    if (quizId) {
      setCurrentQuizId(quizId);
    }
  }, [quizId, setCurrentQuizId]);

  const errMsg = data && "error" in data ? data.error : "";
  const noData = !data;

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (noData) {
      setCurrentQuizId(null);

      push("/dash");
      return;
    }
    if (errMsg) {
      setCurrentQuizId(null);
      console.log(errMsg, isLoading);
      showErrorToast(errMsg, "error");
      push("/dash");
    }
  }, [noData, errMsg, isLoading, push, setCurrentQuizId]);

  return { data, isLoading };
};
