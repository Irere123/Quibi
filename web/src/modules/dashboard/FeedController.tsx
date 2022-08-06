import React from "react";
import img from "../../img/avatar2.jpg";
import { useScreenType } from "../../hooks/useScreenType";

import { FeedCard } from "../../ui/FeedCard";
import { FeedHeader } from "../../ui/FeedHeader";
import { MiddlePanel } from "../layouts/GridPanels";
import { MyPeopleOnline } from "./MyPeopleOnline";
import { SchoolIcon } from "../../icons";

const Page: React.FC = () => {
  return (
    <>
      <FeedCard
        subtitle="Alice messages your in the wags group"
        title="Alice message you"
        date={Date.now()}
        avatars={[img.src, img.src]}
      />
      <FeedCard
        title="Maths assignment"
        subtitle="The maths teacher left questions about linear algebra"
        date={Date.now()}
        headIcon={<SchoolIcon />}
      />
      <FeedCard
        title="The S2 Marks are out"
        subtitle="Marks of the second term are out you can now view them..."
        date={Date.now()}
        avatars={[img.src]}
      />
    </>
  );
};

export const FeedController: React.FC = () => {
  const screenType = useScreenType();

  let mb = "mb-7";
  if (screenType === "fullscreen") {
    mb = "mb-8";
  }

  return (
    <MiddlePanel stickyChildren={<FeedHeader content={<MyPeopleOnline />} />}>
      <div className={`flex flex-1 flex-col ${mb}`}>
        <div className="flex flex-col space-y-4">
          <Page />
        </div>
      </div>
    </MiddlePanel>
  );
};
