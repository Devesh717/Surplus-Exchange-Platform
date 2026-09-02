import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../../../Store";
import {
  getProduct,
  getMyProduct,
} from "../../../state/Action";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import Navigation from "../../../../home/customer/components/Navigation/Navigation";
import Footer from "../../../../home/customer/components/Footer/Footer";
import ReviewList from "../../../../review/components/ReviewList";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { state, dispatch } = useStore();

  const productState = state.product || {};

  const role = localStorage.getItem("se_role");

  useEffect(() => {
    if (!id) return;

    if (role === "SELLER") {
      dispatch(getMyProduct(id));
    } else {
      dispatch(getProduct(id));
    }
  }, [dispatch, id, role]);

  return (
    <>
      <Navigation />

      {productState.loading && (
        <div className="min-h-screen bg-slate-50 px-4 py-20 text-center text-slate-500">
          Loading product...
        </div>
      )}

      {!productState.loading && productState.error && (
        <div className="min-h-screen bg-slate-50 px-4 py-20 text-center">
          <h2 className="text-2xl font-black text-slate-900">
            Product unavailable
          </h2>

          <p className="mt-2 text-slate-500">
            {productState.error}
          </p>
        </div>
      )}

      {!productState.loading &&
  productState.selectedProduct && (
    <>
      <ProductDetails
        product={productState.selectedProduct}
      />

      <main className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <ReviewList
          productId={productState.selectedProduct.id}
        />
      </main>
    </>
)}

      <Footer />
    </>
  );
}