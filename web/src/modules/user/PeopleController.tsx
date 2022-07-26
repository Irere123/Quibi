import React from "react";
import avatar from "../../img/avatar.jpg";
import avatar2 from "../../img/avatar2.jpg";
import avatar3 from "../../img/avatar3.jpg";
import { MiddlePanel } from "../layouts/GridPanels";
import { SingleUser } from "../../ui/UserAvatar";
import { PageHeader } from "../../ui/PageHeader";
import { Button } from "../../ui/Button";

interface PageProps {}

const users = [
  {
    id: 2,
    displayName: "Irere Emmy",
    username: "irere",
    avatarUrl: avatar.src,
  },
  {
    id: 2,
    displayName: "Jack Dorsey",
    username: "jack_dorsey",
    avatarUrl: avatar2.src,
  },
  {
    id: 2,
    displayName: "Elon musk",
    username: "elon_musk",
    avatarUrl: avatar3.src,
  },
  {
    id: 2,
    displayName: "Peter Thiel",
    username: "peter",
    avatarUrl: avatar.src,
  },
  {
    id: 2,
    displayName: "Garry tan",
    username: "garry_tan",
    avatarUrl: avatar.src,
  },
];

const Page: React.FC<PageProps> = () => {
  return (
    <>
      {users.map((user) => (
        <div key={user.id} className="flex items-center mb-6 cursor-pointer">
          <div className="flex">
            <SingleUser size="md" src={user.avatarUrl} />
          </div>
          <div className="flex px-4 flex-1">
            <div className="flex flex-col w-full">
              <div className="block max-w-md text-primary-100 truncate w-full">
                {user.displayName}
              </div>
              <div className="flex text-primary-200">@{user.username}</div>
            </div>
          </div>
          <div className="flex">
            <Button>Follow</Button>
          </div>
        </div>
      ))}
    </>
  );
};

export const PeopleController: React.FC = () => {
  return (
    <MiddlePanel stickyChildren={<PageHeader title="People" />}>
      <div className="flex flex-col mt-4 mb-6">
        <Page />
      </div>
    </MiddlePanel>
  );
};
