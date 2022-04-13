import * as React from "react";

function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M14.075 8.8c.041-.24.041-.52.041-.8s-.04-.52-.04-.8l1.717-1.32c.164-.12.205-.32.082-.52L14.24 2.6c-.082-.16-.327-.24-.491-.16l-2.046.8c-.409-.32-.9-.6-1.39-.8L10.024.32a.438.438 0 00-.41-.32H6.344a.438.438 0 00-.41.32l-.326 2.12c-.491.2-.941.48-1.392.8l-2.045-.8c-.205-.08-.41 0-.491.16L.042 5.36c-.081.16-.04.4.082.52l1.76 1.32c0 .28-.041.52-.041.8s.04.52.04.8L.166 10.12c-.164.12-.205.32-.082.52L1.72 13.4c.082.16.327.24.491.16l2.046-.8c.409.32.9.6 1.39.8l.328 2.12c.04.2.204.32.409.32h3.273c.204 0 .368-.16.409-.32l.327-2.12c.491-.2.941-.48 1.391-.8l2.046.8c.204.08.409 0 .49-.16l1.637-2.76c.082-.16.041-.4-.082-.52l-1.8-1.32zm-6.096 2c-1.595 0-2.863-1.24-2.863-2.8 0-1.56 1.268-2.8 2.863-2.8 1.596 0 2.864 1.24 2.864 2.8 0 1.56-1.268 2.8-2.864 2.8z" />
    </svg>
  );
}

export default SettingsIcon;
