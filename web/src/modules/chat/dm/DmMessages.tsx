import React from "react";
import avatar from "../../../img/avatar2.jpg";
import { MessageElement } from "../../../ui/MessageElement";

interface DmMessagesProps {}

export const DmMessages: React.FC<DmMessagesProps> = () => {
  return (
    <div className="flex flex-col flex-1 justify-end px-5">
      <MessageElement
        msg={{ dt: Date.now(), text: "How are doing man" }}
        user={{ avatar: avatar.src, isOnline: true, username: "Irere" }}
      />
      <MessageElement
        msg={{ dt: Date.now(), text: "How are doing man" }}
        user={{ avatar: avatar.src, isOnline: true, username: "Irere" }}
      />
    </div>
  );
};
