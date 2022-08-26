import React, { ReactNode } from "react";
import { Quiz } from "@quibi/client";
import { isServer } from "../../lib/isServer";
import { HeaderController } from "../display/HeaderController";

interface QuizOpenGraphPreviewProps {
  quiz: Quiz | null | undefined;
  children?: ReactNode;
}

export const QuizOpenGraphPreview: React.FC<QuizOpenGraphPreviewProps> = ({
  quiz,
  children,
}) => {
  if (isServer && quiz) {
    const { name, description, peoplePreviewList } = quiz;
    return (
      <HeaderController
        title={name}
        description={description}
        embed={{ image: peoplePreviewList.map((u) => u.avatarUrl)[0] as any }}
      />
    );
  }

  return <>{children}</>;
};
