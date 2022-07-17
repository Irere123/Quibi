import React from "react";
import { Story } from "@storybook/react";
import { FeedCard as FeedCard1, FeedCardProps } from "../ui/FeedCard";
import { Notification } from "../icons";

export default {
  title: "Feed Card",
};

const FeedCard: Story<FeedCardProps> = ({
  title = "Why CI & CD is important when working with a team",
  subtitle = "Terry Owen, Grace Abraham, Richard Cameron",
}) => {
  return (
    <div className="flex">
      <FeedCard1
        headIcon={<Notification />}
        subtitle={subtitle}
        title={title}
      />
    </div>
  );
};

export const Main = FeedCard.bind({});
