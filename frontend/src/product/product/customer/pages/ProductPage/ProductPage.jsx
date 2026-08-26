import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  PackageSearch,
} from "lucide-react";

import { useStore } from "../../../../Store";

import {
  getProducts,
  getProductsByCategory,
} from "../../../state/Product/Action";

import ProductGrid from "../../components/Product/ProductGrid";
import ProductFilters from "../../components/Product/ProductFilters";

import Navigation from "../../../../home/customer/components/Navigation/Navigation";
import Footer from "../../../../home/customer/components/Footer/Footer";

const PRODUCT_SORT = "id,desc";

export default function ProductPage() {
  console.log("==================================================");
  console.log("[PRODUCT PAGE] COMPONENT RENDER");
  console.log("[PRODUCT PAGE] PRODUCT_SORT:", PRODUCT_SORT);
  console.log("==================================================");

  const { state, dispatch } = useStore();

  console.log("[PRODUCT PAGE] Store state:", state);
  console.log("[PRODUCT PAGE] Dispatch:", dispatch);

  // ============================================================
  // PRODUCT STATE
  // ============================================================

  const productState = state.product || {
    content: [],
    totalPages: 0,
    totalElements: 0,
    page: 0,
    size: 12,
    loading: false,
    error: null,
  };

  console.log("[PRODUCT PAGE] Product state:", productState);

  // ============================================================
  // CATEGORY FILTER
  // ============================================================

  const [categoryId, setCategoryId] = useState("");

  console.log("[PRODUCT PAGE] categoryId:", categoryId);

  // ============================================================
  // LOAD PRODUCTS
  // ============================================================

  const loadProducts = async (page = 0) => {
    console.log("====================================");
    console.log("[PRODUCT PAGE] LOAD PRODUCTS");
    console.log("[PRODUCT PAGE] page:", page);
    console.log("[PRODUCT PAGE] categoryId:", categoryId);
    console.log("[PRODUCT PAGE] sort:", PRODUCT_SORT);
    console.log("====================================");

    try {
      let response;

      // ========================================================
      // CATEGORY FILTERED PRODUCTS
      // ========================================================

      if (categoryId) {
        console.log(
          "[PRODUCT PAGE] Calling getProductsByCategory()"
        );

        response = await dispatch(
          getProductsByCategory(
            Number(categoryId),
            {
              page,
              size: 12,

              // IMPORTANT:
              // Product entity contains sellingPrice,
              // NOT price.
              sort: PRODUCT_SORT,
            }
          )
        );
      }

      // ========================================================
      // ALL PRODUCTS
      // ========================================================

      else {
        console.log(
          "[PRODUCT PAGE] Calling getProducts()"
        );

        response = await dispatch(
          getProducts({
            page,
            size: 12,

            // IMPORTANT:
            // Product entity contains sellingPrice,
            // NOT price.
            sort: PRODUCT_SORT,
          })
        );
      }

      console.log("====================================");
      console.log("[PRODUCT PAGE] API RESPONSE");
      console.log("[PRODUCT PAGE] response:", response);
      console.log(
        "[PRODUCT PAGE] response.content:",
        response?.content
      );
      console.log(
        "[PRODUCT PAGE] response.content.length:",
        response?.content?.length
      );
      console.log(
        "[PRODUCT PAGE] totalElements:",
        response?.totalElements
      );
      console.log(
        "[PRODUCT PAGE] totalPages:",
        response?.totalPages
      );
      console.log("====================================");

    } catch (error) {
      console.error("====================================");
      console.error(
        "[PRODUCT PAGE] LOAD PRODUCTS ERROR"
      );
      console.error(error);
      console.error("====================================");
    }
  };

  // ============================================================
  // INITIAL LOAD / CATEGORY CHANGE
  // ============================================================

  useEffect(() => {
    console.log("");
    console.log("================================================");
    console.log("[PRODUCT PAGE] CATEGORY EFFECT");
    console.log("================================================");

    console.log(
      "[PRODUCT PAGE] Current categoryId:",
      categoryId
    );

    // Whenever category changes, start from page 0.
    console.log("[PRODUCT PAGE] Triggering loadProducts(0)");
    loadProducts(0);

  }, [categoryId]);

  // ============================================================
  // WATCH PRODUCT STATE
  // ============================================================

  useEffect(() => {
    console.log("");
    console.log("================================================");
    console.log("[PRODUCT PAGE] PRODUCT STATE CHANGED");
    console.log("================================================");

    console.log(
      "[PRODUCT PAGE] Loading:",
      productState?.loading
    );

    console.log(
      "[PRODUCT PAGE] Error:",
      productState?.error
    );

    console.log(
      "[PRODUCT PAGE] Content:",
      productState?.content
    );

    console.log(
      "[PRODUCT PAGE] Content length:",
      productState?.content?.length
    );

    console.log(
      "[PRODUCT PAGE] Total elements:",
      productState?.totalElements
    );

    console.log(
      "[PRODUCT PAGE] Total pages:",
      productState?.totalPages
    );

    console.log(
      "[PRODUCT PAGE] Current page:",
      productState?.page
    );

  }, [
    productState?.loading,
    productState?.error,
    productState?.content,
    productState?.totalElements,
    productState?.totalPages,
    productState?.page,
  ]);

  // ============================================================
  // CATEGORY CHANGE
  // ============================================================

  const handleCategoryChange = (value) => {
    console.log("");
    console.log(
      "[PRODUCT PAGE] CATEGORY CHANGE"
    );

    console.log(
      "[PRODUCT PAGE] Previous category:",
      categoryId
    );

    console.log(
      "[PRODUCT PAGE] New category:",
      value
    );

    setCategoryId(value);
  };

  // ============================================================
  // CLEAR CATEGORY
  // ============================================================

  const handleClearCategory = () => {
    console.log(
      "[PRODUCT PAGE] CLEAR CATEGORY"
    );

    setCategoryId("");
  };

  // ============================================================
  // RENDER
  // ============================================================

  console.log(
    "[PRODUCT PAGE] Rendering ProductGrid with:",
    productState?.content
  );

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ======================================================
          NAVIGATION
      ======================================================= */}

      <Navigation />

      <main>

        {/* ====================================================
            HERO SECTION
        ===================================================== */}

        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">

          {/* Background decoration */}

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

            <div className="max-w-3xl">

              {/* Badge */}

              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">

                <PackageSearch className="h-4 w-4" />

                Verified surplus marketplace

              </div>

              {/* Heading */}

              <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">

                Find useful inventory at better prices.

              </h1>

              {/* Description */}

              <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">

                Explore verified surplus products from businesses
                and give quality inventory its next useful destination.

              </p>

            </div>

          </div>

        </section>

        {/* ====================================================
            PRODUCTS SECTION
        ===================================================== */}

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          {/* ==================================================
              FILTERS
          =================================================== */}

          <ProductFilters
            categoryId={categoryId}
            onCategoryChange={handleCategoryChange}
            onClear={handleClearCategory}
          />

          {/* ==================================================
              ERROR
          =================================================== */}

          {productState.error && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">

              {productState.error}

            </div>
          )}

          {/* ==================================================
              PRODUCT HEADER
          =================================================== */}

          <div className="mt-8">

            <div className="mb-5 flex items-end justify-between">

              <div>

                <p className="text-sm font-semibold text-blue-600">
                  Marketplace
                </p>

                <h2 className="text-2xl font-black text-slate-900">
                  Explore products
                </h2>

              </div>

              <p className="text-sm text-slate-500">
                {productState.totalElements} listings
              </p>

            </div>

            {/* ==================================================
                PRODUCT GRID
            =================================================== */}

            <ProductGrid
              products={productState.content}
              loading={productState.loading}
            />

          </div>

          {/* ==================================================
              PAGINATION
          =================================================== */}

          {productState.totalPages > 1 && (

            <div className="mt-10 flex items-center justify-center gap-3">

              {/* Previous */}

              <button
                type="button"
                disabled={
                  productState.page <= 0 ||
                  productState.loading
                }
                onClick={() =>
                  loadProducts(
                    productState.page - 1
                  )
                }
                className="rounded-xl border border-slate-300 bg-white p-3 text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >

                <ChevronLeft className="h-5 w-5" />

              </button>

              {/* Current page */}

              <span className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white">

                Page {productState.page + 1} of{" "}
                {productState.totalPages}

              </span>

              {/* Next */}

              <button
                type="button"
                disabled={
                  productState.page >=
                    productState.totalPages - 1 ||
                  productState.loading
                }
                onClick={() =>
                  loadProducts(
                    productState.page + 1
                  )
                }
                className="rounded-xl border border-slate-300 bg-white p-3 text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >

                <ChevronRight className="h-5 w-5" />

              </button>

            </div>

          )}

        </section>

      </main>

      {/* ======================================================
          FOOTER
      ======================================================= */}

      <Footer />

    </div>
  );
}