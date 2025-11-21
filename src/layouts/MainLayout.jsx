import React from "react";
import { ToastContainer, Bounce, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, NavLink, Outlet } from "react-router";
import { AiOutlineShoppingCart } from "react-icons/ai";

import Footer from "../components/Footer.jsx";

import NavBar from "../components/NavBar.jsx";

const MainLayout = () => {
  return (
    <div
      className="min-h-screen w-full grid grid-rows-[auto_1fr_auto]
        font-['Outfit'] overflow-x-hidden ">
      <div>
        <NavBar />
        <ToastContainer
          className="mt-16 text-lg "
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          limit={2}
          transition={Bounce}
        />
      </div>
      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
