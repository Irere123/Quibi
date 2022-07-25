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
  if (isToday(date)) {
    return <>Today</>;
  } else if (isYesterday(date)) {
    return <>Yesterday</>;
  } else if (isThisWeek(date)) {
    return <>{formatDistance(date, date)}</>;
  }

  return <>{format(date, `dd/MM/yyyy`)}</>;
};
