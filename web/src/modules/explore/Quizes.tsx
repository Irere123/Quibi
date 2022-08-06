import { useRouter } from "next/router";
import React from "react";
import avatar from "../../img/avatar2.jpg";
import avatar2 from "../../img/avatar3.jpg";
import { Card } from "../../ui/Card";
import { v4 } from "uuid";
import { isServer } from "../../lib/isServer";
import { useTypeSafeQuery } from "../../hooks/useTypeSafeQuery";
import { InfoText } from "../../ui/InfoText";
import { Button } from "../../ui/Button";

export const Quizes: React.FC<{
  cursor: number;
  isLastPage: boolean;
  isOnlyPage: boolean;
  onLoadMore: (o: number) => void;
}> = ({ cursor, isLastPage, isOnlyPage, onLoadMore }) => {
  const { push } = useRouter();
  const { isLoading, data } = useTypeSafeQuery(
    ["getTopPublicQuizes", cursor],
    {
      staleTime: Infinity,
      enabled: !isServer,
      refetchOnMount: "always",
      refetchInterval: 10000,
    },
    [cursor]
  );

  if (isLoading) {
    return <InfoText>Loading...</InfoText>;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      {data.quizes.map((quiz: any) => (
        <Card
          key={quiz.id}
          title={quiz.name}
          avatars={
            "peoplePreviewList" in quiz
              ? quiz.peoplePreviewList
                  .map((x: any) => x.avatarUrl!)
                  .slice(0, 3)
                  .filter((x: any) => x !== null)
              : []
          }
          live={true}
          subtitle={
            "peoplePreviewList" in quiz
              ? quiz.peoplePreviewList
                  .slice(0, 3)
                  .map((x: any) => x.displayName)
                  .join(", ")
              : ""
          }
          people={quiz.numPeopleInside}
          onClick={() => push(`/quiz/${quiz.id}}`)}
        />
      ))}
      {isLastPage && data.nextCursor ? (
        <div className={`flex justify-center py-5`}>
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
