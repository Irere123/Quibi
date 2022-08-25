import { useRouter } from "next/router";
import React, { ReactNode, useContext, useEffect } from "react";
import { showErrorToast } from "../lib/showErrorToast";
import { useQuizChatMentionStore } from "../modules/quiz/chat/useQuizChatMentionStore";
import {
  QuizChatMessageToken,
  useQuizChatStore,
} from "../modules/quiz/chat/useQuizChatStore";
import { WebSocketContext } from "../modules/ws/WebSocketProvider";
import { invitedToQuizConfirm } from "../shared-components/InvitedToJoinQuizModal";
import { useCurrentQuizIdStore } from "../stores/useCurentQuizIdStore";
import { useTypeSafeUpdateQuery } from "./useTypeSafeUpdateQuery";

export const useWsMainHandler = () => {
  const { push } = useRouter();
  const { conn } = useContext(WebSocketContext);
  const updateQuery = useTypeSafeUpdateQuery();

  useEffect(() => {
    if (!conn) {
      return;
    }

    const unsubs = [
      conn.addListener<any>("error", (message) => {
        showErrorToast(message, "error");
      }),

      conn.addListener<any>("chat_user_unbanned", ({ userId }) => {
        useQuizChatStore.getState().unbanUser(userId);
      }),
      conn.addListener<any>("chat_user_banned", ({ userId }) => {
        useQuizChatStore.getState().addBannedUser(userId);
      }),

      conn.addListener<any>("invitation_to_quiz", (value) => {
        invitedToQuizConfirm(value, push);
      }),

      conn.addListener<any>("someone_you_follow_created_a_quiz", (value) => {
        invitedToQuizConfirm(value, push);
      }),

      conn.addListener<any>("new_quiz_chat_msg", ({ msg }) => {
        const { open } = useQuizChatStore.getState();
        useQuizChatStore.getState().addMessage(msg);
        const { isQuizChatScrolledToTop } = useQuizChatStore.getState();
        if (
          (!open || !document.hasFocus() || isQuizChatScrolledToTop) &&
          !!msg.tokens.filter(
            (t: QuizChatMessageToken) =>
              t.t === "mention" &&
              t.v?.toLowerCase() === conn.user.username.toLowerCase()
          ).length
        ) {
          useQuizChatMentionStore.getState().incrementIAmMentioned();
        }
      }),

      conn.addListener<any>("message_deleted", ({ messageId, deleterId }) => {
        const { messages, setMessages } = useQuizChatStore.getState();
        setMessages(
          messages.map((m) => ({
            ...m,
            deleted: m.id === messageId || !!m.deleted,
            deleterId: m.id === messageId ? deleterId : m.deleterId,
          }))
        );
      }),

      conn.addListener<any>("quiz_destroyed", ({ quizId }) => {
        useCurrentQuizIdStore
          .getState()
          .setCurrentQuizId((id) => (id === quizId ? null : id));

        updateQuery(["joinQuizAndGetInfo", quizId], (data) => ({
          // @todo change to an error code
          error: "quiz gone",
        }));
      }),

      conn.addListener<any>(
        "quiz_privacy_change",
        ({ quizId, isPrivate, name }) => {
          updateQuery(["joinQuizAndGetInfo", quizId], (data) =>
            !data || "error" in data
              ? data
              : {
                  ...data,
                  quiz: {
                    ...data.quiz,
                    name,
                    isPrivate,
                  },
                }
          );
        }
      ),

      conn.addListener<any>(
        "quiz_chat_throttle_change",
        ({ quizId, chatThrottle, name }) => {
          updateQuery(["joinQuizAndGetInfo", quizId], (data) =>
            !data || "error" in data
              ? data
              : {
                  ...data,
                  quiz: {
                    ...data.quiz,
                    name,
                    chatThrottle,
                  },
                }
          );
        }
      ),

      conn.addListener<any>(
        "quiz_chat_mode_changed",
        ({ quizId, chatMode }) => {
          updateQuery(["joinQuizAndGetInfo", quizId], (data) =>
            !data || "error" in data
              ? data
              : {
                  ...data,
                  quiz: {
                    ...data.quiz,
                    chatMode,
                  },
                }
          );
        }
      ),

      conn.addListener<any>("user_left_quiz", ({ userId, quizId }) => {
        updateQuery(["joinQuizAndGetInfo", quizId], (data) => {
          if (data && "error" in data) {
            return data;
          }

          const { [userId]: _, ...asm } = data.activeSpeakerMap;
          return {
            ...data,
            activeSpeakerMap: asm,
            quiz: {
              ...data.quiz,
              peoplePreviewList: data.quiz.peoplePreviewList.filter(
                (x) => x.id !== userId
              ),
              numPeopleInside: data.quiz.numPeopleInside - 1,
            },
            users: data.users.filter((x) => x.id !== userId),
          };
        });
      }),

      conn.addListener<any>("new_user_join_quiz", ({ user, quizId }) => {
        updateQuery(["joinQuizAndGetInfo", quizId], (data) =>
          !data || "error" in data
            ? data
            : {
                ...data,
                quiz: {
                  ...data.quiz,
                  peoplePreviewList:
                    data.quiz.peoplePreviewList.length < 10
                      ? [
                          ...data.quiz.peoplePreviewList,
                          {
                            id: user.id,
                            displayName: user.displayName,
                            numFollowers: user.numFollowers,
                            avatarUrl: user.avatarUrl,
                          },
                        ]
                      : data.quiz.peoplePreviewList,
                  numPeopleInside: data.quiz.numPeopleInside + 1,
                },
                users: [...data.users.filter((x) => x.id !== user.id), user],
              }
        );
      }),
    ];

    return () => {
      unsubs.forEach((u) => u());
    };
  }, [conn, updateQuery, push]);
};

export const WsMainHandlerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  useWsMainHandler();
  return <>{children}</>;
};
