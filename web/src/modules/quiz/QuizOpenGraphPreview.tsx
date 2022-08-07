import React from "react";
import { isServer } from "../../lib/isServer";
import { HeaderController } from "../display/HeaderController";

interface QuizOpenGraphPreviewProps {
  // @TODO: make any into a Quiz Type
  quiz: any | null | undefined;
  children?: React.ReactNode;
}

export const QuizOpenGraphPreview: React.FC<QuizOpenGraphPreviewProps> = ({
  quiz,
  children,
}) => {
  if (!isServer && quiz) {
    const { title, description } = quiz;
    return (
      <HeaderController
        title={title}
        description={description}
        embed={{ image: quiz.creator.avatarUrl }}
      />
    );
  }
  return <>{children}</>;
};
