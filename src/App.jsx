import { Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import Category from "./pages/Category.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";

import NotFound from "./pages/NotFound.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import ProtectedLayout from "./layouts/ProtectedLayout.jsx";
import AddProduct from "./components/AddProduct.jsx";
import { CategoryContextProvider } from "./context/CategoryContext.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";

function App() {
  return (
    <AuthContextProvider>
      <ProductProvider>
        <CartContextProvider>
          <CategoryContextProvider>
            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/category/:category" element={<Category />} />
                <Route element={<ProtectedLayout />}>
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </CategoryContextProvider>
        </CartContextProvider>
      </ProductProvider>
    </AuthContextProvider>
  );
}

export default App;
