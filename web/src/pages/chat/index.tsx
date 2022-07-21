import type { NextPage } from "next";
import { RoomController } from "../../modules/chat/room/RoomController";

const Chat: NextPage = () => {
  return <RoomController />;
};

export default Chat;
