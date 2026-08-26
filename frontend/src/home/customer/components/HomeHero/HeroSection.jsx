import React from 'react';
import { ArrowRight, CheckCircle2, Package, Store, Sparkles, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();
  const authenticated = Boolean(localStorage.getItem('se_token'));

  const categories = [
    ['Industrial stock', 'Ready inventory', '01'],
    ['Packaging materials', 'Bulk availability', '02'],
    ['Office equipment', 'Pre-owned', '03'],
    ['Raw materials', 'Competitive pricing', '04'],
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Business surplus marketplace
          </div>

          <h1 className="max-w-2xl text-4xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Turn surplus inventory into{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              business value.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Discover quality surplus products from verified businesses, buy at better prices, and help inventory find its next useful destination.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Explore products <ArrowRight size={16} />
            </button>

            <button
              onClick={() => navigate('/ai')}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Ask AI <Sparkles className="h-4 w-4" />
            </button>

            {!authenticated && (
              <button
                onClick={() => navigate('/register')}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
              >
                Create free account
              </button>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
            {['Transparent pricing', 'Verified sellers', 'Business-focused marketplace'].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-blue-600" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-800 p-6 shadow-2xl shadow-blue-900/25 sm:p-8">
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-indigo-400/20 blur-3xl" />

            <div className="relative flex items-center justify-between border-b border-white/15 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-cyan-300" />
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Marketplace</p>
                </div>
                <p className="mt-2 text-2xl font-bold text-white">Surplus, put to work.</p>
                <p className="mt-1 text-sm text-blue-100/70">Find useful inventory at better value.</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-3 text-white shadow-lg backdrop-blur">
                <Store size={23} />
              </div>
            </div>

            <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
              {categories.map(([title, subtitle, number]) => (
                <div
                  key={title}
                  className="group rounded-2xl border border-white/10 bg-white/[0.09] p-4 shadow-lg backdrop-blur-sm transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.14]"
                >
                  <div className="flex items-start justify-between">
                    <div className="rounded-xl bg-white/10 p-2 text-cyan-300">
                      <Package size={18} />
                    </div>
                    <span className="text-xs font-semibold text-white/35">{number}</span>
                  </div>
                  <p className="mt-5 text-sm font-bold text-white">{title}</p>
                  <p className="mt-1 text-xs text-blue-100/65">{subtitle}</p>
                </div>
              ))}
            </div>

            <div className="relative mt-5 flex items-center justify-between rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <TrendingUp size={17} className="text-emerald-300" />
                <span className="text-xs font-medium text-emerald-100">Better value. Less waste. More business.</span>
              </div>
              <span className="hidden text-xs font-bold text-emerald-300 sm:block">EXPLORE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
