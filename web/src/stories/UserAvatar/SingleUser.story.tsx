/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Story } from "@storybook/react";

import { SingleUser, AvatarProps } from "../../ui/UserAvatar/SingleUser";

import src from "../../img/avatar.jpg";

export default {
  title: "UserAvatar/SingleUser",
  component: SingleUser,
};

export const Default: Story<AvatarProps> = ({ ...props }) => (
  <SingleUser {...props} src={src as any} />
);

Default.bind({});
