import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useCurrentQuizInfo } from "../../hooks/useCurrentQuizInfo";
import { useLeaveQuiz } from "../../hooks/useLeaveQuiz";
import { useScreenType } from "../../hooks/useScreenType";
import { PlusIcon } from "../../icons";
import { modalConfirm } from "../../shared-components/ConfirmModal";
import { useCurrentQuizIdStore } from "../../stores/useCurentQuizIdStore";
import { QuizPanelIconBar } from "../../ui/QuizPanelIconBar";
import { Quiz } from "../ws";
import { QuizChatInput } from "./chat/QuizChatInput";
import { QuizChatList } from "./chat/QuizChatList";
import { QuizChatMentions } from "./chat/QuizChatMentions";
import { useQuizChatStore } from "./chat/useQuizChatStore";
import { QuizSettingsModal } from "./QuizSettingsModal";

interface QuizIconBarControllerProps {
  quiz: Quiz;
  users: any[];
}

export const QuizIconBarPanel: React.FC<QuizIconBarControllerProps> = ({
  quiz,
  users,
}) => {
  const { push } = useRouter();
  const { currentQuizId } = useCurrentQuizIdStore();
  const [quizId, setQuizId] = useState("");
  const { leaveQuiz } = useLeaveQuiz();
  const { isCreator } = useCurrentQuizInfo();
  const [open, toggleOpen] = useQuizChatStore((s) => [s.open, s.toggleOpen]);
  const screenType = useScreenType();

  const userMap = useMemo(() => {
    const map: Record<any, any> = {};
    users.forEach((u) => {
      map[u.id] = u;
    });
    return map;
  }, [users]);

  return (
    <div className="flex flex-col w-full">
      <QuizSettingsModal onRequestClose={() => setQuizId("")} quizId={quizId} />
      <QuizPanelIconBar
        onToggleChat={() => toggleOpen()}
        onLeaveQuiz={() => {
          modalConfirm("Are you sure want to leave", () => {
            push("/explore");
            leaveQuiz();
          });
        }}
        onQuizSettings={
          isCreator
            ? () => {
                setQuizId(currentQuizId!);
              }
            : undefined
        }
        onInvitePeopleToQuiz={() => {
          push(`/quiz/[id]/invite`, `/quiz/${currentQuizId}/invite`);
        }}
        onTextMode={() => {}}
        enableAnswer={true}
        open={open}
      />
      {(screenType === "fullscreen" || screenType === "1-cols") && open
        ? createPortal(
            // this is kind of hard to embed in the page
            // so tmp solution of portaling this and absolute positioning for fullscreen
            <div
              className={`flex absolute flex-col w-full z-30 bg-primary-800 h-full rounded-8`}
            >
              <button
                onClick={() => toggleOpen()}
                className="flex justify-between items-center w-full text-primary-100 p-4 text-2xl"
              >
                <span>Chat</span>
                {/* Just a temporary solution to make close chat ux better, until we have the design in figma */}
                <PlusIcon className={`transform rotate-45`} />
              </button>
              <div className="flex overflow-y-auto flex-1">
                <div className={`flex flex-1 w-full flex-col mt-4`}>
                  <QuizChatList quiz={quiz} userMap={userMap} />
                  <QuizChatMentions users={users} />
                  <QuizChatInput users={users} />
                </div>
              </div>
            </div>,
            document.querySelector("#__next")!
          )
        : null}
    </div>
  );
};
