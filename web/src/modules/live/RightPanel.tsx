import React from "react";
import avatar from "../../img/avatar.jpg";
import { useCurrentQuizIdStore } from "../../stores/useCurentQuizIdStore";
import { FollowSuggCard } from "../../ui/FollowSuggCard";
import { UpcomingEventsCard } from "../../ui/UpcomingEventsCard";
import { MinimizedQuizCardController } from "./MinimizedQuizCardController";

export const RightPanel: React.FC = () => {
  const { currentQuizId } = useCurrentQuizIdStore();

  return (
    <div className="flex flex-col gap-4 justify-between items-end mb-5 max-w-md overflow-y-auto">
      {currentQuizId ? (
        <MinimizedQuizCardController quizId={currentQuizId} />
      ) : null}
      <UpcomingEventsCard
        events={[
          {
            onClick: () => {
              console.log("hello world");
            },
            id: "34",
            scheduledFor: new Date(),
            planersInfo: {
              avatars: [avatar.src, avatar.src],
              planers: ["Irere", "John"],
            },
            title: "Chemistry hangout",
          },
          {
            onClick: () => {
              console.log("hello world");
            },
            id: "34",
            scheduledFor: new Date(),
            planersInfo: {
              avatars: [avatar.src, avatar.src],
              planers: ["Irere", "John"],
            },
            title: "Maths Course",
          },
        ]}
        onCreateScheduledEvent={() => {}}
      />{" "}
    </div>
  );
};
