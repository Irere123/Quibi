import { useRouter } from "next/router";
import React, { useState } from "react";
import { ChevronRight } from "react-feather";
import { PushPin, Calendar, Rocket } from "../../icons";

export const LeftPanel: React.FC = () => {
  const [open, setOpen] = useState(true);
  const { push } = useRouter();

  return (
    <div className="flex flex-col mt-5 h-full mb-5">
      <div className="flex flex-col flex-1 space-y-4">
        <div
          onClick={() => push("/u/account")}
          className="text-primary-200 flex gap-2 items-center cursor-pointer"
        >
          <PushPin width={20} height={20} />
          <p>Meetups</p>
        </div>
        <div
          onClick={() => push("/u/account/goals")}
          className="text-primary-200 flex gap-2 items-center cursor-pointer"
        >
          <Rocket />
          <p>Goals</p>
        </div>
        <div
          onClick={() => push("/u/account/events")}
          className="text-primary-200 flex gap-2 items-center cursor-pointer"
        >
          <Calendar />
          <p>Events</p>
        </div>
        {/* <div className="text-primary-200 flex gap-2 items-center cursor-pointer">
          <Map width={20} height={20} />
          <p>Brainmaps</p>
        </div> */}
        <div>
          <div
            className="flex items-center gap-7 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <p className="text-primary-100">Camps</p>
            <button
              className="flex text-primary-200"
              onClick={() => setOpen(!open)}
            >
              <ChevronRight
                className={`transform ${
                  open ? "mr-auto rotate-90 " : "-rotate-90 mt-auto"
                } cursor-pointer`}
                width={20}
                height={20}
              />
            </button>
          </div>

          {open && (
            <div className="ml-2 text-primary-300">
              <p>School 1</p>
              <p>School 2</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
