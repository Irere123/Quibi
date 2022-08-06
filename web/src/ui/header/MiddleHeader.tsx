import React from "react";
import { useScreenType } from "../../hooks/useScreenType";
import { SearchController } from "../../modules/search/SearchController";
import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";

export const MiddleHeader: React.FC = () => {
  const screenType = useScreenType();

  return (
    <div className="flex flex-1 justify-center w-full">
      {screenType === "fullscreen" ? (
        <div className="flex mr-4">
          <LeftHeader />
        </div>
      ) : null}
      <SearchController />
      {screenType === "1-cols" || screenType === "fullscreen" ? (
        <div className="flex ml-4">
          <RightHeader />
        </div>
      ) : null}
    </div>
  );
};
