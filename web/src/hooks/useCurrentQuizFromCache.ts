import { useCurrentQuizId } from "./useCurrentQuizId";
import { useTypeSafeQuery } from "./useTypeSafeQuery";

export const useCurrentQuizFromCache = () => {
  const quizId = useCurrentQuizId();
  // this should read from the cache
  const { data } = useTypeSafeQuery(
    ["joinQuizAndGetInfo", quizId!],
    { enabled: false },
    [quizId!]
  );

  return data;
};
