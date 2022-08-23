import React from "react";
import { Story } from "@storybook/react";

import {
  SearchOverlay,
  SearchOverlayProps,
} from "../../ui/search/SearchOverlay";
import { SearchBar } from "../../ui/search/SearchBar";

export default {
  title: "Search/SearchOverlay",
  component: SearchOverlay,
};

export const Main: Story<SearchOverlayProps> = ({ children }) => (
  <SearchOverlay>{children || <SearchBar />}</SearchOverlay>
);

Main.bind({});
