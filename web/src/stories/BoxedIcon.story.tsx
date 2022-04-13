/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Story } from "@storybook/react";
import { BoxedIcon, BoxedIconProps } from "../ui/BoxedIcon";
import { AtIcon, HandIcon, HomeIcon } from "../icons";

export default {
  title: "Boxed Icon",
};

const TheBoxedIcon: Story<BoxedIconProps> = ({ ...props }) => {
  return (
    <div className="flex flex-row gap-2">
      <div className="flex m-1">
        <BoxedIcon {...props}>
          <HomeIcon />
        </BoxedIcon>
      </div>
      <div className="flex m-1">
        <BoxedIcon {...props}>
          <AtIcon />
        </BoxedIcon>
      </div>
      <div className="flex m-1">
        <BoxedIcon circle={true}>
          <HandIcon />
        </BoxedIcon>
      </div>
    </div>
  );
};

export const Main = TheBoxedIcon.bind({});
