import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Heart,
  Loader2,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useStore } from "../../../Store";
import {
  getWishlist,
  removeWishlistItem,
  clearWishlist,
} from "../../state/Action";
import WishlistItemCard from "../components/WishlistItemCard";

export default function WishlistPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();

  const wishlist = state.wishlist || {};
  const items = wishlist.items || [];

  const [removingId, setRemovingId] = useState(null);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("se_token")) {
      dispatch(getWishlist()).catch(() => {});
    }
  }, [dispatch]);

  const handleRemove = async (itemId) => {
    setRemovingId(itemId);

    try {
      await dispatch(removeWishlistItem(itemId));
    } catch (_) {
      // Reducer already stores the error.
    } finally {
      setRemovingId(null);
    }
  };

  const handleClear = async () => {
    if (!items.length) return;

    const confirmed = window.confirm(
      "Remove all products from your wishlist?"
    );

    if (!confirmed) return;

    setClearing(true);

    try {
      await dispatch(clearWishlist());
    } catch (_) {
      // Reducer already stores the error.
    } finally {
      setClearing(false);
    }
  };

  if (wishlist.loading) {
    return (
      <main className="min-h-[70vh] bg-gray-50">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Loader2 size={20} className="animate-spin text-blue-600" />
            Loading your wishlist...
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <Heart size={21} fill="currentColor" />
              </span>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  My Wishlist
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  {items.length === 0
                    ? "Save products you want to come back to."
                    : `${items.length} saved ${
                        items.length === 1 ? "product" : "products"
                      }`}
                </p>
              </div>
            </div>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              disabled={clearing || wishlist.mutationLoading}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {clearing ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Trash2 size={16} />
              )}
              Clear Wishlist
            </button>
          )}
        </div>

        {wishlist.error && (
          <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {wishlist.error}
          </div>
        )}

        {items.length === 0 ? (
          <section className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-400">
              <Heart size={28} />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-gray-900">
              Your wishlist is empty
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Save products you're interested in and easily find them here
              later.
            </p>

            <button
              type="button"
              onClick={() => navigate("/products")}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <ShoppingBag size={16} />
              Browse Products
            </button>
          </section>
        ) : (
          <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <WishlistItemCard
                key={item.itemId}
                item={item}
                onRemove={handleRemove}
                removing={removingId === item.itemId}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
