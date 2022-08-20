import { useRouter } from "next/router";
import { useCurrentQuizIdStore } from "../stores/useCurentQuizIdStore";

export const useCurrentQuizId = () => {
  const { pathname, query } = useRouter();
  const { currentQuizId } = useCurrentQuizIdStore();
  if (pathname === "/quiz/[id]" && query.id && typeof query.id === "string") {
    return query.id;
  }
  return currentQuizId;
};
