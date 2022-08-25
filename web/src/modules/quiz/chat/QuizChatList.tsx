/* eslint-disable @next/next/no-img-element */
import normalizeUrl from "normalize-url";
import React, { useContext, useEffect, useRef } from "react";
import { useVirtual, VirtualItem } from "react-virtual";
import { useConn } from "../../../hooks/useConn";
import { useCurrentQuizInfo } from "../../../hooks/useCurrentQuizInfo";
import { useTypeSafeTranslation } from "../../../hooks/useTypeSafeTranslation";
import { emoteMap } from "../../../shared-components/EmoteData";
import { SingleUser } from "../../../ui/Avatars";
import { Quiz, User } from "../../ws";
import { UserPreviewModalContext } from "../UserPreviewModalProvider";
import { useQuizChatMentionStore } from "./useQuizChatMentionStore";
import { useQuizChatStore } from "./useQuizChatStore";

interface ChatListProps {
  quiz: Quiz;
  userMap: Record<string, User>;
}

export const QuizChatList: React.FC<ChatListProps> = ({ quiz }) => {
  const { t } = useTypeSafeTranslation();
  const { setData } = useContext(UserPreviewModalContext);
  const { messages, toggleFrozen } = useQuizChatStore();
  const { isMod: iAmMod, isCreator: iAmCreator } = useCurrentQuizInfo();

  const me = useConn().user;
  const bottomRef = useRef<null | HTMLDivElement>(null);
  const chatListRef = useRef<null | HTMLDivElement>(null);

  const { isQuizChatScrolledToTop, setIsQuizhatScrolledToTop } =
    useQuizChatStore();

  // Only scroll into view if not manually scrolled to top
  useEffect(() => {
    if (!isQuizChatScrolledToTop) {
      chatListRef.current?.scrollTo(0, chatListRef.current.scrollHeight);
    }
  });

  const rowVirtualizer = useVirtual({
    overscan: 10,
    size: messages.length,
    parentRef: chatListRef,
    estimateSize: React.useCallback(() => 20, []),
  });

  return (
    <div
      className={`flex px-5 flex-1 overflow-y-auto chat-message-container scrollbar-thin scrollbar-thumb-primary-700`}
      ref={chatListRef}
      onScroll={() => {
        if (!chatListRef.current) return;
        const { scrollTop, offsetHeight, scrollHeight } = chatListRef.current;
        const isOnBottom =
          Math.abs(scrollTop + offsetHeight - scrollHeight) <= 1;

        setIsQuizhatScrolledToTop(!isOnBottom);
        if (isOnBottom) {
          useQuizChatMentionStore.getState().resetIAmMentioned();
        }
      }}
      onMouseEnter={toggleFrozen}
      onMouseLeave={toggleFrozen}
    >
      <div
        className="w-full h-full mt-auto"
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.virtualItems.map(
          ({ index: idx, start, measureRef }: VirtualItem) => {
            const index = messages.length - idx - 1;
            return (
              <div
                ref={measureRef}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${start}px)`,
                }}
                key={messages[index].id}
                className="py-1"
              >
                <div className={`flex flex-col flex-shrink-0 w-full`}>
                  <div className={`flex items-center px-1`}>
                    <div
                      className={`block break-words overflow-hidden max-w-full items-start flex-1 text-primary-100`}
                      key={messages[index].id}
                    >
                      <button
                        onClick={() => {
                          setData({
                            userId: messages[index].userId,
                            message:
                              (me?.id === messages[index].userId ||
                                iAmCreator ||
                                (iAmMod &&
                                  quiz.creatorId !== messages[index].userId)) &&
                              !messages[index].deleted
                                ? messages[index]
                                : undefined,
                          });
                        }}
                        // DO NOT CHANGE FONT ON THIS BUTTON, IT CRASHES FIREFOX
                        className={`inline hover:underline font-bold focus:outline-none`}
                        style={{
                          textDecorationColor: messages[index].color,
                          color: messages[index].color,
                        }}
                      >
                        {messages[index].username}
                      </button>
                      <span className={`inline mr-1`}>: </span>
                      <div className={`inline mr-1 space-x-1`}>
                        {messages[index].deleted ? (
                          <span className="inline text-primary-300">
                            [{t("modules.quizChat.messageDeletion.message")}{" "}
                            {messages[index].deleterId ===
                            messages[index].userId
                              ? t("modules.quizChat.messageDeletion.retracted")
                              : t("modules.quizChat.messageDeletion.deleted")}
                            ]
                          </span>
                        ) : (
                          messages[index].tokens.map(({ t: token, v }, i) => {
                            switch (token) {
                              case "text":
                                return (
                                  <React.Fragment
                                    key={i}
                                  >{`${v} `}</React.Fragment>
                                );

                              case "emote":
                                return emoteMap[v.toLowerCase()] ? (
                                  <React.Fragment key={i}>
                                    <img
                                      className="inline"
                                      alt={`:${v}:`}
                                      src={emoteMap[v.toLowerCase()]}
                                    />
                                  </React.Fragment>
                                ) : (
                                  ":" + v + ":"
                                );

                              case "mention":
                                return (
                                  <React.Fragment key={i}>
                                    <button
                                      onClick={() => {
                                        setData({ userId: v });
                                      }}
                                      className={`inline flex-1 focus:outline-none ${
                                        v === me?.username
                                          ? "bg-accent text-button px-1 rounded text-md"
                                          : ""
                                      }`}
                                      style={{
                                        textDecorationColor:
                                          v === me?.username
                                            ? ""
                                            : messages[index].color,
                                        color:
                                          v === me?.username
                                            ? ""
                                            : messages[index].color,
                                      }}
                                    >
                                      @{v}
                                    </button>{" "}
                                  </React.Fragment>
                                );
                              case "link":
                                try {
                                  return (
                                    <a
                                      target="_blank"
                                      rel="noreferrer noopener"
                                      href={v}
                                      className={`inline flex-1 hover:underline text-accent`}
                                      key={i}
                                    >
                                      {normalizeUrl(v, { stripProtocol: true })}{" "}
                                    </a>
                                  );
                                } catch {
                                  return null;
                                }
                              case "block":
                                return (
                                  <React.Fragment key={i}>
                                    <span
                                      className={
                                        "inline bg-primary-600 px-1 rounded whitespace-pre-wrap font-mono"
                                      }
                                    >
                                      {v}
                                    </span>{" "}
                                  </React.Fragment>
                                );
                              default:
                                return null;
                            }
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};
