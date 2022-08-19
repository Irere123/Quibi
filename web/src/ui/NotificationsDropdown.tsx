import React from "react";
import { BaseOverlay } from "./BaseOverlay";
import {
  FollowNotification,
  GenericNotification,
  NewQuizNotification,
} from "./NotificationElement";

export type NotificationsDropdownPropsData = {
  time: string;
} & (
  | {
      type: "follow";
      username: string;
      userAvatarSrc: string;
    }
  | { type: "generic"; notificationMsg: string }
  | { type: "newquiz"; username: string }
);

export interface NotificationsDropdownProps {
  data: NotificationsDropdownPropsData[];
}

const parseNotification = (props: NotificationsDropdownPropsData) => {
  switch (props.type) {
    case "follow": {
      return (
        <FollowNotification
          userAvatarSrc={props.userAvatarSrc}
          username={props.username}
          time={props.time}
        />
      );
    }
    case "generic": {
      return (
        <GenericNotification
          notificationMsg={props.notificationMsg}
          time={props.time}
        />
      );
    }

    case "newquiz": {
      return (
        <NewQuizNotification username={props.username} time={props.time} />
      );
    }
  }
};

export const NotificationsDropdown: React.FC<NotificationsDropdownProps> = (
  props
) => {
  return (
    <div className="flex" style={{ width: 444 }}>
      <BaseOverlay title={"Notifications"}>
        {props.data.map((p, i) => (
          <div className={"py-3 px-4"} key={i}>
            {parseNotification(p)}
          </div>
        ))}
      </BaseOverlay>
    </div>
  );
};
