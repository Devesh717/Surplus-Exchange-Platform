import React, { useEffect } from "react";
import {
  ArrowLeft,
  Loader2,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../../../Store";
import {
  clearCart,
  clearCartError,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../../../state/Cart/Action";
import CartGrid from "../../components/Cart/CartGrid";
import CartSummary from "../../components/Cart/CartSummary";
import Navigation from "../../../../../home/customer/components/Navigation/Navigation";
import Footer from "../../../../../home/customer/components/Footer/Footer";

export default function CartPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();

  const cartState = state.cart || {
    cartId: null,
    items: [],
    totalAmount: 0,
    loading: false,
    mutationLoading: false,
    error: null,
  };

  console.log("[CART PAGE] Rendering");
  console.log("[CART PAGE] Store state:", state);
  console.log("[CART PAGE] Cart state:", cartState);

  useEffect(() => {
    console.log("====================================");
    console.log("[CART PAGE] USE EFFECT");
    console.log("[CART PAGE] Loading cart");
    console.log("====================================");

    dispatch(getCart()).catch((error) => {
      console.error("[CART PAGE] getCart failed:", error);
    });
  }, [dispatch]);

  const items = cartState.items || [];

  const itemCount = items.reduce(
    (sum, item) =>
      sum + Number(item?.quantity || 0),
    0
  );

  const productCount = items.length;

  const handleUpdate = async (itemId, quantity) => {
    console.log("[CART PAGE] Updating item:", {
      itemId,
      quantity,
    });

    try {
      await dispatch(
        updateCartItem(itemId, quantity)
      );
    } catch (error) {
      console.error(
        "[CART PAGE] Update failed:",
        error
      );
    }
  };

  const handleRemove = async (itemId) => {
  console.log("====================================");
  console.log("[CART PAGE] REMOVE");
  console.log("[CART PAGE] itemId:", itemId);
  console.log("====================================");

  if (!itemId) {
    console.error("[CART PAGE] ERROR: itemId is missing");
    return;
  }

  try {
    await dispatch(removeCartItem(itemId));

    console.log("[CART PAGE] DELETE SUCCESS");

    await dispatch(getCart());

    console.log("[CART PAGE] CART REFRESHED");
  } catch (error) {
    console.error("[CART PAGE] DELETE FAILED:", error);
  }
};

  const handleClear = async () => {
    console.log("[CART PAGE] Clearing cart");

    try {
      await dispatch(clearCart());
    } catch (error) {
      console.error(
        "[CART PAGE] Clear failed:",
        error
      );
    }
  };

  const handleCheckout = () => {
    console.log("[CART PAGE] Checkout clicked");
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="mb-5 flex items-center gap-2 text-sm font-semibold text-blue-100 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Continue shopping
              </button>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
                <ShoppingCart className="h-4 w-4" />
                Shopping cart
              </div>

              <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Review your surplus inventory.
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-100">
                Check quantities, review prices, and continue to checkout when your cart is ready.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {cartState.error && (
            <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              <span>{cartState.error}</span>

              <button
                type="button"
                onClick={() => dispatch(clearCartError())}
                className="font-bold hover:underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {cartState.loading && !cartState.items?.length ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-slate-200 bg-white">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading your cart...
              </div>
            </div>
          ) : !items.length ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
              <ShoppingCart className="mx-auto h-12 w-12 text-slate-400" />

              <h2 className="mt-4 text-2xl font-black text-slate-900">
                Your cart is empty
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Explore the marketplace and add products before returning here.
              </p>

              <button
                type="button"
                onClick={() => navigate("/products")}
                className="mt-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20"
              >
                Explore products
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    Cart #{cartState.cartId || "—"}
                  </p>

                  <h2 className="mt-1 text-2xl font-black text-slate-900">
                    Cart items
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {itemCount} item{itemCount === 1 ? "" : "s"} across{" "}
                    {productCount} product{productCount === 1 ? "" : "s"}
                  </p>
                </div>

                <button
                  type="button"
                  disabled={cartState.mutationLoading}
                  onClick={handleClear}
                  className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear cart
                </button>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <CartGrid
                    items={items}
                    loading={cartState.loading}
                    mutationLoading={cartState.mutationLoading}
                    onUpdate={handleUpdate}
                    onRemove={handleRemove}
                  />
                </div>

                <CartSummary
                  itemCount={itemCount}
                  productCount={productCount}
                  totalAmount={cartState.totalAmount}
                  cartId={cartState.cartId}
                  onCheckout={handleCheckout}
                  disabled={cartState.mutationLoading}
                />
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
