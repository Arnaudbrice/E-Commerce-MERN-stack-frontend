import React from "react";
import { Link, useNavigate } from "react-router";
import {
  MdShoppingBag,
  MdFavorite,
  MdHome,
  MdSearch,
  MdClose,
  MdOutlinePublic,
  MdOutlineLocalShipping,
  MdOutlineSecurity,
  MdHistoryEdu,
} from "react-icons/md";

import { IoDiamondOutline } from "react-icons/io5";
import { TbMessageChatbot, TbTruckReturn } from "react-icons/tb";
import { FaLinkedin } from "react-icons/fa";

import creator from "../assets/images/creator.jpg";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <main className="bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-slate-100">
          Welcome to <span className="text-secondary">Bon Marché</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Your premium destination for curated fashion and lifestyle essentials.
          Quality meets elegance in every piece we offer.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-secondary/5 dark:bg-secondary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-slate-100">
              Our Mission
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              At Bon Marché, we believe that shopping should be an experience,
              not just a transaction. We're committed to bringing you the finest
              selection of products curated with care and delivered with
              precision.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Our mission is to empower our customers to express themselves
              through fashion and lifestyle choices that reflect their unique
              personality.
            </p>
          </div>
          <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-2xl h-80 flex items-center justify-center">
            <MdShoppingBag className="text-9xl text-secondary" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-900 dark:text-slate-100">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <IoDiamondOutline className="text-secondary text-4xl" />,
                title: "Quality First",
                description:
                  "Every product is carefully selected to ensure the highest standards of quality and craftsmanship.",
              },
              {
                icon: <MdFavorite className="text-secondary text-4xl" />,
                title: "Customer Care",
                description:
                  "Your satisfaction is our priority. We offer exceptional customer service and support.",
              },
              {
                icon: <MdOutlinePublic className="text-secondary text-4xl" />,
                title: "Sustainability",
                description:
                  "We're committed to ethical sourcing and sustainable practices in everything we do.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4 inline-block p-3 bg-secondary/10 rounded-lg">
                  <span className="material-symbols-outlined text-secondary text-4xl">
                    {value.icon}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                  {value.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/5 dark:bg-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-900 dark:text-slate-100">
            Why Choose Bon Marché?
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                icon: (
                  <MdOutlineLocalShipping className="text-secondary text-4xl" />
                ),
                title: "Fast & Reliable Shipping",
                description:
                  "We ensure your orders arrive safely and on time, with tracking available for peace of mind.",
              },
              {
                icon: <MdOutlineSecurity className="text-secondary text-4xl" />,
                title: "Secure Shopping",
                description:
                  "Your data is protected with advanced encryption and secure payment processing via Stripe.",
              },
              {
                icon: <TbTruckReturn className="text-secondary text-4xl" />,
                title: "Easy Returns",
                description:
                  "Not satisfied? Return or exchange items within 30 days with no questions asked.",
              },
              {
                icon: <TbMessageChatbot className="text-secondary text-4xl" />,
                title: "AI Shopping Assistant",
                description:
                  "Get personalized product recommendations powered by advanced AI technology.",
              },
            ].map((feature, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0 mt-1">
                  <span className="material-symbols-outlined text-secondary text-5xl">
                    {feature.icon}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-2xl h-80 flex items-center justify-center order-2 md:order-1">
            {/* <MdHome className="text-9xl text-secondary" /> */}
            <MdHistoryEdu className="text-9xl text-secondary" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-slate-100 text-center">
              Our Story
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              Founded in 2025, Bon Marché started with a simple vision: to
              create an online shopping experience that truly understands what
              customers want. We began by carefully curating a selection of
              premium products and have grown into a trusted destination for
              fashion and lifestyle enthusiasts.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              Today, we're proud to serve thousands of happy customers
              worldwide. Our integrated AI shopping assistant and secure payment
              system make every purchase smooth and enjoyable.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              We're constantly innovating to bring you the best shopping
              experience possible. Thank you for being part of the Bon Marché
              community!
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-secondary/5 dark:bg-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-900 dark:text-slate-100">
            Meet the Creator
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-start-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 h-48 flex items-center justify-center">
                {/* <span className="material-symbols-outlined text-9xl text-secondary">
                  person
                </span> */}
                <img
                  src={creator}
                  alt="Brice Arnaud Habenicht"
                  className="rounded-full w-40 h-40 object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Brice Arnaud Habenicht
                </h3>
                <p className="text-secondary font-semibold mb-4">
                  Full Stack Developer
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Passionate about creating exceptional digital experiences.
                  Specialized in MERN and PERN stack development and building
                  secure, scalable applications.
                </p>
                <div className=" grid grid-cols-2 place-items-center gap-4  mt-6 ">
                  <div
                    className="flex gap-4 justify-center items-center  btn btn-secondary btn-lg p-2"
                    onClick={() =>
                      window.open(
                        "https://www.linkedin.com/in/brice-arnaud-habenicht",
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }>
                    <p>LinkedIn: </p>
                    <Link
                      to="https://www.linkedin.com/in/brice-arnaud-habenicht/"
                      className="w-10 h-10 flex items-center justify-center rounded-full  text-secondary hover:bg-secondary hover:text-white transition-all bg-white"
                      target="_blank"
                      // noopener noreferrer to avoid that the new page manipulates the original page (security risk)
                      rel="noopener noreferrer">
                      <FaLinkedin className="size-8" />
                    </Link>
                  </div>

                  <div className="flex gap-4 justify-center items-center  btn btn-outline btn-secondary btn-lg p-2">
                    <p>Portfolio Website: </p>
                    <Link
                      to="https://brice-arnaud-habenicht-portfolio.netlify.app/"
                      className="size-10 flex items-center justify-center rounded-full  text-secondary hover:bg-secondary hover:text-white transition-all bg-white "
                      target="_blank"
                      // noopener noreferrer to avoid that the new page manipulates the original page (security risk)
                      rel="noopener noreferrer">
                      <MdOutlinePublic className="size-10" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-slate-100">
          Ready to Experience Bon Marché?
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
          Explore our curated collection and discover products that match your
          style. Use our AI assistant for personalized recommendations.
        </p>
        <Link
          to="/"
          className="inline-block bg-secondary hover:bg-secondary/90 text-white font-bold py-4 px-8 rounded-xl transition-all">
          Start Shopping Now
        </Link>
      </section>
    </main>
  );
};

export default AboutUs;
