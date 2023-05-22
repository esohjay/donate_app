import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

import NavItem from "./NavItem";
import NavBtn from "./NavBtn";

//icons
import { VscChromeClose } from "react-icons/vsc";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsChatQuote, BsBasket2 } from "react-icons/bs";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import {
  MdOutlineAddToPhotos,
  MdOutlineGroups,
  MdOutlineVolunteerActivism,
  MdOutlineLogout,
} from "react-icons/md";
import { TfiGift } from "react-icons/tfi";
import useAuth from "../hooks/useAuth";
import { useAppDispatch } from "../app/hooks";
import { logOut } from "../features/authSlice";

function Nav() {
  const [showNav, setShowNav] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };
  console.log(user);
  return (
    <header className="relative">
      <nav className="bg-mainColor px-5 lg:px-9 flex items-center justify-between h-16">
        <Link to="/" className="text-white font-bold text-2xl">
          myPADI
        </Link>
        <ul className="flex justify-around items-center gap-x-3 md:hidden">
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "text-altColor2" : "text-white"
              }
            >
              {" "}
              <FaRegBell />
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "text-altColor2" : "text-white"
              }
            >
              {" "}
              <BsChatQuote />
            </NavLink>
          </li>
          <button
            className="text-white border-none text-2xl"
            onClick={() => setShowNav(!showNav)}
          >
            {showNav ? <VscChromeClose /> : <GiHamburgerMenu />}
          </button>
        </ul>
        {/* Big screen */}
        <ul className="hidden md:flex gap-x-7 items-center ">
          <NavItem path={"/"} text="free" icon={<TfiGift />} />
          <NavItem path={"/"} text="wanted" icon={<BsBasket2 />} />
          {user && (
            <NavItem
              path={`/items/${user?.uid}/add`}
              text="add listing"
              icon={<MdOutlineAddToPhotos />}
            />
          )}
          <NavItem path={"/"} text="community" icon={<MdOutlineGroups />} />

          <NavItem
            path={"/"}
            text="volunteer"
            icon={<MdOutlineVolunteerActivism />}
          />
          <NavItem path={"/"} text="chats" icon={<BsChatQuote />} />
          <NavItem path={"/"} text="notification" icon={<FaRegBell />} />
          <NavItem path={"/"} text="profile" icon={<FaRegUser />} />
          {user && (
            <li onClick={handleLogout}>
              <div className="h-full flex flex-col  justify-center items-center">
                <button className="text-2xl text-white">
                  <MdOutlineLogout />
                </button>

                <p className="text-white capitalize text-xs">Logout</p>
              </div>
            </li>
          )}
        </ul>
      </nav>
      <ul
        className={`px-5 py-10 flex flex-wrap justify-evenly gap-5 absolute transition-all duration-700
        w-full ${
          showNav ? "left-0" : "-left-full"
        } bg-white bg-opacity-50  backdrop-blur-md md:hidden shadow-sm z-50`}
      >
        <NavBtn path={"/"} icon={<TfiGift />} text="free" />
        <NavBtn path={"/"} icon={<BsBasket2 />} text="wanted" />
        {user && (
          <NavBtn
            path={`/items/${user?.uid}/add`}
            icon={<MdOutlineAddToPhotos />}
            text="add listing"
          />
        )}
        <NavBtn path={"/"} icon={<MdOutlineGroups />} text="community" />
        <NavBtn
          path={"/"}
          icon={<MdOutlineVolunteerActivism />}
          text="volunteer"
        />
        <NavBtn path={"/"} icon={<FaRegUser />} text="profile" />
        {user && (
          <li
            onClick={handleLogout}
            className="w-28 h-28 bg-white rounded-lg shadow-md"
          >
            <div className="h-full flex flex-col  justify-center items-center space-y-2">
              <button className="text-3xl text-mainColor">
                <MdOutlineLogout />
              </button>

              <p className="text-mainColor capitalize text-sm">Logout</p>
            </div>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Nav;
