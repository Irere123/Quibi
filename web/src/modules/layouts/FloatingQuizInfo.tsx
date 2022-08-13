import { useRouter } from "next/router";
import React, { ReactChild } from "react";
import { useTypeSafeQuery } from "../../hooks/useTypeSafeQuery";
import { useCurrentQuizIdStore } from "../../stores/useCurrentQuizStore";

interface Props {
  children?: ReactChild;
}

export const FloatingQuizInfo: React.FC<Props> = () => {
  const { currentQuizId } = useCurrentQuizIdStore();
  const { data } = useTypeSafeQuery(
    ["joinQuiz", currentQuizId!],
    {
      enabled: !!currentQuizId,
    },
    [currentQuizId!]
  ) as any;
  const { push } = useRouter();

  if (!data || "error" in data) {
    return null;
  }

  const { room } = data;

  return (
    <div
      style={{ maxWidth: "70vw" }}
      className="flex fixed bottom-8 right-6 border-accent border rounded bg-primary-800 items-center"
    >
      <button
        onClick={() => {
          push(`/room/${room.id}`);
        }}
        style={{ minWidth: 100 }}
        className="truncate text-primary-100 mr-4 p-3"
      >
        {room.name}
      </button>
    </div>
  );
};
