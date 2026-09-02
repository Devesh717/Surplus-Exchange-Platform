import React from "react";
import { ArrowUpRight, Edit3, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductImages from "../ProductImages/ProductImages";

const verificationStyles = {
  VERIFIED:
    "bg-emerald-50 text-emerald-700 ring-emerald-200",

  PENDING:
    "bg-amber-50 text-amber-700 ring-amber-200",

  REJECTED:
    "bg-red-50 text-red-700 ring-red-200",
};

export default function SellerProductCard({ product }) {

  const navigate = useNavigate();

  const original =
    Number(product.originalPrice || 0);

  const selling =
    Number(product.sellingPrice || 0);

  const discount =
    original > 0 && selling < original
      ? Math.round(
          ((original - selling) / original) * 100
        )
      : 0;

  const verificationStatus =
    product.verificationStatus ||
    (product.verified ? "VERIFIED" : "PENDING");

  return (
    <article
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-xl
      "
    >

      {/* =====================================================
          IMAGE
          ===================================================== */}

      <div
        className="
          relative
          flex
          h-48
          items-center
          justify-center
          overflow-hidden
          bg-gradient-to-br
          from-slate-100
          via-blue-50
          to-indigo-100
        "
      >

        <ProductImages
          productId={product.id}
          productName={product.name}
          className="h-full w-full object-cover"
        />

        {discount > 0 && (
          <span
            className="
              absolute
              left-4
              top-4
              rounded-full
              bg-blue-600
              px-3
              py-1
              text-xs
              font-bold
              text-white
              shadow
            "
          >
            {discount}% OFF
          </span>
        )}

      </div>


      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className="p-5">

        <div className="mb-3 flex items-center justify-between gap-3">

          <span
            className={`
              rounded-full
              px-2.5
              py-1
              text-xs
              font-semibold
              ring-1
              ${
                verificationStyles[
                  verificationStatus
                ] ||
                "bg-slate-100 text-slate-700 ring-slate-200"
              }
            `}
          >
            {verificationStatus}
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


        {/* =====================================================
            PRICE
            ===================================================== */}

        <div className="mt-5">

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


        {/* =====================================================
            STOCK
            ===================================================== */}

        <div className="mt-4 border-t border-slate-100 pt-4">

          <div className="flex items-center justify-between text-sm">

            <span className="text-slate-500">
              Stock
            </span>

            <span className="font-bold text-slate-900">
              {product.quantity} {product.unit}
            </span>

          </div>

        </div>


        {/* =====================================================
            ACTIONS
            ===================================================== */}

        <div className="mt-5 grid grid-cols-2 gap-3">

          <button
            type="button"
            onClick={() =>
              navigate(
                `/seller/products/${product.id}`
              )
            }
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              px-4
              py-3
              text-sm
              font-bold
              text-white
              transition
              hover:bg-blue-700
            "
          >
            <ArrowUpRight className="h-4 w-4" />
            View
          </button>


          <button
            type="button"
            onClick={() =>
              navigate(
                `/seller/products/${product.id}/edit`
              )
            }
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              text-sm
              font-bold
              text-slate-700
              transition
              hover:bg-slate-50
            "
          >
            <Edit3 className="h-4 w-4" />
            Edit
          </button>

        </div>

      </div>

    </article>
  );
}