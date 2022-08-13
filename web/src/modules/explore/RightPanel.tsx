import React from "react";
import avatar from "../../img/avatar.jpg";
import { useCurrentQuizIdStore } from "../../stores/useCurentQuizIdStore";
import { FollowSuggCard } from "../../ui/FollowSuggCard";
import { MinimizedQuizCardController } from "./MinimizedQuizCardController";

export const RightPanel: React.FC = () => {
  const { currentQuizId } = useCurrentQuizIdStore();

  return (
    <div className="flex flex-col gap-4 justify-between items-end mb-5 max-w-md overflow-y-auto">
      {currentQuizId ? (
        <MinimizedQuizCardController quizId={currentQuizId} />
      ) : null}
      <FollowSuggCard
        users={[
          {
            id: 1,
            avatarUrl: avatar.src,
            displayName: "John Mike",
            username: "john_mike",
          },
          {
            id: 2,
            avatarUrl: avatar.src,
            displayName: "Kallen Jerry",
            username: "jerry_k",
          },
          {
            id: 3,
            avatarUrl: avatar.src,
            displayName: "Youwan Hong",
            username: "youwanHong",
          },
        ]}
        onClick={() => console.log("Hello world")}
        onFollow={() => console.log("followed")}
      />
    </div>
  );
};
