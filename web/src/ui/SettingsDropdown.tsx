import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
import {
  OutlineGlobe,
  AccountIcon,
  ArrowLeftIcon,
  Discord,
  HandIcon,
} from "../icons";

import { BaseOverlay } from "../ui/BaseOverlay";
import { SettingsIcon } from "../ui/SettingsIcon";
import { LanguageSelector } from "./LanguageSelector";

export const SettingsDropdown: React.FC<{
  onCloseDropdown: () => void;
  onActionButtonClicked: () => void;
}> = ({ onCloseDropdown, onActionButtonClicked }) => {
  const [currentOverlay, setCurrentOverlay] = useState<ReactNode>(null);

  const { push } = useRouter();

  return (
    <div
      className="flex whitespace-nowrap overflow-ellipsis"
      style={{ width: 200 }}
    >
      <BaseOverlay
        onActionButtonClicked={onActionButtonClicked}
        actionButton={"Log out"}
        overlay={currentOverlay}
      >
        <div className="flex flex-col">
          <SettingsIcon
            onClick={onCloseDropdown}
            icon={<AccountIcon />}
            label={"Profile"}
            transition
          />

          <SettingsIcon
            icon={<OutlineGlobe />}
            label={"Languages"}
            trailingIcon={<ArrowLeftIcon />}
            transition
            onClick={() =>
              setCurrentOverlay(
                <LanguageSelector onClose={() => setCurrentOverlay(null)} />
              )
            }
          />

          <SettingsIcon
            onClick={() => push("/developer")}
            icon={<HandIcon />}
            label={"Developer"}
          />

          <SettingsIcon label={"Discord"} icon={<Discord />} transition />
        </div>
      </BaseOverlay>
    </div>
  );
};
