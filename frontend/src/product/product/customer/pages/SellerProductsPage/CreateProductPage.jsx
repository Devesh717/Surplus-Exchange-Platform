import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../state/Store";
import { createProduct } from "../../../state/Product/Action";
import ProductForm from "../../components/Product/ProductForm";

export default function CreateProductPage() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (product) => {
    try {
      await dispatch(createProduct(product));
      navigate("/seller/products");
    } catch {
      // Error is stored by the reducer.
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
          loading={state.product?.mutationLoading}
        />
      </div>
    </main>
  );
}
