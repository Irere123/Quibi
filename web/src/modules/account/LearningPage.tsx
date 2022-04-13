import React from "react";
import { HeaderController } from "../components/HeaderController";
import { AccountLayout } from "./AccountLayout";

export const LearningPage: React.FC = () => {
  return (
    <>
      <HeaderController title="Learning" embed={{}} />
      <AccountLayout>
        <h1>Hello Learning</h1>
      </AccountLayout>
    </>
  );
};
