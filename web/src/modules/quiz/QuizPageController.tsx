import React from "react";
import { MiddlePanel } from "../layouts/GridPanels";

interface QuizPageControllerProps {}

export const QuizPageController: React.FC<QuizPageControllerProps> = () => {
  return (
    <MiddlePanel>
      <p>Hello world</p>
    </MiddlePanel>
  );
};
