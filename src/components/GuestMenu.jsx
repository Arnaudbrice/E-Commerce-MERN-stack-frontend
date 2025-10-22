import "react-toastify/dist/ReactToastify.css";
import { Link, NavLink, Outlet } from "react-router";
import { useState } from "react";

const GuestMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClicked = () => {
    setIsOpen(false);
  };

  // NavLink from react-router gives us the isActive prop
  return (
    <div className="text-lg shadow-sm navbar sm:text-xl bg-fuchsia-600 ">
      {/* hamburger menu */}
      <div className="navbar-start">
        <div className="dropdown" onClick={() => setIsOpen(!isOpen)}>
          <div
            tabIndex={0}
            role="button"
            className="mx-2 btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          {isOpen && (
            <ul
              tabIndex={0}
              className="py-4 my-4 mt-3 space-y-8 text-white border rounded-lg shadow w-3xs bg-fuchsia-600 menu menu-sm dropdown-content z-1 border-amber-50">
              <li>
                <NavLink
                  className={({
                    isActive,
                  }) => `text-lg  block px-4 py-2 h-full rounded hover:bg-fuchsia-400
        ${isActive ? "bg-black text-white" : "text-white "}`}
                  to="/"
                  onClick={handleLinkClicked}>
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({
                    isActive,
                  }) => `text-lg  block px-4 py-2 h-full rounded hover:bg-fuchsia-400
        ${isActive ? "bg-black text-white" : "text-white "}`}
                  to="/login">
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({
                    isActive,
                  }) => `text-lg  block px-4 py-2 h-full rounded hover:bg-fuchsia-400
        ${isActive ? "bg-black text-white" : "text-white "}`}
                  to="/signup">
                  Sign Up
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        <NavLink to="/">E-Commerce</NavLink>
      </div>
      <div className="hidden navbar-end lg:flex">
        <ul className="justify-around gap-6 px-4 text-xl menu menu-horizontal">
          <li>
            <NavLink
              className={({
                isActive,
              }) => `text-lg  block px-4 py-2 h-full rounded hover:bg-fuchsia-400
        ${isActive ? "bg-black text-white" : "text-white "}`}
              to="/">
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({
                isActive,
              }) => `text-lg  block px-4 py-2 h-full rounded hover:bg-fuchsia-400
        ${isActive ? "bg-black text-white" : "text-white "}`}
              to="/login">
              Login
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({
                isActive,
              }) => `text-lg  block px-4 py-2 h-full rounded hover:bg-fuchsia-400
        ${isActive ? "bg-black text-white" : "text-white "}`}
              to="/register">
              Register
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GuestMenu;
