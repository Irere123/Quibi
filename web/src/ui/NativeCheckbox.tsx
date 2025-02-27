import React, { useState } from "react";

export interface SwitchProps {
  checked: boolean;
}

export const Switch: React.FC<SwitchProps> = ({ checked }) => {
  return (
    <div
      className={`w-9 h-5 relative rounded-full border px-1 transition duration-400 ease-in-out-hard ${
        checked ? "border-secondary-600" : "border-secondary-400"
      }`}
    >
      <div
        className={`w-3 h-3  rounded-full transition duration-400 ease-in-out-hard absolute top-2/4 left-2/4 transform -translate-y-1/2 ${
          checked
            ? "translate-x-0 bg-secondary-600"
            : "-translate-x-full bg-secondary-400"
        }`}
      />
    </div>
  );
};

export interface NativeCheckboxProps {
  title: string;
  subtitle: string;
  onClick?: (num: number | undefined) => void;
  checked?: boolean;
  num?: number;
  disabled?: boolean;
}

export const NativeCheckbox: React.FC<NativeCheckboxProps> = ({
  title,
  subtitle,
  onClick,
  checked = false,
  num,
  disabled = false,
}) => {
  return (
    <div
      className={`w-full flex px-3 py-2 ${
        !disabled ? "bg-primary-900" : "bg-primary-800"
      } rounded-md justify-between group`}
      onClick={onClick ? () => onClick(num) : undefined}
    >
      <div className="flex flex-col items-start">
        <div
          className={`text-primary-200 ${
            checked ? "font-bold transition duration-200" : "font-bold"
          }`}
        >
          {title}
        </div>
        <div className="text-sm text-primary-300">{subtitle}</div>
      </div>
      <div className="flex items-center justify-center">
        <Switch checked={checked} />
      </div>
    </div>
  );
};

export interface NativeCheckboxControllerProps {
  checkboxes: NativeCheckboxProps[];
}

export const NativeCheckboxController: React.FC<
  NativeCheckboxControllerProps
> = ({ checkboxes }) => {
  // Set checked items based on stored users selection
  const [currentChecked, setCurrentChecked] = useState<Array<number>>([]);

  const handleClick = (id: number | undefined) => {
    if (id !== undefined) {
      if (currentChecked.includes(id)) {
        setCurrentChecked(currentChecked.filter((e) => e !== id));
      } else {
        setCurrentChecked([...currentChecked, id]);
      }
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      {checkboxes.map((c, i) => (
        <NativeCheckbox
          key={c.title + i}
          onClick={handleClick}
          title={c.title}
          subtitle={c.subtitle}
          num={i}
          checked={currentChecked.includes(i)}
        />
      ))}
    </div>
  );
};
