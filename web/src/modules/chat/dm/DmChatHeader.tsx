import React from "react";

export const DmChatHeader: React.FC = () => {
  return (
    <div className="flex p-3 border-b-2 border-primary-700">
      <div className="flex flex-1">
        <p className="text-primary-100">@jamesLebron</p>
      </div>
      <div className="flex gap-2 items-center"></div>
    </div>
  );
};
