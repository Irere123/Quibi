import React from "react";
import { Story } from "@storybook/react";

import {
  UserSearchResult,
  UserSearchResultProps,
} from "../../../ui/search/SearchResult";

export default {
  title: "Search/SearchResult/UserSearchResult",
  component: UserSearchResult,
};

import avatar from "../../../img/avatar.jpg";

const user = {
  avatar,
  displayName: "The Real Irere",
  username: "irere",
  isOnline: true,
};

export const Main: Story<UserSearchResultProps> = ({ ...props }) => (
  <UserSearchResult {...props} user={props.user || user} />
);

Main.bind({});
