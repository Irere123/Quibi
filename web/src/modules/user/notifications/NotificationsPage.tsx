import { PageComponent } from "../../../types/PageComponent";
import { WaitForWsAndAuth } from "../../auth/WaitForWsAndAuth";
import { HeaderController } from "../../display/HeaderController";
import { DesktopLayout } from "../../layouts/DesktopLayout";
import { MiddlePanel } from "../../layouts/GridPanels";
import { NotificationsController } from "./NotificationsController";

interface Props {}

export const NotificationsPage: PageComponent<Props> = () => {
  return (
    <WaitForWsAndAuth>
      <HeaderController embed={{}} title={"Notifications"} />
      <DesktopLayout>
        <NotificationsController />
      </DesktopLayout>
    </WaitForWsAndAuth>
  );
};

NotificationsPage.ws = true;
