import React, { useEffect, useState } from "react";

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
  const [form, setForm] = useState(initialValues || initialForm);

  useEffect(() => {
    setForm(initialValues || initialForm);
  }, [initialValues]);

  const update = (field, value) =>
    setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      ...form,
      originalPrice: Number(form.originalPrice),
      sellingPrice: Number(form.sellingPrice),
      quantity: Number(form.quantity),
      categoryId: Number(form.categoryId),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Product information
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          New or updated products require admin verification before buyers can see them.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="text-sm font-semibold text-slate-700">Product name</span>
          <input
            required
            maxLength={200}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="e.g. Industrial packaging boxes"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm font-semibold text-slate-700">Description</span>
          <textarea
            required
            maxLength={5000}
            rows={5}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className="mt-2 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="Describe the surplus product..."
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Condition</span>
          <select
            value={form.condition}
            onChange={(e) => update("condition", e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="NEW">New</option>
            <option value="USED">Used</option>
            <option value="REFURBISHED">Refurbished</option>
            <option value="SCRAP">Scrap</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Category ID</span>
          <input
            required
            type="number"
            min="1"
            value={form.categoryId}
            onChange={(e) => update("categoryId", e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="e.g. 1"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Original price</span>
          <input
            required
            type="number"
            min="0.01"
            step="0.01"
            value={form.originalPrice}
            onChange={(e) => update("originalPrice", e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Selling price</span>
          <input
            required
            type="number"
            min="0.01"
            step="0.01"
            value={form.sellingPrice}
            onChange={(e) => update("sellingPrice", e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Quantity</span>
          <input
            required
            type="number"
            min="0"
            value={form.quantity}
            onChange={(e) => update("quantity", e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Unit</span>
          <input
            required
            maxLength={50}
            value={form.unit}
            onChange={(e) => update("unit", e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="kg, piece, box..."
          />
        </label>
      </div>

      <button
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-blue-200 transition hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
