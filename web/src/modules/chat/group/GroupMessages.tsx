import React from "react";
import avatar from "../../../img/avatar2.jpg";
import { MessageElement } from "../../../ui/MessageElement";

export const GroupMessages: React.FC = () => {
  return (
    <div className="flex flex-col">
      <MessageElement
        msg={{ text: "Hello mn", dt: "12/02/22" }}
        user={{ avatar: avatar.src, username: "Johnson", isOnline: true }}
      />
      <MessageElement
        msg={{ text: "Hello mn", dt: "16/02/22" }}
        user={{ avatar: avatar.src, username: "Johnson", isOnline: false }}
      />
    </div>
  );
};
