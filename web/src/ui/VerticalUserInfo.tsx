import normalizeUrl from "normalize-url";
import React from "react";
import { linkRegex } from "../lib/constants";
import { kFormatter } from "../lib/kFormatter";
import { ApiPreloadLink } from "../shared-components/ApiPreloadLink";
import { SingleUser } from "./Avatars";
import { HeaderController } from "../modules/display/HeaderController";
import { UserWithFollowInfo } from "@quibi/client";

interface VerticalUserInfoProps {
  user: UserWithFollowInfo;
}

export const VerticalUserInfo: React.FC<VerticalUserInfoProps> = ({ user }) => {
  return (
    <>
      <HeaderController
        embed={{}}
        title={`${user.displayName} (@${user.username})`}
      />
      <div className="flex flex-col rounded-8 pt-5 px-6 pb-4 w-full items-center">
        <SingleUser
          size="default"
          src={user.avatarUrl}
          username={user.username}
        />
        <div className="flex mt-2 max-w-full">
          <span className="flex text-primary-100 font-bold h-full break-all line-clamp-1 truncate">
            {user.displayName}
          </span>
          <ApiPreloadLink route="profile" data={{ username: user.username }}>
            <span className="flex text-primary-300 ml-1">@{user.username}</span>
          </ApiPreloadLink>
          {/* <Badges badges={badges} /> */}
        </div>
        <div className="flex mt-2">
          <div className="flex">
            <span className="text-primary-100 font-bold">
              {kFormatter(user.numFollowers)}
            </span>{" "}
            <span className="text-primary-300 ml-1 lowercase">followers</span>
          </div>
          <div className="flex ml-4">
            <span className="text-primary-100 font-bold">
              {kFormatter(user.numFollowing)}
            </span>
            <span className="text-primary-300 ml-1 lowercase"> following</span>
          </div>
        </div>
        <div className="flex w-full mt-2">
          <p className="text-primary-300 mt-2 text-center w-full whitespace-pre-wrap break-words inline line-clamp-6">
            {user.bio!.split(/\n/).map((line, i) => (
              <>
                {i > 0 ? <br key={i} /> : null}
                {line.split(" ").map((chunk, j) => {
                  try {
                    return linkRegex.test(chunk) ? (
                      <a
                        href={normalizeUrl(chunk)}
                        rel="noreferrer"
                        className="text-accent text-center hover:underline inline"
                        key={`${i}${j}`}
                        target="_blank"
                      >
                        {chunk}&nbsp;
                      </a>
                    ) : (
                      <React.Fragment
                        key={`${i}${j}`}
                      >{`${chunk} `}</React.Fragment>
                    );
                  } catch (err) {}

                  return null;
                })}
              </>
            ))}
          </p>
        </div>
      </div>
    </>
  );
};
