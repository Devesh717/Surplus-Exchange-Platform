import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Save,
  Loader2,
  RefreshCw,
  LockKeyhole,
} from "lucide-react";

import { useStore } from "../../../../Store";

import {
  getUserProfile,
  updateUserProfile,
} from "../../state/UserProfile/Action";

export default function UserProfilePage() {
  const { state, dispatch } = useStore();

  const profileState = state.userProfile || {
    profile: null,
    loading: false,
    updateLoading: false,
    error: null,
  };

  const {
    profile,
    loading,
    updateLoading,
    error,
  } = profileState;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile()).catch(() => {});
  }, [dispatch]);

  useEffect(() => {
    if (!profile) return;

    setForm({
      name: profile.name || "",
      email: profile.email || "",
      phoneNumber: profile.phoneNumber || "",
    });
  }, [profile]);

  const initials = useMemo(() => {
    const name = profile?.name?.trim();

    if (!name) {
      return "U";
    }

    return name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) =>
        part.charAt(0).toUpperCase()
      )
      .join("");
  }, [profile]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setSaved(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSaved(false);

    try {
      await dispatch(updateUserProfile(form));
      setSaved(true);
    } catch {
      // Error is already stored in userProfile state.
    }
  }

  function handleRetry() {
    dispatch(getUserProfile()).catch(() => {});
  }

  if (loading && !profile) {
    return (
      <div className="min-h-[70vh] bg-slate-50 px-4 py-10">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 py-20 text-sm text-slate-500">
          <Loader2
            size={20}
            className="animate-spin"
          />
          Loading your profile...
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-[70vh] bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-xl rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Unable to load profile
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={handleRetry}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <RefreshCw size={15} />
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              ACCOUNT
            </p>

            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              My Profile
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your personal information and
              account details.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRetry}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader2
                size={16}
                className="animate-spin"
              />
            ) : (
              <RefreshCw size={16} />
            )}

            Refresh
          </button>
        </div>

        {/* LAYOUT */}
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">

          {/* PROFILE SUMMARY */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="h-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

            <div className="-mt-10 px-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-xl font-bold text-white shadow-md">
                {initials}
              </div>
            </div>

            <div className="px-6 pb-6 pt-4">
              <h2 className="text-xl font-bold text-slate-900">
                {profile?.name || "User"}
              </h2>

              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <Mail size={14} />
                <span className="break-all">
                  {profile?.email ||
                    "No email available"}
                </span>
              </div>

              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                <ShieldCheck size={14} />
                {profile?.role || "USER"}
              </div>

              <div className="my-5 border-t border-slate-100" />

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500">
                    Account role
                  </span>

                  <strong className="text-slate-800">
                    {profile?.role || "USER"}
                  </strong>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500">
                    Email verification
                  </span>

                  {profile?.emailVerified ? (
                    <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600">
                      <CheckCircle2 size={14} />
                      Verified
                    </span>
                  ) : (
                    <span className="font-semibold text-amber-600">
                      Not verified
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* EDIT PROFILE */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <User size={19} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Personal information
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Update the information associated
                    with your account.
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6"
            >
              {error && (
                <div className="mb-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {saved && (
                <div className="mb-5 flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  <CheckCircle2 size={16} />
                  Profile updated successfully.
                </div>
              )}

              <div className="grid gap-5 md:grid-cols-2">

                {/* NAME */}
                <div>
                  <label
                    htmlFor="user-name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Full name
                  </label>

                  <div className="relative">
                    <User
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="user-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      maxLength={100}
                      required
                      className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="user-email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="user-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      maxLength={150}
                      required
                      className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Changing your email requires
                    verification again.
                  </p>
                </div>

                {/* PHONE */}
                <div>
                  <label
                    htmlFor="user-phone"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Phone number
                  </label>

                  <div className="relative">
                    <Phone
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="user-phone"
                      name="phoneNumber"
                      type="tel"
                      value={form.phoneNumber}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      maxLength={20}
                      className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* ROLE READ ONLY */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Account role
                  </label>

                  <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <LockKeyhole size={17} />
                      <span>
                        {profile?.role || "USER"}
                      </span>
                    </div>

                    <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-500">
                      Read only
                    </span>
                  </div>
                </div>
              </div>

              {/* SAVE */}
              <div className="mt-8 flex flex-col justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center">
                <p className="text-xs text-slate-400">
                  Changes will be saved to your account.
                </p>

                <button
                  type="submit"
                  disabled={updateLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {updateLoading ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={17} />
                      Save changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}