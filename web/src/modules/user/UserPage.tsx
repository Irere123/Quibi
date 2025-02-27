import React from "react";
import { BaseUser } from "@quibi/client";
import { apiBaseUrl } from "../../lib/constants";
import { PageComponent } from "../../types/PageComponent";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";
import { LeftPanel, RightPanel } from "../layouts/Panels";
import { UserProfileController } from "./UserProfileController";

interface UserPageProps {
  username: string;
  user: BaseUser | null;
}

export const UserPage: PageComponent<UserPageProps> = ({ user, username }) => {
  return (
    <WaitForWsAndAuth>
      {user ? (
        <HeaderController
          embed={{ image: user.avatarUrl }}
          description={user.bio ? user.bio : undefined}
          title={`${user.displayName} (@${username})`}
        />
      ) : (
        <HeaderController />
      )}
      <MainLayout leftPanel={<LeftPanel />} rightPanel={<RightPanel />}>
        <MiddlePanel>
          <UserProfileController />
        </MiddlePanel>
      </MainLayout>
    </WaitForWsAndAuth>
  );
};

UserPage.getInitialProps = async ({ query }) => {
  const username = typeof query.username === "string" ? query.username : "";
  try {
    const res = await fetch(`${apiBaseUrl}/user/${username}`);
    const { user }: { user: any | null } = await res.json();
    return { username, user };
  } catch {
    return { username, user: null };
  }
};

UserPage.ws = true;
