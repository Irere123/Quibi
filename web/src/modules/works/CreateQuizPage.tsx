import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "../../ui/Button";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";
import { LeftPannel, RightPanel } from "../layouts/Panels";
import { BoxedIcon } from "../../ui/BoxedIcon";
import { ArrowBackIcon, PlusIcon } from "../../icons";
import { CreateQuestionModal } from "./createQuestionModal";

interface PageHeaderProps {
  isEmpty: boolean;
  onAdd: () => void;
  onFinish: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  isEmpty,
  onAdd,
  onFinish,
}) => {
  const { back } = useRouter();

  return (
    <div className="flex mt-7">
      <div className="flex flex-1 gap-4 items-center">
        <BoxedIcon circle onClick={() => back()}>
          <ArrowBackIcon />
        </BoxedIcon>
      </div>
      <div className="flex gap-2">
        <BoxedIcon circle onClick={onAdd}>
          <PlusIcon />
        </BoxedIcon>
        {isEmpty && <Button onClick={onFinish}>Finish</Button>}
      </div>
    </div>
  );
};
export const CreateQuizPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState([]);

  let isEmpty = questions.length < 0;

  return (
    <MainLayout leftPanel={<LeftPannel />} rightPanel={<RightPanel />}>
      <HeaderController title="Create Quiz" embed={{}} />
      <MiddlePanel
        stickyChildren={
          <PageHeader
            isEmpty={isEmpty}
            onAdd={() => {
              setOpen(!open);
            }}
            onFinish={() => {
              console.log("finshed");
            }}
          />
        }
      >
        <QuestionContainer isEmpty={isEmpty} />
      </MiddlePanel>
      {open && <CreateQuestionModal setQuestions={setQuestions} />}
    </MainLayout>
  );
};

const QuestionContainer: React.FC<{ isEmpty: boolean }> = ({ isEmpty }) => {
  return (
    <div className="p-4">
      {isEmpty ? (
        <p>Questions</p>
      ) : (
        <div>
          <p>Create questions</p>
        </div>
      )}
    </div>
  );
};
