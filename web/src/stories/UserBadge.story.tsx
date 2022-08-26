import React from "react";
import { Story } from "@storybook/react";
import { UserBadge, UserBadgeProps } from "../ui/UserBadge";
import { Discord } from "../icons";
import { toEnum } from "./utils/toEnum";

export default {
  title: "UserBadge",
};

const TheUserBadge: Story<UserBadgeProps> = ({ color, variant }) => {
  return (
    <div className="flex flex-row">
      <div className="flex">
        <UserBadge>ƉC</UserBadge>
      </div>
      <div className="flex">
        <UserBadge>ƉS</UserBadge>
      </div>
      <div className="flex">
        <UserBadge variant={variant} color={color}>
          <Discord width={12} />
        </UserBadge>
      </div>
    </div>
  );
};

export const Main = TheUserBadge.bind({});

Main.argTypes = {
  variant: toEnum(["primary", "secondary"]),
  color: toEnum(["black", "grey", "white"]),
};
