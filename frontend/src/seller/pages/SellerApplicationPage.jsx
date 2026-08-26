import React, { useState } from "react";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

import { useStore } from "../../Store";
import { applyAsSeller } from "../state/Seller/Action";

const INITIAL_FORM = {
  name: "",
  email: "",
  password: "",
  businessName: "",
  businessType: "",
  registrationNumber: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  businessDescription: "",
  gstNumber: "",
};

export default function SellerApplicationPage() {
  // ============================================================
  // HOOKS — MUST ALWAYS RUN BEFORE ANY CONDITIONAL RETURN
  // ============================================================

  const navigate = useNavigate();
  const { state, dispatch } = useStore();

  const sellerState = state.seller || {};

  const token = localStorage.getItem("se_token");
  const role = localStorage.getItem("se_role");

  console.log("========================================");
  console.log("[SELLER APPLICATION] PAGE LOADED");
  console.log("[SELLER APPLICATION] token:", Boolean(token));
  console.log("[SELLER APPLICATION] role:", role);
  console.log("========================================");

  // ============================================================
  // EXISTING USER DETAILS
  // ============================================================

  const storedEmail =
    localStorage.getItem("se_email") ||
    state.auth?.email ||
    "";

  const storedName =
    localStorage.getItem("se_name") ||
    "";

  const storedPhone =
    localStorage.getItem("se_phone") ||
    "";

  // ============================================================
  // FORM STATE
  // IMPORTANT: THIS MUST BE BEFORE ANY RETURN
  // ============================================================

  const [form, setForm] = useState({
    ...INITIAL_FORM,
    name: storedName,
    email: storedEmail,
    phone: storedPhone,
  });

  // ============================================================
  // INPUT UPDATE
  // ============================================================

  const update = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  // ============================================================
  // SUBMIT APPLICATION
  // ============================================================

  const submit = async (event) => {
    event.preventDefault();

    console.log("========================================");
    console.log("[SELLER APPLICATION] SUBMIT");
    console.log("[SELLER APPLICATION] token:", Boolean(token));
    console.log("[SELLER APPLICATION] role:", role);
    console.log("[SELLER APPLICATION] email:", form.email);
    console.log(
      "[SELLER APPLICATION] businessName:",
      form.businessName
    );
    console.log("[SELLER APPLICATION] FORM:", form);
    console.log("========================================");

    try {
      const response = await dispatch(
        applyAsSeller(form)
      );

      console.log("========================================");
      console.log("[SELLER APPLICATION] SUCCESS");
      console.log("[SELLER APPLICATION] response:", response);
      console.log("========================================");

      navigate(
        "/seller/application-submitted",
        { replace: true }
      );
    } catch (error) {
      console.error("========================================");
      console.error("[SELLER APPLICATION] FAILED");
      console.error(
        "[SELLER APPLICATION] error:",
        error
      );
      console.error(
        "[SELLER APPLICATION] response:",
        error?.response?.data
      );
      console.error("========================================");
    }
  };

  // ============================================================
  // BUSINESS FIELDS
  // ============================================================

  const fields = [
    ["businessName", "Business name"],
    ["businessType", "Business type"],
    ["registrationNumber", "Registration number"],
    ["phone", "Registered phone"],
    ["address", "Address"],
    ["city", "City"],
    ["state", "State"],
    ["pincode", "Pincode"],
    ["gstNumber", "GST number (optional)"],
  ];

  // ============================================================
  // CONDITIONAL REDIRECTS
  // IMPORTANT:
  // These happen AFTER ALL HOOKS
  // ============================================================

  if (!token) {
    console.log(
      "[SELLER APPLICATION] No token -> redirecting to login"
    );

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (role === "SELLER") {
    console.log(
      "[SELLER APPLICATION] Already SELLER -> dashboard"
    );

    return (
      <Navigate
        to="/seller/dashboard"
        replace
      />
    );
  }

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">

        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">

          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-100 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="mt-8 flex items-center gap-3">

            <div className="rounded-2xl bg-white/10 p-3 text-blue-200">
              <Building2 className="h-7 w-7" />
            </div>

            <div>
              <p className="text-sm font-bold text-blue-200">
                Seller application
              </p>

              <h1 className="text-4xl font-black text-white">
                Start selling surplus.
              </h1>
            </div>

          </div>

          <p className="mt-4 max-w-2xl text-blue-100">
            Submit your business details for admin
            verification. Your existing buyer account
            will be used for your seller application.
          </p>

        </div>
      </section>

      {/* ======================================================
          FORM
      ====================================================== */}

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

        {/* ERROR */}

        {sellerState.error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
            {sellerState.error}
          </div>
        )}

        <form
          onSubmit={submit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >

          {/* ==================================================
              ACCOUNT DETAILS
          ================================================== */}

          <div className="mb-8">

            <h2 className="text-xl font-black text-slate-900">
              Account details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              These details are associated with your existing
              buyer account.
            </p>

          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            {/* NAME */}

            <label>
              <span className="text-sm font-bold text-slate-700">
                Name
              </span>

              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  update("name", e.target.value)
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </label>

            {/* EMAIL */}

            <label>
              <span className="text-sm font-bold text-slate-700">
                Email
              </span>

              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  update("email", e.target.value)
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </label>

            {/* PASSWORD */}

            <label className="sm:col-span-2">

              <span className="text-sm font-bold text-slate-700">
                Password
              </span>

              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  update("password", e.target.value)
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter your account password"
                minLength={8}
                required
              />

              <p className="mt-1 text-xs text-slate-500">
                Enter the password associated with your
                existing account.
              </p>

            </label>

            {/* ==================================================
                BUSINESS FIELDS
            ================================================== */}

            {fields.map(([field, label]) => (
              <label
                key={field}
                className={
                  field === "address"
                    ? "sm:col-span-2"
                    : ""
                }
              >

                <span className="text-sm font-bold text-slate-700">
                  {label}
                </span>

                {field === "address" ? (

                  <textarea
                    value={form[field]}
                    onChange={(e) =>
                      update(
                        field,
                        e.target.value
                      )
                    }
                    rows={3}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                  />

                ) : (

                  <input
                    type="text"
                    value={form[field]}
                    onChange={(e) =>
                      update(
                        field,
                        e.target.value
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required={
                      field !== "gstNumber"
                    }
                  />

                )}

              </label>
            ))}

            {/* ==================================================
                BUSINESS DESCRIPTION
            ================================================== */}

            <label className="sm:col-span-2">

              <span className="text-sm font-bold text-slate-700">
                Business description
              </span>

              <textarea
                value={form.businessDescription}
                onChange={(e) =>
                  update(
                    "businessDescription",
                    e.target.value
                  )
                }
                rows={4}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Tell buyers/admin what your business does..."
              />

            </label>

          </div>

          {/* ==================================================
              INFORMATION
          ================================================== */}

          <div className="mt-8 rounded-2xl bg-blue-50 p-4 text-sm text-blue-900">

            <div className="flex items-start gap-3">

              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

              <div>

                <p className="font-bold">
                  Application review
                </p>

                <p className="mt-1">
                  Your application will be reviewed by
                  an administrator. Your account will
                  receive SELLER access only after the
                  application is approved.
                </p>

              </div>

            </div>

          </div>

          {/* ==================================================
              SUBMIT
          ================================================== */}

          <button
            type="submit"
            disabled={sellerState.mutationLoading}
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sellerState.mutationLoading
              ? "Submitting..."
              : "Submit seller application"}
          </button>

          {/* CANCEL */}

          <button
            type="button"
            onClick={() => navigate("/")}
            disabled={sellerState.mutationLoading}
            className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

        </form>

      </main>

    </div>
  );
}