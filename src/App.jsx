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

function App() {
  return (
    <AuthContextProvider>
      <ProductProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/category/:category" element={<Category />} />

            <Route element={<ProtectedLayout />}>
              <Route path="/cart" element={<Cart />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ProductProvider>
    </AuthContextProvider>
  );
}

export default App;
