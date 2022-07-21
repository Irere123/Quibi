import React from "react";
import { Story } from "@storybook/react";

import { BaseOverlay, BaseOverlayProps } from "../ui/BaseOverlay";
import avatar from "../img/avatar.jpg";
import { SettingsIcon } from "../ui/SettingsIcon";
import { ArrowLeftIcon, OutlineGlobe, AccountIcon } from "../icons";

const user = {
  avatar,
  username: "TerryOwen",
  isOnline: true,
};

const msg = {
  text: "Hey! I really liked your room, but would like to contribute to dogehouse",
  ts: 1615116474,
};

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
          label={"profile"}
        />
        <SettingsIcon
          icon={<OutlineGlobe />}
          label={"Language"}
          trailingIcon={<ArrowLeftIcon />}
        />
      </div>
    </BaseOverlay>
  </div>
);

Settings.bind({});
