import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";


import { useStore } from "../../../../Store";
import { getProducts, getProductsByCategory, } from "../../../state/Action";

import ProductCard from "../../../customer/components/Product/ProductCard";

import Navigation from "../../../../home/customer/components/Navigation/Navigation";
import Footer from "../../../../home/customer/components/Footer/Footer";

// ======================================================
// CATEGORIES
// ======================================================
//
// IMPORTANT:
// Change these IDs if your backend Category IDs are different.
//
// Example:
// Electronics -> 1
// Furniture  -> 2
// Machinery  -> 3
// etc.
//
const CATEGORIES = [
  { id: null, name: "All Categories" },
  { id: 1, name: "Food" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Clothing" },
  { id: 4, name: "Furniture" },
  { id: 5, name: "Household Items" },
  { id: 6, name: "Books & Stationery" },
  { id: 7, name: "Industrial & Tools" },
];


// ======================================================
// SORT OPTIONS
// ======================================================

const SORT_OPTIONS = [
  {
    value: "sellingPrice,asc",
    label: "Price: Low to High",
  },
  {
    value: "sellingPrice,desc",
    label: "Price: High to Low",
  },
  {
    value: "id,desc",
    label: "Newest",
  },
  {
    value: "id,asc",
    label: "Oldest",
  },
];


// ======================================================
// PRODUCT PAGE
// ======================================================

export default function ProductPage() {
  const navigate = useNavigate();

  const { state, dispatch } = useStore();

  const productState = state.product || {};

  const {
    content = [],
    totalPages = 0,
    totalElements = 0,
    page = 0,
    size = 12,
    loading = false,
    error = null,
  } = productState;


  // ======================================================
  // LOCAL FILTER STATE
  // ======================================================

  const [selectedCategory, setSelectedCategory] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [sort, setSort] =
    useState("sellingPrice,asc");


  // ======================================================
  // LOAD PRODUCTS
  // ======================================================

  useEffect(() => {
    loadProducts(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, sort]);


  // ======================================================
  // LOAD PRODUCTS FUNCTION
  // ======================================================

  const loadProducts = async (pageNumber = 0) => {
    try {
      const params = {
        page: pageNumber,
        size,
        sort,
      };


      // ================================================
      // ALL CATEGORIES
      // ================================================

      if (selectedCategory === null) {
        await dispatch(
          getProducts(params)
        );

        return;
      }


      // ================================================
      // SPECIFIC CATEGORY
      // ================================================

      await dispatch(
        getProductsByCategory(
          selectedCategory,
          params
        )
      );

    } catch (error) {
      console.error(
        "[PRODUCT PAGE] Unable to load products:",
        error
      );
    }
  };


  // ======================================================
  // CATEGORY CLICK
  // ======================================================

  const handleCategoryChange = (categoryId) => {
    console.log(
      "[PRODUCT PAGE] Selected category:",
      categoryId
    );

    setSelectedCategory(categoryId);
  };


  // ======================================================
  // SORT CHANGE
  // ======================================================

  const handleSortChange = (event) => {
    const value = event.target.value;

    console.log(
      "[PRODUCT PAGE] Selected sort:",
      value
    );

    setSort(value);
  };


  // ======================================================
  // SEARCH
  // ======================================================
  //
  // Your current backend API does NOT show a search parameter.
  //
  // Therefore this performs search against the currently
  // loaded page only.
  //
  // For proper server-side search, add search support to
  // ProductApi/backend later.
  //

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return content;
    }

    const search = searchTerm
      .trim()
      .toLowerCase();

    return content.filter((product) => {
      const name =
        product.name ||
        product.productName ||
        "";

      const description =
        product.description || "";

      const category =
        product.category?.name ||
        product.categoryName ||
        "";

      return (
        name.toLowerCase().includes(search) ||
        description.toLowerCase().includes(search) ||
        category.toLowerCase().includes(search)
      );
    });
  }, [content, searchTerm]);


  // ======================================================
  // CLEAR FILTERS
  // ======================================================

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchTerm("");
    setSort("sellingPrice,asc");
  };


  // ======================================================
  // PAGINATION
  // ======================================================

  const handlePrevious = () => {
    if (page <= 0 || loading) {
      return;
    }

    loadProducts(page - 1);
  };


  const handleNext = () => {
    if (
      page >= totalPages - 1 ||
      loading
    ) {
      return;
    }

    loadProducts(page + 1);
  };


  // ======================================================
  // SELECTED CATEGORY NAME
  // ======================================================

  const selectedCategoryName =
    CATEGORIES.find(
      (category) =>
        category.id === selectedCategory
    )?.name || "All surplus products";


  // ======================================================
  // RENDER
  // ======================================================

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ==================================================
          NAVIGATION
      ================================================== */}

      <Navigation />


      {/* ==================================================
          MAIN
      ================================================== */}

      <main>

        {/* ==================================================
            FILTER SECTION
        ================================================== */}

        <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            {/* ==================================================
                SEARCH + SORT
            ================================================== */}

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

              {/* SEARCH */}

              <div className="relative flex-1">

                <Search
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                  placeholder="Search surplus products..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-12 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearchTerm("")
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}

              </div>


              {/* FILTER ICON */}

              <button
                type="button"
                className="hidden rounded-xl border border-slate-200 bg-white p-3 text-slate-500 lg:block"
              >
                <SlidersHorizontal className="h-5 w-5" />
              </button>


              {/* SORT */}

              <div className="relative">

                <select
                  value={sort}
                  onChange={handleSortChange}
                  className="appearance-none rounded-2xl border border-slate-200 bg-white py-4 pl-5 pr-12 text-sm font-bold text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                >
                  {SORT_OPTIONS.map(
                    (option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    )
                  )}
                </select>

                <ChevronDown
                  className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                />

              </div>

            </div>


            {/* ==================================================
                CATEGORY HEADER
            ================================================== */}

            <div className="mt-7 flex items-center justify-between">

              <h2 className="text-sm font-black text-slate-900">
                Categories
              </h2>

              {(selectedCategory !== null ||
                searchTerm) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-bold text-blue-600 transition hover:text-blue-700 hover:underline"
                >
                  Clear filters
                </button>
              )}

            </div>


            {/* ==================================================
                CATEGORY BUTTONS
            ================================================== */}

            <div className="mt-4 flex flex-wrap gap-2.5">

              {CATEGORIES.map(
                (category) => {
                  const active =
                    selectedCategory ===
                    category.id;

                  return (
                    <button
                      key={
                        category.id ??
                        "all"
                      }
                      type="button"
                      onClick={() =>
                        handleCategoryChange(
                          category.id
                        )
                      }
                      className={`rounded-full border px-5 py-3 text-sm font-bold transition ${
                        active
                          ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-200"
                          : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                      }`}
                    >
                      {category.name}
                    </button>
                  );
                }
              )}

            </div>

          </div>

        </section>


        {/* ==================================================
            PRODUCT HEADER
        ================================================== */}

        <section className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-8">

          <div className="mb-6">

            <p className="text-sm font-bold text-blue-600">
              {totalElements || filteredProducts.length}{" "}
              product
              {(totalElements ||
                filteredProducts.length) === 1
                ? ""
                : "s"}{" "}
              found
            </p>

            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              {selectedCategoryName}
            </h1>

          </div>


          {/* ==================================================
              ERROR
          ================================================== */}

          {error && (
            <div className="mb-6 flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">

              <span>
                {error}
              </span>

              <button
                type="button"
                onClick={() =>
                  loadProducts(page)
                }
                className="font-black hover:underline"
              >
                Retry
              </button>

            </div>
          )}


          {/* ==================================================
              LOADING
          ================================================== */}

          {loading ? (

            <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-slate-200 bg-white">

              <div className="flex flex-col items-center gap-3">

                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />

                <p className="text-sm font-bold text-slate-500">
                  Loading products...
                </p>

              </div>

            </div>

          ) : filteredProducts.length === 0 ? (

            /* ==================================================
               EMPTY STATE
            ================================================== */

            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 text-center">

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100">

                <Search className="h-9 w-9 text-slate-400" />

              </div>

              <h2 className="mt-6 text-2xl font-black text-slate-900">
                No products found
              </h2>

              <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
                We couldn't find products matching
                your current filters. Try another
                category or search term.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5"
              >
                Clear filters
              </button>

            </div>

          ) : (

            /* ==================================================
               PRODUCT GRID
            ================================================== */

            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {filteredProducts.map(
                  (product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={() =>
                        navigate(
                          `/products/${product.id}`
                        )
                      }
                    />
                  )
                )}

              </div>


              {/* ==================================================
                  PAGINATION
              ================================================== */}

              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-4">

                  <button
                    type="button"
                    disabled={
                      page <= 0 ||
                      loading
                    }
                    onClick={
                      handlePrevious
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>


                  <div className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-600 shadow-sm">
                    Page{" "}
                    {page + 1} of{" "}
                    {totalPages}
                  </div>


                  <button
                    type="button"
                    disabled={
                      page >=
                        totalPages - 1 ||
                      loading
                    }
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>

                </div>
              )}

            </>

          )}

        </section>

      </main>


      {/* ==================================================
          FOOTER
      ================================================== */}

      <Footer />

    </div>
  );
}