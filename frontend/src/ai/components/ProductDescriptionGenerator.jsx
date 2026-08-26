import React, { useState } from "react";
import { Clipboard, Check, FileText, Loader2, Sparkles } from "lucide-react";

export default function ProductDescriptionGenerator({ result, loading, onSubmit, onClear }) {
  const [form, setForm] = useState({
    productName: "",
    condition: "",
    specifications: "",
    additionalDetails: "",
  });
  const [copied, setCopied] = useState(false);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event) => {
    event.preventDefault();
    if (!form.productName.trim() || !form.condition.trim() || loading) return;
    await onSubmit(form);
  };

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-lg font-black text-slate-900">AI product description</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">Generate a factual marketplace-ready description from the information you actually know.</p>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <Field label="Product name" required value={form.productName} onChange={(e) => update("productName", e.target.value)} maxLength={200} placeholder="e.g. Industrial Steel Shelving Unit" />
          <Field label="Condition" required value={form.condition} onChange={(e) => update("condition", e.target.value)} maxLength={50} placeholder="e.g. Good / Used / Like New" />
          <TextArea label="Specifications" value={form.specifications} onChange={(e) => update("specifications", e.target.value)} maxLength={2000} placeholder="Dimensions, material, capacity, model, etc." />
          <TextArea label="Additional details" value={form.additionalDetails} onChange={(e) => update("additionalDetails", e.target.value)} maxLength={1000} placeholder="Reason for surplus, packaging, pickup information, etc." />

          <div className="flex gap-3">
            <button type="submit" disabled={loading || !form.productName.trim() || !form.condition.trim()} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {loading ? "Generating..." : "Generate description"}
            </button>
            {result && <button type="button" onClick={onClear} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">Clear</button>}
          </div>
        </form>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900">Generated description</h2>
            <p className="mt-1 text-sm text-slate-500">Review before adding it to a listing.</p>
          </div>
          {result && (
            <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50">
              {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>

        <div className="min-h-[400px] pt-5">
          {result ? (
            <div className="whitespace-pre-wrap text-sm leading-7 text-slate-700">{result}</div>
          ) : (
            <div className="flex min-h-[360px] items-center justify-center text-center text-slate-400">
              <div>
                <FileText className="mx-auto h-10 w-10" />
                <p className="mt-3 text-sm font-semibold">Your generated description will appear here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}{required ? " *" : ""}</span>
      <input {...props} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
    </label>
  );
}

function TextArea({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <textarea {...props} rows={4} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
    </label>
  );
}
