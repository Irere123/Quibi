import { useRouter } from "next/router";
import React, { useState } from "react";
import { CalendarMonth, PlusIcon } from "../../icons";
import { BoxedIcon } from "../../ui/BoxedIcon";
import { PageHeader } from "../../ui/PageHeader";
import { MiddlePanel } from "../layouts/GridPanels";
import { CreateQuizModal } from "../quiz/CreateQuizModal";
import { Quizes } from "./Quizes";

export const WorksController: React.FC = () => {
  const { push } = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <MiddlePanel
      stickyChildren={
        <PageHeader
          title="For you"
          content={
            <div className="flex gap-3">
              <BoxedIcon className="text-accent" onClick={() => setOpen(!open)}>
                <PlusIcon />
              </BoxedIcon>
              <BoxedIcon onClick={() => push("/scheduled-quizes")}>
                <CalendarMonth />
              </BoxedIcon>
            </div>
          }
        />
      }
    >
      <div className="flex flex-1 flex-col mb-7">
        <div className="flex flex-col space-y-4">
          <Quizes />
        </div>
      </div>
      {open && (
        <CreateQuizModal isOpen={open} onRequestClose={() => setOpen(!open)} />
      )}
    </MiddlePanel>
  );
};
