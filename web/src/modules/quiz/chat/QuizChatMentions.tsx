import React, { useEffect } from "react";
import { User } from "@quibi/client";
import { mentionRegex } from "../../../lib/constants";
import { useConn } from "../../../hooks/useConn";
import { SingleUser } from "../../../ui/Avatars";
import { useQuizChatMentionStore } from "./useQuizChatMentionStore";
import { useQuizChatStore } from "./useQuizChatStore";

interface QuizChatMentionsProps {
  users: any[];
}

export const QuizChatMentions: React.FC<QuizChatMentionsProps> = ({
  users,
}) => {
  const me = useConn().user;

  const { message, setMessage } = useQuizChatStore();

  const {
    activeUsername,
    setActiveUsername,
    queriedUsernames,
    setQueriedUsernames,
    mentions,
    setMentions,
  } = useQuizChatMentionStore();

  function addMention(m: User) {
    setMentions([...mentions, m]);

    setMessage(
      message.substring(0, message.lastIndexOf("@") + 1) + m.username + " "
    );
    setQueriedUsernames([]);

    // Re-focus input after mention was clicked
    document.getElementById("quiz-chat-input")?.focus();
  }

  useEffect(() => {
    // regex to match mention patterns
    const mentionMatches = message.match(mentionRegex);

    // query usernames for matched patterns
    if (mentionMatches && me) {
      const mentionsList = mentionMatches[0].replace(/@|#/g, "").split(" ");
      const useMention = mentionsList[mentionsList.length - 1];

      // hide usernames list if user continues typing without selecting
      if (message[message.lastIndexOf(useMention) + useMention.length]) {
        setQueriedUsernames([]);
      } else {
        const usernameMatches = users.filter(
          ({ id, username, displayName }) =>
            (username?.toLowerCase().includes(useMention?.toLowerCase()) ||
              displayName?.toLowerCase().includes(useMention?.toLowerCase())) &&
            me.id !== id
        );

        const firstFive = usernameMatches.slice(0, 5);
        setQueriedUsernames(firstFive);
        if (firstFive.length) setActiveUsername(firstFive[0].id);
      }
    } else {
      // Hide mentions when message is sent
      setQueriedUsernames([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  if (queriedUsernames.length) {
    return (
      <div className={`flex flex-col pb-1 bg-primary-800`}>
        {queriedUsernames.map((m) => (
          <button
            className={`flex py-3 items-center px-6 justify-start focus:outline-none truncate ${
              activeUsername === m.id ? "bg-primary-700" : ""
            }`}
            key={m.id}
            onClick={() => addMention(m)}
          >
            <SingleUser size="xs" src={m.avatarUrl} />
            <div className={`pl-3 m-0 text-primary-200 truncate`}>
              {m.displayName}
              {m.displayName !== m.username ? ` (${m.username})` : null}
            </div>
          </button>
        ))}
      </div>
    );
  }

  return <></>;
};
