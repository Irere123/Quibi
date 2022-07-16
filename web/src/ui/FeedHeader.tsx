import React, { MouseEventHandler } from "react";
import { Button } from "./Button";

export interface FeedHeaderProps {
  title: string;
  actionTitle?: string;
  content?: React.ReactNode;
  onActionClicked?: MouseEventHandler<HTMLButtonElement>;
}

export const FeedHeader: React.FC<FeedHeaderProps> = ({
  content,
  title,
  onActionClicked,
  actionTitle,
}) => {
  return (
    <div className="flex flex-col justify-between px-3 mb-5 space-y-3">
      <h4 className="flex flex-1 justify-start text-primary-100">{title}</h4>
      {actionTitle && (
        <Button transition onClick={onActionClicked}>
          {actionTitle}
        </Button>
      )}
      {content && content}
    </div>
  );
};
