import React from "react";
import avatar from "../../../img/avatar2.jpg";
import { MessageElement } from "../../../ui/MessageElement";

interface PersonMessagesProps {}

export const PersonMessages: React.FC<PersonMessagesProps> = () => {
  return (
    <div className="flex flex-col">
      <MessageElement
        msg={{ text: "Hello mn", dt: "12/02/22" }}
        user={{ avatar: avatar.src, username: "Johnson", isOnline: true }}
      />
      <MessageElement
        msg={{ text: "hey how are you doing", dt: "13/02/22" }}
        user={{ avatar: avatar.src, username: "Mike", isOnline: false }}
      />
    </div>
  );
};
