/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import avatar from "../img/avatar2.jpg";
import { Story } from "@storybook/react";
import { Card, CardProps } from "../ui/Card";
import { Notification } from "../icons";

export default {
  title: "Card",
  argTypes: { onClick: { action: "clicked" } },
};

const TheFeedCard: Story<CardProps> = ({
  title = "Why CI & CD is important when working with a teamhewhewhyewhjydfshjdfshjdfhjdfhjdfhjfdhjdfhjjjjjjjjjj",
  subtitle = "Terry Owen, Grace Abraham, Richard Cameron",
}) => {
  return (
    <div className="flex flex-col gap-3">
      <Card
        icon={<Notification />}
        subtitle={subtitle}
        title={title}
        date={Date.now()}
      />
    </div>
  );
};

const TheLiveCard: Story<CardProps> = ({
  title = "Live with u/DeepFuckingValue",
  subtitle = "Terry Owen, Grace Abraham, Richard Cameron",
}) => {
  return (
    <div className="flex flex-col gap-4">
      <Card
        subtitle={subtitle}
        title={title}
        avatars={[avatar as any, avatar as any]}
        live={true}
        people={12344}
      />
      <Card
        subtitle={subtitle}
        title={title}
        avatars={[avatar as any, avatar as any]}
        tags={["tech", "music"]}
        live={true}
        people={1234}
      />
      <Card
        subtitle={"Terry Owen"}
        title={title}
        avatars={[avatar as any]}
        tags={["tech", "music"]}
        live={true}
        people={123334}
      />
    </div>
  );
};

export const LiveCard = TheLiveCard.bind({});
export const FeedCard = TheFeedCard.bind({});
