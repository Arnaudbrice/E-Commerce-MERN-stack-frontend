import React from "react";

import logo from "../assets/images/logo.png";
import { Link } from "react-router";
import {
  FaCcMastercard,
  FaCcVisa,
  FaChevronRight,
  FaGavel,
  FaPaypal,
  FaShieldAlt,
} from "react-icons/fa";
import { CiLocationOn, CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { MdAssignmentReturn, MdLocalShipping } from "react-icons/md";
import { SiKlarna, SiSepa } from "react-icons/si";

const Footer = () => {
  {
    /* <footer className="footer footer-center p-4 bg-white mt-16 text-lg sm:text-xl text-[#361F17] ">
      <p>
        {" "}
        &copy;{new Date().getFullYear()} Made with ❤️ by Brice Arnaud Habenicht
      </p>
    </footer> */
  }
  return (
    <div>
      <footer className="bg-background-light dark:bg-background-dark border-t border-secondary/10  ">
        <div className="mx-auto px-4 pt-12 @container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-secondary p-2 rounded-xl">
                  <span className="material-symbols-outlined text-background-dark font-bold">
                    {/* <img src={logo} alt="logo" className="h-16" /> */}
                  </span>
                  <img src={logo} alt="logo" className="h-8 " />
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Your premium destination for curated fashion and lifestyle
                essentials. Quality meets elegance in every piece.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Quick Links
              </h3>
              <ul className="flex flex-col gap-3">
                <Link
                  to="/"
                  className="text-slate-600 dark:text-slate-400 hover:text-secondary transition-colors flex items-center gap-2">
                  {" "}
                  Home
                </Link>
                <Link
                  to="/cart"
                  className="text-slate-600 dark:text-slate-400 hover:text-secondary transition-colors flex items-center gap-2">
                  {" "}
                  Cart
                </Link>
                <Link
                  to="/about-us"
                  className="text-slate-600 dark:text-slate-400 hover:text-secondary transition-colors flex items-center gap-2">
                  {" "}
                  About Us
                </Link>

                <Link
                  to="/faq"
                  className="text-slate-600 dark:text-slate-400 hover:text-secondary transition-colors flex items-center gap-2">
                  FAQ
                </Link>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Customer Service
              </h3>
              <ul className="flex flex-col gap-3">
                <Link
                  to="/shipping-policy"
                  className="text-slate-600 dark:text-slate-400 hover:text-secondary transition-colors flex items-center gap-2">
                  <MdLocalShipping />
                  Shipping Policy
                </Link>
                <Link
                  to="/returns-refunds"
                  className="text-slate-600 dark:text-slate-400 hover:text-secondary transition-colors flex items-center gap-2">
                  <MdAssignmentReturn /> Returns &amp; Refunds
                </Link>
                <Link
                  to="/privacy-policy"
                  className="text-slate-600 dark:text-slate-400 hover:text-secondary transition-colors flex items-center gap-2">
                  <FaShieldAlt />
                  Privacy Policy
                </Link>
                <Link
                  to="/terms-of-service"
                  className="text-slate-600 dark:text-slate-400 hover:text-secondary transition-colors flex items-center gap-2">
                  <FaGavel /> Terms of Service
                </Link>
              </ul>
            </div>
            {/* <div className="flex flex-col gap-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Newsletter
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Get the latest updates on new arrivals and upcoming sales.
              </p>
              <div className="flex w-full">
                <div className="flex-1">
                  <input
                    className="w-full h-12 px-4 rounded-l-xl border-none bg-slate-200 dark:bg-secondary/5 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-secondary/50 outline-none placeholder:text-slate-500"
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>
                <button className="bg-secondary hover:bg-secondary/90 text-background-dark font-bold h-12 px-6 rounded-r-xl transition-all">
                  Subscribe
                </button>
              </div>
            </div> */}
          </div>
          <div className="pt-8 border-t border-slate-200 dark:border-secondary/10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-secondary">
                Contact Us
              </h4>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <CiMail className="text-secondary" />

                  <span>hello@bonmarche.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <IoCallOutline className="text-secondary" />
                  <span>+49 4202 / 49 4203 / 49 4204</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <CiLocationOn className="text-secondary" />
                  <span>
                    Bon Marché GmbH, bonmarchestrasse 24, 28832 Achim,
                    Niedersachsen, Germany
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:items-end gap-4">
              <div className="flex gap-4 items-center">
                <FaCcVisa />

                <FaCcMastercard />

                <FaPaypal />

                <SiKlarna />
                <SiSepa />
              </div>
            </div>
          </div>
          <div className="mt-12 text-center text-slate-500 dark:text-slate-500 text-sm">
            {/*  <p>
              © Copyright 2026 Bon Marché. All rights reserved. Designed with
              precision for the modern web.
            </p> */}

            <p className=" footer footer-center p-4 bg-white mt-16 text-lg sm:text-xl text-[#361F17] ">
              {" "}
              &copy;Copyright {new Date().getFullYear()}. All rights reserved.
              Made with ❤️ by Brice Arnaud Habenicht
            </p>
          </div>
        </div>
      </footer>
      <nav className="sticky bottom-0 w-full bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-secondary/10 md:hidden flex justify-around items-center h-16 px-4">
        <a className="flex flex-col items-center gap-1 text-secondary" href="#">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">
            Home
          </span>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-500" href="#">
          <span className="material-symbols-outlined">storefront</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">
            Shop
          </span>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-500" href="#">
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">
            Cart
          </span>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-500" href="#">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">
            Profile
          </span>
        </a>
      </nav>
    </div>
  );
};

export default Footer;
