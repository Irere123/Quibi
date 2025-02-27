import React from "react";
import { Story } from "@storybook/react";

import { MultipleUsers, AvatarProps } from "../../ui/Avatars/MultipleUsers";

import src from "../../img/avatar.jpg";

export default {
  title: "UserAvatar/MultipleUsers",
  component: MultipleUsers,
};

export const Default: Story<AvatarProps> = ({ ...props }) => (
  <MultipleUsers {...props} srcArray={[src as any, src, src]} />
);

Default.bind({});
