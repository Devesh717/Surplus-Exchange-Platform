import React, { useEffect } from "react";
import {
  Package,
  CheckCircle2,
  XCircle,
  Clock3,
  Loader2,
  RefreshCw,
} from "lucide-react";

import { useStore } from "../../../Store";
import {
  getPendingProducts,
  verifyProduct,
} from "../../state/Admin/Action";

import "./styles/ProductVerification.css";

export default function ProductVerification() {
  const { state, dispatch } = useStore();

  const {
    pendingProducts,
    verification,
  } = state.admin;

  const products = Array.isArray(pendingProducts?.content)
    ? pendingProducts.content
    : [];

  useEffect(() => {
    dispatch(getPendingProducts());
  }, [dispatch]);

  const handleVerification = async (productId, verified) => {
    try {
      await dispatch(
        verifyProduct(productId, {
          verified,
          reason: verified
            ? null
            : "Product rejected by administrator.",
        })
      );

      // Refresh the pending list after approval/rejection
      await dispatch(getPendingProducts());
    } catch (error) {
      console.error("Product verification failed:", error);
    }
  };

  return (
    <div className="product-verification-page">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="product-verification-header">

        <div className="product-verification-header-icon">
          <Package size={23} />
        </div>

        <div>
          <p>ADMIN</p>

          <h1>Product Verification</h1>

          <span>
            Review and verify products submitted by sellers.
          </span>
        </div>

      </div>


      {/* ==================================================
          SUMMARY
      ================================================== */}

      <div className="product-verification-summary">

        <div className="product-summary-card">

          <div className="product-summary-icon pending">
            <Clock3 size={19} />
          </div>

          <div>
            <span>Pending products</span>
            <strong>{products.length}</strong>
          </div>

        </div>

        <button
          type="button"
          className="product-refresh-button"
          onClick={() => dispatch(getPendingProducts())}
          disabled={pendingProducts?.loading}
        >
          {pendingProducts?.loading ? (
            <Loader2
              size={16}
              className="product-spin"
            />
          ) : (
            <RefreshCw size={16} />
          )}

          Refresh
        </button>

      </div>


      {/* ==================================================
          ERROR
      ================================================== */}

      {pendingProducts?.error && (
        <div className="product-verification-error">
          <XCircle size={17} />

          <div>
            <strong>Unable to load products</strong>
            <p>{pendingProducts.error}</p>
          </div>

        </div>
      )}


      {/* ==================================================
          VERIFICATION ERROR
      ================================================== */}

      {verification?.error && (
        <div className="product-verification-error">
          <XCircle size={17} />

          <div>
            <strong>Verification failed</strong>
            <p>{verification.error}</p>
          </div>

        </div>
      )}


      {/* ==================================================
          LOADING
      ================================================== */}

      {pendingProducts?.loading && products.length === 0 && (
        <div className="product-verification-loading">

          <Loader2
            size={22}
            className="product-spin"
          />

          <span>Loading pending products...</span>

        </div>
      )}


      {/* ==================================================
          EMPTY
      ================================================== */}

      {!pendingProducts?.loading &&
        !pendingProducts?.error &&
        products.length === 0 && (
          <div className="product-verification-empty">

            <div className="product-empty-icon">
              <CheckCircle2 size={30} />
            </div>

            <h3>No pending products</h3>

            <p>
              All submitted products have been reviewed.
            </p>

          </div>
        )}


      {/* ==================================================
          PRODUCT CARDS
      ================================================== */}

      {products.length > 0 && (
        <section className="product-verification-section">

          <div className="product-section-header">

            <div>
              <div className="product-section-title">

                <Package size={18} />

                <h2>Products awaiting verification</h2>

              </div>

              <p>
                Review each product before making it available
                on the platform.
              </p>
            </div>

            <div className="product-count">
              {products.length}
            </div>

          </div>


          <div className="product-verification-grid">

            {products.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
                loading={verification?.loading}
                onVerify={handleVerification}
              />

            ))}

          </div>

        </section>
      )}

    </div>
  );
}


/* ==================================================
   PRODUCT CARD
================================================== */

function ProductCard({
  product,
  loading,
  onVerify,
}) {
  const productId =
    product.id ??
    product.productId;

  const productName =
    product.name ??
    product.productName ??
    "Unnamed product";

  const description =
    product.description ??
    "No product description provided.";

  const category =
    product.category?.name ??
    product.category ??
    "Not specified";

  const price =
    product.price !== undefined &&
    product.price !== null
      ? `₹${Number(product.price).toLocaleString("en-IN")}`
      : "Not specified";

  const quantity =
    product.quantity ??
    product.stock ??
    "Not specified";

  const sellerName =
    product.seller?.name ??
    product.seller?.username ??
    product.seller?.email ??
    product.sellerName ??
    "Unknown seller";

  const sellerEmail =
    product.seller?.email ??
    product.sellerEmail ??
    "Not available";

  return (
    <article className="product-verification-card">

      {/* ==================================================
          CARD HEADER
      ================================================== */}

      <div className="product-card-top">

        <div className="product-card-icon">
          <Package size={20} />
        </div>

        <div className="product-card-title">

          <h3>{productName}</h3>

          <p>
            Product ID #{productId}
          </p>

        </div>

        <div className="product-status-badge">

          <span className="product-status-dot" />

          Pending

        </div>

      </div>


      {/* ==================================================
          PRODUCT INFORMATION
      ================================================== */}

      <div className="product-card-content">

        <div className="product-info">
          <span>Category</span>
          <strong>{category}</strong>
        </div>

        <div className="product-info">
          <span>Price</span>
          <strong>{price}</strong>
        </div>

        <div className="product-info">
          <span>Quantity</span>
          <strong>{quantity}</strong>
        </div>

        <div className="product-info">
          <span>Seller</span>
          <strong>{sellerName}</strong>
        </div>

        <div className="product-info product-info-full">
          <span>Seller email</span>
          <strong>{sellerEmail}</strong>
        </div>

      </div>


      {/* ==================================================
          DESCRIPTION
      ================================================== */}

      <div className="product-description">

        <span>Description</span>

        <p>{description}</p>

      </div>


      {/* ==================================================
          ACTIONS
      ================================================== */}

      <div className="product-card-actions">

        <button
          type="button"
          className="product-reject-button"
          disabled={loading}
          onClick={() =>
            onVerify(productId, false)
          }
        >
          {loading ? (
            <Loader2
              size={15}
              className="product-spin"
            />
          ) : (
            <XCircle size={15} />
          )}

          Reject
        </button>


        <button
          type="button"
          className="product-approve-button"
          disabled={loading}
          onClick={() =>
            onVerify(productId, true)
          }
        >
          {loading ? (
            <Loader2
              size={15}
              className="product-spin"
            />
          ) : (
            <CheckCircle2 size={15} />
          )}

          Approve
        </button>

      </div>

    </article>
  );
}