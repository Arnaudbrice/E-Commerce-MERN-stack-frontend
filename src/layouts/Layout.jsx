import React from "react";
import { ToastContainer, Bounce, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Outlet } from "react-router";
import { AiOutlineShoppingCart } from "react-icons/ai";
import useProducts from "../hooks/useProducts";
import Footer from "../components/Footer";
const Layout = () => {
  const { cartProductsQuantity } = useProducts();

  return (
    <>
      <div>
        <div className="text-lg shadow-sm navbar sm:text-xl bg-fuchsia-600 ">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="mx-2 btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="py-4 my-4 mt-3 space-y-8 text-white border rounded-lg shadow w-3xs bg-base-100 menu menu-sm dropdown-content z-1 border-amber-50"
              >
                <Link
                  className="text-lg hover:py-6 hover:bg-fuchsia-600 focus:bg-fuchsia-600 btn btn-ghost"
                  to="/"
                >
                  Home
                </Link>
                <Link
                  className="text-lg hover:py-6 btn btn-ghost hover:bg-fuchsia-600 focus:bg-fuchsia-600"
                  to="/cart"
                >
                  <div className="flex indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {" "}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />{" "}
                    </svg>
                    <span className="badge badge-sm indicator-item bg-fuchsia-600 lg:bg-black">
                      {cartProductsQuantity}
                    </span>
                  </div>
                </Link>
              </ul>
            </div>

            <Link to="/">E-Commerce</Link>
          </div>
          <div className="hidden navbar-end lg:flex">
            <ul className="justify-around gap-6 px-4 text-xl menu menu-horizontal">
              <Link className="text-xl btn btn-ghost" to="/">
                Home
              </Link>
              <Link className="text-xl btn btn-ghost" to="/cart">
                <div className="flex  top-1.5 indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
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
              </Link>
            </ul>
          </div>
        </div>
        <ToastContainer
          className="mt-16 text-lg"
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          limit={2}
          transition={Bounce}
        />
      </div>
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;
