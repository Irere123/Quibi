import { useRouter } from "next/router";
import React from "react";
import avatar from "../../img/avatar2.jpg";
import avatar2 from "../../img/avatar3.jpg";
import { Card } from "../../ui/Card";
import { v4 } from "uuid";

export const Quizes: React.FC = () => {
  const { push } = useRouter();
  return (
    <>
      <Card
        title="Live with u/DeepHellValue"
        avatars={[avatar.src, avatar2.src]}
        live={true}
        tags={["tech", "life"]}
        subtitle={"Terry Owen, James webb"}
        people={230}
        onClick={() => push(`/quiz/${v4()}`)}
      />
      <Card
        title="Everything about health"
        avatars={[avatar.src, avatar2.src]}
        live={true}
        subtitle={"Garry Simon, Peter Thiel"}
        people={20}
        onClick={() => push(`/quiz/${v4()}`)}
      />
      <Card
        title="Monthly test of maths"
        subtitle={
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi, velit"
        }
        avatars={[avatar.src, avatar2.src]}
        date={Date.now()}
        speakers={["Garry Simon, Peter Thiel"]}
        onClick={() => push(`/quiz/${v4()}`)}
      />
    </>
  );
};
