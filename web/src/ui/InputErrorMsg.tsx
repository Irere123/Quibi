import React from "react";

interface InputErrorMsgProps {
  children?: React.ReactNode;
}

// @todo verify with designer what color this should be
export const InputErrorMsg: React.FC<InputErrorMsgProps> = ({ children }) => {
  return (
    <div className={`flex text-secondary-300`} data-testid="input-error-msg">
      {children}
    </div>
  );
};
