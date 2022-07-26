import React from "react";
import avatar from "../../img/avatar2.jpg";
import avatar2 from "../../img/avatar3.jpg";
import { Card } from "../../ui/Card";

export const Quizes: React.FC = () => {
  return (
    <>
      <Card
        title="Live with u/DeepHellValue"
        avatars={[avatar.src, avatar2.src]}
        live={true}
        tags={["tech", "life"]}
        subtitle={"Terry Owen, James webb"}
        people={230}
      />
      <Card
        title="Everything about health"
        avatars={[avatar.src, avatar2.src]}
        live={true}
        subtitle={"Garry Simon, Peter Thiel"}
        people={20}
      />
      <Card
        title="Monthly test of maths"
        subtitle={
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi, velit"
        }
        avatars={[avatar.src, avatar2.src]}
        date={Date.now()}
        speakers={["Garry Simon, Peter Thiel"]}
      />
    </>
  );
};
