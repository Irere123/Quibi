import React from "react";

export default function AppsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="appsIconTitle"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      color="currentColor"
      {...props}
    >
      <title id="appsIconTitle">Apps drawer</title>{" "}
      <circle cx="6" cy="6" r="1" /> <circle cx="12" cy="6" r="1" />{" "}
      <circle cx="18" cy="6" r="1" /> <circle cx="6" cy="12" r="1" />{" "}
      <circle cx="12" cy="12" r="1" /> <circle cx="18" cy="12" r="1" />{" "}
      <circle cx="6" cy="18" r="1" /> <circle cx="12" cy="18" r="1" />{" "}
      <circle cx="18" cy="18" r="1" />{" "}
    </svg>
  );
}
