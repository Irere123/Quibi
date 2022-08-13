import React, { ReactNode } from "react";
import { kFormatter } from "../../../lib/kFormatter";
import { truncate } from "../../../lib/truncate";
import { RoomAvatar, SingleUser } from "../../../ui/Avatars";
import { Button } from "../../../ui/Button";

interface Props {
  roomName: string;
  description: string;
  joinLoading: boolean;
  numMembers: number;
  onJoin: () => void;
  children?: ReactNode;
}

export const RoomCard: React.FC<Props> = ({
  description,
  numMembers,
  roomName,
  onJoin,
  joinLoading,
  children,
}) => {
  return (
    <div className="flex flex-col p-3 bg-primary-800 rounded">
      <div className="flex w-full gap-4">
        <div className="flex flex-1">
          <RoomAvatar name={roomName} size="sm" />
        </div>
        <Button
          size="medium"
          loading={joinLoading}
          onClick={() => onJoin()}
          color="primary-300"
        >
          Join
        </Button>
      </div>
      <div className="space-y-2 mt-2">
        <p className="text-primary-100 text-xl">{truncate(roomName, 20)}</p>
        <p className="text-primary-200">{description}</p>
        <p className="text-primary-100 text-sm">
          {kFormatter(numMembers)} Members
        </p>
      </div>
    </div>
  );
};
