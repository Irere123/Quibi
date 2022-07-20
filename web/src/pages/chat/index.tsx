import type { NextPage } from "next";
import { RoomChatController } from "../../modules/chat/room/RoomChatController";

const Chat: NextPage = () => {
  return <RoomChatController />;
};

export default Chat;
