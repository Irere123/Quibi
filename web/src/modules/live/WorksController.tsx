import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useTypeSafePrefetch } from "../../hooks/useTypeSafePrefetch";
import { useTypeSafeQuery } from "../../hooks/useTypeSafeQuery";
import { CalendarMonth, PlusIcon } from "../../icons";
import { isServer } from "../../lib/isServer";
import { useCurrentQuizIdStore } from "../../stores/useCurentQuizIdStore";
import { BoxedIcon } from "../../ui/BoxedIcon";
import { QuizCard } from "../../ui/QuizCard";
import { InfoText } from "../../ui/InfoText";
import { PageHeader } from "../../ui/PageHeader";
import { MiddlePanel } from "../layouts/GridPanels";
import { useQuizChatStore } from "../quiz/chat/useQuizChatStore";
import { CreateQuizModal } from "../quiz/CreateQuizModal";
import { WebSocketContext } from "../ws/WebSocketProvider";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { CenterLoader } from "../../ui/CenterLoader";

const Page = ({
  cursor,
  isLastPage,
  onLoadMore,
}: {
  cursor: number;
  isLastPage: boolean;
  onLoadMore: (o: number) => void;
}) => {
  const { conn } = useContext(WebSocketContext);
  const { currentQuizId } = useCurrentQuizIdStore();
  const { push } = useRouter();
  const prefetch = useTypeSafePrefetch();
  const { t } = useTypeSafeTranslation();
  const { isLoading, data } = useTypeSafeQuery(
    ["getTopPublicQuizes", cursor],
    {
      staleTime: Infinity,
      enabled: !isServer && !!conn,
      refetchOnMount: "always",
      refetchInterval: 10000,
    },
    [cursor]
  );

  if (isLoading) {
    return <CenterLoader />;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      {data.quizes.map((quiz: any) => (
        <QuizCard
          title={quiz.name}
          subtitle={
            "peoplePreviewList" in quiz
              ? quiz.peoplePreviewList
                  .slice(0, 3)
                  .map((x: any) => x.displayName)
                  .join(", ")
              : ""
          }
          onClick={() => {
            if (quiz.id !== currentQuizId) {
              useQuizChatStore.getState().reset();
              prefetch(["joinQuizAndGetInfo", quiz.id], [quiz.id]);
            }

            push(`/quiz/[id]`, `/quiz/${quiz.id}`);
          }}
          key={quiz.id}
          avatars={
            "peoplePreviewList" in quiz
              ? quiz.peoplePreviewList
                  .map((x: any) => x.avatarUrl!)
                  .slice(0, 3)
                  .filter((x: any) => x !== null)
              : []
          }
          numPeopleInside={"numPeopleInside" in quiz ? quiz.numPeopleInside : 0}
          tags={[]}
        />
      ))}
    </>
  );
};

export const WorksController: React.FC = () => {
  const { conn } = useContext(WebSocketContext);
  const { push } = useRouter();
  const [open, setOpen] = useState(false);
  const [cursors, setCursors] = useState([0]);

  if (!conn) {
    return null;
  }

  return (
    <MiddlePanel
      stickyChildren={
        <PageHeader
          title="For you"
          content={
            <div className="flex gap-3">
              <BoxedIcon className="text-accent" onClick={() => setOpen(!open)}>
                <PlusIcon />
              </BoxedIcon>
              <BoxedIcon onClick={() => push("/scheduled-quizes")}>
                <CalendarMonth />
              </BoxedIcon>
            </div>
          }
        />
      }
    >
      <div className="flex flex-1 flex-col mb-7">
        <div className="flex flex-col space-y-4">
          {cursors.map((cursor, i) => (
            <Page
              key={cursor}
              cursor={cursor}
              onLoadMore={(c) => setCursors([...cursors, c])}
              isLastPage={i === cursors.length - 1}
            />
          ))}
        </div>
      </div>
      {open && (
        <CreateQuizModal isOpen={open} onRequestClose={() => setOpen(!open)} />
      )}
    </MiddlePanel>
  );
};
