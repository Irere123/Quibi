import React from "react";
import { Button } from "../../ui/Button";
import { CenterLoader } from "../../ui/CenterLoader";
import { InfoText } from "../../ui/InfoText";
import { SingleUser } from "../../ui/Avatars";
import { useTypeSafeUpdateQuery } from "../../hooks/useTypeSafeUpdateQuery";
import { useTypeSafeMutation } from "../../hooks/useTypeSafeMutation";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { useTypeSafeQuery } from "../../hooks/useTypeSafeQuery";
import { isServer } from "../../lib/isServer";

interface BlockedFromQuizUsersProps {}

const UnbanButton = ({
  userId,
  offset,
}: {
  userId: string;
  offset: number;
}) => {
  const updater = useTypeSafeUpdateQuery();
  const { mutateAsync, isLoading } = useTypeSafeMutation("unbanFromQuiz", {
    onSuccess: () => {
      updater(["getBlockedFromQuizUsers", offset], (d) => {
        if (!d) {
          return d;
        }

        return {
          ...d,
          users: d.users.filter((x) => x.id !== userId),
        };
      });
    },
  });
  const { t } = useTypeSafeTranslation();

  return (
    <Button
      loading={isLoading}
      onClick={() => {
        mutateAsync([userId]);
      }}
      size={`small`}
    >
      Unban
    </Button>
  );
};
export const BlockedFromQuizUsersPage: React.FC<{
  offset: number;
  onLoadMore: (newOffset: number) => void;
  isLastPage: boolean;
  isOnlyPage: boolean;
}> = ({ offset, onLoadMore, isOnlyPage, isLastPage }) => {
  const { isLoading, data } = useTypeSafeQuery(
    ["getBlockedFromQuizUsers", offset],
    { enabled: false },
    [offset]
  );
  const { t } = useTypeSafeTranslation();

  if (isLoading) {
    return <CenterLoader />;
  }

  if (isOnlyPage && data?.users.length === 0) {
    return <InfoText className={`mt-2`}>no blocked users</InfoText>;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      {data.users.map((profile) => (
        <div
          className={`flex w-full flex py-4 px-2 items-center`}
          key={profile.id}
        >
          <div className="flex">
            <SingleUser size="md" src={profile.avatarUrl} />
          </div>
          <div className={`flex ml-4 flex-1 mr-4`}>
            <div className={`flex text-lg font-bold`}>
              {profile.displayName}
            </div>
            <div style={{ color: "" }} className={`flex font-mono font-light`}>
              &nbsp;(@{profile.username})
            </div>
          </div>
          <UnbanButton offset={offset} userId={profile.id} />
        </div>
      ))}
      {isLastPage && data.nextCursor ? (
        <div className={`flex flex items-center justify-center mt-4`}>
          <Button
            size="small"
            onClick={() => {
              onLoadMore(data.nextCursor!);
            }}
          >
            {t("common.loadMore")}
          </Button>
        </div>
      ) : null}
    </>
  );
};

export const BlockedFromQuizUsers: React.FC<
  BlockedFromQuizUsersProps
> = ({}) => {
  const [offsets, setOffsets] = React.useState([0]);
  const { t } = useTypeSafeTranslation();

  return (
    <>
      <div className={`flex mt-4 flex-col text-primary-100`}>
        <h1 className={`text-xl`}>Banned users</h1>
        <div className="flex flex-col">
          {offsets.map((offset, i) => (
            <BlockedFromQuizUsersPage
              key={offset}
              offset={offset}
              isLastPage={i === offsets.length - 1}
              isOnlyPage={offsets.length === 1}
              onLoadMore={(o) => setOffsets([...offsets, o])}
            />
          ))}
        </div>
      </div>
    </>
  );
};
