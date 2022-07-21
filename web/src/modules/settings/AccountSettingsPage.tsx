import React from "react";
import avatar from "../../img/avatar.jpg";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { BaseSettingsItem } from "../../ui/BaseSettingsItem";
import { SettingsWrapper } from "../../ui/SettingsWrapper";
import { SingleUser } from "../../ui/UserAvatar";
import { HeaderController } from "../display/HeaderController";
import { SettingsLayout } from "../layouts/SettingsLayout";
import { Button } from "../../ui/Button";
import { BoxedIcon } from "../../ui/BoxedIcon";
import { TrashIcon } from "../../icons";
import { modalConfirm } from "../../ui/ConfirmModal";
import { Input } from "../../ui/Input";

export const AccountSettingspage: React.FC = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <SettingsLayout>
      <HeaderController title={t("pages.settings.account.title")} embed={{}} />
      <SettingsWrapper>
        <BaseSettingsItem className="flex flex-col gap-5">
          <p className="text-primary-200 font-bold">User Account</p>
          <div className="space-y-3">
            <p>Profile Picture</p>
            <div className="flex gap-5">
              <SingleUser src={avatar.src} size="default" />
              <div>
                <span className="flex gap-3">
                  <Button>Change profile picture</Button>
                  <BoxedIcon
                    onClick={() => {
                      modalConfirm!("Are you sure", () => {
                        console.log("null");
                        return true;
                      });
                    }}
                  >
                    <TrashIcon />
                  </BoxedIcon>
                </span>
                <p className="font-normal">Only JPG or PNG and maximum 3MB</p>
              </div>
            </div>
            <p>Public Profile</p>
            <div>
              <div className="flex gap-3">
                <div>
                  <label>Display Name</label>
                  <div className="h-10 border-2 border-black rounded">
                    <Input />
                  </div>
                </div>
                <div>
                  <label>Username</label>
                  <div className="h-10 border-2 border-black rounded">
                    <Input />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BaseSettingsItem>
      </SettingsWrapper>
    </SettingsLayout>
  );
};
