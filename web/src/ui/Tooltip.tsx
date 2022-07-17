import React, { useRef } from "react";

export interface TooltipProps {
  text: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  let tipRef = useRef<HTMLDivElement>(null);

  function handleMouseEnter() {
    tipRef.current!.style.opacity = "1";
    tipRef.current!.style.marginLeft = "20px";
  }

  function handleMouseLeave() {
    tipRef.current!.style.opacity = "0";
    tipRef.current!.style.marginLeft = "10px";
  }
  return (
    <div
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute whitespace-no-wrap bg-gradient-to-r from-secondary-300 to-secondary-200 text-black px-3 py-1 rounded flex items-center transition-all duration-150"
        style={{ left: "100%", opacity: 0 }}
        ref={tipRef}
      >
        <div
          className="bg-secondary-300 h-3 w-3 absolute"
          style={{ left: "-6px", transform: "rotate(45deg)" }}
        />
        {text}
      </div>
      {children}
    </div>
  );
};
