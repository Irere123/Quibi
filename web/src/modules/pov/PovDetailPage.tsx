import React from "react";
import { PlusIcon } from "../../icons";
import { BoxedIcon } from "../../ui/BoxedIcon";
import { HeaderController } from "../components/HeaderController";
import { LeftPannel } from "../dashboard/Panels";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";
import { CommentsPanel } from "./CommentsPanel";

export const PovDetailPage: React.FC = () => {
  return (
    <MainLayout leftPanel={<LeftPannel />} rightPanel={<CommentsPanel />}>
      <MiddlePanel
        stickyChildren={
          <BoxedIcon circle>
            <PlusIcon className="transform rotate-45" />
          </BoxedIcon>
        }
      >
        <HeaderController
          description="This is my description"
          owner="The owner"
          embed={{}}
          title="Point of view"
        />
        <h1>POV</h1>
      </MiddlePanel>
    </MainLayout>
  );
};
