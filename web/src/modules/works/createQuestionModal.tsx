import React from "react";

type ModalProps = {
  setQuestions: React.Dispatch<React.SetStateAction<never[]>>;
};

export const CreateQuestionModal: React.FC<ModalProps> = () => {
  return (
    <div>
      <p>Hello Modal</p>
    </div>
  );
};
