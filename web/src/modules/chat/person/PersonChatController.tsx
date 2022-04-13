import React from "react";
import avatar from "../../../img/avatar3.jpg";
import { SingleUser } from "../../../ui/UserAvatar";
import { ChatInput } from "../ChatInput";
import { PersonMessages } from "./PersonMessages";

type PersonChatControllerProps = {};

export const PersonChatController: React.FC<PersonChatControllerProps> = () => {
  const user = {
    userId: "123",
    username: "Jackson",
    avatarUrl: avatar.src,
    isOnline: false,
    lastOnline: "last seen 12 minutes ago",
  };
  return (
    <>
      <ChatContainer user={user} />
    </>
  );
};

interface ChatContainerProps {
  user: {
    userId: string;
    username: string;
    avatarUrl: string;
    lastOnline: string;
    isOnline: boolean;
  };
}

const ChatContainer: React.FC<ChatContainerProps> = ({ user }) => {
  return (
    <div className="flex flex-col border-2 border-black rounded w-full h-full md:mb-5">
      <div className="flex items-center px-3 py-1 border-b-2 border-b-black">
        <div>
          <p>{user.username}</p>
          <p className="font-light text-xs">
            {user.isOnline ? <>Online</> : <>{user.lastOnline}</>}
          </p>
        </div>
        <div className="flex flex-1 justify-end">
          <SingleUser
            src={user.avatarUrl}
            size="sm"
            isOnline={user.isOnline}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="flex flex-col flex-1 w-full h-full ">
        <div className="flex flex-1 flex-col w-full h-full overflow-y-auto">
          <PersonMessages />
        </div>
        <div>
          <ChatInput />
        </div>
      </div>
    </div>
  );
};
