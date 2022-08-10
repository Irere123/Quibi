import React from "react";
import avatar from "../../img/avatar.jpg";
import { useCurrentQuizIdStore } from "../../stores/useCurrentQuizStore";
import { FollowSuggCard } from "../../ui/FollowSuggCard";
import { MinimizedQuizCardController } from "./MinimizedQuizCardController";

export const RightPanel: React.FC = () => {
  const { currentQuizId } = useCurrentQuizIdStore();

  return (
    <div className="mt-5">
      <MinimizedQuizCardController quizId={currentQuizId!} />
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
