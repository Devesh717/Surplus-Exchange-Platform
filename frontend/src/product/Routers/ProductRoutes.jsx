import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProductPage from "../customer/pages/ProductPage/ProductPage";
import ProductDetailsPage from "../customer/pages/ProductDetailsPage/ProductDetailsPage";
import SellerProductsPage from "../customer/pages/SellerProductsPage/SellerProductsPage";
import CreateProductPage from "../customer/pages/SellerProductsPage/CreateProductPage";

function SellerGuard({ children }) {
  const token = localStorage.getItem("se_token");
  const role = localStorage.getItem("se_role");

  if (!token) return <Navigate to="/login" replace />;
  if (role !== "SELLER") return <Navigate to="/unauthorized" replace />;

  return children;
}

export default function ProductRoutes() {
  return (
    <Routes>
      <Route path="/products" element={<ProductPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />

      <Route
        path="/seller/products"
        element={
          <SellerGuard>
            <SellerProductsPage />
          </SellerGuard>
        }
      />

      <Route
        path="/seller/products/new"
        element={
          <SellerGuard>
            <CreateProductPage />
          </SellerGuard>
        }
      />
    </Routes>
  );
}
