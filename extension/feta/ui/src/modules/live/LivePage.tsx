import React from "react";
import { HeaderController } from "../display/HeaderController";
import { DefaultLayout } from "../layouts/DefaultLayout";

export const LivePage: React.FC = () => {
  return (
    <DefaultLayout>
      <HeaderController />
      <p>Hello world</p>
    </DefaultLayout>
  );
};
