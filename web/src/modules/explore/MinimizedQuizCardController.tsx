import { useRouter } from "next/router";
import React from "react";
import { useTypeSafeQuery } from "../../hooks/useTypeSafeQuery";
import { MinimizedQuizCard } from "../../ui/MinimizedQuizCard";

interface Props {
  quizId: string;
}

export const MinimizedQuizCardController: React.FC<Props> = ({ quizId }) => {
  const { data } = useTypeSafeQuery(["joinQuiz", quizId], {}, [quizId]) as any;
  const router = useRouter();

  if (!data || "error" in data) {
    return null;
  }

  const { quiz } = data;
  const dt = new Date(quiz.inserted_at);

  return (
    <MinimizedQuizCard
      quiz={{
        name: quiz.name,
        peopleInside: quiz.numPeopleInside,
        quizStartedAt: dt,
        myself: {
          leave() {
            console.log("yooo");
          },
        },
      }}
      onFullscreenClick={() => router.push(`/room/${quiz.id}`)}
    />
  );
};
