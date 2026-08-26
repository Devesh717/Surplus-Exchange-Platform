import React, { useState } from "react";
import { ArrowLeft, CheckCircle2, ShieldCheck, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../../Store";
import { addToCart } from "../../../../cart/state/Cart/Action";
import ProductImages from "../ProductImages/ProductImages";

export default function ProductDetails({ product }) {
  const navigate = useNavigate();
  const { dispatch } = useStore();
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartError, setCartError] = useState(null);

  if (!product) return null;

  const handleAddToCart = async () => {
    if (!product?.id || addingToCart) return;

    const token = localStorage.getItem("se_token");

    console.log("====================================");
    console.log("[PRODUCT DETAILS] ADD TO CART CLICKED");
    console.log("[PRODUCT DETAILS] Product:", product);
    console.log("[PRODUCT DETAILS] Product ID:", product.id);
    console.log("[PRODUCT DETAILS] Quantity:", 1);
    console.log("[PRODUCT DETAILS] Token present:", Boolean(token));
    console.log("====================================");

    if (!token) {
      console.warn("[PRODUCT DETAILS] User is not authenticated");
      navigate("/login", {
        state: { from: `/products/${product.id}` },
      });
      return;
    }

    setAddingToCart(true);
    setAddedToCart(false);
    setCartError(null);

    try {
      const result = await dispatch(addToCart(product.id, 1));

      console.log("[PRODUCT DETAILS] ADD TO CART SUCCESS:", result);

      setAddedToCart(true);
    } catch (error) {
      console.error("[PRODUCT DETAILS] ADD TO CART FAILED:", error);
      setCartError(
        error?.message ||
          "Unable to add this product to your cart."
      );
    } finally {
      setAddingToCart(false);
    }
  };

  const original = Number(product.originalPrice || 0);
  const selling = Number(product.sellingPrice || 0);
  const discount =
    original > 0 && selling < original
      ? Math.round(((original - selling) / original) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </button>

        <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-2">
          <ProductImages
            productId={product.id}
            productName={product.name}
            showGallery
            className="min-h-[420px]"
          />

          <div className="p-7 sm:p-10">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                {product.categoryName}
              </span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                {product.condition}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-5 leading-7 text-slate-600">
              {product.description}
            </p>

            <div className="mt-8 rounded-2xl bg-slate-50 p-5">
              <div className="flex items-end gap-3">
                <span className="text-4xl font-black text-slate-900">
                  ₹{selling.toLocaleString("en-IN")}
                </span>
                <span className="pb-1 text-sm text-slate-500">
                  / {product.unit}
                </span>
              </div>

              {original > selling && (
                <div className="mt-1 flex gap-3">
                  <span className="text-sm text-slate-400 line-through">
                    ₹{original.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm font-bold text-emerald-600">
                    Save {discount}%
                  </span>
                </div>
              )}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500">Available quantity</p>
                <p className="mt-1 font-bold text-slate-900">
                  {product.quantity} {product.unit}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500">Seller</p>
                <p className="mt-1 font-bold text-slate-900">
                  {product.sellerName}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                Verified marketplace listing
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                Active and available for purchase
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Tag className="h-5 w-5 text-indigo-600" />
                {product.categoryName}
              </div>
            </div>

            {cartError && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {cartError}
              </div>
            )}

            {addedToCart && (
              <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                Product added to your cart.
              </div>
            )}

            <button
              type="button"
              disabled={addingToCart || Number(product.quantity || 0) <= 0}
              className="mt-8 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 font-bold text-white shadow-lg shadow-blue-200 transition hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handleAddToCart}
            >
              {addingToCart
                ? "Adding to cart..."
                : addedToCart
                  ? "Added to cart"
                  : Number(product.quantity || 0) <= 0
                    ? "Out of stock"
                    : "Add to cart"}
            </button>

            {addedToCart && (
              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-6 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
              >
                View cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
