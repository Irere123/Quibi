import React, { useState } from "react";
import { QuizPanelIconBar } from "../../ui/QuizPanelIconBar";

interface QuizIconBarControllerProps {}

export const QuizIconBarPanel: React.FC<QuizIconBarControllerProps> = () => {
  const [open, toggleOpen] = useState(false);

  return (
    <>
      <QuizPanelIconBar
        onLeaveQuiz={() => console.log("log")}
        onQuizSettings={() => console.log("settings")}
        onInvitePeopleToQuiz={() => console.log("Invited")}
        onTextMode={() => toggleOpen(!open)}
        enableAnswer={true}
        open={open}
      />
    </>
  );
};
