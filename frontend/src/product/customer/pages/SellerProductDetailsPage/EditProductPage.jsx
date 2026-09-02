import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { useStore } from "../../../../Store";
import {
  getMyProduct,
  updateProduct,
} from "../../../state/Action";

import { productApi } from "../../../api/ProductApi";

import ProductForm from "../../components/Product/ProductForm";

import ReviewList from "../../../../review/components/ReviewList";


export default function EditProductPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const { state, dispatch } = useStore();

  const productState = state.product || {};

  const [saving, setSaving] = useState(false);


  // ============================================================
  // LOAD SELLER PRODUCT
  // ============================================================

  useEffect(() => {

    if (!id) {
      return;
    }

    console.log("========================================");
    console.log("[EDIT PRODUCT] Loading product");
    console.log("[EDIT PRODUCT] Product ID:", id);
    console.log("========================================");

    dispatch(getMyProduct(id));

  }, [dispatch, id]);


  // ============================================================
  // PRODUCT
  // ============================================================

  const product = productState.selectedProduct;


  // ============================================================
  // SUBMIT
  // ============================================================

  const handleSubmit = async (productData, images) => {

    if (!id) {
      console.error(
        "[EDIT PRODUCT] Missing product ID"
      );
      return;
    }

    try {

      setSaving(true);

      console.log("========================================");
      console.log("[EDIT PRODUCT] UPDATE START");
      console.log("[EDIT PRODUCT] Product ID:", id);
      console.log("[EDIT PRODUCT] Product data:", productData);
      console.log("[EDIT PRODUCT] New images:", images);
      console.log("========================================");


      // ----------------------------------------------------------
      // 1. UPDATE PRODUCT DETAILS
      // ----------------------------------------------------------

      const updatedProduct =
        await dispatch(
          updateProduct(
            id,
            productData
          )
        );


      console.log(
        "[EDIT PRODUCT] Product updated:",
        updatedProduct
      );


      // ----------------------------------------------------------
      // 2. UPLOAD NEW IMAGES
      // ----------------------------------------------------------

      if (images?.length > 0) {

        console.log(
          "[EDIT PRODUCT] Uploading new images..."
        );

        const uploadedImages =
          await productApi.uploadImages(
            id,
            images
          );

        console.log(
          "[EDIT PRODUCT] Uploaded images:",
          uploadedImages
        );

      } else {

        console.log(
          "[EDIT PRODUCT] No new images selected."
        );

      }


      // ----------------------------------------------------------
      // 3. GO BACK TO SELLER PRODUCT
      // ----------------------------------------------------------

      navigate(
        `/seller/products/${id}`,
        {
          replace: true,
        }
      );

    } catch (error) {

      console.error(
        "========================================"
      );

      console.error(
        "[EDIT PRODUCT] UPDATE FAILED"
      );

      console.error(
        "[EDIT PRODUCT] Error:",
        error
      );

      console.error(
        "[EDIT PRODUCT] Response:",
        error?.response?.data
      );

      console.error(
        "========================================"
      );

    } finally {

      setSaving(false);

    }

  };


  // ============================================================
  // LOADING
  // ============================================================

  if (productState.loading && !product) {

    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-5xl">

          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">

            <p className="text-slate-500">
              Loading product...
            </p>

          </div>

        </div>

      </main>
    );

  }


  // ============================================================
  // ERROR
  // ============================================================

  if (productState.error && !product) {

    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-5xl">

          <button
            type="button"
            onClick={() =>
              navigate("/seller/products")
            }
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to my products
          </button>


          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">

            <h2 className="text-xl font-black text-red-800">
              Unable to load product
            </h2>

            <p className="mt-2 text-sm text-red-700">
              {productState.error}
            </p>

          </div>

        </div>

      </main>
    );

  }


  // ============================================================
  // NO PRODUCT
  // ============================================================

  if (!product) {
    return null;
  }


  // ============================================================
  // INITIAL FORM VALUES
  // ============================================================

  const initialValues = {

    name: product.name || "",

    description:
      product.description || "",

    condition:
      product.condition || "USED",

    originalPrice:
      product.originalPrice ?? "",

    sellingPrice:
      product.sellingPrice ?? "",

    quantity:
      product.quantity ?? "",

    unit:
      product.unit || "",

    categoryId:
      product.categoryId ?? "",
  };


  // ============================================================
  // UI
  // ============================================================

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-5xl">

        {/* =====================================================
            HEADER
            ===================================================== */}

        <button
          type="button"
          onClick={() =>
            navigate(
              `/seller/products/${id}`
            )
          }
          className="
            mb-6
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-slate-600
            transition
            hover:text-blue-600
          "
        >
          <ArrowLeft className="h-4 w-4" />
          Back to product
        </button>


        <div className="mb-8">

          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Seller workspace
          </p>

          <h1 className="mt-2 text-3xl font-black text-slate-900">
            Edit product
          </h1>

          <p className="mt-2 text-slate-500">
            Update your product information, pricing, stock and add new images.
          </p>

        </div>


        {/* =====================================================
            PRODUCT FORM
            ===================================================== */}

        <ProductForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          loading={saving}
          submitLabel="Save changes"
        />

        <ReviewList productId={product.id} />

      </div>

    </main>
  );
}