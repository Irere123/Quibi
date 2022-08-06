import { useRouter } from "next/router";
import React, { useState } from "react";
import { CompassIcon, PlusIcon } from "../../icons";
import { BoxedIcon } from "../../ui/BoxedIcon";
import { PageHeader } from "../../ui/PageHeader";
import { MiddlePanel } from "../layouts/GridPanels";
import { CreateScheduledQuizModal } from "./CreateScheduledQuizModal";
import { ScheduledQuizCard } from "./ScheduledQuizCard";
import avatar from "../../img/avatar.jpg";

export const ScheduledQuizList: React.FC = () => {
  const { push } = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <CreateScheduledQuizModal
          isOpen={open}
          onRequestClose={() => setOpen(!open)}
        />
      )}
      <MiddlePanel
        stickyChildren={
          <PageHeader
            title="Scheduled"
            content={
              <div className="flex gap-3">
                <BoxedIcon onClick={() => setOpen(!open)}>
                  <PlusIcon />
                </BoxedIcon>
                <BoxedIcon
                  className="text-accent"
                  onClick={() => push("/explore")}
                >
                  <CompassIcon />
                </BoxedIcon>
              </div>
            }
          />
        }
      >
        <div className="mt-4">
          <ScheduledQuizCard
            info={{
              creator: { avatarUrl: avatar.src, username: "Irere Emmy" },
              description: "This the best quiz you can ever ask for",
              title: "Maths weekly test",
            }}
          />
        </div>
      </MiddlePanel>
    </>
  );
};
