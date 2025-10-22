import React from "react";
import useAuth from "../hooks/useAuth.jsx";
import User from "../../../E-Commerce-MERN-stack-backend/models/User.js";
import UserMenu from "./UserMenu.jsx";
import GuestMenu from "./GuestMenu.jsx";

const NavBar = () => {
  const { user } = useAuth();
  console.log("user in NavBar:", user);
  return (
    <>
      {user ?
        <UserMenu />
      : <GuestMenu />}
    </>
  );
};

export default NavBar;
