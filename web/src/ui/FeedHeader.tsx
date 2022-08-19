import React from "react";

export interface FeedHeaderProps {
  title?: string;
  content?: React.ReactNode;
}

export const FeedHeader: React.FC<FeedHeaderProps> = ({ content, title }) => {
  return (
    <div className="flex flex-col justify-between mb-2">
      <h4 className="flex flex-1 justify-start text-primary-100">{title}</h4>
      {content && content}
    </div>
  );
};
