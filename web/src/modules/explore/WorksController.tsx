import React from "react";
import { PlusIcon } from "../../icons";
import { useModalStore } from "../../stores/useModalStore";
import { BoxedIcon } from "../../ui/BoxedIcon";
import { Modal } from "../../ui/Modal";
import { PageHeader } from "../../ui/PageHeader";
import { MiddlePanel } from "../layouts/GridPanels";
import { CreateQuizModal } from "./CreateQuizModal";
import { Quizes } from "./Quizes";

export const WorksController: React.FC = () => {
  const { addQuizModal, setAddQuizModal } = useModalStore();

  return (
    <MiddlePanel
      stickyChildren={
        <PageHeader
          title="For you"
          content={
            <>
              <BoxedIcon onClick={() => setAddQuizModal(!addQuizModal)}>
                <PlusIcon />
              </BoxedIcon>
            </>
          }
        />
      }
    >
      <div className="flex flex-1 flex-col mb-7">
        <div className="flex flex-col space-y-4">
          <Quizes />
        </div>
      </div>
      {addQuizModal && (
        <Modal
          isOpen={addQuizModal}
          onRequestClose={() => setAddQuizModal(!addQuizModal)}
          title="Create new"
          subtitle="When you create a quiz you can invite other people to join it.."
        >
          <CreateQuizModal />
        </Modal>
      )}
    </MiddlePanel>
  );
};
