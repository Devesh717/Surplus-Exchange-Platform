import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Admin from "../Admin/components/Admin";
import Dashboard from "../Admin/components/Dashboard";
import CustomersTable from "../Admin/components/CustomersTable";

import SellerVerification from "../Admin/components/SellerVerification";
import ProductVerification from "../Admin/components/ProductVerification";

import OrdersTable from "../Admin/components/OrdersTable";
import AdminProfile from "../Admin/components/AdminProfile";
import Reports from "../Admin/components/Reports";

export default function AdminRouters() {
  return (
    <Routes>
      {/* ADMIN LAYOUT */}
      <Route path="/" element={<Admin />}>

        {/* /admin -> /admin/dashboard */}
        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />

        {/* /admin/dashboard */}
        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        {/* /admin/users */}
        <Route
          path="users"
          element={<CustomersTable />}
        />

        {/* /admin/verification */}
        <Route
          path="verification"
          element={
            <Navigate
              to="verification/sellers"
              replace
            />
          }
        />

        {/* /admin/verification/sellers */}
        <Route
          path="verification/sellers"
          element={<SellerVerification />}
        />

        {/* /admin/verification/products */}
        <Route
          path="verification/products"
          element={<ProductVerification />}
        />

        {/* /admin/orders */}
        <Route
          path="orders"
          element={<OrdersTable />}
        />

        {/* /admin/reports */}
        <Route
          path="reports"
          element={<Reports />}
        />

        {/* /admin/profile */}
        <Route
          path="profile"
          element={<AdminProfile />}
        />

      </Route>

      {/* Unknown admin route */}
      <Route
        path="*"
        element={
          <Navigate
            to="/admin/dashboard"
            replace
          />
        }
      />
    </Routes>
  );
}