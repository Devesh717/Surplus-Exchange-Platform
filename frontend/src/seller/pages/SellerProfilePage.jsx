import React, { useEffect, useState } from "react";
import { Save, UserRound } from "lucide-react";

import { useStore } from "../../Store";
import {
  getSellerProfile,
  updateSellerProfile,
} from "../state/Seller/Action";

import SellerGuard from "../components/SellerGuard";
import SellerLayout from "../components/SellerLayout";
import SellerStatusBadge from "../components/SellerStatusBadge";

const EMPTY_FORM = {
  businessName: "",
  businessType: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

export default function SellerProfilePage() {
  const { state, dispatch } = useStore();
  const sellerState = state.seller || {};
  const profile = sellerState.profile;

  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    dispatch(getSellerProfile()).catch(() => {});
  }, [dispatch]);

  useEffect(() => {
    if (!profile) return;

    setForm({
      businessName: profile.businessName || "",
      businessType: profile.businessType || "",
      phone: profile.phone || "",
      address: profile.address || "",
      city: profile.city || "",
      state: profile.state || "",
      pincode: profile.pincode || "",
    });
  }, [profile]);

  const update = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(updateSellerProfile(form));
    } catch {
      // Error is already stored in seller state.
    }
  };

  return (
    <SellerGuard>
      <SellerLayout>
        <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-bold text-blue-600">
              Seller Center
            </p>
            <h1 className="mt-1 text-3xl font-black text-slate-950">
              Business profile
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Keep your seller business information up to date.
            </p>
          </div>

          {sellerState.error && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
              {sellerState.error}
            </div>
          )}

          {sellerState.profileLoading || !profile ? (
            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-16 text-center font-semibold text-slate-500">
              Loading seller profile...
            </div>
          ) : (
            <>
              <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                    <UserRound className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Account
                    </p>
                    <h2 className="mt-1 text-xl font-black text-slate-950">
                      {profile.name}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {profile.email}
                    </p>
                    <div className="mt-3">
                      <SellerStatusBadge
                        status={profile.verificationStatus}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <form
                onSubmit={submit}
                className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  {[
                    ["businessName", "Business name"],
                    ["businessType", "Business type"],
                    ["phone", "Phone"],
                    ["city", "City"],
                    ["state", "State"],
                    ["pincode", "Pincode"],
                  ].map(([field, label]) => (
                    <label key={field}>
                      <span className="text-sm font-bold text-slate-700">
                        {label}
                      </span>
                      <input
                        value={form[field]}
                        onChange={(e) =>
                          update(field, e.target.value)
                        }
                        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                        required
                      />
                    </label>
                  ))}

                  <label className="sm:col-span-2">
                    <span className="text-sm font-bold text-slate-700">
                      Address
                    </span>
                    <textarea
                      value={form.address}
                      onChange={(e) =>
                        update("address", e.target.value)
                      }
                      rows={3}
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                      required
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={sellerState.mutationLoading}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {sellerState.mutationLoading
                    ? "Saving..."
                    : "Save profile"}
                </button>
              </form>
            </>
          )}
        </section>
      </SellerLayout>
    </SellerGuard>
  );
}
