import React from "react";
import { PlusIcon } from "../../icons";
import { BoxedIcon } from "../../ui/BoxedIcon";
import { PageHeader } from "../../ui/PageHeader";
import { MiddlePanel } from "../layouts/GridPanels";
import { LiveQuiz } from "./LiveQuiz";

export const WorksController: React.FC = () => {
  return (
    <MiddlePanel
      stickyChildren={
        <PageHeader
          title="For you"
          content={
            <>
              <BoxedIcon>
                <PlusIcon />
              </BoxedIcon>
            </>
          }
        />
      }
    >
      <div className="flex flex-1 flex-col mb-7">
        <div className="flex flex-col space-y-4">
          <LiveQuiz />
        </div>
      </div>
    </MiddlePanel>
  );
};
