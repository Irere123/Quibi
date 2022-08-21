import React from "react";
import {
  ErrorIcon,
  InfoIcon,
  PlusIcon,
  SuccessIcon,
  WarningIcon,
} from "../icons";

const alertTypes = {};

export type AlertDurations = "default" | "sticky";
export type AlertTypes = "error" | "warning" | "info" | "success";

const alertIcons = {
  error: <ErrorIcon />,
  info: <InfoIcon />,
  warning: <WarningIcon />,
  success: <SuccessIcon />,
};

export interface AlertProps {
  message: string;
  duration?: AlertDurations;
  type?: AlertTypes;
  children?: React.ReactNode;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  duration = "default",
  type = "info",
  onClose,
  message,
}) => {
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;
  React.useEffect(() => {
    if (duration === "sticky") {
      return;
    }

    const timer = setTimeout(() => {
      onCloseRef.current?.();
    }, 7000);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);
  return (
    <div className={`flex p-3 gap-2 rounded-8 bg-primary-600 text-primary-200`}>
      <div className="text-primary-100">{alertIcons[type]}</div>
      <div>{message}</div>
      {onClose ? (
        <div
          className={`flex justify-center items-center cursor-pointer`}
          style={{
            top: 5,
            right: 7,
            width: 13,
            height: 13,
          }}
          onClick={onClose}
          data-testid="close-btn"
        >
          <PlusIcon style={{ transform: "rotate(45deg)" }} />
        </div>
      ) : null}
    </div>
  );
};
