import { useState } from "react";
import { Routes, Route, useLocation } from "react-router";
import Layout from "./layouts/Layout.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";

import Cards from "./components/Cards.jsx";
import Category from "./pages/Category.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import Footer from "./components/Footer.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  const location = useLocation();
  const isCategoryPage = location.pathname.startsWith("/category/");

  console.log("isCategoryPage", isCategoryPage);
  return (
    <div
      className="min-h-screen w-full grid grid-rows-[auto_1fr_auto]
        font-['Outfit']  "
    >
      <ProductProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route>
              <Route path="/category/:category" element={<Category />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ProductProvider>
    </div>
  );
}

export default App;
