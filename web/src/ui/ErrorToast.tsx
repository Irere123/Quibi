import * as React from "react";
import { PlusIcon } from "../icons";

export type ToastDurations = "default" | "sticky";

export interface ErrorMessageProps {
  message: string;
  duration?: ToastDurations;
  onClose?: () => void;
}

export const ErrorToast: React.FC<ErrorMessageProps> = ({
  message,
  duration = "default",
  onClose,
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
    <div
      className={`flex gap-3 rounded p-3 w-full items-center justify-center text-button transition-transform duration-300 bg-primary-700 border-2 border-secondary-300`}
    >
      <div className={`flex space-x-4 items-center`}>
        <div className={`text-primary-100 bold`}>{message}</div>
      </div>
      {onClose ? (
        <div
          className={`flex text-primary-100 cursor-pointer`}
          onClick={onClose}
        >
          <PlusIcon style={{ transform: "rotate(45deg)" }} />
        </div>
      ) : null}
    </div>
  );
};
