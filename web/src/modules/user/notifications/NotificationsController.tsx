import React from "react";
import avatar from "../../../img/avatar.jpg";
import { DownloadIcon } from "../../../icons";
import {
  FollowNotification,
  GenericNotification,
  NewQuizNotification,
} from "../../../ui/NotificationElement";
import { PageHeader } from "../../../ui/PageHeader";
import { MiddlePanel } from "../../layouts/GridPanels";

export const NotificationsController: React.FC = () => {
  return (
    <MiddlePanel stickyChildren={<PageHeader title={"Notifications"} />}>
      <div className="flex flex-col gap-3">
        <GenericNotification
          notificationMsg="Download Quibi Desktop app"
          time=""
        />
        <FollowNotification
          time=""
          username="irere"
          following={false}
          isOnline={true}
          userAvatarSrc={avatar.src}
        />
        <NewQuizNotification
          time=""
          joined={false}
          userProfileLink={"users"}
          username="irere"
        />
      </div>
    </MiddlePanel>
  );
};
