import React from "react";

interface MenuDropDownProps {}

export const MenuDropDown: React.FC<MenuDropDownProps> = () => {
  return (
    <div
      className="flex whitespace-nowrap overflow-ellipsis"
      style={{ width: 200 }}
    >
      <p>Menu</p>
    </div>
  );
};
