import React, { useEffect, useState } from "react";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
  Package,
  ArrowLeftRight,
  Mail,
  LogOut
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [query, setQuery] = useState("");
  const [emailVerified, setEmailVerified] = useState(true);
  const [userName, setUserName] = useState("");

console.log("RENDER - userName:", userName);

const avatarLetter =
  userName.trim().charAt(0).toUpperCase() || "U";

console.log("RENDER - avatarLetter:", avatarLetter);

useEffect(() => {
  const syncAuth = () => {
    console.log("========== NAVIGATION SYNC ==========");

    const token = localStorage.getItem("se_token");
    const storedRole = localStorage.getItem("se_role");
    const storedName = localStorage.getItem("se_name");
    const storedVerified = localStorage.getItem("se_email_verified");

    console.log("Navigation token:", token);
    console.log("Navigation role:", storedRole);
    console.log("Navigation name:", storedName);
    console.log("Navigation email verified:", storedVerified);

    setAuthenticated(Boolean(token));
    setRole(storedRole);
    setUserName(storedName || "");

    const verified = storedVerified;
    setEmailVerified(verified !== "false");
  };

  console.log("Navigation useEffect running");

  syncAuth();

  window.addEventListener("storage", syncAuth);
  window.addEventListener("auth-changed", syncAuth);

  return () => {
    window.removeEventListener("storage", syncAuth);
    window.removeEventListener("auth-changed", syncAuth);
  };
}, []);

  const logout = () => {
  localStorage.removeItem("se_token");
  localStorage.removeItem("se_role");
  localStorage.removeItem("se_user_id");
  localStorage.removeItem("se_name");
  localStorage.removeItem("se_email");
  localStorage.removeItem("se_email_verified");

  window.dispatchEvent(new Event("auth-changed"));
  setMenuOpen(false);
  navigate("/login");
};

  const submitSearch = (event) => {
    event.preventDefault();

    if (query.trim()) {
      navigate(`/products?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/products");
    }

    setMenuOpen(false);
  };

  const profilePath =
    role === "ADMIN"
      ? "/admin/profile"
      : role === "SELLER"
      ? "/seller/profile"
      : "/user/profile";

  const dashboardPath =
  role === "ADMIN"
    ? "/admin/dashboard"
    : role === "SELLER"
    ? "/seller/dashboard"
    : "/dashboard";
    
  const showVerifyEmail = authenticated && !emailVerified;

  const closeAndNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">

        <button
  onClick={() => navigate("/")}
  className="flex shrink-0 items-center gap-2.5 text-sm font-bold text-gray-900"
>
  <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-600/25">
    <Package size={17} strokeWidth={2.2} />

    <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
      <ArrowLeftRight size={10} strokeWidth={3} />
    </span>
  </span>

  <span className="hidden text-[15px] font-bold tracking-tight sm:block">
    surplus<span className="text-blue-600">exchange</span>
  </span>
</button>
        <form
          onSubmit={submitSearch}
          className="mx-auto hidden max-w-md flex-1 md:block"
        >
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search surplus products..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-800 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
            />
          </div>
        </form>

        <nav className="ml-auto hidden items-center gap-1 sm:flex">
          {showVerifyEmail && (
            <button
              onClick={() => closeAndNavigate("/verify-email")}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-amber-600 transition hover:bg-amber-50 hover:text-amber-700"
            >
              <Mail size={15} />
              Verify Email
            </button>
          )}

          <button
  onClick={() => navigate("/orders")}
  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
>
  Orders
</button>

<button
  onClick={() => navigate("/wishlist")}
  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
>
  Wishlist
</button>
        </nav>

        {authenticated ? (
          <div className="relative hidden sm:block">
            <button
  onClick={() => setMenuOpen((value) => !value)}
  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
  aria-label="Open account menu"
>
  {avatarLetter}
</button>

            {menuOpen && (
              <div className="absolute right-0 top-11 w-44 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
                <button
                  onClick={() => closeAndNavigate(profilePath)}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50"
                >
                  Profile
                </button>

                <button
                  onClick={() => closeAndNavigate(dashboardPath)}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50"
                >
                  Dashboard
                </button>

                {role === "USER" && (
                  <>
                    <button
                      onClick={() => closeAndNavigate("/cart")}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50"
                    >
                      <ShoppingCart size={15} />
                      Cart
                    </button>

                    <button
                      onClick={() => closeAndNavigate("/orders")}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50"
                    >
                      <Package size={15} />
                      Orders
                    </button>
                  </>
                )}

                <button
                  onClick={logout}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={15} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden items-center gap-2 sm:flex">
            <Link
              to="/login"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
            >
              Sign in
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:from-blue-700 hover:to-indigo-700"
            >
              Sign up
            </Link>
          </div>
        )}

        <button
          onClick={() => setMenuOpen((value) => !value)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50 sm:hidden"
          aria-label="Open menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 sm:hidden">
          <form onSubmit={submitSearch} className="mb-3">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-400"
              />
            </div>
          </form>

          <div className="grid gap-1">
            {showVerifyEmail && (
              <button
                onClick={() => closeAndNavigate("/verify-email")}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-amber-600 hover:bg-amber-50"
              >
                <Mail size={15} />
                Verify Email
              </button>
            )}

            <button
              onClick={() => closeAndNavigate("/products")}
              className="rounded-lg px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50"
            >
              Explore products
            </button>

            <button
              onClick={() => closeAndNavigate("/become-seller")}
              className="rounded-lg px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50"
            >
              Be a seller
            </button>

            {!authenticated ? (
              <>
                <button
                  onClick={() => closeAndNavigate("/login")}
                  className="rounded-lg px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50"
                >
                  Sign in
                </button>

                <button
                  onClick={() => closeAndNavigate("/register")}
                  className="rounded-lg bg-blue-600 px-3 py-2 text-left text-sm font-medium text-white"
                >
                  Create account
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => closeAndNavigate(profilePath)}
                  className="rounded-lg px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50"
                >
                  Profile
                </button>

                <button
                  onClick={() => closeAndNavigate(dashboardPath)}
                  className="rounded-lg px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50"
                >
                  Dashboard
                </button>

                {role === "USER" && (
                  <>
                    <button
                      onClick={() => closeAndNavigate("/cart")}
                      className="rounded-lg px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50"
                    >
                      Cart
                    </button>

                    <button
                      onClick={() => closeAndNavigate("/orders")}
                      className="rounded-lg px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50"
                    >
                      Orders
                    </button>
                  </>
                )}

                <button
                  onClick={logout}
                  className="rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
