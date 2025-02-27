import React from "react";
import { useScreenType } from "../hooks/useScreenType";
import { ChatBubble, GroupIcon, PersonAdd, SettingsIcon } from "../icons";
import { BoxedIcon } from "./BoxedIcon";
import { Button } from "./Button";
import { Input } from "./Input";

interface QuizPanelIconBarprops {
  onTextMode?: () => void;
  onInvitePeopleToQuiz?: () => void;
  onQuizSettings?: () => void;
  onLeaveQuiz: () => void;
  onToggleChat?: () => void;
  open?: boolean;
  enableAnswer?: boolean;
}

export const QuizPanelIconBar: React.FC<QuizPanelIconBarprops> = ({
  onToggleChat,
  onTextMode,
  onInvitePeopleToQuiz,
  onLeaveQuiz,
  onQuizSettings,
  open,
  enableAnswer,
}) => {
  const screenType = useScreenType();

  return (
    <div className="flex gap-3 flex-col bg-primary-700 rounded-b-lg py-3 px-4 w-full">
      <div className="flex flex-wrap justify-center  sm:justify-between">
        <div className="flex my-1 justify-between w-full sm:my-0 sm:w-auto">
          {onTextMode ? (
            <BoxedIcon
              transition
              color="800"
              className="mx-1 h-6.5 w-6.5"
              onClick={onTextMode}
            >
              <ChatBubble />
            </BoxedIcon>
          ) : null}

          {screenType === "1-cols" || screenType === "fullscreen" ? (
            <BoxedIcon
              transition
              className="mx-1 h-6.5 w-6.5"
              color="800"
              onClick={onToggleChat}
              data-testid="chat"
            >
              <GroupIcon />
            </BoxedIcon>
          ) : null}

          {onInvitePeopleToQuiz ? (
            <BoxedIcon
              transition
              className="mx-1 h-6.5 w-6.5"
              color="800"
              title={"Invite"}
              onClick={onInvitePeopleToQuiz}
            >
              <PersonAdd height="20" />
            </BoxedIcon>
          ) : null}

          {onQuizSettings ? (
            <BoxedIcon
              transition
              className="mx-1 h-6.5 w-6.5"
              color="800"
              title={"Settings"}
              onClick={onQuizSettings}
            >
              <SettingsIcon width="20" height="20" />
            </BoxedIcon>
          ) : null}
        </div>

        {screenType !== "fullscreen" && (
          <Button
            transition
            className={`my-1 mx-1 text-base sm:my-0 sm:mx-0 sm:w-15`}
            size="medium"
            onClick={() => {
              onLeaveQuiz();
            }}
          >
            Leave
          </Button>
        )}
      </div>
    </div>
  );
};
