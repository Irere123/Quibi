import React from "react";
import { useMeQuery } from "../../hooks/useMeQuery";

export const TopicsController: React.FC = () => {
  const { me } = useMeQuery();
  return (
    <div>
      <p>{me.username}</p>
      <p>{me.createdAt}</p>
    </div>
  );
};
