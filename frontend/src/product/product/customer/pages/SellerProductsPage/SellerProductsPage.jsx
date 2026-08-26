import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useStore } from "../../../state/Store";
import { getMyProducts } from "../../../state/Product/Action";
import ProductGrid from "../../components/Product/ProductGrid";

export default function SellerProductsPage() {
  const { state, dispatch } = useStore();
  const productState = state.product || {
    content: [],
    loading: false,
    error: null,
  };

  useEffect(() => {
    dispatch(getMyProducts({ page: 0, size: 20 }));
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Seller workspace
            </p>
            <h1 className="mt-2 text-3xl font-black text-slate-900">
              My products
            </h1>
            <p className="mt-2 text-slate-500">
              Products you create remain hidden from buyers until admin verification.
            </p>
          </div>

          <Link
            to="/seller/products/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 font-bold text-white shadow-lg shadow-blue-200"
          >
            <Plus className="h-5 w-5" />
            Add product
          </Link>
        </div>

        {productState.error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            {productState.error}
          </div>
        )}

        <ProductGrid
          products={productState.content}
          loading={productState.loading}
        />
      </div>
    </main>
  );
}
