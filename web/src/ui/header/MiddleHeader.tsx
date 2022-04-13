import React from "react";
import { SearchController } from "../../modules/search/SearchController";

export const MiddleHeader: React.FC = () => {
  return (
    <div className="flex flex-1 justify-center w-full">
      <SearchController />
    </div>
  );
};
