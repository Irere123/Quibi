import React from "react";
import ReactModal from "react-modal";
import { PlusIcon } from "../../icons";

const customStyles = {
  fullscreen: {
    overlay: {
      backgroundColor: "var(--color-primary-900)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "var(--color-primary-900)",
      border: "none",
      height: "100vh",
      width: "100%",
    },
  },
};

export const AccountController: React.FC<
  ReactModal["props"] & { variant?: keyof typeof customStyles }
> = ({ children, variant = "fullscreen", ...props }) => {
  const onKeyDown = (event: React.KeyboardEvent) => {
    const currentActive = document.activeElement;

    if (event.key === "ArrowLeft") {
      (currentActive?.previousElementSibling as HTMLElement)?.focus();
    } else if (event.key === "ArrowRight") {
      (currentActive?.nextElementSibling as HTMLElement)?.focus();
    }
  };

  return (
    <ReactModal
      shouldCloseOnEsc
      shouldFocusAfterRender
      style={customStyles[variant]}
      {...props}
    >
      <div className={`flex flex-col w-full`}>
        <div className={`flex justify-end absolute right-3 top-3`}>
          <button
            className={`p-1 text-primary-100`}
            onClick={(e) => props?.onRequestClose?.(e)}
          >
            <PlusIcon className={`transform rotate-45`} />
          </button>
        </div>
        <div
          tabIndex={-1}
          className={`focus:outline-none`}
          onKeyDown={onKeyDown}
        >
          {children}
        </div>
      </div>
    </ReactModal>
  );
};
