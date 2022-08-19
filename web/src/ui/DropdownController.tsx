import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

export const DropdownController: React.FC<{
  portal?: boolean;
  className?: string;
  innerClassName?: string;
  overlay: (c: () => void) => React.ReactNode;
  children?: React.ReactNode;
  zIndex?: number;
}> = ({
  overlay,
  className,
  innerClassName,
  portal = true,
  zIndex,
  children,
}) => {
  const [visible, setVisiblity] = useState(false);

  const referenceRef = useRef<HTMLButtonElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);

  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      modifiers: [{ name: "eventListeners", enabled: visible }],
      placement: "left",
    }
  );

  useEffect(() => {
    const handleDocumentClick = (event: any) => {
      if (
        referenceRef.current?.contains(event.target) ||
        popperRef.current?.contains(event.target)
      ) {
        return;
      }
      setVisiblity(false);
    };

    // listen for clicks and close dropdown on body
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.addEventListener("mousedown", handleDocumentClick);
    };
  });

  const body = (
    <div
      className={`absolute ${className}`}
      ref={popperRef}
      {...attributes.popper}
      style={{ zIndex: zIndex || 5 }}
    >
      <div
        style={styles.offset}
        className={`${visible ? "" : "hidden"} ${innerClassName}`}
      >
        {visible ? overlay(() => setVisiblity(false)) : null}
      </div>
    </div>
  );
  return (
    <React.Fragment>
      <button
        className="flex focus:outline-no-chrome"
        ref={referenceRef}
        onClick={() => setVisiblity(!visible)}
        data-testid="dropdown-trigger"
      >
        {children}
      </button>
      {portal ? createPortal(body, document.querySelector("#main")!) : body}
    </React.Fragment>
  );
};
