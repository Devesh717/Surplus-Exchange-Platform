import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Loader2,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { useStore } from "../../../Store";
import {
  clearPaymentError,
  createPaymentOrder,
  verifyPayment,
} from "../../state/Payment/Action";
import PaymentStatus from "./PaymentStatus";

import Navigation from "../../../home/customer/components/Navigation/Navigation";
import Footer from "../../../home/customer/components/Footer/Footer";

function formatINR(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existing = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useStore();

  const paymentState = state.payment || {
    creating: false,
    verifying: false,
    loading: false,
    razorpayOrder: null,
    payment: null,
    error: null,
  };

  const checkout = location.state?.checkout || null;

  const orderId = useMemo(
    () =>
      checkout?.orderId ??
      checkout?.id ??
      checkout?.order?.id ??
      null,
    [checkout]
  );

  const amount = useMemo(
    () =>
      checkout?.amount ??
      checkout?.total ??
      checkout?.totalAmount ??
      0,
    [checkout]
  );

  const [starting, setStarting] = useState(false);

  useEffect(() => {
    if (!orderId) {
      console.warn(
        "[PAYMENT PAGE] No orderId was supplied by checkout."
      );
    }
  }, [orderId]);

  const handlePayment = async () => {
    if (!orderId) {
      return;
    }

    setStarting(true);

    try {
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        throw new Error(
          "Razorpay Checkout could not be loaded. Check your internet connection."
        );
      }

      /*
       * Backend creates the Razorpay order.
       * Never create the Razorpay order from the browser.
       */
      const razorpayOrder = await dispatch(
        createPaymentOrder(orderId)
      );

      if (!razorpayOrder?.razorpayOrderId) {
        throw new Error(
          "Backend did not return a Razorpay order ID."
        );
      }

      if (!razorpayOrder?.keyId) {
        throw new Error(
          "Backend did not return the Razorpay key ID."
        );
      }

      const options = {
        key: razorpayOrder.keyId,
        amount: Math.round(
          Number(razorpayOrder.amount || amount || 0) * 100
        ),
        currency: razorpayOrder.currency || "INR",
        name: "Surplus Exchange",
        description: `Payment for order ${
          razorpayOrder.orderNumber || orderId
        }`,
        order_id: razorpayOrder.razorpayOrderId,

        handler: async function (response) {
          try {
            await dispatch(
              verifyPayment({
                razorpayPaymentId:
                  response.razorpay_payment_id,
                razorpayOrderId:
                  response.razorpay_order_id,
                razorpaySignature:
                  response.razorpay_signature,
              })
            );
          } catch (error) {
            console.error(
              "[PAYMENT PAGE] Verification failed:",
              error
            );
          }
        },

        modal: {
          ondismiss: function () {
            setStarting(false);
          },
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "[PAYMENT PAGE] Razorpay payment failed:",
            response?.error
          );

          setStarting(false);
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "[PAYMENT PAGE] Payment start failed:",
        error
      );

      setStarting(false);
    }
  };

  useEffect(() => {
    if (paymentState.payment?.status === "SUCCESS") {
      setStarting(false);
    }
  }, [paymentState.payment]);

  if (paymentState.payment?.status === "SUCCESS") {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />

        <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-xl sm:p-12">
            <CheckCircle2 className="mx-auto h-20 w-20 text-emerald-500" />

            <h1 className="mt-6 text-4xl font-black text-slate-900">
              Payment successful
            </h1>

            <p className="mt-3 text-slate-500">
              Your payment has been verified and your order is confirmed.
            </p>

            <div className="mx-auto mt-8 max-w-md rounded-2xl bg-slate-50 p-6 text-left">
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Order
                </span>
                <strong className="text-slate-900">
                  {paymentState.payment.orderNumber || orderId}
                </strong>
              </div>

              <div className="mt-3 flex justify-between gap-4">
                <span className="text-slate-500">
                  Amount
                </span>
                <strong className="text-slate-900">
                  {formatINR(paymentState.payment.amount)}
                </strong>
              </div>

              <div className="mt-3 flex justify-between gap-4">
                <span className="text-slate-500">
                  Payment ID
                </span>
                <strong className="max-w-[220px] truncate text-slate-900">
                  {paymentState.payment.razorpayPaymentId}
                </strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/products")}
              className="mt-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/20"
            >
              Continue shopping
            </button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <main>
        <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => navigate("/checkout")}
              className="mb-5 flex items-center gap-2 text-sm font-semibold text-blue-100 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to checkout
            </button>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
              <CreditCard className="h-4 w-4" />
              Secure payment
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Complete your payment.
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-100">
              Pay securely through Razorpay. Your payment is verified on the server before the order is confirmed.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          {paymentState.error && (
            <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              <span>{paymentState.error}</span>

              <button
                type="button"
                onClick={() => dispatch(clearPaymentError())}
                className="font-bold hover:underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {!orderId ? (
            <div className="rounded-3xl border border-red-200 bg-white p-12 text-center shadow-sm">
              <XCircle className="mx-auto h-14 w-14 text-red-500" />

              <h2 className="mt-5 text-2xl font-black text-slate-900">
                Order information is missing
              </h2>

              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
                The checkout page did not provide an order ID. Payment cannot be started without the order created by checkout.
              </p>

              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
              >
                Back to checkout
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-5">
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:col-span-3">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                    <CreditCard className="h-6 w-6" />
                  </div>

                  <div>
                    <h2 className="text-xl font-black text-slate-900">
                      Razorpay payment
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Order #{checkout?.orderNumber || orderId}
                    </p>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl bg-slate-50 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">
                      Amount payable
                    </span>

                    <span className="text-3xl font-black text-slate-900">
                      {formatINR(amount)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={
                    starting ||
                    paymentState.creating ||
                    paymentState.verifying
                  }
                  onClick={handlePayment}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {starting ||
                  paymentState.creating ||
                  paymentState.verifying ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {paymentState.verifying
                        ? "Verifying payment..."
                        : "Opening Razorpay..."}
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      Pay {formatINR(amount)}
                    </>
                  )}
                </button>

                <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
                  <ShieldCheck className="h-4 w-4" />
                  Razorpay payment verification is handled by the backend.
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:col-span-2">
                <h3 className="text-lg font-black text-slate-900">
                  Payment status
                </h3>

                <div className="mt-5">
                  <PaymentStatus
                    status={
                      paymentState.payment?.status ||
                      "CREATED"
                    }
                  />
                </div>

                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">
                      Order ID
                    </span>
                    <span className="font-bold text-slate-900">
                      {orderId}
                    </span>
                  </div>

                  {paymentState.razorpayOrder?.razorpayOrderId && (
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500">
                        Razorpay order
                      </span>
                      <span className="max-w-[180px] truncate font-bold text-slate-900">
                        {paymentState.razorpayOrder.razorpayOrderId}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
