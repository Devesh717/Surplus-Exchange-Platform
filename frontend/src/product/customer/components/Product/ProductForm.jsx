import React, { useEffect, useState } from "react";
import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react";
import { productApi } from "../../../api/ProductApi";

const initialForm = {
  name: "",
  description: "",
  condition: "USED",
  originalPrice: "",
  sellingPrice: "",
  quantity: "",
  unit: "",
  categoryId: "",
};

export default function ProductForm({
  initialValues,
  onSubmit,
  loading = false,
  submitLabel = "Create product",
}) {
  const [form, setForm] = useState(
    initialValues || initialForm
  );

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] =
    useState(true);
  const [categoryError, setCategoryError] =
    useState("");

  const [images, setImages] = useState([]);

  // =====================================================
  // LOAD CATEGORIES
  // =====================================================

  useEffect(() => {
    let mounted = true;

    async function loadCategories() {
      setCategoriesLoading(true);
      setCategoryError("");

      try {
        const data = await productApi.getCategories();

        if (!mounted) return;

        setCategories(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        if (!mounted) return;

        setCategoryError(
          error?.response?.data?.message ||
            error?.message ||
            "Unable to load categories."
        );
      } finally {
        if (mounted) {
          setCategoriesLoading(false);
        }
      }
    }

    loadCategories();

    return () => {
      mounted = false;
    };
  }, []);

  // =====================================================
  // INITIAL VALUES
  // =====================================================

  useEffect(() => {
    setForm(
      initialValues
        ? {
            ...initialForm,
            ...initialValues,
            categoryId:
              initialValues.categoryId ?? "",
          }
        : initialForm
    );
  }, [initialValues]);

  // =====================================================
  // UPDATE FIELD
  // =====================================================

  const update = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  // =====================================================
  // IMAGE SELECTION
  // =====================================================

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(
      event.target.files || []
    );

    if (selectedFiles.length === 0) {
      return;
    }

    // Optional validation
    const validFiles = selectedFiles.filter((file) => {
      if (!file.type.startsWith("image/")) {
        return false;
      }

      // 5 MB limit per image
      if (file.size > 5 * 1024 * 1024) {
        return false;
      }

      return true;
    });

    setImages((current) => [
      ...current,
      ...validFiles,
    ]);

    // Allow selecting same file again
    event.target.value = "";
  };

  // =====================================================
  // REMOVE IMAGE
  // =====================================================

  const removeImage = (index) => {
    setImages((current) =>
      current.filter((_, i) => i !== index)
    );
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.categoryId) {
      setCategoryError(
        "Please select a category."
      );
      return;
    }

    setCategoryError("");

    const productData = {
      ...form,

      originalPrice:
        Number(form.originalPrice),

      sellingPrice:
        Number(form.sellingPrice),

      quantity:
        Number(form.quantity),

      categoryId:
        Number(form.categoryId),
    };

    console.log(
      "[PRODUCT FORM] PRODUCT DATA:",
      productData
    );

    console.log(
      "[PRODUCT FORM] IMAGES:",
      images
    );

    // IMPORTANT:
    // Product JSON and image files are sent separately.
    onSubmit(productData, images);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Product information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          New or updated products require admin
          verification before buyers can see them.
        </p>
      </div>

      {/* ================================================= */}
      {/* FORM */}
      {/* ================================================= */}

      <div className="grid gap-5 md:grid-cols-2">

        {/* PRODUCT NAME */}

        <label className="block md:col-span-2">
          <span className="text-sm font-semibold text-slate-700">
            Product name
          </span>

          <input
            required
            maxLength={200}
            value={form.name}
            onChange={(e) =>
              update("name", e.target.value)
            }
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="e.g. Industrial packaging boxes"
          />
        </label>

        {/* DESCRIPTION */}

        <label className="block md:col-span-2">
          <span className="text-sm font-semibold text-slate-700">
            Description
          </span>

          <textarea
            required
            maxLength={5000}
            rows={5}
            value={form.description}
            onChange={(e) =>
              update(
                "description",
                e.target.value
              )
            }
            className="mt-2 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="Describe the surplus product..."
          />
        </label>

        {/* CONDITION */}

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Condition
          </span>

          <select
            value={form.condition}
            onChange={(e) =>
              update(
                "condition",
                e.target.value
              )
            }
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="NEW">
              New
            </option>

            <option value="USED">
              Used
            </option>

            <option value="REFURBISHED">
              Refurbished
            </option>

            <option value="SCRAP">
              Scrap
            </option>
          </select>
        </label>

        {/* CATEGORY */}

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Category
          </span>

          <select
            required
            value={form.categoryId}
            disabled={categoriesLoading}
            onChange={(e) =>
              update(
                "categoryId",
                e.target.value
              )
            }
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
          >
            <option value="">
              {categoriesLoading
                ? "Loading categories..."
                : "Select a category"}
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>

          {categoryError && (
            <p className="mt-2 text-xs font-medium text-red-600">
              {categoryError}
            </p>
          )}
        </label>

        {/* ORIGINAL PRICE */}

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Original price
          </span>

          <input
            required
            type="number"
            min="0.01"
            step="0.01"
            value={form.originalPrice}
            onChange={(e) =>
              update(
                "originalPrice",
                e.target.value
              )
            }
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </label>

        {/* SELLING PRICE */}

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Selling price
          </span>

          <input
            required
            type="number"
            min="0.01"
            step="0.01"
            value={form.sellingPrice}
            onChange={(e) =>
              update(
                "sellingPrice",
                e.target.value
              )
            }
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </label>

        {/* QUANTITY */}

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Quantity
          </span>

          <input
            required
            type="number"
            min="0"
            value={form.quantity}
            onChange={(e) =>
              update(
                "quantity",
                e.target.value
              )
            }
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </label>

        {/* UNIT */}

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Unit
          </span>

          <input
            required
            maxLength={50}
            value={form.unit}
            onChange={(e) =>
              update(
                "unit",
                e.target.value
              )
            }
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="kg, piece, box..."
          />
        </label>

        {/* ================================================= */}
        {/* PRODUCT IMAGES */}
        {/* ================================================= */}

        <div className="md:col-span-2">

          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold text-slate-700">
                Product images
              </span>

              <p className="mt-1 text-xs text-slate-500">
                Upload up to multiple images. Maximum 5 MB
                per image.
              </p>
            </div>

            <ImageIcon
              size={20}
              className="text-slate-400"
            />
          </div>

          {/* Upload Box */}

          <label
            htmlFor="product-images"
            className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 transition hover:border-blue-400 hover:bg-blue-50"
          >
            <Upload
              size={28}
              className="text-blue-600"
            />

            <p className="mt-3 text-sm font-semibold text-slate-700">
              Click to upload product images
            </p>

            <p className="mt-1 text-xs text-slate-500">
              PNG, JPG, JPEG, WEBP
            </p>

            <input
              id="product-images"
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {/* IMAGE PREVIEWS */}

          {images.length > 0 && (
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">

              {images.map((image, index) => (
                <div
                  key={`${image.name}-${index}`}
                  className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
                >

                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Product ${index + 1}`}
                    className="h-32 w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeImage(index)
                    }
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white opacity-90 shadow transition hover:bg-red-700"
                  >
                    <X size={15} />
                  </button>

                  <div className="truncate px-2 py-2 text-xs text-slate-600">
                    {image.name}
                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

      {/* ================================================= */}
      {/* SUBMIT */}
      {/* ================================================= */}

      <button
        type="submit"
        disabled={
          loading ||
          categoriesLoading ||
          categories.length === 0
        }
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-blue-200 transition hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading && (
          <Loader2
            size={17}
            className="animate-spin"
          />
        )}

        {loading
          ? "Saving..."
          : submitLabel}
      </button>

    </form>
  );
}