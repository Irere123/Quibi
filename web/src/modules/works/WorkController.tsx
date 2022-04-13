import React from "react";
import { ChoiceElement } from "../../ui/ChoiceElement";

interface WorkControllerProps {
  workType: "choice" | "text";
}

export const WorkController: React.FC<WorkControllerProps> = ({ workType }) => {
  let body;
  if (workType === "choice") {
    body = (
      <>
        <ChoiceElement
          choices={["addition", "subtraction", "division"]}
          num={1}
          title="How can you add numbers"
        />
        <ChoiceElement
          choices={["maths", "history", "music"]}
          num={2}
          title="What your favorite subject"
        />
      </>
    );
  } else if (workType === "text") {
    body = (
      <>
        <p>Text form</p>
      </>
    );
  }
  return (
    <div className="p-4">
      <p>Questions</p>
      <div className="flex flex-col space-y-3">{body}</div>
    </div>
  );
};
