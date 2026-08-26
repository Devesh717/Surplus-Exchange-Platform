import React, { useEffect, useMemo, useState } from "react";
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

import { useStore } from "../../../Store";
import {
  getProfile,
  updateProfile,
} from "../../state/Admin/Action";

import Loader from "./common/Loader";
import ErrorMessage from "./common/ErrorMessage";

import "./styles/AdminProfile.css";

export default function AdminProfile() {
  const { state, dispatch } = useStore();

  const { profile, loading, errors } = state.admin;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    dispatch(getProfile());
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
      return "A";
    }

    return name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
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
      await dispatch(updateProfile(form));
      setSaved(true);
    } catch {
      // Error is already handled by the reducer.
    }
  }

  function handleRetry() {
    dispatch(getProfile());
  }

  if (loading.profile && !profile) {
    return (
      <div className="admin-profile-page">
        <div className="admin-profile-loading">
          <Loader2 className="animate-spin" size={22} />
          <span>Loading administrator profile...</span>
        </div>
      </div>
    );
  }

  if (errors.profile && !profile) {
    return (
      <div className="admin-profile-page">
        <ErrorMessage
          message={errors.profile}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="admin-profile-page">

      {/* ==================================================
          PAGE HEADER
      ================================================== */}

      <div className="admin-profile-page-header">
        <div>
          <p className="admin-profile-eyebrow">
            ADMINISTRATION
          </p>

          <h1>Admin Profile</h1>

          <p className="admin-profile-subtitle">
            Manage your administrator account information and
            account details.
          </p>
        </div>

        <button
          type="button"
          className="admin-profile-refresh"
          onClick={handleRetry}
          disabled={loading.profile}
        >
          {loading.profile ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <RefreshCw size={16} />
          )}

          Refresh
        </button>
      </div>


      {/* ==================================================
          PROFILE LAYOUT
      ================================================== */}

      <div className="admin-profile-layout">

        {/* ==================================================
            PROFILE SUMMARY
        ================================================== */}

        <section className="admin-profile-summary">

          <div className="admin-profile-cover">
            <div className="admin-profile-avatar">
              {initials}
            </div>
          </div>

          <div className="admin-profile-summary-body">

            <h2>
              {profile?.name || "Administrator"}
            </h2>

            <p className="admin-profile-email">
              <Mail size={14} />
              {profile?.email || "No email available"}
            </p>

            <div className="admin-profile-role">
              <ShieldCheck size={14} />
              {profile?.role || "ADMIN"}
            </div>

            <div className="admin-profile-summary-divider" />

            <div className="admin-profile-account-status">

              <div className="status-row">
                <span>Account role</span>

                <strong>
                  {profile?.role || "ADMIN"}
                </strong>
              </div>

              <div className="status-row">
                <span>Email verification</span>

                {profile?.emailVerified ? (
                  <span className="verified-status">
                    <CheckCircle2 size={14} />
                    Verified
                  </span>
                ) : (
                  <span className="unverified-status">
                    Not verified
                  </span>
                )}
              </div>

            </div>

          </div>

        </section>


        {/* ==================================================
            EDIT PROFILE
        ================================================== */}

        <section className="admin-profile-edit-card">

          <div className="admin-profile-card-header">

            <div className="admin-profile-card-icon">
              <User size={19} />
            </div>

            <div>
              <h2>Personal information</h2>

              <p>
                Update the information associated with your
                administrator account.
              </p>
            </div>

          </div>


          <form
            className="admin-profile-form"
            onSubmit={handleSubmit}
          >

            {/* ERROR */}

            {errors.profile && (
              <div className="admin-profile-alert admin-profile-alert-error">
                {errors.profile}
              </div>
            )}

            {/* SUCCESS */}

            {saved && (
              <div className="admin-profile-alert admin-profile-alert-success">
                <CheckCircle2 size={16} />
                Profile updated successfully.
              </div>
            )}


            {/* NAME */}

            <div className="admin-profile-field">

              <label htmlFor="admin-name">
                Full name
              </label>

              <div className="admin-profile-input-wrapper">
                <User size={17} />

                <input
                  id="admin-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  maxLength={100}
                  required
                />
              </div>

            </div>


            {/* EMAIL */}

            <div className="admin-profile-field">

              <label htmlFor="admin-email">
                Email address
              </label>

              <div className="admin-profile-input-wrapper">
                <Mail size={17} />

                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  maxLength={150}
                  required
                />
              </div>

              <small>
                This is the email associated with your administrator
                account.
              </small>

            </div>


            {/* PHONE */}

            <div className="admin-profile-field">

              <label htmlFor="admin-phone">
                Phone number
              </label>

              <div className="admin-profile-input-wrapper">
                <Phone size={17} />

                <input
                  id="admin-phone"
                  name="phoneNumber"
                  type="tel"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  maxLength={20}
                />
              </div>

            </div>


            {/* ROLE - READ ONLY */}

            <div className="admin-profile-field">

              <label>
                Account role
              </label>

              <div className="admin-profile-readonly">

                <LockKeyhole size={17} />

                <span>
                  {profile?.role || "ADMIN"}
                </span>

                <span className="readonly-badge">
                  Read only
                </span>

              </div>

            </div>


            {/* SAVE */}

            <div className="admin-profile-form-footer">

              <p>
                Changes will be saved to your administrator
                account.
              </p>

              <button
                type="submit"
                className="admin-profile-save-btn"
                disabled={loading.profile}
              >

                {loading.profile ? (
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
  );
}