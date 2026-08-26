import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  LogOut,
  Package,
  ShoppingBag,
  UserRound,
} from "lucide-react";

import Navigation from "../../home/customer/components/Navigation/Navigation";
import Footer from "../../home/customer/components/Footer/Footer";

export default function SellerLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      label: "Dashboard",
      path: "/seller/dashboard",
      icon: BarChart3,
    },
    {
      label: "Products",
      path: "/seller/products",
      icon: Package,
    },
    {
      label: "Orders",
      path: "/seller/orders",
      icon: ShoppingBag,
    },
    {
      label: "Profile",
      path: "/seller/profile",
      icon: UserRound,
    },
  ];

  const logout = () => {
    localStorage.removeItem("se_token");
    localStorage.removeItem("se_role");
    localStorage.removeItem("se_user_id");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
          <div className="mr-3 text-sm font-black text-slate-900">
            Seller Center
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              location.pathname === item.path ||
              location.pathname.startsWith(`${item.path}/`);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={logout}
            className="ml-auto inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      <main>{children}</main>

      <Footer />
    </div>
  );
}
