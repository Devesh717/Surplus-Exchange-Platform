import React from "react";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";

export default function PaymentStatus({ status }) {
  const normalized = String(status || "").toUpperCase();

  if (normalized === "SUCCESS") {
    return (
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
        <CheckCircle2 className="h-5 w-5" />
        Payment successful
      </div>
    );
  }

  if (normalized === "FAILED") {
    return (
      <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
        <XCircle className="h-5 w-5" />
        Payment failed
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">
      <Clock3 className="h-5 w-5" />
      Payment pending
    </div>
  );
}
