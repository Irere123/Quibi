import Link from "next/link";
import React from "react";

export interface LeftHeaderProps {}

const LeftHeader: React.FC<LeftHeaderProps> = ({}) => {
  return (
    <Link href="/dash">
      <a data-testid="logo-link" className="w-full">
        <h3 className="text-center">Quibi</h3>
      </a>
    </Link>
  );
};

export default LeftHeader;
