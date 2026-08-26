import React, { useEffect, useState } from "react";
import {
  User,
  Store,
  Phone,
  MapPin,
  FileText,
  ShieldCheck,
  Edit3,
  Save,
  X,
  Loader2,
  Mail,
  Building2,
} from "lucide-react";

import { useStore, useSellerState } from "../../../Store";

import {
  getSellerProfile,
  updateSellerProfile,
} from "../../state/Seller/Action";

import "./styles/SellerProfile.css";

export default function SellerProfile() {
  const { dispatch } = useStore();
  const sellerState = useSellerState();

  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    businessName: "",
    businessDescription: "",
    businessType: "",
    registrationNumber: "",
    gstNumber: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    dispatch(getSellerProfile());
  }, [dispatch]);

  const profile = sellerState?.profile;

  useEffect(() => {
    if (!profile) return;

    setForm({
      businessName: profile.businessName || "",
      businessDescription: profile.businessDescription || "",
      businessType: profile.businessType || "",
      registrationNumber: profile.registrationNumber || "",
      gstNumber: profile.gstNumber || "",
      phone: profile.phone || "",
      address: profile.address || "",
      city: profile.city || "",
      state: profile.state || "",
      pincode: profile.pincode || "",
    });
  }, [profile]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSave(event) {
    event.preventDefault();

    try {
      await dispatch(updateSellerProfile(form));
      setEditing(false);
    } catch {
      // Error is handled by seller state.
    }
  }

  function handleCancel() {
    if (!profile) return;

    setForm({
      businessName: profile.businessName || "",
      businessDescription: profile.businessDescription || "",
      businessType: profile.businessType || "",
      registrationNumber: profile.registrationNumber || "",
      gstNumber: profile.gstNumber || "",
      phone: profile.phone || "",
      address: profile.address || "",
      city: profile.city || "",
      state: profile.state || "",
      pincode: profile.pincode || "",
    });

    setEditing(false);
  }

  if (sellerState?.loading?.profile) {
    return (
      <div className="seller-profile-page">
        <div className="seller-profile-loading">
          <Loader2 size={20} className="animate-spin" />
          Loading seller profile...
        </div>
      </div>
    );
  }

  if (sellerState?.errors?.profile) {
    return (
      <div className="seller-profile-page">
        <div className="seller-profile-error">
          {sellerState.errors.profile}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="seller-profile-page">
        <div className="seller-profile-empty">
          <Store size={32} />
          <h3>Seller profile not found</h3>
          <p>
            Your seller profile could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  const verificationStatus =
    profile.verificationStatus || "PENDING";

  const statusClass =
    verificationStatus === "VERIFIED"
      ? "verified"
      : verificationStatus === "REJECTED"
      ? "rejected"
      : "pending";

  return (
    <div className="seller-profile-page">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="seller-profile-header">

        <div className="seller-profile-header-left">

          <div className="seller-profile-header-icon">
            <Store size={22} />
          </div>

          <div>
            <p className="seller-profile-eyebrow">
              SELLER
            </p>

            <h1>Seller Profile</h1>

            <span>
              Manage your business profile and seller information
            </span>
          </div>

        </div>

        {!editing && (
          <button
            type="button"
            className="seller-profile-edit-btn"
            onClick={() => setEditing(true)}
          >
            <Edit3 size={16} />
            Edit profile
          </button>
        )}

      </div>


      {/* ==================================================
          VERIFICATION STATUS
      ================================================== */}

      <div className={`seller-verification-banner ${statusClass}`}>

        <div className="seller-verification-icon">
          <ShieldCheck size={21} />
        </div>

        <div className="seller-verification-content">

          <strong>
            Seller verification
          </strong>

          <span>
            {verificationStatus === "VERIFIED"
              ? "Your seller profile has been verified."
              : verificationStatus === "REJECTED"
              ? "Your seller verification was rejected."
              : "Your seller application is waiting for admin verification."}
          </span>

        </div>

        <span className="seller-verification-badge">
          {verificationStatus}
        </span>

      </div>


      {/* ==================================================
          PROFILE FORM
      ================================================== */}

      <form
        className="seller-profile-form"
        onSubmit={handleSave}
      >

        {/* ==================================================
            BUSINESS INFORMATION
        ================================================== */}

        <section className="seller-profile-card">

          <div className="seller-profile-card-header">

            <div className="seller-profile-card-icon business">
              <Building2 size={18} />
            </div>

            <div>
              <h2>Business information</h2>
              <p>
                Basic information about your business
              </p>
            </div>

          </div>


          <div className="seller-profile-grid">

            <ProfileField
              label="Business name"
              name="businessName"
              value={form.businessName}
              editing={editing}
              onChange={handleChange}
            />

            <ProfileField
              label="Business type"
              name="businessType"
              value={form.businessType}
              editing={editing}
              onChange={handleChange}
            />

            <ProfileField
              label="Registration number"
              name="registrationNumber"
              value={form.registrationNumber}
              editing={editing}
              onChange={handleChange}
            />

            <ProfileField
              label="GST number"
              name="gstNumber"
              value={form.gstNumber}
              editing={editing}
              onChange={handleChange}
            />

          </div>


          <div className="seller-profile-description">

            <label>
              Business description
            </label>

            {editing ? (
              <textarea
                name="businessDescription"
                value={form.businessDescription}
                onChange={handleChange}
                rows={4}
                maxLength={1000}
                placeholder="Describe your business..."
              />
            ) : (
              <p>
                {profile.businessDescription ||
                  "No business description provided."}
              </p>
            )}

          </div>

        </section>


        {/* ==================================================
            CONTACT INFORMATION
        ================================================== */}

        <section className="seller-profile-card">

          <div className="seller-profile-card-header">

            <div className="seller-profile-card-icon contact">
              <Phone size={18} />
            </div>

            <div>
              <h2>Contact information</h2>
              <p>
                Contact details associated with your seller account
              </p>
            </div>

          </div>


          <div className="seller-profile-grid">

            <ProfileField
              label="Phone"
              name="phone"
              value={form.phone}
              editing={editing}
              onChange={handleChange}
            />

            <div className="seller-profile-field">

              <label>
                Email
              </label>

              <div className="seller-profile-readonly">

                <Mail size={15} />

                <span>
                  {profile.seller?.email ||
                    profile.email ||
                    "Not available"}
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* ==================================================
            ADDRESS
        ================================================== */}

        <section className="seller-profile-card">

          <div className="seller-profile-card-header">

            <div className="seller-profile-card-icon location">
              <MapPin size={18} />
            </div>

            <div>
              <h2>Business address</h2>
              <p>
                Registered business location
              </p>
            </div>

          </div>


          <div className="seller-profile-grid">

            <ProfileField
              label="Address"
              name="address"
              value={form.address}
              editing={editing}
              onChange={handleChange}
              fullWidth
            />

            <ProfileField
              label="City"
              name="city"
              value={form.city}
              editing={editing}
              onChange={handleChange}
            />

            <ProfileField
              label="State"
              name="state"
              value={form.state}
              editing={editing}
              onChange={handleChange}
            />

            <ProfileField
              label="Pincode"
              name="pincode"
              value={form.pincode}
              editing={editing}
              onChange={handleChange}
            />

          </div>

        </section>


        {/* ==================================================
            EDIT ACTIONS
        ================================================== */}

        {editing && (
          <div className="seller-profile-actions">

            <button
              type="button"
              className="seller-profile-cancel-btn"
              onClick={handleCancel}
              disabled={sellerState?.loading?.profile}
            >
              <X size={16} />
              Cancel
            </button>

            <button
              type="submit"
              className="seller-profile-save-btn"
              disabled={sellerState?.loading?.profile}
            >

              {sellerState?.loading?.profile ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save changes
                </>
              )}

            </button>

          </div>
        )}

      </form>

    </div>
  );
}


/* ==================================================
   REUSABLE FIELD
================================================== */

function ProfileField({
  label,
  name,
  value,
  editing,
  onChange,
  fullWidth = false,
}) {
  return (
    <div
      className={`seller-profile-field ${
        fullWidth ? "full-width" : ""
      }`}
    >

      <label htmlFor={name}>
        {label}
      </label>

      {editing ? (
        <input
          id={name}
          name={name}
          value={value || ""}
          onChange={onChange}
        />
      ) : (
        <div className="seller-profile-value">
          {value || "Not provided"}
        </div>
      )}

    </div>
  );
}