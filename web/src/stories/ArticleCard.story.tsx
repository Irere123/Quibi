/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import avatar from "../img/avatar.jpg";
import { Story } from "@storybook/react";
import { ArticleCard, ArticleCardProps } from "../ui/ArticleCard";

export default {
  title: "ArticleCard",
  component: ArticleCard,
};

const TheAlert: Story<ArticleCardProps> = ({
  summary,
  date,
  onClick,
  schoolName,
  tags,
}) => (
  <div className="flex">
    <ArticleCard
      summary={summary}
      date={date}
      schoolName={schoolName}
      user={{
        avatarUrl: avatar as any,
        displayName: "Irere Emmanuel",
        online: true,
      }}
      tags={tags}
      onClick={onClick}
    />
  </div>
);

export const Main = TheAlert.bind({});

Main.args = {
  summary:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis nunc sit pulvinar ut tellus sit tincidunt faucibus sapien.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis nunc sit pulvinar ut tellus sit tincidunt faucibus sapien.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis nunc sit pulvinar ut tellus sit tincidunt faucibus sapien. ⚡️",
  tags: ["tech", "music", "ice"],
  schoolName: "neox_arts",
  date: "Today",
  onClick: () => {},
};
