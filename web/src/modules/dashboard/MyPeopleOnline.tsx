import React from "react";
import avatar from "../../img/avatar2.jpg";
import { PlusIcon } from "../../icons";
import { SingleUser } from "../../ui/Avatars";

export interface MyPeopleOnlineProps {}

export const MyPeopleOnline: React.FC<MyPeopleOnlineProps> = ({}) => {
  return (
    <>
      <div className="flex gap-3">
        <div
          className={`bg-gradient-to-r from-secondary-300 to-secondary-200 flex justify-center shadow-md shadow-primary-300 items-center cursor-pointer bg-secondary-300 w-12 h-12 rounded-full`}
        >
          <PlusIcon />
        </div>

        <SingleUser
          size="md"
          src={avatar.src}
          username={"username"}
          isOnline={true}
        />
        <SingleUser
          size="md"
          src={avatar.src}
          username={"username"}
          isOnline={true}
        />
        <SingleUser
          size="md"
          src={avatar.src}
          username={"username"}
          isOnline={true}
        />
      </div>
    </>
  );
};
