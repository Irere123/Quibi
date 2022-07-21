import Link from "next/link";
import React from "react";
import { useScreenType } from "../../hooks/useScreenType";

export interface LeftHeaderProps {}

const LeftHeader: React.FC<LeftHeaderProps> = ({}) => {
  const screenType = useScreenType();

  return (
    <Link href="/dash" passHref>
      <div className="w-full">
        {screenType === "3-cols" ? (
          <h3 className="text-center text-secondary-300">Quibi</h3>
        ) : (
          <h3 className="text-secondary-300">Quibi</h3>
        )}
      </div>
    </Link>
  );
};

export default LeftHeader;
