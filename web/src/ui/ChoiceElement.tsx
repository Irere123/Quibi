import React, { useState } from "react";
import { NativeRadio } from "./NativeRadio";

export type ChoiceElementProps = {
  num: number;
  title: string;
  choices: string[];
};

export const ChoiceElement: React.FC<ChoiceElementProps> = ({
  choices,
  num,
  title,
}) => {
  const [selectedChoice, setSelectedChoice] = useState("");
  console.log(selectedChoice);

  return (
    <div className="flex flex-col gap-2 bg-primary-50 px-4 py-2 rounded">
      <p className="text-bold">
        {num}. {title}
      </p>
      <div className="ml-4">
        {choices.map((c, idx) => (
          <NativeRadio
            title={c}
            checked={selectedChoice === c}
            key={idx}
            onClick={() => {
              setSelectedChoice(c);
            }}
          >
            {c}
          </NativeRadio>
        ))}
      </div>
    </div>
  );
};
