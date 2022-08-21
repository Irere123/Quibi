/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Story } from "@storybook/react";
import { Alert, AlertProps } from "../ui/Alert";
import { toEnum } from "./utils/toEnum";

export default {
  title: "Alert",
  component: Alert,
};

const TheAlert: Story<AlertProps> = ({ message }) => (
  <div className="flex">
    <Alert message={message} onClose={() => {}} />
  </div>
);

export const Main = TheAlert.bind({});

Main.args = {
  message: "This is the alert message",
};

Main.argTypes = {
  type: toEnum(["info", "error", "warning", "success"]),
};
