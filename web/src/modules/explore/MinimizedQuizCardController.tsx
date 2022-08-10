import { useRouter } from "next/router";
import React from "react";
import { MinimizedQuizCard } from "../../ui/MinimizedQuizCard";

interface Props {
  quizId: string;
}

export const MinimizedQuizCardController: React.FC<Props> = ({ quizId }) => {
  const router = useRouter();

  const dt = new Date();

  return (
    <MinimizedQuizCard
      quiz={{
        name: "Hello world",
        peopleInside: ["Irere", "Jogn"],
        quizStartedAt: dt,
        myself: {
          leave() {
            console.log("yooo");
          },
        },
      }}
      onFullscreenClick={() => router.push(`/room/${1}`)}
    />
  );
};
