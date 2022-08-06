import React from "react";
import { PageHeader } from "../../ui/PageHeader";
import { MiddlePanel } from "../layouts/GridPanels";

export const AcademicController: React.FC = () => {
  return (
    <MiddlePanel
      stickyChildren={
        <PageHeader
          content={
            <>
              <div>Hello world</div>
            </>
          }
        />
      }
    >
      <h1>Hello world</h1>
    </MiddlePanel>
  );
};
