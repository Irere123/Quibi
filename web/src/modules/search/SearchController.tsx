import React, { useState } from "react";
import Downshift from "downshift";
import usePageVisibility from "../../hooks/usePageVisibility";
import { SearchBar } from "../../ui/search/SearchBar";
import { SearchOverlay } from "../../ui/search/SearchOverlay";
import { useMediaQuery } from "react-responsive";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";

export const SearchController: React.FC = () => {
  const [rawText, setText] = useState("");
  const visible = usePageVisibility();
  const isOverflowing = useMediaQuery({ maxWidth: 475 });
  const { t } = useTypeSafeTranslation();

  return (
    <Downshift
      onChange={(selection) => {
        if (!selection) {
          return;
        }
      }}
      onInputValueChange={(v) => {
        if (visible) {
          setText(v);
        }
      }}
      itemToString={(item) => {
        if (!item) {
          return "";
        } else if ("username" in item) {
          return item.username;
        }
        return item.name;
      }}
    >
      {({ getInputProps, getMenuProps, isOpen, getRootProps }) => (
        <div className="relative w-full z-10 flex flex-col">
          <SearchBar
            {...getInputProps()}
            value={rawText}
            placeholder={
              isOverflowing
                ? t("components.search.placeholderShort")
                : t("components.search.placeholder")
            }
            isLoading={false}
          />
          {isOpen ? (
            <SearchOverlay
              {...getRootProps({ refKey: "ref" }, { suppressRefError: true })}
            >
              <ul
                className="w-full px-2 mb-2 mt-7  rounded-b-8 overflow-y-auto"
                {...getMenuProps({ style: { top: 0 } })}
              ></ul>
            </SearchOverlay>
          ) : null}
        </div>
      )}
    </Downshift>
  );
};
