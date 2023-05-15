import React from "react";
import { NavLink, To } from "react-router-dom";

type PropType = {
  icon: React.ReactNode;
  path: To;
  text: String;
};
function NavItem({ icon, path, text }: PropType) {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          isActive ? "text-white " : "text-red-500"
        }
      >
        <div className="h-full flex flex-col  justify-center items-center">
          <button className="text-2xl">{icon}</button>

          <p className="text-white capitalize text-xs">{text}</p>
        </div>
      </NavLink>
    </li>
  );
}

export default NavItem;
