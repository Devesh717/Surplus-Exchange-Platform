import React from 'react';
import { ArrowRight, Building2, CheckCircle2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SellerCTA() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-800 px-6 py-10 shadow-2xl sm:px-10 sm:py-12">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-2 text-cyan-300">
              <Building2 size={18} />
              <span className="text-xs font-bold uppercase tracking-[0.18em]">For businesses</span>
            </div>
            <h2 className="mt-3 max-w-2xl text-2xl font-black text-white sm:text-3xl">
              Have excess inventory? Give it a buyer.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100/70">
              List surplus stock, reach relevant businesses, and recover value from inventory that is sitting idle.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-blue-100/70">
              {['Reach business buyers', 'Simple listings', 'Admin verification'].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-300" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <button
  onClick={() => navigate("/become-seller")}
  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-cyan-50"
>
  <Sparkles size={16} className="text-blue-600" />

  Become a seller

  <ArrowRight size={16} />
</button>
        </div>
      </div>
    </section>
  );
}
