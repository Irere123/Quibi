import { useRouter } from "next/router";
import React from "react";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";
import { LeftPannel, RightPanel } from "../layouts/Panels";
import { UserProfileController } from "./UserProfileController";

export const UserPage: React.FC = () => {
  const { query } = useRouter();
  const username = typeof query.username === "string" ? query.username : "";

  return (
    <MainLayout leftPanel={<LeftPannel />} rightPanel={<RightPanel />}>
      <HeaderController title={username} />
      <MiddlePanel>
        <UserProfileController />
      </MiddlePanel>
    </MainLayout>
  );
};
