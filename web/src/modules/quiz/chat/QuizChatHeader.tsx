import React, { useState } from "react";
import { ChevronLeft } from "react-feather";

export const QuizChatHeader: React.FC<{ description: string }> = ({
  description,
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="px-3">
      <div
        className="flex text-primary-100 text-lg"
        onClick={() => setOpen(!open)}
      >
        <p className="flex flex-1 cursor-pointer">Description</p>
        <button className="flex" onClick={() => setOpen(!open)}>
          <ChevronLeft
            className={`transform ${
              open ? "-rotate-90 mt-auto" : "mr-auto rotate-90"
            } cursor-pointer`}
            width={20}
            height={20}
          />
        </button>
      </div>
      {open && <p className="text-primary-200 text-sm ml-2">{description}</p>}
    </div>
  );
};
