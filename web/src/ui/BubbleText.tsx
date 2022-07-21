import * as React from "react";

export interface BubbleTextProps {
  children: React.ReactNode;
}

export const BubbleText: React.FC<BubbleTextProps> = ({ children }) => {
  return (
    <div className="text-primary-200 font-bold items-center">
      <div className={`inline-block mr-2 w-2 h-2 rounded-full bg-accent`}></div>
      {children}
    </div>
  );
};
