import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Edit3,
  Trash2,
  ShieldCheck,
} from "lucide-react";

import { useStore } from "../../../../Store";
import {
  getMyProduct,
  deleteProduct,
} from "../../../state/Action";

import ProductImages from "../../components/ProductImages/ProductImages";


export default function SellerProductDetailsPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const { state, dispatch } = useStore();

  const productState =
    state.product || {};


  useEffect(() => {

    if (!id) return;

    dispatch(getMyProduct(id));

  }, [dispatch, id]);


  const product =
    productState.selectedProduct;


  const handleDelete = async () => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmed) return;

    try {

      await dispatch(
        deleteProduct(id)
      );

      navigate(
        "/seller/products"
      );

    } catch (error) {

      console.error(
        "Failed to delete product:",
        error
      );

    }

  };


  if (productState.loading) {

    return (
      <main className="min-h-screen bg-slate-50 px-4 py-20 text-center text-slate-500">
        Loading product...
      </main>
    );

  }


  if (productState.error) {

    return (
      <main className="min-h-screen bg-slate-50 px-4 py-20 text-center">

        <h2 className="text-2xl font-black text-slate-900">
          Product unavailable
        </h2>

        <p className="mt-2 text-slate-500">
          {productState.error}
        </p>

      </main>
    );

  }


  if (!product) {
    return null;
  }


  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* BACK */}

        <button
          type="button"
          onClick={() =>
            navigate("/seller/products")
          }
          className="
            mb-8
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-slate-600
            hover:text-blue-600
          "
        >
          <ArrowLeft className="h-4 w-4" />
          Back to my products
        </button>


        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

          <div className="grid lg:grid-cols-2">


            {/* =================================================
                IMAGES
                ================================================= */}

            <div className="min-h-[450px] bg-slate-50">

              <ProductImages
                productId={product.id}
                productName={product.name}
                showGallery
                className="h-full min-h-[450px]"
              />

            </div>


            {/* =================================================
                DETAILS
                ================================================= */}

            <div className="p-7 sm:p-10">

              <div className="flex flex-wrap gap-2">

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  {product.categoryName}
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                  {product.condition}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    product.verified
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {product.verified
                    ? "Verified"
                    : "Pending verification"}
                </span>

              </div>


              <h1 className="mt-5 text-3xl font-black text-slate-900 sm:text-4xl">
                {product.name}
              </h1>


              <p className="mt-5 leading-7 text-slate-600">
                {product.description}
              </p>


              {/* PRICE */}

              <div className="mt-8 rounded-2xl bg-slate-50 p-5">

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Selling price
                </p>

                <div className="mt-1 text-4xl font-black text-slate-900">
                  ₹{Number(
                    product.sellingPrice || 0
                  ).toLocaleString("en-IN")}
                </div>

                <div className="mt-2 text-sm text-slate-400 line-through">
                  ₹{Number(
                    product.originalPrice || 0
                  ).toLocaleString("en-IN")}
                </div>

              </div>


              {/* INFORMATION */}

              <div className="mt-6 grid gap-3 sm:grid-cols-2">

                <div className="rounded-xl border border-slate-200 p-4">

                  <p className="text-xs text-slate-500">
                    Available stock
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {product.quantity} {product.unit}
                  </p>

                </div>


                <div className="rounded-xl border border-slate-200 p-4">

                  <p className="text-xs text-slate-500">
                    Category
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {product.categoryName}
                  </p>

                </div>

              </div>


              {/* VERIFICATION */}

              <div className="mt-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">

                <ShieldCheck className="h-5 w-5 text-blue-600" />

                <div>

                  <p className="text-sm font-bold text-slate-900">
                    Product verification
                  </p>

                  <p className="text-xs text-slate-500">
                    {product.verified
                      ? "This product has been verified by admin."
                      : "This product is awaiting admin verification."}
                  </p>

                </div>

              </div>


              {/* ACTIONS */}

              <div className="mt-8 grid gap-3 sm:grid-cols-2">

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/seller/products/${product.id}/edit`
                    )
                  }
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-4
                    font-bold
                    text-white
                    hover:bg-blue-700
                  "
                >
                  <Edit3 className="h-5 w-5" />
                  Edit product
                </button>


                <button
                  type="button"
                  onClick={handleDelete}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-red-200
                    bg-red-50
                    px-5
                    py-4
                    font-bold
                    text-red-700
                    hover:bg-red-100
                  "
                >
                  <Trash2 className="h-5 w-5" />
                  Delete product
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}