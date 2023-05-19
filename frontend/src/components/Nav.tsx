import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

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
} from "react-icons/md";
import { TfiGift } from "react-icons/tfi";
import useAuth from "../hooks/useAuth";

function Nav() {
  const [showNav, setShowNav] = useState(false);
  const { user } = useAuth();
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
          <NavItem
            path={`/items/${user?.uid}/add`}
            text="add listing"
            icon={<MdOutlineAddToPhotos />}
          />
          <NavItem path={"/"} text="community" icon={<MdOutlineGroups />} />

          <NavItem
            path={"/"}
            text="volunteer"
            icon={<MdOutlineVolunteerActivism />}
          />
          <NavItem path={"/"} text="chats" icon={<BsChatQuote />} />
          <NavItem path={"/"} text="notification" icon={<FaRegBell />} />
          <NavItem path={"/"} text="profile" icon={<FaRegUser />} />
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
        <NavBtn
          path={`/items/${user?.uid}/add`}
          icon={<MdOutlineAddToPhotos />}
          text="add listing"
        />
        <NavBtn path={"/"} icon={<MdOutlineGroups />} text="community" />
        <NavBtn
          path={"/"}
          icon={<MdOutlineVolunteerActivism />}
          text="volunteer"
        />
        <NavBtn path={"/"} icon={<FaRegUser />} text="profile" />
      </ul>
    </header>
  );
}

export default Nav;
