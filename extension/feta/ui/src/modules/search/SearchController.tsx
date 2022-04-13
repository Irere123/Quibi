import React, { useState } from "react";
import { SearchBar } from "../../components/search/SearchBar";

export const SearchController: React.FC = () => {
  const [rawText, setText] = useState("");

  return (
    <div className="relative w-full z-10 flex flex-col">
      <SearchBar
        value={rawText}
        placeholder={"Search for schools or users"}
        isLoading={false}
      />
    </div>
  );
};
