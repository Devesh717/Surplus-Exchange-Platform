import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useStore } from "../../../../Store";
import { getMyProducts } from "../../../state/Action";
import SellerProductCard from "../../components/Product/SellerProductCard";

export default function SellerProductsPage() {

  const { state, dispatch } = useStore();

  const productState = state.product || {
    content: [],
    loading: false,
    error: null,
  };


  useEffect(() => {

    dispatch(
      getMyProducts({
        page: 0,
        size: 20,
      })
    );

  }, [dispatch]);


  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
            ===================================================== */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Seller workspace
            </p>

            <h1 className="mt-2 text-3xl font-black text-slate-900">
              My products
            </h1>

            <p className="mt-2 text-slate-500">
              Manage your product listings, inventory and pricing.
            </p>

          </div>


          <Link
            to="/seller/products/new"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              px-5
              py-3
              font-bold
              text-white
              shadow-lg
              shadow-blue-200
            "
          >
            <Plus className="h-5 w-5" />
            Add product
          </Link>

        </div>


        {/* =====================================================
            ERROR
            ===================================================== */}

        {productState.error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            {productState.error}
          </div>
        )}


        {/* =====================================================
            LOADING
            ===================================================== */}

        {productState.loading && (
          <div className="py-20 text-center text-slate-500">
            Loading your products...
          </div>
        )}


        {/* =====================================================
            PRODUCTS
            ===================================================== */}

        {!productState.loading &&
          productState.content?.length > 0 && (

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {productState.content.map((product) => (

                <SellerProductCard
                  key={product.id}
                  product={product}
                />

              ))}

            </div>

          )}


        {/* =====================================================
            EMPTY
            ===================================================== */}

        {!productState.loading &&
          !productState.error &&
          productState.content?.length === 0 && (

            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">

              <h2 className="text-xl font-bold text-slate-900">
                No products yet
              </h2>

              <p className="mt-2 text-slate-500">
                Create your first product listing.
              </p>

              <Link
                to="/seller/products/new"
                className="
                  mt-6
                  inline-flex
                  rounded-xl
                  bg-blue-600
                  px-5
                  py-3
                  font-bold
                  text-white
                  hover:bg-blue-700
                "
              >
                Create product
              </Link>

            </div>

          )}

      </div>

    </main>
  );
}