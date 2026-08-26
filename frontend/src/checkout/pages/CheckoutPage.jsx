import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  Loader2,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useStore } from "../../Store";
import {
  clearCheckoutError,
  getCheckoutSummary,
  submitCheckout,
} from "../state/Checkout/Action";

import CheckoutItems from "../components/Checkout/CheckoutItems";
import CheckoutSummary from "../components/Checkout/CheckoutSummary";
import AddressForm from "../components/Checkout/AddressForm";
import PaymentMethod from "../components/Checkout/PaymentMethod";
import CheckoutResult from "../components/Checkout/CheckoutResult";

import Navigation from "../../home/customer/components/Navigation/Navigation";
import Footer from "../../home/customer/components/Footer/Footer";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();

  const checkoutState = state.checkout || {
    items: [],
    subtotal: 0,
    shippingCharge: 0,
    discount: 0,
    total: 0,
    loading: false,
    submitting: false,
    error: null,
    result: null,
  };

  const [form, setForm] = useState({
    paymentMethod: "COD",
    shippingAddress: "",
    city: "",
    state: "",
    postalCode: "",
  });

  console.log("================================");
  console.log("[CHECKOUT PAGE] Rendering");
  console.log("[CHECKOUT PAGE] State:", state);
  console.log("[CHECKOUT PAGE] Checkout state:", checkoutState);
  console.log("================================");

  useEffect(() => {
    console.log("================================");
    console.log("[CHECKOUT PAGE] USE EFFECT");
    console.log("[CHECKOUT PAGE] Loading summary");
    console.log("================================");

    dispatch(getCheckoutSummary()).catch((error) => {
      console.error(
        "[CHECKOUT PAGE] Summary failed:",
        error
      );
    });
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    console.log("[CHECKOUT PAGE] Form change:", {
      name,
      value,
    });

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  console.log("================================");
  console.log("[CHECKOUT PAGE] SUBMIT");
  console.log("[CHECKOUT PAGE] Form:", form);
  console.log("================================");

  try {
    const result = await dispatch(submitCheckout(form));

    console.log("[CHECKOUT PAGE] Checkout response:", result);

    // Checkout successful
    navigate("/payment", {
      state: {
        checkout: result,
      },
    });
  } catch (error) {
    console.error(
      "[CHECKOUT PAGE] Checkout failed:",
      error
    );
  }
};

  if (checkoutState.result) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />

        <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <CheckoutResult result={checkoutState.result} />
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="mb-5 flex items-center gap-2 text-sm font-semibold text-blue-100 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to cart
            </button>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
              <CreditCard className="h-4 w-4" />
              Checkout
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Complete your order.
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-100">
              Confirm your delivery details and payment method before placing the order.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {checkoutState.error && (
            <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              <span>{checkoutState.error}</span>

              <button
                type="button"
                onClick={() => dispatch(clearCheckoutError())}
                className="font-bold hover:underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {checkoutState.loading ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-slate-200 bg-white">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading checkout...
              </div>
            </div>
          ) : !checkoutState.items?.length ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
              <MapPin className="mx-auto h-12 w-12 text-slate-400" />

              <h2 className="mt-4 text-2xl font-black text-slate-900">
                Nothing to checkout
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Your checkout summary is empty. Add products to the cart first.
              </p>

              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="mt-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20"
              >
                Back to cart
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                  <CheckoutItems
                    items={checkoutState.items}
                  />

                  <AddressForm
                    form={form}
                    onChange={handleChange}
                    disabled={checkoutState.submitting}
                  />

                  <PaymentMethod
                    value={form.paymentMethod}
                    onChange={handleChange}
                    disabled={checkoutState.submitting}
                  />
                </div>

                <CheckoutSummary
                  subtotal={checkoutState.subtotal}
                  shippingCharge={
                    checkoutState.shippingCharge
                  }
                  discount={checkoutState.discount}
                  total={checkoutState.total}
                  submitting={checkoutState.submitting}
                  onSubmit={() => {}}
                />
              </div>
            </form>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
