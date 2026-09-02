import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../../Store";
import { createProduct } from "../../../state/Action";
import { productApi } from "../../../api/ProductApi";
import ProductForm from "../../components/Product/ProductForm";

export default function CreateProductPage() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (
    product,
    images
  ) => {
    try {
      console.log(
        "===================================="
      );

      console.log(
        "[CREATE PRODUCT PAGE] PRODUCT:",
        product
      );

      console.log(
        "[CREATE PRODUCT PAGE] IMAGES:",
        images
      );

      // =================================================
      // STEP 1: CREATE PRODUCT
      // =================================================

      const createdProduct =
        await dispatch(
          createProduct(product)
        );

      console.log(
        "[CREATE PRODUCT PAGE] CREATED PRODUCT:",
        createdProduct
      );

      // =================================================
      // STEP 2: GET PRODUCT ID
      // =================================================

      const productId =
        createdProduct?.id;

      if (!productId) {
        throw new Error(
          "Product was created but no product ID was returned."
        );
      }

      // =================================================
      // STEP 3: UPLOAD IMAGES
      // =================================================

      if (
        images &&
        images.length > 0
      ) {
        console.log(
          "[CREATE PRODUCT PAGE] Uploading images..."
        );

        await productApi.uploadImages(
          productId,
          images
        );

        console.log(
          "[CREATE PRODUCT PAGE] Images uploaded successfully."
        );
      } else {
        console.log(
          "[CREATE PRODUCT PAGE] No images selected."
        );
      }

      // =================================================
      // STEP 4: NAVIGATE
      // =================================================

      navigate(
        "/seller/products"
      );

    } catch (error) {
      console.error(
        "[CREATE PRODUCT PAGE] FAILED:",
        error
      );

      console.error(
        "[CREATE PRODUCT PAGE] RESPONSE:",
        error?.response?.data
      );

      // Error is stored by reducer
      // for product creation errors.
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {state.product?.error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 font-medium text-red-700">
            {state.product.error}
          </div>
        )}

        <ProductForm
          onSubmit={handleSubmit}
          loading={
            state.product?.mutationLoading
          }
        />

      </div>
    </main>
  );
}