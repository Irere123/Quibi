import isElectron from "is-electron";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
import { useTypeSafeTranslation } from "../hooks/useTypeSafeTranslation";
import {
  AccountIcon,
  ArrowLeftIcon,
  SettingsIcon as SvgSettingsIcon,
  Bug,
  DownloadIcon,
  OutlineGlobe,
} from "../icons";
import { User } from "../modules/ws";
import { ApiPreloadLink } from "../shared-components/ApiPreloadLink";
import { BaseOverlay } from "../ui/BaseOverlay";
import { SettingsIcon } from "../ui/SettingsIcon";
import { LanguageSelector } from "./LanguageSelector";

export const SettingsDropdown: React.FC<{
  user: User;
  onCloseDropdown: () => void;
  onActionButtonClicked: () => void;
}> = ({ user, onCloseDropdown, onActionButtonClicked }) => {
  const [currentOverlay, setCurrentOverlay] = useState<ReactNode>(null);
  const { t } = useTypeSafeTranslation();

  const { push } = useRouter();

  return (
    <div
      className="flex whitespace-nowrap overflow-ellipsis"
      style={{ width: 200 }}
    >
      <BaseOverlay
        onActionButtonClicked={onActionButtonClicked}
        actionButton={t("components.settingsDropdown.logOut.button")}
        overlay={currentOverlay}
      >
        <div className="flex flex-col">
          <ApiPreloadLink
            data-testid="profile-link"
            route="profile"
            data={{ username: user.username }}
          >
            <SettingsIcon
              onClick={onCloseDropdown}
              icon={<AccountIcon />}
              label={t("components.settingsDropdown.profile")}
              transition
            />
          </ApiPreloadLink>

          <SettingsIcon
            icon={<OutlineGlobe />}
            label={t("components.settingsDropdown.language")}
            trailingIcon={<ArrowLeftIcon />}
            transition
            onClick={() =>
              setCurrentOverlay(
                <LanguageSelector onClose={() => setCurrentOverlay(null)} />
              )
            }
          />
          <Link href={`/report`}>
            <a>
              <SettingsIcon
                onClick={onCloseDropdown}
                icon={<Bug />}
                label={t("components.settingsDropdown.reportABug")}
                transition
              />
            </a>
          </Link>

          {!isElectron() ? (
            <SettingsIcon
              onClick={() => push("/download")}
              icon={<DownloadIcon />}
              label={t("components.settingsDropdown.downloadApp")}
              transition
            />
          ) : null}
        </div>
      </BaseOverlay>
    </div>
  );
};
