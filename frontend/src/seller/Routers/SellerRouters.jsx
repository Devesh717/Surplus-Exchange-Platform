import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import SellerDashboardPage from "../pages/SellerDashboardPage";
import SellerOrdersPage from "../pages/SellerOrdersPage";
import SellerOrderDetailsPage from "../pages/SellerOrderDetailsPage";
import SellerProfilePage from "../pages/SellerProfilePage";

import SellerProductsPage
  from "../../product/customer/pages/SellerProductsPage/SellerProductsPage";

import CreateProductPage
  from "../../product/customer/pages/SellerProductsPage/CreateProductPage";

import SellerProductDetailsPage
  from "../../product/customer/pages/SellerProductDetailsPage/SellerProductDetails";

import EditProductPage
  from "../../product/customer/pages/SellerProductDetailsPage/EditProductPage";


export default function SellerRouters() {

  return (
    <Routes>

      {/* ================================
          SELLER DASHBOARD
          ================================ */}

      <Route
        path="dashboard"
        element={<SellerDashboardPage />}
      />


      {/* ================================
          SELLER PRODUCTS
          ================================ */}

      <Route
        path="products"
        element={<SellerProductsPage />}
      />

      <Route
        path="products/new"
        element={<CreateProductPage />}
      />

      {/* SELLER PRODUCT DETAILS */}

      <Route
        path="products/:id"
        element={<SellerProductDetailsPage />}
      />

      {/* EDIT SELLER PRODUCT */}

      <Route
        path="products/:id/edit"
        element={<EditProductPage />}
      />


      {/* ================================
          SELLER ORDERS
          ================================ */}

      <Route
        path="orders"
        element={<SellerOrdersPage />}
      />

      <Route
        path="orders/:id"
        element={<SellerOrderDetailsPage />}
      />


      {/* ================================
          SELLER PROFILE
          ================================ */}

      <Route
        path="profile"
        element={<SellerProfilePage />}
      />


      {/* ================================
          UNKNOWN SELLER ROUTE
          ================================ */}

      <Route
        path="*"
        element={
          <Navigate
            to="/seller/dashboard"
            replace
          />
        }
      />

    </Routes>
  );
}