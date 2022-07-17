import React from "react";
import avatar from "../../../img/avatar.jpg";
import avatar2 from "../../../img/avatar2.jpg";
import avatar3 from "../../../img/avatar3.jpg";
import { useRouter } from "next/router";
import { MultipleUsers } from "../../../ui/UserAvatar";
import { ChatInput } from "../ChatInput";
import { GroupMessages } from "./GroupMessages";
import { useModalStore } from "../../../stores/useModalStore";
import { MembersModal } from "./MembersModals";
import { CommandIcon, HashIcon } from "../../../icons";

export const GroupChatController: React.FC = () => {
  const { query } = useRouter();
  const groupId = query.id;

  return (
    <>
      <ChatContainer groupId={groupId} />
    </>
  );
};

interface ChatContainerProps {
  groupId: any;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ groupId }) => {
  const { openMembersModal, setOpenMembersModal } = useModalStore();

  return (
    <div className="flex flex-col  rounded w-full h-full flex-1  md:mb-7 overflow-y-auto bg-primary-900 md:bg-primary-800">
      <div className="flex p-3 bg-primary-700">
        <div className="flex flex-1">
          <p className="text-primary-100">Group#{groupId}</p>
        </div>
        <div className="flex gap-2 items-center">
          <span className="cursor-pointer fill-current text-primary-200">
            <HashIcon />
          </span>
          <span className="cursor-pointer fill-current text-primary-200">
            <CommandIcon />
          </span>
          <span onClick={() => setOpenMembersModal(!openMembersModal)}>
            <MultipleUsers srcArray={[avatar.src, avatar2.src, avatar3.src]} />
          </span>
        </div>
      </div>
      <div className="flex flex-col flex-1 w-full h-full ">
        <div className="flex flex-1 flex-col w-full h-full overflow-y-auto">
          <GroupMessages />
        </div>
        <div>
          <ChatInput />
        </div>
      </div>
      {openMembersModal && (
        <MembersModal
          isOpen={openMembersModal}
          onRequestClose={() => setOpenMembersModal(!openMembersModal)}
        />
      )}
    </div>
  );
};
