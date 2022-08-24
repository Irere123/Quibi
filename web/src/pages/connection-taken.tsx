import React from "react";
import { useTypeSafeTranslation } from "../hooks/useTypeSafeTranslation";
import { HeaderController } from "../modules/display/HeaderController";
import { Button } from "../ui/Button";

interface ConnectionTakenProps {}

const ConnectionTaken: React.FC<ConnectionTakenProps> = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <div className="flex w-full h-full flex-col items-center justify-center p-8">
      <HeaderController title={t("header.connectionTaken")} />
      <h4 className="text-primary-100 mb-4">
        {t("components.wsKilled.description")}
      </h4>
      <Button
        size="medium"
        onClick={() => {
          window.location.href = window.location.origin + "/dash";
        }}
      >
        {t("components.wsKilled.reconnect")}
      </Button>
    </div>
  );
};

export default ConnectionTaken;
