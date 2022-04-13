import React from "react";
import avatar from "../../img/avatar.jpg";
import { TableElement, TableElementHeader } from "../../ui/TableElement";
import { HeaderController } from "../components/HeaderController";
import { AccountLayout } from "./AccountLayout";

export const MarksPage: React.FC = () => {
  return (
    <>
      <HeaderController title="Marks" embed={{}} />
      <AccountLayout>
        <div className="mt-7">
          <div>
            <TableElementHeader
              title="acedemic report"
              user={{
                avatarUrl: avatar.src,
                class: "S2B",
                regNum: "08620",
                username: "Irere Emmanuel",
                year: "2021/2022",
              }}
            />
          </div>
          <div>
            <TableElement
              title="COURSES"
              isFirst
              header={{
                cat: "CAT",
                ex: "EX",
                tot: "TOT",
                percent: "%",
              }}
            />
            <TableElement
              title="Mathematics"
              subject={{
                cat: 10,
                catFix: 60,
                ex: 1,
                exFix: 60,
              }}
            />
            <TableElement
              title="Music"
              subject={{
                cat: 17,
                catFix: 20,
                ex: 18,
                exFix: 20,
              }}
            />
          </div>
        </div>
      </AccountLayout>
    </>
  );
};
