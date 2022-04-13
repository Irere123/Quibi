import React from "react";
import { BoxedIcon } from "../../components/BoxedIcon";
import { AccountIcon, AtIcon, SchoolIcon } from "../../icons";
import { kFormatter } from "../../lib/kFormatter";
import { DefaultLayout } from "../layouts/DefaultLayout";

export const DashboardPage: React.FC = () => {
  return (
    <DefaultLayout
      stickyHeader={
        <>
          <h3 className="font-normal">Today</h3>
        </>
      }
    >
      <div className="flex border-2 justify-between border-primary-300 px-6 py-3 rounded">
        <div>
          <div className="flex flex-col items-center">
            <BoxedIcon circle>
              <AccountIcon />
            </BoxedIcon>
            <p className="text-sm">Users</p>
          </div>
          <div className="flex flex-col items-center">
            <h4>{kFormatter(5000)}</h4>
            <p className="text-sm">Joined</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center">
            <BoxedIcon circle>
              <SchoolIcon />
            </BoxedIcon>
            <p className="text-sm">Schools</p>
          </div>
          <div className="flex flex-col items-center">
            <h4>{kFormatter(1000)}</h4>
            <p className="text-sm">Joined</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center">
            <BoxedIcon circle>
              <AtIcon />
            </BoxedIcon>
            <p className="text-sm">Messages</p>
          </div>
          <div className="flex flex-col items-center">
            <h4>{kFormatter(40000)}</h4>
            <p className="text-sm">Sent</p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
