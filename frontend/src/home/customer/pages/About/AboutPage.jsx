import React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Handshake,
  Leaf,
  Package,
  RefreshCw,
  ShieldCheck,
  Store,
  TrendingDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AboutPage() {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: TrendingDown,
      title: "Better Pricing",
      description:
        "Find quality surplus inventory at competitive prices while helping sellers recover value from excess stock.",
    },
    {
      icon: RefreshCw,
      title: "Smarter Reuse",
      description:
        "Give unused and excess inventory a second opportunity instead of letting valuable products go to waste.",
    },
    {
      icon: ShieldCheck,
      title: "Trusted Marketplace",
      description:
        "A structured marketplace designed to make surplus buying and selling simpler and more transparent.",
    },
    {
      icon: Handshake,
      title: "Connect Businesses",
      description:
        "Bring buyers and sellers together so surplus inventory can reach businesses that actually need it.",
    },
  ];

  const steps = [
    {
      number: "01",
      icon: Store,
      title: "Sellers List Surplus",
      description:
        "Businesses can list excess, unused, refurbished, or surplus inventory with pricing and product details.",
    },
    {
      number: "02",
      icon: Package,
      title: "Buyers Discover",
      description:
        "Buyers can browse products, search inventory, compare prices, and save products to their wishlist.",
    },
    {
      number: "03",
      icon: Handshake,
      title: "Products Find a New Home",
      description:
        "Buyers purchase useful surplus inventory while sellers recover value from stock they no longer need.",
    },
  ];

  return (
    <main className="bg-white text-slate-900">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">
              <RefreshCw size={13} />
              Smarter surplus. Better value.
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Giving surplus inventory
              <span className="block text-blue-600">
                a second opportunity.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Surplus Exchange is a business marketplace that helps
              organizations buy and sell surplus inventory with better
              visibility, competitive pricing, and smarter reuse.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate("/products")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Browse Products
                <ArrowRight size={17} />
              </button>

              <button
                onClick={() => navigate("/how-it-works")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                How It Works
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Our Mission
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Turning excess inventory into opportunity.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-600">
              Businesses often have products that are overstocked, unused,
              refurbished, discontinued, or simply no longer required.
              Instead of allowing that inventory to lose its value, Surplus
              Exchange creates a marketplace where it can be discovered by
              buyers who need it.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Our goal is simple: make surplus inventory easier to discover,
              easier to sell, and more valuable to the businesses that can
              use it.
            </p>

            <div className="mt-7 space-y-3">
              {[
                "Make surplus inventory easier to discover",
                "Help businesses recover value from excess stock",
                "Encourage reuse instead of unnecessary waste",
                "Create a simple buying and selling experience",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-sm text-slate-600"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual card */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 shadow-xl shadow-blue-900/10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur">
                <RefreshCw size={28} />
              </div>

              <h3 className="mt-8 text-2xl font-bold text-white">
                From surplus to value.
              </h3>

              <p className="mt-4 max-w-md text-sm leading-6 text-blue-100">
                We connect businesses with opportunities to reuse inventory,
                helping products move from excess stock to businesses where
                they can create value.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <Package className="text-white" size={21} />
                  <p className="mt-3 text-sm font-semibold text-white">
                    Surplus
                  </p>
                  <p className="mt-1 text-xs text-blue-100">
                    Inventory waiting to be discovered
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <Handshake className="text-white" size={21} />
                  <p className="mt-3 text-sm font-semibold text-white">
                    Exchange
                  </p>
                  <p className="mt-1 text-xs text-blue-100">
                    Businesses finding useful inventory
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Why Surplus Exchange
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Built around better inventory decisions.
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              A marketplace designed to make surplus inventory more visible,
              accessible, and useful.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-5 text-base font-bold text-slate-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Simple Process
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            How Surplus Exchange works
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            A straightforward marketplace experience for both buyers and
            sellers.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <Icon size={22} />
                  </div>

                  <span className="text-3xl font-extrabold text-slate-100">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </section>

      {/* Sustainability */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 p-8 sm:p-10">
          <div className="grid gap-8 md:grid-cols-[auto_1fr_auto] md:items-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
              <Leaf size={27} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Reuse more. Waste less.
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                When surplus products find another buyer, businesses can
                reduce unnecessary waste while making better use of resources
                that already exist.
              </p>
            </div>

            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Start Exploring
              <ArrowRight size={16} />
            </button>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-100 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to discover surplus value?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400">
            Explore available inventory and find products that fit your
            business needs.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
          >
            Browse Products
            <ArrowRight size={17} />
          </button>

        </div>
      </section>

    </main>
  );
}