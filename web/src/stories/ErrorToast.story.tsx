import React from "react";
import { Story } from "@storybook/react";
import { ErrorToast, ErrorMessageProps } from "../ui/ErrorToast";
import { toStr } from "./utils/toStr";
import { toBoolean } from "./utils/toBoolean";

export default {
  title: "ErrorMessage",
};

const TheErrorMessage: Story<ErrorMessageProps> = ({ message }) => {
  return <ErrorToast message={message} onClose={() => {}} />;
};

export const Main = TheErrorMessage.bind({});

Main.args = {
  message: "Websocket got disconnected",
};

Main.argTypes = {
  message: toStr(),
};
