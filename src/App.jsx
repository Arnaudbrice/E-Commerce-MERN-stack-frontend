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
import ResetPassword from "./pages/ResetPassword.jsx";
import MailResetPassword from "./pages/MailResetPassword.jsx";
import Order from "./pages/Order.jsx";
import Favorite from "./pages/Favorite.jsx";
import AdminProducts from "./pages/AdminProducts.jsx";

function App() {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <ProductProvider>
          <CategoryContextProvider>
            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/mail-reset-password"
                  element={<MailResetPassword />}
                />
                <Route
                  path="/reset-password/:token"
                  element={<ResetPassword />}
                />
                <Route path="/category/:category" element={<Category />} />
                <Route element={<ProtectedLayout />}>
                  <Route path="/cart" element={<Cart />} />

                  <Route path="/wishlist" element={<Favorite />} />
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/admin/products" element={<AdminProducts />} />
                </Route>

                <Route path="/orders" element={<Order />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </CategoryContextProvider>
        </ProductProvider>
      </CartContextProvider>
    </AuthContextProvider>
  );
}

export default App;
