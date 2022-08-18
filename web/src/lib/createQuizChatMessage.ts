import normalizeUrl from "normalize-url";
import { User } from "../modules/ws";
import { linkRegex, codeBlockRegex } from "./constants";

export const createQuizChatMessage = (
  message: string,
  mentions: User[],
  roomUsers: User[] = []
) => {
  const tokens = [] as unknown as [
    {
      t: string;
      v: string;
    }
  ];

  const testAndPushToken = (item: string) => {
    const isLink = linkRegex.test(item);
    const withoutAt = item.replace(/@|#/g, "");
    const isMention = mentions.find((m) => withoutAt === m.username);

    if (isLink) {
      tokens.push({
        t: "link",
        v: normalizeUrl(item),
      });
    } else if (isMention) {
      tokens.push({
        t: "mention",
        v: withoutAt,
      });
    } else {
      tokens.push({
        t: "text",
        v: item,
      });
    }
  };

  const match = message.matchAll(new RegExp(codeBlockRegex, "g"));
  let matchResult = match.next();

  // For message that matches the regex pattern of code blocks.
  if (!matchResult.done) {
    const splitMessage = message.split(codeBlockRegex);

    splitMessage.forEach((text, index) => {
      // First and last index is empty string while split using the code block regex.
      if (!index && index === splitMessage.length - 1) {
        return;
      }

      const trimmed = text.trim();

      if (!matchResult.done && text === matchResult.value[1]) {
        if (trimmed) {
          tokens.push({
            t: "block",
            v: trimmed,
          });
        } else {
          tokens.push({
            t: "text",
            v: matchResult.value[0],
          });
        }

        matchResult = match.next();
      } else {
        text.split(" ").forEach((item) => {
          testAndPushToken(item);
        });
      }
    });
  } else {
    message.split(" ").forEach((item) => testAndPushToken(item));
  }

  return {
    tokens,
  };
};
