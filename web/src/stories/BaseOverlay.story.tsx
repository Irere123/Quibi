import React from "react";
import { Story } from "@storybook/react";

import { BaseOverlay, BaseOverlayProps } from "../ui/BaseOverlay";
import { SettingsIcon } from "../ui/SettingsIcon";
import {
  ArrowLeftIcon,
  OutlineGlobe,
  AccountIcon,
  DownloadIcon,
} from "../icons";

export default {
  title: "BaseOverlay",
  component: BaseOverlay,
};

export const Settings: Story<BaseOverlayProps> = ({
  actionButton: actionLabel = "Log out",
}) => (
  <div className="flex" style={{ width: 200 }}>
    <BaseOverlay actionButton={actionLabel}>
      <div className="flex flex-col">
        <SettingsIcon
          icon={<AccountIcon className={`text-primary-100`} />}
          label={"Profile"}
        />
        <SettingsIcon
          icon={<OutlineGlobe />}
          label={"Language"}
          trailingIcon={<ArrowLeftIcon />}
        />
        <SettingsIcon
          icon={<DownloadIcon className={`text-primary-100`} />}
          label={"Download"}
        />
      </div>
    </BaseOverlay>
  </div>
);

Settings.bind({});
