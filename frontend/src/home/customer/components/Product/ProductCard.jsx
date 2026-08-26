import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <article className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex h-32 items-end bg-gradient-to-br from-brand-50 to-brand-100 p-3">
        <span className="rounded-md bg-white/90 px-2 py-1 text-[11px] font-medium text-gray-600">{product.condition}</span>
      </div>
      <div className="p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">{product.category}</p>
        <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-1 text-xs text-gray-400">{product.seller}</p>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-base font-semibold text-gray-900">{product.price}<span className="text-xs font-normal text-gray-400">/{product.unit}</span></p>
          </div>
          <button onClick={() => navigate('/products')} className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-500 transition group-hover:bg-brand-50 group-hover:text-brand-700" aria-label={`Explore ${product.name}`}>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
