import React from "react";

export interface NativeRadioProps {
  title: string;
  checked?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const NativeRadio: React.FC<NativeRadioProps> = ({
  title,
  checked = false,
  onClick,
}) => {
  return (
    <button
      className="w-full flex px-3 py-2 justify-between group"
      onClick={onClick}
    >
      <div className="flex">
        <div className="flex flex-col items-start">
          <div
            className={`font-bold capitalize group-hover:text-green-300 transition duration-100 ${
              checked ? "text-green-300" : "text-black"
            }`}
          >
            {title}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-4 h-4 relative">
          <div
            className={`${
              checked ? "bg-primary-300" : ""
            } w-2 h-2 absolute top-2/4 left-2/4 rounded-full transform -translate-y-1/2 -translate-x-1/2 transition duration-100`}
          ></div>
          <div
            className={`${
              checked ? "border-green-300" : "border-black"
            } border w-4 h-4 absolute top-2/4 left-2/4 rounded-full transform -translate-y-1/2 -translate-x-1/2 transition duration-100`}
          ></div>
        </div>
      </div>
    </button>
  );
};
