import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { StoreProvider } from "./Store";

import AdminRouters from "./admin/Routers/AdminRouters";
import SellerRouters from "./seller/Routers/SellerRouters";

import HomePage from "./home/customer/pages/HomePage/HomePage";

import LoginForm from "./auth/customer/auth/LoginForm";
import RegisterForm from "./auth/customer/auth/RegisterForm";
import VerifyEmailForm from "./auth/customer/auth/VerifyEmailForm";
import ForgotPasswordForm from "./auth/customer/auth/ForgotPasswordForm";
import ResetPasswordForm from "./auth/customer/auth/ResetPasswordForm";
import ChangePasswordForm from "./auth/customer/auth/ChangePasswordForm";

import ProductPage from "./product/customer/pages/ProductPage/ProductPage";
import ProductDetailsPage from "./product/customer/pages/ProductDetailsPage/ProductDetailsPage";

import CartPage from "./cart/cart/customer/pages/CartPage/CartPage";

import CheckoutPage from "./checkout/pages/CheckoutPage";

import PaymentPage from "./payment/components/Payment/PaymentPage";

import OrdersPage from "./order/pages/OrdersPage";
import OrderDetailsPage from "./order/pages/OrderDetailsPage";

import UserDashboardPage from "./user/dashboard/pages/UserDashboardPage/UserDashboardPage";

import AIAssistantPage from "./ai/pages/AiPage/AiPage";

import SellerApplicationPage from "./seller/pages/SellerApplicationPage";
import SellerApplicationSubmittedPage from "./seller/pages/SellerApplicationSubmittedPage";

import WishlistPage from "./wishlist/customer/pages/WishlistPage";

import AboutPage from "./home/customer/pages/About/AboutPage";

import HowItWorksPage from "./home/customer/pages/HowItWorks/HowItWorks";
import ContactPage from "./home/customer/pages/Contact/ContactPage";
import HelpCentrePage from "./home/customer/pages/HelpCentre/HelpCentre";
import AboutSurplusExchangePage from "./home/customer/pages/AboutSuplusExchange/AboutSurplusExchangePage";

import UserProfilePage
  from "./user/profile/pages/UserProfile/UserProfilePage";


import "./App.css";


// ============================================================
// ADMIN GUARD
// ============================================================

function AdminAccessGuard({ children }) {
  const token = localStorage.getItem("se_token");
  const role = localStorage.getItem("se_role");

  console.log("====================================");
  console.log("[ADMIN GUARD]");
  console.log("[ADMIN GUARD] token:", Boolean(token));
  console.log("[ADMIN GUARD] role:", role);
  console.log("====================================");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "ADMIN") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}


// ============================================================
// SELLER GUARD
// ============================================================

function SellerAccessGuard({ children }) {
  const token = localStorage.getItem("se_token");
  const role = localStorage.getItem("se_role");

  console.log("====================================");
  console.log("[SELLER GUARD]");
  console.log("[SELLER GUARD] token:", Boolean(token));
  console.log("[SELLER GUARD] role:", role);
  console.log("====================================");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "SELLER") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}


// ============================================================
// SELLER APPLICATION GUARD
//
// BUYER  -> allowed
// SELLER -> seller dashboard
// NONE   -> login
//
// IMPORTANT:
// This guard is NOT inside /seller/*
// ============================================================

function SellerApplicationGuard({ children }) {
  const token = localStorage.getItem("se_token");
  const role = localStorage.getItem("se_role");

  console.log("====================================");
  console.log("[SELLER APPLICATION GUARD]");
  console.log("[SELLER APPLICATION GUARD] token:", Boolean(token));
  console.log("[SELLER APPLICATION GUARD] role:", role);
  console.log("====================================");

  // Not logged in
  if (!token) {
    console.log(
      "[SELLER APPLICATION GUARD] No token -> /login"
    );

    return <Navigate to="/login" replace />;
  }

  // Already approved seller
  if (role === "SELLER") {
    console.log(
      "[SELLER APPLICATION GUARD] Already SELLER -> /seller/dashboard"
    );

    return <Navigate to="/seller/dashboard" replace />;
  }

  // BUYER can apply
  console.log(
    "[SELLER APPLICATION GUARD] BUYER -> application allowed"
  );

  return children;
}


// ============================================================
// APPLICATION SUBMITTED GUARD
// ============================================================

function SellerApplicationSubmittedGuard({ children }) {
  const token = localStorage.getItem("se_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


// ============================================================
// APP
// ============================================================

function App() {
  return (
    <BrowserRouter>
      <StoreProvider>

        <Routes>

          {/* ==================================================
              HOME
          ================================================== */}

          <Route
            path="/"
            element={<HomePage />}
          />

          {/* ==================================================
              ABOUT
          ================================================== */}
          <Route
  path="/about"
  element={<AboutPage />}
/>


{/* ==================================================
              HOW IT WORKS
          ================================================== */}
<Route
  path="/how-it-works"
  element={<HowItWorksPage />}
/>

{/* ==================================================
              CONTACT
          ================================================== */}

<Route
  path="/contact"
  element={<ContactPage />}
/>

{/* ==================================================
              HELP CENTRE
          ================================================== */}

<Route path="/help-centre" element={<HelpCentrePage />} />


{/* ==================================================
              ABOUT SURPLUS EXCHANGE
          ================================================== */}

<Route
  path="/about-surplus-exchange"
  element={<AboutSurplusExchangePage />}
/>


          {/* ==================================================
              AUTH
          ================================================== */}

          <Route
            path="/login"
            element={<LoginForm />}
          />

          <Route
            path="/register"
            element={<RegisterForm />}
          />

          <Route
            path="/verify-email"
            element={<VerifyEmailForm />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPasswordForm />}
          />

          <Route
            path="/reset-password"
            element={<ResetPasswordForm />}
          />

          <Route
            path="/change-password"
            element={<ChangePasswordForm />}
          />


          {/* ==================================================
              PRODUCTS
          ================================================== */}

          <Route
            path="/products"
            element={<ProductPage />}
          />

          <Route
            path="/products/:id"
            element={<ProductDetailsPage />}
          />


          {/* ==================================================
              CART
          ================================================== */}

          <Route
            path="/cart"
            element={<CartPage />}
          />


          {/* ==================================================
              CHECKOUT
          ================================================== */}

          <Route
            path="/checkout"
            element={<CheckoutPage />}
          />


          {/* ==================================================
              PAYMENT
          ================================================== */}

          <Route
            path="/payment"
            element={<PaymentPage />}
          />


          {/* ==================================================
              ORDERS
          ================================================== */}

          <Route
            path="/orders"
            element={<OrdersPage />}
          />

          <Route
            path="/orders/:orderId"
            element={<OrderDetailsPage />}
          />


          {/* ==================================================
              USER DASHBOARD
          ================================================== */}

          <Route
            path="/dashboard"
            element={<UserDashboardPage />}
          />

          {/* ==================================================
              AI
          ================================================== */}

          <Route
            path="/ai"
            element={<AIAssistantPage />}
          />

          {/* ==================================================
              WISHLIST
          ================================================== */}
          <Route 
          path="/wishlist" 
          element={<WishlistPage />} 
          />



          {/* ==================================================
              BECOME SELLER
              
              THIS IS NOT /seller/*
              
              BUYER:
                  /become-seller -> application

              NOT LOGGED IN:
                  /become-seller -> login

              SELLER:
                  /become-seller -> seller dashboard
          ================================================== */}

          <Route
            path="/become-seller"
            element={
              <SellerApplicationGuard>
                <SellerApplicationPage />
              </SellerApplicationGuard>
            }
          />


          {/* ==================================================
              SELLER APPLICATION SUBMITTED
          ================================================== */}

          <Route
            path="/seller-application-submitted"
            element={
              <SellerApplicationSubmittedGuard>
                <SellerApplicationSubmittedPage />
              </SellerApplicationSubmittedGuard>
            }
          />


          {/* ==================================================
              SELLER AREA
              
              EVERYTHING INSIDE /seller/* IS SELLER ONLY
          ================================================== */}

          <Route
            path="/seller/*"
            element={
              <SellerAccessGuard>
                <SellerRouters />
              </SellerAccessGuard>
            }
          />


          {/* ==================================================
              ADMIN
          ================================================== */}

          <Route
            path="/admin/*"
            element={
              <AdminAccessGuard>
                <AdminRouters />
              </AdminAccessGuard>
            }
          />

          {/* USER DASHBOARD */}
<Route
  path="/dashboard"
  element={<UserDashboardPage />}
/>

{/* USER PROFILE */}
<Route
  path="/user/profile"
  element={<UserProfilePage />}
/>


          {/* ==================================================
              UNAUTHORIZED
          ================================================== */}

          <Route
            path="/unauthorized"
            element={
              <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">

                  <h2 className="text-3xl font-bold text-slate-900">
                    Unauthorized
                  </h2>

                  <p className="mt-3 text-slate-600">
                    You do not have permission to access this page.
                  </p>

                  <button
                    onClick={() => {
                      window.location.href = "/";
                    }}
                    className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
                  >
                    Go Home
                  </button>

                </div>
              </div>
            }
          />


          {/* ==================================================
              FALLBACK
          ================================================== */}

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>

      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;