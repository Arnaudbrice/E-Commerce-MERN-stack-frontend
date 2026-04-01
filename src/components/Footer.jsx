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
import useAuth from "../hooks/useAuth.jsx";

const Footer = () => {
  const { user } = useAuth();

  return user ?
      <div className="bg-background-light dark:bg-background-dark border-t border-secondary/10  ">
        <div className="mx-auto px-4 pt-12 @container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-12 mb-12 justify-items-center">
            {/* Logo */}
            <div className="flex flex-col items-center md:items-start  gap-4 p-4 ">
              <div className="btn btn-secondary rounded-xl">
                {/* <span className="material-symbols-outlined text-background-dark font-bold">

                </span> */}
                <img src={logo} alt="logo" />
              </div>

              <p className="text-slate-300 dark:text-slate-300 leading-relaxed  text-center md:text-left">
                Your premium destination for curated fashion and lifestyle
                essentials. Quality meets elegance in every piece.
              </p>
            </div>

            {/* nav for Quick links */}
            <nav aria-label="Quick Links" className="flex flex-col gap-4 p-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Quick Links
              </h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link
                    to="/"
                    className="text-slate-300 dark:text-slate-300 hover:text-secondary transition-colors flex items-center gap-2">
                    {" "}
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className="text-slate-300 dark:text-slate-300 hover:text-secondary transition-colors flex items-center gap-2">
                    {" "}
                    Cart
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about-us"
                    className="text-slate-300 dark:text-slate-300 hover:text-secondary transition-colors flex items-center gap-2">
                    {" "}
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    to="/faq"
                    className="text-slate-300 dark:text-slate-300 hover:text-secondary transition-colors flex items-center gap-2">
                    FAQ
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact-us"
                    className="text-slate-300 dark:text-slate-300 hover:text-secondary transition-colors flex items-center gap-2">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* nav for Customer Service (always li>Link) */}
            <nav
              aria-label="Customer Service"
              className="flex flex-col gap-4 p-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Customer Service
              </h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link
                    to="/shipping-policy"
                    className="text-slate-300 dark:text-slate-300 hover:text-secondary transition-colors flex items-center gap-2">
                    <MdLocalShipping />
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/returns-refunds"
                    className="text-slate-300 dark:text-slate-300 hover:text-secondary transition-colors flex items-center gap-2">
                    <MdAssignmentReturn /> Returns &amp; Refunds
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-slate-300 dark:text-slate-300 hover:text-secondary transition-colors flex items-center gap-2">
                    <FaShieldAlt />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-of-service"
                    className="text-slate-300 dark:text-slate-300 hover:text-secondary transition-colors flex items-center gap-2">
                    <FaGavel /> Terms of Service
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-secondary/10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* contact */}
            <address className="flex flex-col gap-4 p-4 not-italic">
              <h4 className="text-sm  font-bold uppercase tracking-widest text-secondary">
                Contact Us
              </h4>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-slate-300 dark:text-slate-300">
                  <CiMail className="text-secondary" />

                  <span>hello@bonmarche.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 dark:text-slate-300">
                  <IoCallOutline className="text-secondary" />
                  <span>+49 4202 / 49 4203 / 49 4204</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 dark:text-slate-300">
                  <CiLocationOn className="text-secondary" />
                  <span>
                    Bon Marché GmbH, bonmarchestrasse 24, 28832 Achim,
                    Niedersachsen, Germany
                  </span>
                </div>
              </div>
            </address>

            {/* Payment Methods */}
            <div className="flex flex-col md:items-end gap-4 p-4">
              <div className="flex gap-4 items-center">
                <FaCcVisa className="text-2xl" />
                <FaCcMastercard className="text-2xl" />
                <FaPaypal className="text-2xl" />
                <SiKlarna className="text-2xl" />
                <SiSepa className="text-2xl" />
              </div>
            </div>
          </div>

          <div className="mt-12 text-center text-slate-500 dark:text-slate-500 text-sm">
            <p className=" footer footer-center p-4 bg-white mt-16 text-lg sm:text-xl text-[#361F17] ">
              {" "}
              &copy;Copyright {new Date().getFullYear()}. All rights reserved.
              Made with ❤️ by Brice Arnaud Habenicht
            </p>
          </div>
        </div>
      </div>
    : <div className="mt-12 text-center text-slate-500 dark:text-slate-500 text-sm">
        <p className=" footer footer-center p-4 bg-white mt-16 text-lg sm:text-xl text-[#361F17] ">
          {" "}
          &copy;Copyright {new Date().getFullYear()}. All rights reserved. Made
          with ❤️ by Brice Arnaud Habenicht
        </p>
      </div>;
};

export default Footer;
