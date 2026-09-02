import React from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Leaf,
  Package,
  RefreshCw,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const values = [
  {
    icon: RefreshCw,
    title: "Reduce Waste",
    description:
      "We help businesses give surplus inventory a second opportunity instead of letting usable products go to waste.",
  },
  {
    icon: BadgeCheck,
    title: "Build Trust",
    description:
      "Product verification and structured marketplace workflows help create a more reliable buying and selling experience.",
  },
  {
    icon: Users,
    title: "Connect Businesses",
    description:
      "We bring sellers with surplus inventory together with buyers looking for useful products at better prices.",
  },
  {
    icon: Leaf,
    title: "Support Reuse",
    description:
      "Keeping products in circulation can create value while encouraging more responsible use of existing resources.",
  },
];

const stats = [
  {
    value: "01",
    title: "List",
    description: "Businesses list surplus inventory.",
  },
  {
    value: "02",
    title: "Discover",
    description: "Buyers find products that match their needs.",
  },
  {
    value: "03",
    title: "Connect",
    description: "Orders connect available inventory with demand.",
  },
  {
    value: "04",
    title: "Reuse",
    description: "Products get another opportunity instead of sitting unused.",
  },
];

export default function AboutSurplusExchangePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-indigo-100 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              About Surplus Exchange
            </span>

            <h1 className="mt-7 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Giving surplus inventory
              <span className="block text-blue-600">
                a second opportunity.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Surplus Exchange is a marketplace designed to connect businesses
              with buyers looking for useful inventory at better prices. We
              make it easier to discover, exchange, and reuse products that
              might otherwise remain unused.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/products")}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Explore Marketplace
                <ArrowRight size={17} />
              </button>

              <button
                onClick={() => navigate("/how-it-works")}
                className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Our Mission
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Turn unused inventory into new opportunities.
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-600">
              Businesses can often have products that are still useful but no
              longer fit their immediate needs. At the same time, other buyers
              may be actively searching for those same products.
            </p>

            <p className="mt-4 text-base leading-8 text-slate-600">
              Surplus Exchange brings these two sides together through a
              dedicated marketplace where businesses can list surplus
              inventory and buyers can discover products at accessible prices.
            </p>
          </div>

          {/* Visual card */}
          <div className="relative">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <Building2 className="text-blue-600" size={28} />
                  <p className="mt-5 text-lg font-bold text-slate-900">
                    Businesses
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    List inventory they no longer need.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <Package className="text-indigo-600" size={28} />
                  <p className="mt-5 text-lg font-bold text-slate-900">
                    Products
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Useful inventory stays in circulation.
                  </p>
                </div>

                <div className="col-span-2 rounded-2xl bg-slate-900 p-6 text-white">
                  <div className="flex items-center gap-3">
                    <RefreshCw size={24} />
                    <span className="text-lg font-bold">
                      Surplus → Opportunity
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Connecting existing supply with new demand.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Stand For */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
              What We Stand For
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              A marketplace built around reuse and value.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-600">
              Our platform focuses on making surplus inventory easier to
              discover, exchange, and put to good use.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Marketplace Flow */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
              The Marketplace
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Simple for sellers.
              <span className="block">Useful for buyers.</span>
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              Surplus Exchange creates a straightforward path from unused
              inventory to a buyer who can put it to use.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((item) => (
              <div
                key={item.value}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="text-sm font-bold text-blue-600">
                  {item.value}
                </span>

                <h3 className="mt-3 text-xl font-bold">{item.title}</h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <ShieldCheck size={25} />
              </div>

              <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
                Built with trust in mind.
              </h2>

              <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
                A marketplace works best when buyers and sellers can
                confidently interact with each other. Surplus Exchange uses
                structured account, seller, product, and verification
                workflows to support a dependable marketplace experience.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <BadgeCheck className="mt-1 shrink-0" size={21} />
                  <div>
                    <h3 className="font-semibold">
                      Verified marketplace inventory
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      Products can go through a verification process before
                      becoming available on the marketplace.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <ShieldCheck className="mt-1 shrink-0" size={21} />
                  <div>
                    <h3 className="font-semibold">
                      Structured user accounts
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      Account and authentication workflows help protect the
                      marketplace experience.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Users className="mt-1 shrink-0" size={21} />
                  <div>
                    <h3 className="font-semibold">
                      Buyers and sellers together
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      The platform brings both sides of the marketplace into
                      one place.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center sm:px-8 lg:px-10 lg:py-24">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to discover what's available?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
          Explore surplus products or learn how your business can start
          participating in the marketplace.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/products")}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Browse Products
            <ArrowRight size={17} />
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="rounded-xl border border-slate-300 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}