import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router";
import useProducts from "../hooks/useProducts.jsx";
import { useState } from "react";

const UserMenu = () => {
  const { cartProductsQuantity } = useProducts();

  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClicked = () => {
    setIsOpen(false);
  };

  // NavLink from react-router gives us the isActive prop
  return (
    <div className="text-lg shadow-sm navbar sm:text-xl bg-fuchsia-600 ">
      {/* hamburger menu */}
      <div className="navbar-start ">
        {/* Hidden on middle screens with md:hidden */}
        <div className="dropdown md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <div tabIndex={0} role="button" className="mx-2 btn btn-ghost ">
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
              className="py-4 my-4 mt-3 space-y-8 text-white border rounded-lg shadow w-3xs bg-fuchsia-600 menu menu-sm dropdown-content z-1 border-amber-50 ">
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
                  to="/admin-products">
                  Admin Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({
                    isActive,
                  }) => `text-lg  block px-4 py-2 h-full rounded hover:bg-fuchsia-400
        ${isActive ? "bg-black text-white" : "text-white "}`}
                  to="/orders">
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({
                    isActive,
                  }) => `text-lg  block px-4 py-2 h-full rounded hover:bg-fuchsia-400
        ${isActive ? "bg-black text-white" : "text-white "}`}
                  to="/cart"
                  onClick={handleLinkClicked}>
                  <div className="flex indicator">
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
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />{" "}
                    </svg>
                    <span className="badge badge-sm indicator-item bg-fuchsia-400 lg:bg-black">
                      {cartProductsQuantity}
                    </span>
                  </div>
                </NavLink>
              </li>

              <li className="text-lg  block px-4 py-2  rounded text-white hover:bg-fuchsia-400">
                <button className=" h-full p-0 bg-none">Logout</button>
              </li>
            </ul>
          )}
        </div>

        <NavLink to="/">E-Commerce</NavLink>
      </div>

      {/* shown on middle screens with md:flex */}
      <div className="hidden navbar-center justify-between  md:flex">
        <ul className="justify-around gap-6 px-4 text-xl menu menu-horizontal">
          <li>
            <NavLink
              className={({
                isActive,
              }) => `  block px-4 py-2 h-full rounded hover:bg-fuchsia-400
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
              to="/admin-products">
              Admin Products
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({
                isActive,
              }) => `text-lg  block px-4 py-2 h-full rounded hover:bg-fuchsia-400
        ${isActive ? "bg-black text-white" : "text-white "}`}
              to="/orders">
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({
                isActive,
              }) => `text-lg  block px-4 py-2 h-full rounded hover:bg-fuchsia-400
        ${isActive ? "bg-black text-white " : "text-white "}`}
              to="/cart">
              <div className="flex  top-1.5 indicator ">
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />{" "}
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cartProductsQuantity}
                </span>
              </div>
            </NavLink>
          </li>

          <li className="text-lg  block px-4 py-2  rounded text-white hover:bg-fuchsia-400">
            <button className=" h-full p-0 bg-none">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
