import React from "react";
import { Bookmark } from "react-feather";
import { Share, Smiley, Heart } from "../../icons";
import avatar from "../../img/avatar.jpg";
import { generateColorFromString } from "../../lib/generateColor";
import { Tag } from "../../ui/Tag";
import { SingleUser } from "../../ui/UserAvatar";

const BoxIcon: React.FC = ({ children }) => {
  return (
    <div className="flex text-primary-200 bg-primary-600 cursor-pointer justify-center items-center rounded-full w-8 h-8">
      {children}
    </div>
  );
};

export const PovController: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="flex flex-1 flex-col bg-primary-700 rounded-md mb-5 p-5 md:w-80 w-full h-full">
        <div className="flex gap-3 items-center cursor-pointer">
          <SingleUser src={avatar.src} active size="sm" />
          <div>
            <p className="text-primary-100 font-bold">Irere Emmy</p>
            <p className="text-primary-300 text-sm">2 days ago</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <p
            style={{
              color: generateColorFromString("name"),
            }}
            className="font-bold underline cursor-default"
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
            temporibus, aspernatur enim vero excepturi delectus iusto eos
            eligendi tenetur obcaecati asperiores facere. Esse totam porro
            maiores doloremque quaerat sequi laborum.
          </p>
          <div className="flex gap-3 mt-2">
            <Tag>#tech</Tag>
            <Tag>#music</Tag>
            <Tag>#houses</Tag>
          </div>
        </div>
        <div className="flex justify-between">
          <BoxIcon>
            <Heart />
          </BoxIcon>
          <BoxIcon>
            <Bookmark width={22} height={22} />
          </BoxIcon>
          <BoxIcon>
            <Share />
          </BoxIcon>
          <BoxIcon>
            <Smiley />
          </BoxIcon>
        </div>
      </div>
    </div>
  );
};
