import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useWrappedConn } from "../../hooks/useConn";
import { useTypeSafePrefetch } from "../../hooks/useTypeSafePrefetch";
import { useTypeSafeQuery } from "../../hooks/useTypeSafeQuery";
import { isServer } from "../../lib/isServer";
import { ApiPreloadLink } from "../../shared-components/ApiPreloadLink";
import { useCurrentQuizIdStore } from "../../stores/useCurentQuizIdStore";
import { PageComponent } from "../../types/PageComponent";
import { SingleUser } from "../../ui/Avatars";
import { Button } from "../../ui/Button";
import { CenterLoader } from "../../ui/CenterLoader";
import { Input } from "../../ui/Input";
import { HeaderController } from "../display/HeaderController";
import { DesktopLayout } from "../layouts/DesktopLayout";
import { MiddlePanel } from "../layouts/GridPanels";
import { useGetQuizByQueryParams } from "./useGetQuizByQueryParams";

interface InviteQuizPageProps {}

const InviteButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [invited, setInvited] = useState(false);
  return (
    <Button
      size="small"
      color="secondary"
      disabled={invited}
      onClick={() => {
        onClick();
        setInvited(true);
      }}
    >
      {invited ? <>Invited</> : <>Invite</>}
    </Button>
  );
};

const Page: React.FC<{
  cursor: number;
  isLastPage: boolean;
  isOnlyPage: boolean;
  onLoadMore: (o: number) => void;
}> = ({ cursor, isLastPage, isOnlyPage, onLoadMore }) => {
  const conn = useWrappedConn();

  const { isLoading, data } = useTypeSafeQuery(
    ["getInviteList", cursor],
    {
      staleTime: Infinity,
      enabled: !isServer,
      refetchOnMount: "always",
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
      <HeaderController embed={{}} title="Invite" />
      {data.users.map((user: any) => (
        <div key={user.id} className="flex items-center mb-6">
          <div className="flex">
            <SingleUser size="md" src={user.avatarUrl} isOnline={user.online} />
          </div>
          <div className="flex px-4 flex-1">
            <ApiPreloadLink route="profile" data={{ username: user.username }}>
              <div className="flex flex-col">
                <div className="flex text-primary-100">{user.displayName}</div>
                <div className="flex text-primary-200">@{user.username}</div>
              </div>
            </ApiPreloadLink>
          </div>
          <div className="flex block">
            <InviteButton
              onClick={() => {
                conn.mutation.inviteToQuiz(user.id);
              }}
            />
          </div>
        </div>
      ))}
      {isLastPage && data.nextCursor ? (
        <div className={`flex flex justify-center py-5`}>
          <Button
            size="small"
            onClick={() => {
              onLoadMore(data.nextCursor!);
            }}
          >
            Load more
          </Button>
        </div>
      ) : null}
    </>
  );
};

export const InviteQuizPage: PageComponent<InviteQuizPageProps> = () => {
  const { data, isLoading } = useGetQuizByQueryParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);
  const [cursors, setCursors] = useState([0]);

  if (isLoading) {
    return (
      <DesktopLayout>
        <MiddlePanel>
          <CenterLoader />
        </MiddlePanel>
      </DesktopLayout>
    );
  }

  const { quiz } = data;

  const url = window.location.origin + `/quiz/${quiz.id}`;

  let buttonText = "Copy";

  // @ts-ignore
  if (navigator.share) {
    buttonText = "share link to room";
  } else if (copied) {
    buttonText = "Copied";
  }
  return (
    <DesktopLayout>
      <MiddlePanel>
        {quiz.isPrivate ? null : (
          <>
            {!navigator.share ? (
              <div className={`flex text-primary-100 font-bold text-2xl mb-2`}>
                Share link to quiz
              </div>
            ) : null}
            <div className={`flex mb-8 flex`}>
              <Input readOnly ref={inputRef} value={url} className="mr-2" />
              <Button
                size="small"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ url });
                  } else {
                    inputRef.current?.select();
                    document.execCommand("copy", true);
                    setCopied(true);
                  }
                }}
              >
                {buttonText}
              </Button>
            </div>
          </>
        )}
        {cursors.map((cursor, i) => (
          <Page
            key={cursor}
            cursor={cursor}
            isOnlyPage={cursors.length === 1}
            onLoadMore={(c) => setCursors([...cursors, c])}
            isLastPage={i === cursors.length - 1}
          />
        ))}
      </MiddlePanel>
    </DesktopLayout>
  );
};

InviteQuizPage.ws = true;
