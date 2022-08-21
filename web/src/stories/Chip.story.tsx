/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Story } from "@storybook/react";
import { Chip, ChipProps } from "../ui/Chip";
import { toEnum } from "./utils/toEnum";
import { CompassIcon } from "../icons";

export default {
  title: "Chip",
  component: Chip,
};

const TheChip: Story<ChipProps> = ({ label }) => (
  <div className="flex">
    <Chip label={label} onClick={() => {}} />
  </div>
);

const TheChipWithIcon: Story<ChipProps> = ({ label = "Explore" }) => (
  <div className="flex">
    <Chip label={label} onClick={() => {}} icon={<CompassIcon />} />
  </div>
);

export const Main = TheChip.bind({});
export const Icon = TheChipWithIcon.bind({});

Main.args = {
  label: "Programming",
};

Main.argTypes = {
  size: toEnum(["default", "sm"]),
};
