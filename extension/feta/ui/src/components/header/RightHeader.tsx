import React from "react";

export interface RightHeaderProps {}

const RightHeader: React.FC<RightHeaderProps> = () => {
  return (
    <div className="flex space-x-4 items-center justify-end focus:outline-no-chrome w-full">
      <div className="flex justify-center items-center bg-primary-300 p-2 rounded-full border-2 border-primary-300 ">
        <h4>HQ</h4>
      </div>
    </div>
  );
};

export default RightHeader;
