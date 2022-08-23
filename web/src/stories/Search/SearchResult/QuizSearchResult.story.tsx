import React from "react";
import { Story } from "@storybook/react";

import {
  QuizSearchResultProps,
  QuizSearchResult,
} from "../../../ui/search/SearchResult";

export default {
  title: "Search/SearchResult/QuizSearchResult",
  component: QuizSearchResult,
};

const quiz = {
  displayName: "The monthly QandA",
  userCount: 355,
  hosts: [
    { id: 1, displayName: "Bill gates", numFollowers: 123 },
    { id: 1, displayName: "Elon musk", numFollowers: 123 },
  ],
};

export const Main: Story<QuizSearchResultProps> = ({ ...props }) => (
  <QuizSearchResult {...props} quiz={props.quiz || quiz} />
);

Main.bind({});
