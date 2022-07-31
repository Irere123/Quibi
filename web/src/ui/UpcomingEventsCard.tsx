import { isToday, format } from "date-fns";
import Link from "next/link";
import React from "react";
import { PlusIcon } from "../icons";
import { BoxedIcon } from "./BoxedIcon";
import { CardHeading } from "./CardHeading";
import { MultipleUsers } from "./UserAvatar";

interface FormattedEventDateProps {
  scheduledFor: Date;
}

const FormattedEventDate: React.FC<FormattedEventDateProps> = ({
  scheduledFor,
}) => {
  let text = "";
  if (isToday(scheduledFor)) {
    text = format(scheduledFor, `K:mm a`);
  } else {
    text = format(scheduledFor, `do MMM, K:mm a`);
  }
  return <>{text}</>;
};

export interface UserCardProps {
  avatars: string[];
  planers: string[];
}

export interface ScheduledEventSummaryCardProps {
  onClick: () => void;
  id: string;
  scheduledFor: Date;
  planersInfo: UserCardProps;
  title: string;
  transition?: boolean;
}

export interface UpcomingEventsCardProps {
  onCreateScheduledEvent: () => void;
  events: ScheduledEventSummaryCardProps[];
}

const UserCard: React.FC<UserCardProps> = ({ avatars, planers }) => {
  return (
    <div className="w-full flex items-center">
      <MultipleUsers srcArray={avatars} />
      <div className="flex ml-1 text-primary-300 text-sm">
        {planers.join(", ")}
      </div>
    </div>
  );
};

export const ScheduledRoomSummaryCard: React.FC<
  ScheduledEventSummaryCardProps
> = ({ onClick, scheduledFor, planersInfo, title, transition }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 w-full bg-primary-800 flex flex-col gap-2 border-b border-primary-600 cursor-pointer last:border-b-0 ${
        transition ? `transition duration-200 ease-in-out` : ``
      } hover:bg-primary-700 z-0`}
    >
      <div className="flex text-accent text-sm uppercase">
        <FormattedEventDate scheduledFor={scheduledFor} />
      </div>
      <CardHeading text={title} />
      <UserCard {...planersInfo} />
    </button>
  );
};

export const UpcomingEventsCard: React.FC<UpcomingEventsCardProps> = ({
  onCreateScheduledEvent,
  events,
}) => {
  return (
    <div className="w-full rounded overflow-y-auto flex flex-col">
      <div className="px-4 py-3 bg-primary-800 border-b border-primary-600 flex justify-between items-center">
        <p className="text-primary-100 font-bold">Upcoming events</p>
        <BoxedIcon
          onClick={onCreateScheduledEvent}
          style={{ height: "26px", width: "26px" }}
          transition
        >
          <PlusIcon width={12} height={12} />
        </BoxedIcon>
      </div>
      <div className="flex flex-col">
        {events.map((event) => (
          <ScheduledRoomSummaryCard transition key={event.id} {...event} />
        ))}
      </div>

      <Link href="/dash">
        <a className="px-4 py-3 text-primary-100 font-bold bg-primary-700">
          Show more
        </a>
      </Link>
    </div>
  );
};
