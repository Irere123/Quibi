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
    <div className="flex flex-col border-2 border-black rounded w-full h-full md:mb-5">
      <div className="flex  p-3 border-b-2 border-b-black">
        <p>Group#{groupId}</p>
        <div
          className="flex flex-1 justify-end"
          onClick={() => setOpenMembersModal(!openMembersModal)}
        >
          <MultipleUsers srcArray={[avatar.src, avatar2.src, avatar3.src]} />
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
