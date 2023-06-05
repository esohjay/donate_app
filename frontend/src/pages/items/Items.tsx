import React from "react";
import { Outlet, NavLink } from "react-router-dom";
// import Btn from "../../components/Btn";

function Item() {
  // const navigate = useNavigate()
  return (
    <section className="p-4">
      <section className=" ">
        <div className="grid grid-cols-3 gap-3 mb-7 font-medium  w-fit">
          <NavLink
            to={`/items`}
            className={({ isActive }) =>
              isActive
                ? "inline-block px-5 py-2 text-white text-center rounded-md shadow-md bg-mainColor capitalize hover:bg-lightGreen hover:text-mainColor"
                : "inline-block px-5 py-2 text-mainColor text-center rounded-md shadow-md bg-white capitalize hover:bg-lightGreen"
            }
          >
            free
          </NavLink>
          <NavLink
            to={`/items/wanted`}
            className={({ isActive }) =>
              isActive
                ? "inline-block px-5 py-2 text-white bg-mainColor text-center rounded-md shadow-md capitalize hover:bg-lightGreen hover:text-mainColor"
                : "inline-block px-5 py-2 text-mainColor bg-white text-center rounded-md shadow-md capitalize hover:bg-lightGreen"
            }
          >
            wanted
          </NavLink>
        </div>
        <article className="bg-white rounded-md min-h-[50vh] ">
          <Outlet />
        </article>
      </section>
    </section>
  );
}

export default Item;
