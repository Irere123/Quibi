import React from "react";
import { useRouter } from "next/router";
import avatar from "../../img/avatar.jpg";
import { ArrowBackIcon } from "../../icons";
import { BoxedIcon } from "../../ui/BoxedIcon";
import { SingleUser } from "../../ui/UserAvatar";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";
import { LeftPannel } from "../layouts/Panels";
import { WorkController } from "./WorkController";
import { HeaderController } from "../components/HeaderController";

export interface WorkPageHeaderProps {
  user: {
    avatarUrl: string;
    username: string;
  };
  workTitle: string;
}

const WorkPageHeader: React.FC<WorkPageHeaderProps> = ({ user, workTitle }) => {
  const { back } = useRouter();

  return (
    <div className="flex mt-7">
      <div className="flex flex-1 gap-4 items-center">
        <BoxedIcon circle onClick={() => back()}>
          <ArrowBackIcon />
        </BoxedIcon>
        <p>{workTitle}</p>
      </div>
      <SingleUser size="sm" src={user.avatarUrl} username={user.username} />
    </div>
  );
};

export const WorkPage: React.FC = () => {
  let avatarUrl = avatar.src;
  let username = "James webb";
  let workSubtitle = "This is the work subtitle";
  let workTitle = "Work title";
  let workTag = "Work tag";
  return (
    <MainLayout leftPanel={<LeftPannel />}>
      <HeaderController
        owner={username}
        description={workSubtitle}
        title={workTitle}
        additionalKeywords={[workTag]}
        embed={{ image: avatarUrl }}
      />
      <MiddlePanel
        stickyChildren={
          <WorkPageHeader
            user={{ avatarUrl, username }}
            workTitle="Work title"
          />
        }
      >
        <WorkController workType="choice" />
      </MiddlePanel>
    </MainLayout>
  );
};
