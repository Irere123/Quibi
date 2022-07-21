import React from "react";
import {
  isToday,
  isYesterday,
  format,
  isThisWeek,
  formatDistance,
} from "date-fns";

interface FormattedDateProps {
  date: Date;
}

export const FormattedDate: React.FC<FormattedDateProps> = ({ date }) => {
  let text = null;
  if (isToday(date)) {
    text = <>Today</>;
  } else if (isYesterday(date)) {
    text = <>Yesterday</>;
  } else if (isThisWeek(date)) {
    text = <>{formatDistance(date, new Date(date.getMilliseconds()))} ago</>;
  }
  {
    text = format(date, `dd/MM/yyyy`);
  }
  return <>{text}</>;
};
