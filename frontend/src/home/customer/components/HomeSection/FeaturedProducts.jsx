import React, { useEffect } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

import { useStore } from "../../../../Store";
import { getProducts } from "../../../../product/state/Action";

import FeaturedProductCard from "../Product/FeaturedProduct/FeaturedProductCard";

export default function FeaturedProducts() {
  const { state, dispatch } = useStore();

  const productState = state.product;

  // IMPORTANT:
  // Product reducer stores backend products in `content`
  const products = productState?.content || [];
  const loading = productState?.loading || false;
  const error = productState?.error || null;

  useEffect(() => {
    dispatch(
      getProducts({
        page: 0,
        size: 4,
        sort: "sellingPrice,asc",
      })
    ).catch((error) => {
      console.error(
        "Failed to load featured products:",
        error
      );
    });
  }, [dispatch]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

      {/* HEADER */}

      <div className="flex flex-wrap items-end justify-between gap-4">

        <div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Find useful surplus for less.
          </h2>

          <p className="mt-2 max-w-xl text-sm text-gray-500">
            Browse inventory that businesses no longer need and
            put it to work in yours.
          </p>
        </div>

        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-50"
        >
          View all products
          <ArrowRight size={15} />
        </Link>

      </div>

      {/* LOADING */}

      {loading && (
        <div className="mt-7 flex min-h-[180px] items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Loader2
              size={18}
              className="animate-spin"
            />
            Loading products...
          </div>
        </div>
      )}

      {/* ERROR */}

      {!loading && error && (
        <div className="mt-7 rounded-xl border border-red-200 bg-red-50 px-4 py-5 text-center">
          <p className="text-sm font-medium text-red-600">
            Unable to load products.
          </p>

          <p className="mt-1 text-xs text-red-500">
            {error}
          </p>
        </div>
      )}

      {/* PRODUCTS */}

      {!loading && !error && products.length > 0 && (
        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <FeaturedProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}

      {/* EMPTY */}

      {!loading && !error && products.length === 0 && (
        <div className="mt-7 rounded-xl border border-gray-200 bg-gray-50 px-4 py-10 text-center">
          <p className="text-sm text-gray-500">
            No products are currently available.
          </p>
        </div>
      )}

    </section>
  );
}