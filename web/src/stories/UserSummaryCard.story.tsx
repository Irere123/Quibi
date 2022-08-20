import React from "react";
import { Story } from "@storybook/react";
import avatar from "../img/avatar.jpg";
import { UserSummaryCard, UserSummaryCardProps } from "../ui/UserSummaryCard";
import { Google } from "../icons";

export default {
  title: "UserSummaryCard",
  component: UserSummaryCard,
};

const userSummary: UserSummaryCardProps = {
  onClick: () => {},
  avatarUrl: avatar as any,
  displayName: "Irere Emmanuel",
  username: "irere",
  numFollowing: 89,
  numFollowers: 3400,
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis nunc sit pulvinar ut tellus sit tincidunt faucibus sapien. ⚡️",
  website: "https://irere.vercel.app",
  isOnline: true,
  badges: [
    { content: "QC", variant: "primary", color: "grey" },
    { content: "QS", variant: "primary", color: "white" },
    {
      content: <Google width={12} style={{ color: "#fff" }} />,
      variant: "secondary",
      color: "grey",
    },
  ],
};

export const Main: Story<UserSummaryCardProps> = ({ ...props }) => (
  <UserSummaryCard {...props} {...userSummary} />
);

Main.bind({});
