import React, { MouseEventHandler, ReactNode } from "react";

export interface BaseOverlayProps
  extends React.ComponentPropsWithoutRef<"div"> {
  title?: string;
  actionButton?: string;
  onActionButtonClicked?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  overlay?: ReactNode;
}

export const BaseOverlay: React.FC<BaseOverlayProps> = ({
  children,
  title,
  actionButton,
  overlay,
  onActionButtonClicked,
  ...props
}) => {
  return (
    <div
      className="flex flex-col w-full  rounded bg-primary-300  overflow-hidden relative shadow-2xl"
      {...props}
    >
      {overlay ? overlay : ""}
      {title && (
        <div className="px-4 py-3 border-b border-black flex items-center">
          <h4 className="text-black">{title}</h4>
        </div>
      )}

      <div className="flex flex-col">{children}</div>

      {actionButton && (
        <button
          className="flex px-4 bg-primary-200 text-black outline-none font-bold"
          style={{
            paddingTop: 8,
            paddingBottom: 12,
            borderRadius: "0 0 4px 4px",
          }}
          onClick={onActionButtonClicked}
        >
          {actionButton}
        </button>
      )}
    </div>
  );
};
