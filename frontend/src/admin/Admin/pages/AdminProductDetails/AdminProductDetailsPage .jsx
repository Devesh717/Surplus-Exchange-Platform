import React, { useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Package,
  User,
  Mail,
  Tag,
  IndianRupee,
  Boxes,
  ShieldCheck,
  Clock3,
  Loader2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { useStore } from "../../../../Store";
import {
  getAdminProduct,
  verifyProduct,
} from "../../../state/Admin/Action";

import ProductImages from "../../../../product/customer/components/ProductImages/ProductImages";

export default function AdminProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { state, dispatch } = useStore();

  const product = state.admin.selectedProduct;
  const verification = state.admin.verification;

  useEffect(() => {
    if (id) {
      dispatch(getAdminProduct(id));
    }
  }, [dispatch, id]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2 size={22} className="animate-spin" />
          <span>Loading product details...</span>
        </div>
      </div>
    );
  }

  const handleVerification = async (verified) => {
    try {
      await dispatch(
        verifyProduct(id, {
          verified,
          reason: verified
            ? null
            : "Product rejected by administrator.",
        })
      );

      navigate("/admin/product-verification");
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  const productName = product.name ?? "Unnamed product";

  const category =
    product.category?.name ??
    product.category ??
    "Not specified";

  const sellerName =
    product.seller?.name ??
    product.seller?.username ??
    product.sellerName ??
    "Unknown seller";

  const sellerEmail =
    product.seller?.email ??
    product.sellerEmail ??
    "Not available";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">

      {/* =====================================================
          BACK BUTTON
      ===================================================== */}

      <div className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100"
        >
          <ArrowLeft size={17} />
          Back
        </button>

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <ShieldCheck size={15} />
                Admin Product Review
              </div>

              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {productName}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Product ID #{product.id}
              </p>
            </div>

            {/* STATUS */}

            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
              <Clock3 size={16} />
              Pending Verification
            </div>

          </div>
        </div>

        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* =================================================
              PRODUCT IMAGES
          ================================================= */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                <Package size={18} className="text-gray-700" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Product Images
                </h2>

                <p className="text-sm text-gray-500">
                  Images submitted by the seller
                </p>
              </div>
            </div>

            <ProductImages
              productId={product.id}
              showGallery={true}
            />

          </section>

          {/* =================================================
              PRODUCT INFORMATION
          ================================================= */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                <Tag size={18} className="text-gray-700" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Product Information
                </h2>

                <p className="text-sm text-gray-500">
                  Review the submitted product details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* NAME */}

              <InfoItem
                icon={<Package size={16} />}
                label="Product Name"
                value={product.name}
              />

              {/* CATEGORY */}

              <InfoItem
                icon={<Tag size={16} />}
                label="Category"
                value={category}
              />

              {/* ORIGINAL PRICE */}

              <InfoItem
                icon={<IndianRupee size={16} />}
                label="Original Price"
                value={
                  product.originalPrice !== undefined &&
                  product.originalPrice !== null
                    ? `₹${Number(
                        product.originalPrice
                      ).toLocaleString("en-IN")}`
                    : "Not specified"
                }
              />

              {/* SELLING PRICE */}

              <InfoItem
                icon={<IndianRupee size={16} />}
                label="Selling Price"
                value={
                  product.sellingPrice !== undefined &&
                  product.sellingPrice !== null
                    ? `₹${Number(
                        product.sellingPrice
                      ).toLocaleString("en-IN")}`
                    : "Not specified"
                }
              />

              {/* QUANTITY */}

              <InfoItem
                icon={<Boxes size={16} />}
                label="Quantity"
                value={
                  product.quantity ??
                  product.stock ??
                  "Not specified"
                }
              />

              {/* CONDITION */}

              <InfoItem
                icon={<ShieldCheck size={16} />}
                label="Condition"
                value={product.condition ?? "Not specified"}
              />

            </div>

            {/* DESCRIPTION */}

            <div className="mt-6 border-t border-gray-100 pt-5">

              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Description
              </p>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
                  {product.description ||
                    "No product description provided."}
                </p>
              </div>

            </div>

          </section>

          {/* =================================================
              SELLER INFORMATION
          ================================================= */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">

            <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                <User size={18} className="text-gray-700" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Seller Information
                </h2>

                <p className="text-sm text-gray-500">
                  Seller who submitted this product
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <InfoItem
                icon={<User size={16} />}
                label="Seller"
                value={sellerName}
              />

              <InfoItem
                icon={<Mail size={16} />}
                label="Email"
                value={sellerEmail}
              />

            </div>

          </section>

        </div>

        {/* =====================================================
            VERIFICATION ACTIONS
        ===================================================== */}

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Verification Decision
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Review all information before approving or rejecting
              this product.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

            {/* REJECT */}

            <button
              type="button"
              disabled={verification?.loading}
              onClick={() => handleVerification(false)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {verification?.loading ? (
                <Loader2
                  size={17}
                  className="animate-spin"
                />
              ) : (
                <XCircle size={17} />
              )}

              Reject Product
            </button>

            {/* APPROVE */}

            <button
              type="button"
              disabled={verification?.loading}
              onClick={() => handleVerification(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {verification?.loading ? (
                <Loader2
                  size={17}
                  className="animate-spin"
                />
              ) : (
                <CheckCircle2 size={17} />
              )}

              Approve Product
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}


/* ============================================================
   REUSABLE INFORMATION ITEM
============================================================ */

function InfoItem({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">

      <div className="mb-2 flex items-center gap-2 text-gray-500">
        {icon}

        <span className="text-xs font-semibold uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="break-words text-sm font-semibold text-gray-900">
        {value ?? "Not specified"}
      </p>

    </div>
  );
}