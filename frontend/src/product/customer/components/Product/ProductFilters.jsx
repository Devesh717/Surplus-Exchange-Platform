import React from "react";

export default function ProductFilters({
  categoryId,
  onCategoryChange,
  onClear,
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-slate-900">Explore surplus</p>
        <p className="text-xs text-slate-500">
          Filter products using a category ID.
        </p>
      </div>

      <div className="flex gap-2">
        <input
          value={categoryId}
          onChange={(e) => onCategoryChange(e.target.value)}
          placeholder="Category ID"
          type="number"
          min="1"
          className="w-40 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        <button
          type="button"
          onClick={onClear}
          className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          All
        </button>
      </div>
    </div>
  );
}
