import React, { MouseEventHandler } from "react";
import { Button } from "./Button";

export interface FeedHeaderProps {
  title: string;
  actionTitle?: string;
  onActionClicked?: MouseEventHandler<HTMLButtonElement>;
}

export const FeedHeader: React.FC<FeedHeaderProps> = ({
  title,
  onActionClicked,
  actionTitle,
}) => {
  return (
    <div className="flex justify-between items-end mb-5 ">
      <h4>{title}</h4>
      {actionTitle && (
        <Button transition onClick={onActionClicked}>
          {actionTitle}
        </Button>
      )}
    </div>
  );
};
