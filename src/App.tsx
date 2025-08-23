import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import { useAppDispatch } from "./app/hooks";
import { initAuth } from "./features/auth/authSlice";
import Product from "./pages/Product";



export default function App() {
  const dispatch = useAppDispatch();
  useEffect(() => { dispatch(initAuth()); }, [dispatch]);

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </main>
    </>
  );
}
