import { useRouter } from "next/router";
import React from "react";
import { PlusIcon } from "../../icons";
import { BoxedIcon } from "../../ui/BoxedIcon";
import { HeaderController } from "../components/HeaderController";
import { LeftPannel } from "../dashboard/Panels";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";
import { CommentsPanel } from "./CommentsPanel";
import { PovController } from "./PovController";

export const PovDetailPage: React.FC = () => {
  const { back } = useRouter();

  return (
    <MainLayout leftPanel={<LeftPannel />} rightPanel={<CommentsPanel />}>
      <MiddlePanel
        stickyChildren={
          <span onClick={() => back()}>
            <BoxedIcon circle>
              <PlusIcon className="transform rotate-45" />
            </BoxedIcon>
          </span>
        }
      >
        <HeaderController
          description="This is my description"
          owner="The owner"
          embed={{}}
          title="Point of view"
        />
        <PovController />
      </MiddlePanel>
    </MainLayout>
  );
};
