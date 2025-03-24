
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import FoodMenu from "./pages/FoodMenu";
import FoodDetail from "./pages/FoodDetail";
import OrderTracking from "./pages/OrderTracking";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

// Make App a function component
const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/menu" element={<FoodMenu />} />
          <Route path="/food/:id" element={<FoodDetail />} />
          <Route path="/order/:id" element={<OrderTracking />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
