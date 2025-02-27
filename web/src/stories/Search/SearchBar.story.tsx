import React from "react";
import { Story } from "@storybook/react";
import { SearchBar, SearchBarProps } from "../../ui/search/SearchBar";
import { toStr } from "../utils/toStr";
import { toBoolean } from "../utils/toBoolean";

export default {
  title: "Search/SearchBar",
  argTypes: {
    onChange: { action: "changed" },
  },
};

const TheSearchBar: Story<SearchBarProps> = ({ placeholder, ...props }) => {
  return (
    <SearchBar
      placeholder={placeholder || "Search for schools, users or categories"}
      {...props}
    />
  );
};

export const Main = TheSearchBar.bind({});

Main.argTypes = {
  value: toStr(),
  placeholder: toStr(),
  mobile: toBoolean(),
  isLoading: toBoolean(),
};
