import React from "react";
import { AccountIcon, HashIcon, SchoolIcon, VerifiedIcon } from "../../icons";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";

interface Props {
  nextStep?: (step: number) => void;
  prevStep?: (step: number) => void;
  handleChange?: (input: any) => (event: { target: { value: any } }) => void;
  values?: {
    role: string;
    email: string;
    age: string;
    city: string;
    country: string;
  };
}

export const UserNeed: React.FC<Props> = ({ nextStep }) => {
  return (
    <div className="space-y-4">
      <span className="text-xl font-bold">Choose</span>
      <p>What do you want to do, please choose one of the following options.</p>
      <div className="flex flex-col space-y-3">
        <div
          className="flex justify-center gap-3 bg-primary-300 px-4 py-2 rounded cursor-pointer"
          onClick={() => {
            nextStep!(2);
          }}
        >
          <SchoolIcon />
          <p>Join school</p>
        </div>
        <div
          className="flex justify-center gap-3 bg-primary-300 px-4 py-2 rounded cursor-pointer"
          onClick={() => {
            nextStep!(5);
          }}
        >
          <VerifiedIcon />
          <p>Register school</p>
        </div>
      </div>
    </div>
  );
};

export const UserRole: React.FC<Props> = ({ nextStep, prevStep }) => {
  const next = (e: any) => {
    e.preventDefault();
    nextStep!(3);
  };

  const back = (e: any) => {
    e.preventDefault();
    prevStep!(1);
  };

  return (
    <div className="space-y-4">
      <span className="text-xl font-bold">Who are you ?</span>
      <p>
        Hello, we need to know who you are in order to personalize your
        experience when QUIBI
      </p>
      <div className="flex flex-col space-y-3">
        <div className="flex gap-3 bg-primary-300 px-4 py-2 rounded cursor-pointer">
          <SchoolIcon />
          <p>Student</p>
        </div>
        <div className="flex gap-3 bg-primary-300 px-4 py-2 rounded cursor-pointer">
          <HashIcon />
          <p>Teacher</p>
        </div>
        <div className="flex gap-3 bg-primary-300 px-4 py-2 rounded cursor-pointer">
          <AccountIcon />
          <p>Parent</p>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-1">
          <Button color="primary" size="medium" onClick={back}>
            Back
          </Button>
        </div>
        <Button size="medium" onClick={next}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export const UserSchool: React.FC<Props> = ({ nextStep, prevStep }) => {
  const next = (e: any) => {
    e.preventDefault();
    nextStep!(4);
  };

  const back = (e: any) => {
    e.preventDefault();
    prevStep!(2);
  };

  return (
    <div className="space-y-4">
      <span className="text-xl font-bold">Which school ?</span>
      <p>We need to what school you are in order to connect you to it</p>
      <div className="flex flex-col space-y-3">
        <Input placeholder="School ID" />
      </div>
      <div className="flex">
        <div className="flex flex-1">
          <Button color="primary" size="medium" onClick={back}>
            Back
          </Button>
        </div>
        <Button size="medium" onClick={next}>
          Continue
        </Button>
      </div>
    </div>
  );
};
