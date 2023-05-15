import React from "react";
import { NavLink, To } from "react-router-dom";

type PropType = {
  icon: React.ReactNode;
  path: To;
  text: String;
};
function NavBtn({ icon, path, text }: PropType) {
  return (
    <li className="w-28 h-28 bg-white rounded-lg shadow-md">
      <NavLink
        to={path}
        className={({ isActive }) =>
          isActive ? "text-mainColor " : "text-red-500"
        }
      >
        <div className="h-full flex flex-col  justify-center items-center space-y-2">
          <button className="text-3xl">{icon}</button>

          <p className="text-mainColor capitalize text-sm">{text}</p>
        </div>
      </NavLink>
    </li>
  );
}

export default NavBtn;
