import React from "react";

export default function RecordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 16 16"
      {...props}
    >
      <g fill="currentColor">
        <path d="M8 10a2 2 0 1 0 0-4a2 2 0 0 0 0 4z" />
        <path
          fillRule="evenodd"
          d="M8.6 1c1.6.1 3.1.9 4.2 2c1.3 1.4 2 3.1 2 5.1c0 1.6-.6 3.1-1.6 4.4c-1 1.2-2.4 2.1-4 2.4c-1.6.3-3.2.1-4.6-.7c-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1zm.5 12.9c1.3-.3 2.5-1 3.4-2.1c.8-1.1 1.3-2.4 1.2-3.8c0-1.6-.6-3.2-1.7-4.3c-1-1-2.2-1.6-3.6-1.7c-1.3-.1-2.7.2-3.8 1c-1.1.8-1.9 1.9-2.3 3.3c-.4 1.3-.4 2.7.2 4c.6 1.3 1.5 2.3 2.7 3c1.2.7 2.6.9 3.9.6z"
          clipRule="evenodd"
        />
      </g>
    </svg>
  );
}
