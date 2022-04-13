import React from "react";
import { SingleUser } from "./UserAvatar";

export type TableElementProps = {
  title?: string;
  isFirst?: boolean;
  header?: {
    cat: string;
    ex: string;
    tot: string;
    percent: string;
  };
  subject?: {
    catFix?: number;
    exFix?: number;
    cat?: number;
    ex?: number;
  };
};

export const TableElementHeader: React.FC<{
  user: {
    username: string;
    avatarUrl: string;
    regNum: string;
    class: string;
    year: string;
    option?: string;
  };
  title: string;
}> = ({ title, user }) => {
  return (
    <div className="flex flex-col mb-4">
      <div className="flex">
        <span className=" flex-1">
          <SingleUser src={user.avatarUrl} username={user.username} />
        </span>
        <div className="flex flex-col justify-end">
          {user.option && <p>Option: {user.option}</p>}
          <p>Year: {user.year}</p>
          <p>Class: {user.class}</p>
          <p>Name: {user.username}</p>
          <p>Reg: {user.regNum}</p>
        </div>
      </div>
      <div className="flex justify-center mb-5">
        <p className="uppercase text-2xl">{title}</p>
      </div>
    </div>
  );
};

export const TableElement: React.FC<TableElementProps> = ({
  subject,
  header,
  isFirst,
  title,
}) => {
  const add = (x: any, y: any) => x + y;

  const percentIt = (marks: number, modelMarks: number) => {
    return Math.round((marks / modelMarks) * 100);
  };

  return (
    <div className="w-full">
      <table className="flex flex-col w-full h-full">
        <thead className="flex gap-10">
          <td className="border-2 border-black px-2 w-52 truncate">
            <p>{title}</p>
          </td>
          <div className="flex flex-1 justify-evenly border-2 border-black">
            <td className="td">
              <p>{!isFirst ? <>{subject?.catFix}</> : <>{header?.cat}</>}</p>
            </td>
            <td className="td">
              <p>{!isFirst ? <>{subject?.exFix}</> : <>{header?.ex}</>}</p>
            </td>
            <td className="td">
              <p>
                {!isFirst ? add(subject?.catFix, subject?.exFix) : header?.tot}
              </p>
            </td>
            <td className="td">
              <p>{!isFirst ? subject?.cat : header?.cat}</p>
            </td>
            <td className="td">
              <p>{!isFirst ? subject?.ex : header?.ex}</p>
            </td>
            <td className="td">
              <p>{!isFirst ? add(subject?.cat, subject?.ex) : header?.tot}</p>
            </td>
            <td className="td">
              <p>
                {isFirst ? (
                  header?.percent
                ) : (
                  <>
                    {percentIt(
                      add(subject?.cat, subject?.ex),
                      add(subject?.catFix, subject?.exFix)
                    )}
                    %
                  </>
                )}
              </p>
            </td>
          </div>
        </thead>
      </table>
    </div>
  );
};
