import React from "react";
import { HeaderController } from "../components/HeaderController";
import { MainForm } from "./MainForm";

export const SetUpPage: React.FC = () => {
  return (
    <div
      className="grid w-full h-full"
      style={{
        gridTemplateRows: "1fr auto 1fr",
      }}
    >
      <HeaderController embed={{}} title="Login" />
      <div className="hidden sm:flex" />
      <div className="flex justify-self-center self-center sm:hidden">
        <h2>Quibi</h2>
      </div>
      <div className="flex w-full">
        <div className="landingPage__loginCard flex m-auto flex-col border-2 p-6 gap-5 border-green-300 sm:rounded z-10 sm:w-400">
          <MainForm />
        </div>
      </div>
      <div className="flex flex-row absolute bottom-0 w-full justify-between px-5 py-5 mt-auto items-center sm:px-7">
        <div className="hidden sm:flex">
          <h3>Quibi</h3>
        </div>
        <div className="flex flex-row gap-4 text-primary-300">
          <p>English (US)</p>
          <a href="/developer" className="ml-2">
            Developer
          </a>
          <a href="/help">Help</a>
        </div>
      </div>
    </div>
  );
};
