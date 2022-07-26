import React from "react";
import ReactModal from "react-modal";
import { PlusIcon } from "../icons";

const customStyles = {
  default: {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: 4,
      padding: "20px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "var(--color-primary-800)",
      border: "none",
      maxHeight: "80vh",
      width: "90%",
      maxWidth: 400,
    },
  },
  userPreview: {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: 4,
      padding: 0,
      transform: "translate(-50%, -50%)",
      backgroundColor: "var(--color-primary-800)",
      border: "none",
      maxHeight: "80vh",
      width: "90%",
      maxWidth: 400,
    },
  },
};

export const Modal: React.FC<
  ReactModal["props"] & {
    variant?: keyof typeof customStyles;
    title?: string;
    subtitle?: string;
  }
> = ({ children, variant = "default", title, subtitle, ...props }) => {
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
        <div className={`flex flex-col gap-3`}>
          <div className="flex">
            <div className="flex flex-1 flex-col">
              <h4 className="text-primary-100 font-sans font-semibold text-center">
                {title}
              </h4>
            </div>
            <button
              className={`cursor-pointer p-1 text-primary-100`}
              onClick={(e) => props?.onRequestClose?.(e)}
            >
              <PlusIcon className={`transform rotate-45`} />
            </button>
          </div>
          <p className="text-primary-200 text-center">{subtitle}</p>
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
