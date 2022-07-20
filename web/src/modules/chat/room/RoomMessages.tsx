import React from "react";
import avatar from "../../../img/avatar2.jpg";
import avatar2 from "../../../img/avatar.jpg";
import { MessageElement } from "../../../ui/MessageElement";

export const RoomMessages: React.FC = () => {
  return (
    <div className="flex flex-col px-5 flex-1 justify-end overflow-y-auto scrollbar-thin scrollbar-thumb-primary-700">
      <MessageElement
        msg={{ text: "Hello mn", dt: new Date().toISOString() }}
        user={{ avatar: avatar.src, username: "Johnson", isOnline: true }}
      />
      <MessageElement
        msg={{ text: "how are doing", dt: new Date().toISOString() }}
        user={{ avatar: avatar.src, username: "Kelly", isOnline: false }}
      />
      <MessageElement
        msg={{
          text: "for me it's fine down here in LA",
          dt: new Date().toISOString(),
        }}
        user={{ avatar: avatar2.src, username: "John", isOnline: true }}
      />
    </div>
  );
};
