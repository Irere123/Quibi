import React, { useState } from "react";
import Downshift from "downshift";
import usePageVisibility from "../../hooks/usePageVisibility";
import { SearchBar } from "../../ui/search/SearchBar";
import { SearchOverlay } from "../../ui/search/SearchOverlay";
import { useMediaQuery } from "react-responsive";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { useRouter } from "next/router";
import { useDebounce } from "use-debounce";
import { useTypeSafeQuery } from "../../hooks/useTypeSafeQuery";
import { InfoText } from "../../ui/InfoText";
import { UserSearchResult } from "../../ui/search/SearchResult";

export const SearchController: React.FC = () => {
  const { push } = useRouter();
  const [rawText, setText] = useState("");
  const visible = usePageVisibility();
  const [text] = useDebounce(rawText, 200);
  const { t } = useTypeSafeTranslation();
  const isOverflowing = useMediaQuery({ maxWidth: 475 });
  let enabled = false;
  const isUsernameSearch = text.startsWith("@");

  if (text && isUsernameSearch && text.trim().length > 2) {
    enabled = true;
  }
  if (text && !isUsernameSearch && text.trim().length > 1) {
    enabled = true;
  }

  const { data, isLoading } = useTypeSafeQuery(
    "search",
    { query: text },
    { enabled }
  );

  if (isLoading) {
    return <InfoText>Loading...</InfoText>;
  }
  const results = data ? [...data.users] : [];

  return (
    <Downshift<any>
      onChange={(selection) => {
        if (!selection) {
          return;
        }

        if ("username" in selection) {
          push(`/u/[username]`, `/u/${selection.username}`);
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
      {({
        getInputProps,
        getMenuProps,
        isOpen,
        getRootProps,
        highlightedIndex,
        getItemProps,
      }) => (
        <div className="relative w-full z-10 flex flex-col gap-3">
          <SearchBar
            {...getInputProps()}
            value={rawText}
            placeholder={
              isOverflowing
                ? t("components.search.placeholderShort")
                : t("components.search.placeholder")
            }
            isLoading={isLoading}
          />
          {isOpen ? (
            <SearchOverlay
              {...getRootProps({ refKey: "ref" }, { suppressRefError: true })}
            >
              <ul
                className="w-full px-2 mb-2 mt-7  rounded-b-8 overflow-y-auto"
                {...getMenuProps({ style: { top: 0 } })}
              >
                {data?.users.length === 0 ? (
                  <InfoText className="p-3">No results</InfoText>
                ) : null}
                {results.map((item, index) =>
                  "username" in item ? (
                    // eslint-disable-next-line react/jsx-key
                    <li
                      data-testid={`search:user:${item.username}`}
                      {...getItemProps({
                        key: item.id,
                        index,
                        item,
                      })}
                    >
                      <UserSearchResult
                        user={item}
                        className={
                          highlightedIndex === index
                            ? "bg-primary-700"
                            : "bg-primary-800"
                        }
                      />
                    </li>
                  ) : null
                )}
              </ul>
            </SearchOverlay>
          ) : null}
        </div>
      )}
    </Downshift>
  );
};
