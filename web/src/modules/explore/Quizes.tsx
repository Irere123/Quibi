import React from "react";
import avatar from "../../img/avatar2.jpg";
import avatar2 from "../../img/avatar3.jpg";
import { Card } from "../../ui/Card";

export const Quizes: React.FC = () => {
  return (
    <>
      <Card
        title={"My quiz"}
        avatars={[avatar.src, avatar2.src]}
        live={true}
        subtitle={"Hello"}
        people={123}
        onClick={() => {}}
      />
      <Card
        title={"My quiz"}
        avatars={[avatar.src, avatar2.src]}
        live={true}
        subtitle={"Hello"}
        people={123}
        onClick={() => {}}
      />
      <Card
        title={"My quiz"}
        avatars={[avatar.src, avatar2.src]}
        live={true}
        subtitle={"Hello"}
        people={123}
        onClick={() => {}}
      />
    </>
  );
};
