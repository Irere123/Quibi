import Link from "next/link";
import React from "react";

export interface LeftHeaderProps {}

const LeftHeader: React.FC<LeftHeaderProps> = ({}) => {
  return (
    <Link href="/">
      <a data-testid="logo-link" className="w-full">
        <div className="flex w-full">
          <h3>Quibi</h3>
        </div>
      </a>
    </Link>
  );
};

export default LeftHeader;
