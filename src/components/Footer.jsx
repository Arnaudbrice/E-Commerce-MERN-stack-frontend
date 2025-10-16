import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center p-4 bg-primary mt-16 text-lg sm:text-xl  ">
      <p>
        {" "}
        &copy;{new Date().getFullYear()} Made with ❤️ by Brice Arnaud Habenicht
      </p>
    </footer>
  );
};

export default Footer;
