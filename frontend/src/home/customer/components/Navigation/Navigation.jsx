import React, { useEffect, useState } from 'react';
import { Menu, Search, ShoppingCart, User, X, Zap, LogOut, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


export default function Navigation() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const syncAuth = () => {
      setAuthenticated(Boolean(localStorage.getItem('se_token')));
      setRole(localStorage.getItem('se_role'));
    };
    syncAuth();
    window.addEventListener('storage', syncAuth);
    window.addEventListener('auth-changed', syncAuth);
    return () => {
      window.removeEventListener('storage', syncAuth);
      window.removeEventListener('auth-changed', syncAuth);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('se_token');
    localStorage.removeItem('se_role');
    localStorage.removeItem('se_user_id');
    window.dispatchEvent(new Event('auth-changed'));
    setMenuOpen(false);
    navigate('/login');
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/products?q=${encodeURIComponent(query.trim())}`);
    else navigate('/products');
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
    : "/user/dashboard";

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate('/')} className="flex shrink-0 items-center gap-2 text-sm font-bold text-gray-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20">
            <Zap size={16} fill="currentColor" />
          </span>
          <span className="hidden sm:block">surplusexchange</span>
        </button>

        <form onSubmit={submitSearch} className="mx-auto hidden max-w-md flex-1 md:block">
          <div className="relative">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search surplus products..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-800 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
            />
          </div>
        </form>

        <nav className="ml-auto hidden items-center gap-1 sm:flex">
          <button onClick={() => navigate('/products')} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700">Explore</button>
          <button onClick={() => navigate("/become-seller")} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700">Be a seller</button>
        </nav>

        {authenticated ? (
          <div className="relative hidden sm:block">
            <button onClick={() => setMenuOpen((v) => !v)} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50">
              <User size={16} />
              <span>{role || 'Account'}</span>
            </button>
            {menuOpen && (
  <div className="absolute right-0 top-11 w-44 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg">

    <button
  onClick={() => {
    setMenuOpen(false);
    navigate(profilePath);
  }}
  className="block w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50"
>
  Profile
</button>

<button
  onClick={() => {
    setMenuOpen(false);
    navigate(dashboardPath);
  }}
  className="block w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50"
>
  Dashboard
</button>

    {role === "USER" && (
  <>
    <button
      onClick={() => {
        setMenuOpen(false);
        navigate("/cart");
      }}
      className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50"
    >
      <ShoppingCart size={15} />
      Cart
    </button>

    <button
      onClick={() => {
        setMenuOpen(false);
        navigate("/orders");
      }}
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

        <button onClick={() => setMenuOpen((v) => !v)} className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50 sm:hidden" aria-label="Open menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 sm:hidden">
          <form onSubmit={submitSearch} className="mb-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-400" />
            </div>
          </form>
          <div className="grid gap-1">
            <button onClick={() => navigate('/products')} className="rounded-lg px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50">Explore products</button>
            <button onClick={() => navigate('/seller/register')} className="rounded-lg px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50">Be a seller</button>
            {!authenticated ? (
              <>
                <button onClick={() => navigate('/login')} className="rounded-lg px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50">Sign in</button>
                <button onClick={() => navigate('/register')} className="rounded-lg bg-blue-600 px-3 py-2 text-left text-sm font-medium text-white">Create account</button>
              </>
            ) : (
              <button onClick={logout} className="rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">Sign out</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
