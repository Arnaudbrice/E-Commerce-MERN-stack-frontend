import React from "react";

import logo from "../assets/images/logo.png";

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
        <div className="mx-auto px-4 py-12 @container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <div className="bg-secondary p-2 rounded-lg">
                  <span className="material-symbols-outlined text-background-dark font-bold">
                    {/* <img src={logo} alt="logo" className="h-16" /> */}
                  </span>
                  <img src={logo} alt="logo" className="h-8" />
                </div>
                {/* <h2 className="text-2xl font-extrabold tracking-tight">
                  Bon Marché
                </h2> */}
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Your premium destination for curated fashion and lifestyle
                essentials. Quality meets elegance in every piece.
              </p>
              <div className="flex gap-4">
                <a
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 text-secondary hover:bg-secondary hover:text-background-dark transition-all duration-300"
                  href="#">
                  <span className="material-symbols-outlined text-[20px]">
                    public
                  </span>
                </a>
                <a
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 text-secondary hover:bg-secondary hover:text-background-dark transition-all duration-300"
                  href="#">
                  <span className="material-symbols-outlined text-[20px]">
                    share
                  </span>
                </a>
                <a
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 text-secondary hover:bg-secondary hover:text-background-dark transition-all duration-300"
                  href="#">
                  <span className="material-symbols-outlined text-[20px]">
                    group
                  </span>
                </a>
                <a
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 text-secondary hover:bg-secondary hover:text-background-dark transition-all duration-300"
                  href="#">
                  <span className="material-symbols-outlined text-[20px]">
                    work
                  </span>
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Quick Links
              </h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    className="text-slate-600 dark:text-slate-400 hover:text-secondary transition-colors flex items-center gap-2"
                    href="#">
                    <span className="material-symbols-outlined text-sm">
                      chevron_right
                    </span>{" "}
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="text-slate-600 dark:text-slate-400 hover:text-secondary transition-colors flex items-center gap-2"
                    href="#">
                    <span className="material-symbols-outlined text-sm">
                      chevron_right
                    </span>{" "}
                    Shop
                  </a>
                </li>
                <li>
                  <a
                    className="text-slate-600 dark:text-slate-400 hover:text-secondary transition-colors flex items-center gap-2"
                    href="#">
                    <span className="material-symbols-outlined text-sm">
                      chevron_right
                    </span>{" "}
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    className="text-slate-600 dark:text-slate-400 hover:text-secondary transition-colors flex items-center gap-2"
                    href="#">
                    <span className="material-symbols-outlined text-sm">
                      chevron_right
                    </span>{" "}
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Customer Service
              </h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    className="text-slate-600 dark:text-slate-400 hover:text-secondary transition-colors flex items-center gap-2"
                    href="#">
                    <span className="material-symbols-outlined text-sm">
                      local_shipping
                    </span>{" "}
                    Shipping Policy
                  </a>
                </li>
                <li>
                  <a
                    className="text-slate-600 dark:text-slate-400 hover:text-secondary transition-colors flex items-center gap-2"
                    href="#">
                    <span className="material-symbols-outlined text-sm">
                      assignment_return
                    </span>{" "}
                    Returns &amp; Refunds
                  </a>
                </li>
                <li>
                  <a
                    className="text-slate-600 dark:text-slate-400 hover:text-secondary transition-colors flex items-center gap-2"
                    href="#">
                    <span className="material-symbols-outlined text-sm">
                      shield
                    </span>{" "}
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    className="text-slate-600 dark:text-slate-400 hover:text-secondary transition-colors flex items-center gap-2"
                    href="#">
                    <span className="material-symbols-outlined text-sm">
                      gavel
                    </span>{" "}
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-6">
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
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 dark:border-secondary/10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-secondary">
                Contact Us
              </h4>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <span className="material-symbols-outlined text-secondary text-xl">
                    mail
                  </span>
                  <span>hello@bonmarche.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <span className="material-symbols-outlined text-secondary text-xl">
                    call
                  </span>
                  <span>+1 (555) 000-MARCHE</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <span className="material-symbols-outlined text-secondary text-xl">
                    location_on
                  </span>
                  <span>123 Fashion Ave, Paris, France</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:items-end gap-4">
              <div className="flex gap-4 items-center">
                <img
                  alt="Visa"
                  className="h-8 opacity-75 grayscale hover:grayscale-0 transition-all"
                  data-alt="Visa payment icon"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAMYufkof7suw4Vk2vDBAkgHbcsEs5dei4V6XQOfUQ17GjeRQAA2ZRxCkt2SMX4tuvpvj4YX3L-JdRztol2N4tSIZMOgPbIBe6ikVFnxhkFBS4PT2RnySb-t_Wb6ycneyU3vEQmoTtjvaPJZAq4lovrew7ACrCscCPcnRXs48bDAfxZGIzWZ9TXSkJSCkf0CA_vitbKpOgeVyDa9riWwqmoK81LEsD4THLJGIREOqxeWn3XHKVDKpo66zKKVX6GCj_P25z10muhdY"
                />
                <img
                  alt="Mastercard"
                  className="h-8 opacity-75 grayscale hover:grayscale-0 transition-all"
                  data-alt="Mastercard payment icon"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4PYNQ00u1YxuiWtE_dlwTmY3GWCvp-aBFe2mVvFxs258OrJUtEiuGDQp3rmQKGjbqEJ7oeRLoLu-5-N-wxyBnyxrNiqiwqS2x3vADJ7Sie5wXybNeMVENu1kkaPMKylBaa6MS1GD_Kodyq6B4hXJdxHHyRvbYtH5KolvwFiswbcl5HIVJNZvDfMoCmq_OUQ3D56MgYuLSKs83n0-nMudg5tdaNXB4FMK1S-0YykPZ1Dn6f6fRmYGl0n7rE8y0A3SGVK7g4g-PDOo"
                />
                <img
                  alt="Paypal"
                  className="h-8 opacity-75 grayscale hover:grayscale-0 transition-all"
                  data-alt="Paypal payment icon"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0mYs5SpwUqUE7dJi_41FLlGDO32oKTWXPcBmJ-D9jn06Zav2vdLj5hUrr2Hxh5d7LNoHPML8O-X8yYIaC1AwqIj7ndGb04Gk4CEn9OAsanJ6WlwZusAvA6-toKHWJRL5heRzDQvUU_XKox1vB62i8RT7riPhrFavB-5PpS5R6zCjTbq8TyFzVqdwQP2Z7C0Q-aXo3UapLAd_r4ESFEwST9cHMW26IiCewi8O8HwKP7RGbXu4cQMrIOkGcunEoEtYi7P_Ulu5w344"
                />
                <img
                  alt="Apple Pay"
                  className="h-8 opacity-75 grayscale hover:grayscale-0 transition-all"
                  data-alt="Apple Pay icon"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNswWoGt0M4MFUKmhrASnopEqGmXzkszC2n167W9JUtbcszRRPW15zz6sTocam8LISw7F5ZnbtIjipK56PCYPztu1pGb5Nefy9usdXCmrw920i2RyFri4cwdghG7tFYFvmEtouKYIm4cxFPWw3YThK7EFR4M_64A9dIy3KmlQ2qotv1OspFmilShpPH_7Rj8M4TQ0SwzZx83UCILK_72UOdwLzM3xm1FwcK9M0rXpgjHPJUPSdKdEzGLtWPgvkrh3rbgaT73xQIwY"
                />
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
