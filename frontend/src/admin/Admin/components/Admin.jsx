import React from "react";
import { Outlet } from "react-router-dom";

import "./styles/Admin.css";
export default function Admin() {
  return (
    <main className="admin-page mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
      <Outlet />
    </main>
  );
}
