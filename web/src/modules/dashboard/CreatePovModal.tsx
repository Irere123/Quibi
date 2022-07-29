import React from "react";
import avatar from "../../img/avatar.jpg";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { SingleUser } from "../../ui/UserAvatar";

interface CreatePovModalProps {}

export const CreatePovModal: React.FC<CreatePovModalProps> = () => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <span>
          <SingleUser src={avatar.src} active={true} size="sm" />
        </span>
        <Input
          textarea={true}
          placeholder="What's your exprience today?"
          rows={4}
        />
      </div>

      <div className="flex gap-4">
        <Button size="medium">Create</Button>
        <Button size="medium">Cancel</Button>
      </div>
    </div>
  );
};
