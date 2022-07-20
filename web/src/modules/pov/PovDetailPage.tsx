import { useRouter } from "next/router";
import React from "react";
import { PlusIcon } from "../../icons";
import { BoxedIcon } from "../../ui/BoxedIcon";
import { HeaderController } from "../display/HeaderController";
import { LeftPannel } from "../layouts/Panels";
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
          <div onClick={() => back()}>
            <BoxedIcon circle>
              <PlusIcon className="transform rotate-45" />
            </BoxedIcon>
          </div>
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
