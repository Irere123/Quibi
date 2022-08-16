import React from "react";
import avatar from "../../../../img/avatar2.jpg";
import avatar2 from "../../../../img/avatar.jpg";
import { MessageElement } from "../../../../ui/MessageElement";

export const RoomMessages: React.FC = () => {
  return (
    <div className="flex flex-col px-5 flex-1 justify-end overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-thumb-primary-700">
      <MessageElement
        msg={{ text: "Hello mn", dt: Date.now() }}
        user={{ avatar: avatar.src, username: "Johnson", isOnline: true }}
      />
      <MessageElement
        msg={{ text: "how are doing", dt: Date.now() }}
        user={{ avatar: avatar.src, username: "Kelly", isOnline: false }}
      />
      <MessageElement
        msg={{
          text: "for me it's fine down here in LA",
          dt: Date.now(),
        }}
        user={{ avatar: avatar2.src, username: "John", isOnline: true }}
      />
      <MessageElement
        msg={{
          text: "it's really fun here..",
          dt: Date.now(),
        }}
        user={{ avatar: avatar2.src, username: "John", isOnline: true }}
      />
    </div>
  );
};
