import React from "react";
import ProductCard from "./ProductCard";
import { PackageOpen } from "lucide-react";

export default function ProductGrid({ products = [], loading }) {
  
  console.log("");
  console.log("================================================");
  console.log("[PRODUCT GRID]");
  console.log("================================================");

  console.log(
    "[PRODUCT GRID] Products:",
    products
  );

  console.log(
    "[PRODUCT GRID] Product count:",
    products?.length
  );

  console.log(
    "[PRODUCT GRID] Loading:",
    loading
  );
  
  if (loading) {
    console.log(
      "[PRODUCT GRID] Showing loading skeleton"
    );
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-96 animate-pulse rounded-2xl bg-slate-200"
          />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
        <PackageOpen className="mx-auto h-12 w-12 text-slate-400" />
        <h3 className="mt-4 text-lg font-bold text-slate-900">
          No products found
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Try another category or check back later for new surplus listings.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
