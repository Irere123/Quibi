import React from "react";

export interface PageHeaderProps {
  title?: string;
  content?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ content, title }) => {
  return (
    <div className="flex mb-5">
      <h4 className="flex flex-1 text-primary-100 ">{title}</h4>
      <div className="flex gap-3">{content}</div>
    </div>
  );
};
