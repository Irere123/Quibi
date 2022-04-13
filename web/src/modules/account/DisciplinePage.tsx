import React from "react";
import { HeaderController } from "../components/HeaderController";
import { AccountLayout } from "./AccountLayout";

export const DisciplinePage: React.FC = () => {
  return (
    <>
      <HeaderController title="Discipline" embed={{}} />
      <AccountLayout>
        <h1>Hello Discipline</h1>
      </AccountLayout>
    </>
  );
};
