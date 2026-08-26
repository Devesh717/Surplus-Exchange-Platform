import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SellerApplicationSubmittedPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <h1 className="mt-6 text-3xl font-black text-slate-950">
          Application submitted
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Your seller application has been submitted for verification. Once an
          admin approves it and your account receives the SELLER role, log in
          again to access Seller Center.
        </p>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
        >
          Back to marketplace
        </button>
      </div>
    </div>
  );
}
