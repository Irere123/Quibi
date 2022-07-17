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
      className={`flex rounded-lg p-3 relative w-full items-center justify-center text-button transition-transform duration-300 bg-secondary-300`}
    >
      {onClose ? (
        <div
          className={`flex bg-primary-100 absolute cursor-pointer`}
          style={{
            top: 5,
            right: 7,
            width: 13,
            height: 13,
          }}
          onClick={onClose}
        >
          <PlusIcon style={{ transform: "rotate(45deg)" }} />
        </div>
      ) : null}

      <p className={`bold`}>{message}</p>
    </div>
  );
};
