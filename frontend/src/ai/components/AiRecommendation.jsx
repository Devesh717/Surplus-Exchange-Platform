import React, { useState } from "react";
import { Loader2, Search, Sparkles } from "lucide-react";

export default function AiRecommendation({ result, loading, onSubmit, onClear }) {
  const [requirement, setRequirement] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    if (!requirement.trim() || loading) return;
    await onSubmit(requirement.trim());
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900">AI product recommendations</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">Describe what you need. The backend AI searches the marketplace inventory before recommending products.</p>
        </div>
        {result && <button type="button" onClick={onClear} className="text-sm font-bold text-slate-500 hover:text-slate-900">Clear</button>}
      </div>

      <form onSubmit={submit} className="mt-6 space-y-3">
        <textarea
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          maxLength={2000}
          rows={5}
          placeholder="Example: I need reusable office chairs for a small office, preferably in good condition and within ₹15,000."
          className="w-full rounded-2xl border border-slate-200 p-4 text-sm leading-6 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
        <button type="submit" disabled={loading || !requirement.trim()} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          {loading ? "Searching..." : "Find products"}
        </button>
      </form>

      {result && (
        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <div className="flex items-center gap-2 text-sm font-black text-blue-800">
            <Sparkles className="h-4 w-4" />
            AI recommendation
          </div>
          <div className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">{result}</div>
        </div>
      )}
    </div>
  );
}
