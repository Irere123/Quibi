import React from "react";
import { kFormatter } from "../../lib/kFormatter";
import { Tag } from "../../ui/Tag";

export const RightPanel: React.FC = () => {
  return (
    <div className="flex pt-4 px-4 bg-primary-800 rounded">
      <div className="flex">
        <p className="text-primary-100">Hello world</p>
        <Tag>{kFormatter(123)}</Tag>
      </div>
    </div>
  );
};
