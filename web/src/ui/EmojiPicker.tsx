/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { useEmojiPickerStore } from "../store/useEmojiPickerStore";
import { CustomEmote } from "../modules/chat/EmoteData";
import { useChatStore } from "../store/useChatStore";
interface EmojiPickerProps {
  emojiSet: CustomEmote[];
  onEmojiSelect: (emoji: CustomEmote) => void;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  emojiSet,
  onEmojiSelect,
}) => {
  const { message } = useChatStore();
  const {
    open,
    setOpen,
    setQueryMatches,
    queryMatches,
    keyboardHoveredEmoji,
    setKeyboardHoveredEmoji,
    setQuery,
  } = useEmojiPickerStore();

  // Open picker on colon syntax
  useEffect(() => {
    // colon syntax regex
    const colonSyntaxMatches = message.match(/^(?!.*\bRT\b)(?:.+\s)?:\w+$/i);

    if (colonSyntaxMatches) {
      const emojiQueries = colonSyntaxMatches[0].split(" ");
      const query = emojiQueries[emojiQueries.length - 1].toLowerCase();
      const queryMatchesE = emojiSet
        .filter(
          (e) =>
            e.keywords
              .map((k) => k.toLowerCase())
              .filter((k) => k.includes(query.replace(":", ""))).length
        )
        .slice(0, 7);

      setQueryMatches(queryMatchesE);
      setKeyboardHoveredEmoji(
        queryMatchesE.length ? queryMatchesE[0].name : null
      );
      setOpen(!!queryMatchesE.length);
      setQuery(query);
    } else {
      // Close picker if no matches
      setQueryMatches([]);
      setOpen(false);
    }
  }, [
    emojiSet,
    message,
    setKeyboardHoveredEmoji,
    setOpen,
    setQuery,
    setQueryMatches,
  ]);

  if (!open) return null;

  return (
    <div
      className={`flex bg-primary-100 rounded  flex-row flex-grow p-1 max-h-24 pt-2 px-2 absolute bottom-full w-full`}
    >
      <div
        className={` grid grid-cols-7 w-full pr-3 gap-2 max-h-16 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-thumb-primary-600`}
      >
        {(queryMatches.length ? queryMatches : emojiSet).map((emoji) => (
          <img
            key={emoji.name}
            src={emoji.imageUrl}
            className={`w-5 max-w-5 cursor-pointer ${
              keyboardHoveredEmoji === emoji.name
                ? "bg-primary-300 rounded p-1"
                : ""
            }`}
            onClick={() => onEmojiSelect(emoji)}
          />
        ))}
      </div>
    </div>
  );
};
