import React from "react";
import useAuth from "../hooks/useAuth.jsx";
import User from "../../../E-Commerce-MERN-stack-backend/models/User.js";
import UserMenu from "./UserMenu.jsx";
import GuestMenu from "./GuestMenu.jsx";

const NavBar = () => {
  const { user, isLoading } = useAuth();
  console.log("user in NavBar:", user);

  if (isLoading) {
    return (
      <div className="text-lg shadow-sm navbar sm:text-xl bg-fuchsia-600/50 animate-pulse">
        {/* Navbar Start - Logo Area */}
        <div className="navbar-start">
          <div className="w-32 h-8 bg-white/20 rounded"></div>
        </div>

        {/* Navbar Center - Navigation Links */}
        <div className="hidden navbar-center md:flex">
          <ul className="flex justify-around gap-6 px-4 text-xl">
            {/* Home Link Skeleton */}
            <li>
              <div className="w-20 h-8 bg-white/20 rounded"></div>
            </li>
            {/* Admin Products Link Skeleton */}
            <li>
              <div className="w-32 h-8 bg-white/20 rounded"></div>
            </li>
            {/* Orders Link Skeleton */}
            <li>
              <div className="w-24 h-8 bg-white/20 rounded"></div>
            </li>
            {/* Cart Link Skeleton */}
            <li>
              <div className="w-16 h-8 bg-white/20 rounded flex items-center justify-center">
                <div className="w-5 h-5 bg-white/30 rounded-full"></div>
              </div>
            </li>
            {/* Logout Button Skeleton */}
            <li>
              <div className="w-20 h-8 bg-white/20 rounded"></div>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Skeleton */}
        <div className="md:hidden">
          <div className="w-10 h-10 bg-white/20 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {user ?
        <UserMenu />
      : <GuestMenu />}
    </>
  );
};

export default NavBar;
