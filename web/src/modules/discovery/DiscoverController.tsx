import React from "react";
import { MiddlePanel } from "../layouts/GridPanels";

export const DiscoverController: React.FC = () => {
  return (
    <MiddlePanel
      stickyChildren={
        <>
          <div className="bg-primary-800 rounded w-16 h-16">
            <p>Hello</p>
          </div>
        </>
      }
    >
      <div>
        <p>Hello world</p>
      </div>
    </MiddlePanel>
  );
};
