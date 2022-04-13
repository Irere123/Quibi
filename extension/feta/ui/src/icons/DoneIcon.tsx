import React from "react";

export default function DoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={20}
      viewBox="0 0 24 24"
      width={20}
      fill="currentColor"
      {...props}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
    </svg>
  );
}
