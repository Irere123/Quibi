import React from "react";
import avatar from "../../img/avatar.jpg";
import avatar2 from "../../img/avatar2.jpg";
import avatar3 from "../../img/avatar3.jpg";
import { MiddlePanel } from "../layouts/GridPanels";
import { SingleUser } from "../../ui/Avatars";
import { PageHeader } from "../../ui/PageHeader";
import { Button } from "../../ui/Button";
import { PersonElement } from "../../ui/PersonElement";

interface PageProps {}

const users = [
  {
    id: "ie39pew0932032kj2",
    displayName: "Irere Emmy",
    username: "irere",
    bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam, aspernatur",
    avatarUrl: avatar.src,
    online: true,
  },
  {
    id: "ie39pew0932032kj2",
    displayName: "Jack Dorsey",
    username: "jack_dorsey",
    bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam, aspernatur",
    avatarUrl: avatar2.src,
    online: false,
  },
  {
    id: "ie39pew0932032kj2",
    displayName: "Elon musk",
    username: "elon_musk",
    bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam, aspernatur",
    avatarUrl: avatar3.src,
    online: true,
  },
  {
    id: "ie39pew0932032kj2",
    displayName: "Peter Thiel",
    username: "peter",
    bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam, aspernatur",
    avatarUrl: avatar.src,
    online: false,
  },
  {
    id: "ie39pew0932032kj2",
    displayName: "Garry tan",
    username: "garry_tan",
    bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam, aspernatur",
    avatarUrl: avatar.src,
    online: true,
  },
];

const Page: React.FC<PageProps> = () => {
  return (
    <div className="flex flex-col gap-3 mt-1">
      {users.map((user) => (
        <PersonElement key={user.id} user={user} />
      ))}
    </div>
  );
};

export const PeopleController: React.FC = () => {
  return (
    <MiddlePanel stickyChildren={<PageHeader title="People" />}>
      <Page />
    </MiddlePanel>
  );
};
