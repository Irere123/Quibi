import React from "react";
import { PlusIcon } from "../../icons";
import { BoxedIcon } from "../../ui/BoxedIcon";
import { AccountMainPanel } from "../layouts/GridPanels";

export const AccountController: React.FC = () => {
  return (
    <AccountMainPanel
      stickyChildren={
        <div>
          <BoxedIcon>
            <PlusIcon />
          </BoxedIcon>
        </div>
      }
    >
      <h1>Hello world</h1>
    </AccountMainPanel>
  );
};
