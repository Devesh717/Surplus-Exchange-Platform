import React from "react";
import { ArrowUpRight, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductImages from "../ProductImages/ProductImages";

const conditionStyles = {
  NEW: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  USED: "bg-amber-50 text-amber-700 ring-amber-200",
  REFURBISHED: "bg-blue-50 text-blue-700 ring-blue-200",
  SCRAP: "bg-slate-100 text-slate-700 ring-slate-200",
};

export default function ProductCard({ product }) {
  console.log(
    "[PRODUCT CARD] Received product:",
    product
  );

  console.log(
    "[PRODUCT CARD] Product ID:",
    product?.id
  );

  console.log(
    "[PRODUCT CARD] Product name:",
    product?.name
  );

  console.log(
    "[PRODUCT CARD] Selling price:",
    product?.sellingPrice
  );
  const navigate = useNavigate();

  const original = Number(product.originalPrice || 0);
  const selling = Number(product.sellingPrice || 0);
  const discount =
    original > 0 && selling < original
      ? Math.round(((original - selling) / original) * 100)
      : 0;

  return (
    <article
      onClick={() => navigate(`/products/${product.id}`)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
    >
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.18),_transparent_45%)]" />

        {discount > 0 && (
          <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow">
            {discount}% OFF
          </span>
        )}

        <ProductImages
          productId={product.id}
          productName={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
              conditionStyles[product.condition] ||
              "bg-slate-100 text-slate-700 ring-slate-200"
            }`}
          >
            {product.condition}
          </span>

          <span className="flex items-center gap-1 text-xs text-slate-500">
            <Tag className="h-3.5 w-3.5" />
            {product.categoryName}
          </span>
        </div>

        <h3 className="line-clamp-1 text-lg font-bold text-slate-900">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
          {product.description}
        </p>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <div className="text-2xl font-extrabold text-slate-900">
              ₹{selling.toLocaleString("en-IN")}
              <span className="ml-1 text-sm font-medium text-slate-500">
                / {product.unit}
              </span>
            </div>

            {original > selling && (
              <div className="text-sm text-slate-400 line-through">
                ₹{original.toLocaleString("en-IN")}
              </div>
            )}
          </div>

          <div className="rounded-full bg-blue-50 p-2 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
          <span>Seller: {product.sellerName}</span>
          <span>{product.quantity} {product.unit} available</span>
        </div>
      </div>
    </article>
  );
}
