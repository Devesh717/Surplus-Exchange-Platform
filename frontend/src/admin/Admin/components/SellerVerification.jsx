import React, { useEffect, useState } from "react";
import {
  Store,
  User,
  MapPin,
  Phone,
  FileText,
  CheckCircle2,
  XCircle,
  Clock3,
  Loader2,
  Mail,
} from "lucide-react";

import { useStore } from "../../../Store";
import {
  getPendingSellerApplications,
  verifySeller,
} from "../../state/Admin/Action";

import "./styles/SellerVerification.css";

export default function SellerVerification() {
  const { state, dispatch } = useStore();
  const [actionLoading, setActionLoading] = useState(null);

  const {
    pendingSellers = {
      content: [],
      loading: false,
      error: null,
    },
    verification = {
      loading: false,
      result: null,
      error: null,
    },
  } = state.admin;

  const sellers = Array.isArray(pendingSellers.content)
    ? pendingSellers.content
    : [];

  useEffect(() => {
    dispatch(getPendingSellerApplications());
  }, [dispatch]);


  const handleApprove = async (sellerId) => {
  if (!sellerId) {
    console.error("Seller ID is missing");
    return;
  }

  try {
    setActionLoading(sellerId);

    console.log("Approving seller:", sellerId);

    await dispatch(
      verifySeller(sellerId, {
        status: true,
      })
    );

    await dispatch(getPendingSellerApplications());

  } catch (error) {
    console.error("Seller approval failed:", error);
  } finally {
    setActionLoading(null);
  }
};

const handleReject = async (sellerId) => {
  if (!sellerId) {
    console.error("Seller ID is missing");
    return;
  }

  try {
    setActionLoading(sellerId);

    console.log("Rejecting seller:", sellerId);

    await dispatch(
      verifySeller(sellerId, {
        status: false,
      })
    );

    await dispatch(getPendingSellerApplications());

  } catch (error) {
    console.error("Seller rejection failed:", error);
  } finally {
    setActionLoading(null);
  }
};

  return (
    <div className="seller-verification-page">

      {/* ================= HEADER ================= */}

      <div className="seller-verification-header">

        <div className="seller-verification-header-icon">
          <Store size={22} />
        </div>

        <div>
          <p className="seller-verification-eyebrow">
            ADMIN
          </p>

          <h1>
            Seller Verification
          </h1>

          <span>
            Review and verify seller applications submitted by users.
          </span>
        </div>

      </div>


      {/* ================= SUMMARY ================= */}

      <div className="seller-verification-summary">

        <div className="seller-summary-card">

          <div className="seller-summary-icon pending">
            <Clock3 size={19} />
          </div>

          <div>
            <span>Pending applications</span>
            <strong>{sellers.length}</strong>
          </div>

        </div>


        <div className="seller-summary-card">

          <div className="seller-summary-icon application">
            <FileText size={19} />
          </div>

          <div>
            <span>Awaiting review</span>
            <strong>{sellers.length}</strong>
          </div>

        </div>

      </div>


      {/* ================= ERROR ================= */}

      {pendingSellers.error && (
        <div className="seller-verification-error">
          <XCircle size={17} />

          <div>
            <strong>Unable to load applications</strong>
            <p>{pendingSellers.error}</p>
          </div>
        </div>
      )}


      {/* ================= LOADING ================= */}

      {pendingSellers.loading && (
        <div className="seller-verification-loading">
          <Loader2
            size={20}
            className="seller-verification-spinner"
          />

          <span>
            Loading seller applications...
          </span>
        </div>
      )}


      {/* ================= EMPTY ================= */}

      {!pendingSellers.loading && sellers.length === 0 && (
        <div className="seller-verification-empty">

          <div className="seller-empty-icon">
            <CheckCircle2 size={28} />
          </div>

          <h2>
            No pending applications
          </h2>

          <p>
            There are currently no seller applications waiting for verification.
          </p>

        </div>
      )}


      {/* ================= APPLICATIONS ================= */}

      {!pendingSellers.loading && sellers.length > 0 && (
        <section className="seller-applications-section">

          <div className="seller-section-heading">

            <div>
              <h2>
                Seller Applications
              </h2>

              <p>
                Review the business information before approving the seller.
              </p>
            </div>

            <div className="seller-application-count">
              {sellers.length}
            </div>

          </div>


          <div className="seller-application-grid">

            {sellers.map((seller) => {

              const sellerUser = seller.seller || {};

              const sellerId =
                seller.id ??
                seller.sellerId;

              const sellerName =
                sellerUser.name ||
                sellerUser.fullName ||
                sellerUser.username ||
                seller.sellerName ||
                "Seller";

              const sellerEmail =
                sellerUser.email ||
                seller.email ||
                "Not provided";

              return (
                <article
                  className="seller-application-card"
                  key={sellerId}
                >

                  {/* CARD HEADER */}

                  <div className="seller-card-header">

                    <div className="seller-card-avatar">
                      <Store size={21} />
                    </div>

                    <div className="seller-card-heading">

                      <h3>
                        {seller.businessName || "Business name not provided"}
                      </h3>

                      <p>
                        Seller ID: #{sellerId}
                      </p>

                    </div>

                    <div className="seller-pending-badge">
                      <span />
                      Pending
                    </div>

                  </div>


                  {/* SELLER */}

                  <div className="seller-card-content">

                    <div className="seller-info-item">

                      <div className="seller-info-icon">
                        <User size={15} />
                      </div>

                      <div>
                        <span>Applicant</span>
                        <strong>{sellerName}</strong>
                      </div>

                    </div>


                    <div className="seller-info-item">

                      <div className="seller-info-icon">
                        <Mail size={15} />
                      </div>

                      <div>
                        <span>Email</span>
                        <strong>{sellerEmail}</strong>
                      </div>

                    </div>


                    <div className="seller-info-item">

                      <div className="seller-info-icon">
                        <Phone size={15} />
                      </div>

                      <div>
                        <span>Phone</span>
                        <strong>
                          {seller.phone || "Not provided"}
                        </strong>
                      </div>

                    </div>


                    <div className="seller-info-item">

                      <div className="seller-info-icon">
                        <FileText size={15} />
                      </div>

                      <div>
                        <span>Business type</span>
                        <strong>
                          {seller.businessType || "Not provided"}
                        </strong>
                      </div>

                    </div>


                    <div className="seller-info-item">

                      <div className="seller-info-icon">
                        <FileText size={15} />
                      </div>

                      <div>
                        <span>Registration number</span>
                        <strong>
                          {seller.registrationNumber || "Not provided"}
                        </strong>
                      </div>

                    </div>


                    <div className="seller-info-item">

                      <div className="seller-info-icon">
                        <FileText size={15} />
                      </div>

                      <div>
                        <span>GST number</span>
                        <strong>
                          {seller.gstNumber || "Not provided"}
                        </strong>
                      </div>

                    </div>

                  </div>


                  {/* ADDRESS */}

                  <div className="seller-address">

                    <div className="seller-address-icon">
                      <MapPin size={15} />
                    </div>

                    <div>
                      <span>Business address</span>

                      <p>
                        {seller.address || "Address not provided"}
                        {seller.city && `, ${seller.city}`}
                        {seller.state && `, ${seller.state}`}
                        {seller.pincode && ` - ${seller.pincode}`}
                      </p>
                    </div>

                  </div>


                  {/* DESCRIPTION */}

                  {seller.businessDescription && (
                    <div className="seller-description">

                      <span>
                        Business description
                      </span>

                      <p>
                        {seller.businessDescription}
                      </p>

                    </div>
                  )}


                  {/* ACTIONS */}

<div className="seller-card-actions">

  <button
    onClick={() => handleReject(sellerId)}
    disabled={actionLoading === sellerId}
    className="verification-reject-btn"
  >
    {actionLoading === sellerId
      ? "Processing..."
      : "Reject"}
  </button>

  <button
    onClick={() => handleApprove(sellerId)}
    disabled={actionLoading === sellerId}
    className="verification-approve-btn"
  >
    {actionLoading === sellerId
      ? "Processing..."
      : "Approve"}
  </button>

</div>

                </article>
              );
            })}

          </div>

        </section>
      )}

    </div>
  );
}