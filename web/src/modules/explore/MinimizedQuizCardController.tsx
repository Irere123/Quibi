import { useRouter } from "next/router";
import React from "react";
import { useLeaveQuiz } from "../../hooks/useLeaveQuiz";
import { useTypeSafeQuery } from "../../hooks/useTypeSafeQuery";
import { MinimizedQuizCard } from "../../ui/MinimizedQuizCard";

interface Props {
  quizId: string;
}

export const MinimizedQuizCardController: React.FC<Props> = ({ quizId }) => {
  const { data } = useTypeSafeQuery(["joinQuizAndGetInfo", quizId], {}, [
    quizId,
  ]);
  const { leaveQuiz, isLoading } = useLeaveQuiz();
  const { push } = useRouter();

  if (!data || "error" in data) {
    return null;
  }

  const { quiz } = data;

  const dt = new Date(quiz.inserted_at);

  return (
    <MinimizedQuizCard
      onFullscreenClick={() => push(`/quiz/${quiz.id}`)}
      onInviteClick={() => console.log("invite people")}
      leaveLoading={isLoading}
      quiz={{
        name: quiz.name,
        peopleInside: quiz.peoplePreviewList
          .slice(0, 3)
          .map((s: any) => s.displayName),
        quizStartedAt: dt,
        myself: {
          leave() {
            leaveQuiz();
          },
        },
      }}
    />
  );
};
