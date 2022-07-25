import React from "react";
import img from "../../img/avatar2.jpg";
import { useScreenType } from "../../hooks/useScreenType";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";

import { FeedCard } from "../../ui/FeedCard";
import { FeedHeader } from "../../ui/FeedHeader";
import { MiddlePanel } from "../layouts/GridPanels";
import { Povs } from "../../ui/UserAvatar/Povs";
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
  const { t } = useTypeSafeTranslation();
  const screenType = useScreenType();

  let mb = "mb-7";
  if (screenType === "fullscreen") {
    mb = "mb-8";
  }

  return (
    <MiddlePanel
      stickyChildren={
        <FeedHeader
          title={t("pages.home.your_feed")}
          content={
            <div className="flex gap-3">
              <Povs
                povArray={[
                  { avatar: img.src, id: 2, username: "Kevin" },
                  { avatar: img.src, id: 2, username: "Durant" },
                  { avatar: img.src, id: 2, username: "James" },
                  { avatar: img.src, id: 2, username: "Lebron" },
                ]}
              />
            </div>
          }
        />
      }
    >
      <div className={`flex flex-1 flex-col ${mb}`}>
        <div className="flex flex-col space-y-4">
          <Page />
        </div>
      </div>
    </MiddlePanel>
  );
};
