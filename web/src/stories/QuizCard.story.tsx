/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import avatar from "../img/avatar.jpg";
import { Story } from "@storybook/react";
import { QuizCard as Card, QuizCardProps } from "../ui/QuizCard";

export default {
  title: "Card",
  argTypes: { onClick: { action: "clicked" } },
  component: Card,
};

const TheQuizCard: Story<QuizCardProps> = ({
  title = "Why CI & CD is important when working with a team",
  subtitle = "Terry Owen, Grace Abraham, Richard Cameron",
}) => {
  return (
    <div className="flex flex-col gap-3">
      <Card
        title={title}
        numPeopleInside={12334}
        avatars={[avatar, avatar as any]}
        subtitle={subtitle}
        tags={["tech", "french"]}
      />
    </div>
  );
};

export const QuizCard = TheQuizCard.bind({});
