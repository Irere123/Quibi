import React from "react";

interface TagProps {
  className?: string;
  children?: React.ReactNode;
}

// @todo the tag doesn't really glow like in figma right now
export const Tag: React.FC<TagProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`cursor-pointer bg-primary-600 text-primary-200 text-xs px-2 justify-center items-center rounded flex ${className}`}
      style={{
        height: "22px",
      }}
    >
      {children}
    </div>
  );
};
