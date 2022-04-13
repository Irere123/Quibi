import React from "react";
import { useRouter } from "next/router";
import avatar from "../../img/avatar2.jpg";
import { WorkCard } from "../../ui/WorkCard";

const works = [
  {
    id: 1,
    date: "2 days ago",
    text: {
      title: "Unit 3 Test",
      subtitle: "Submit the work on thursday",
      tag: "geo",
    },
    sender: {
      avatarUrl: avatar.src,
      username: "James Webb",
    },
  },
  {
    id: 2,
    date: "3 days ago",
    text: {
      subtitle: "This test is on 30 marks work carefully",
      title: "Unit 10 Test",
      tag: "maths",
    },
    sender: {
      avatarUrl: avatar.src,
      username: "Mary Rose",
    },
  },
];

export const WorksController: React.FC = () => {
  const { push } = useRouter();
  return (
    <div className="flex flex-col space-y-3">
      {works.map((w, idx) => (
        <WorkCard
          key={idx}
          date={w.date}
          sender={w.sender}
          text={w.text}
          onActionClicked={() => {
            push(`/works/${w.id}`);
          }}
        />
      ))}
    </div>
  );
};
