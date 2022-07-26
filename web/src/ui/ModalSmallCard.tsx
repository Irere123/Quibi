import React from "react";
import { ChevronRight } from "react-feather";

interface ModalSmallCardProps {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
}

export const ModalSmallCard: React.FC<ModalSmallCardProps> = ({
  title,
  icon,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex  text-primary-200 cursor-pointer border-2 border-primary-700 hover:bg-primary-700 p-3 rounded"
    >
      <div className="flex flex-1 gap-4 items-center ">
        {icon}
        <p>{title}</p>
      </div>
      <ChevronRight />
    </div>
  );
};
