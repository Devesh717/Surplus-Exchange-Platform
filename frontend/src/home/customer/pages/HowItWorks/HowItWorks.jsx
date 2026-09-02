import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  Package,
  Search,
  ShieldCheck,
  ShoppingCart,
  Store,
  Truck,
  Upload,
  UserPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HowItWorksPage() {
  const navigate = useNavigate();

  const buyerSteps = [
    {
      number: "01",
      icon: Search,
      title: "Discover Products",
      description:
        "Browse surplus inventory and use search and categories to find products that match your requirements.",
    },
    {
      number: "02",
      icon: Heart,
      title: "Save Your Favorites",
      description:
        "Add products you're interested in to your wishlist so you can easily find them again later.",
    },
    {
      number: "03",
      icon: ShoppingCart,
      title: "Add to Cart",
      description:
        "Choose the quantity you need and add available products to your shopping cart.",
    },
    {
      number: "04",
      icon: CheckCircle2,
      title: "Place Your Order",
      description:
        "Review your order, complete checkout, and securely place your purchase.",
    },
  ];

  const sellerSteps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Create Your Account",
      description:
        "Register on Surplus Exchange and complete the seller application process.",
    },
    {
      number: "02",
      icon: ShieldCheck,
      title: "Get Verified",
      description:
        "Your seller application is reviewed before you can start listing surplus inventory.",
    },
    {
      number: "03",
      icon: Upload,
      title: "List Your Inventory",
      description:
        "Add product details, pricing, quantity, condition, category, and images.",
    },
    {
      number: "04",
      icon: Store,
      title: "Reach Buyers",
      description:
        "Once your products are approved, they become available to buyers across the marketplace.",
    },
  ];

  return (
    <main className="bg-white text-slate-900">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-semibold text-blue-700 shadow-sm">
            <Package size={14} />
            Simple. Transparent. Valuable.
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            How Surplus Exchange
            <span className="block text-blue-600">
              works
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            A simple marketplace connecting businesses with surplus inventory,
            making it easier to discover useful products and give excess stock
            a second opportunity.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Browse Products
              <ArrowRight size={17} />
            </button>

            <button
              onClick={() => navigate("/become-seller")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              Start Selling
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* Main marketplace flow */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            The Marketplace
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            From surplus inventory to new opportunity
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Surplus Exchange brings the entire process together in one
            straightforward marketplace.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {[
            {
              icon: Store,
              title: "Businesses List",
              text: "Surplus inventory is listed with product information and pricing.",
            },
            {
              icon: Search,
              title: "Buyers Discover",
              text: "Buyers search and browse products that fit their needs.",
            },
            {
              icon: ShoppingCart,
              title: "Orders Are Placed",
              text: "Buyers select quantities and complete their purchases.",
            },
            {
              icon: Truck,
              title: "Inventory Moves",
              text: "Useful surplus inventory reaches businesses that need it.",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="relative">
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-5 text-base font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.text}
                  </p>
                </div>

                {index < 3 && (
                  <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-slate-200 bg-white p-1 text-slate-400 md:block">
                    <ArrowRight size={14} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Buyers */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

          <div className="max-w-2xl">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <ShoppingCart size={20} />
            </span>

            <p className="mt-5 text-sm font-bold uppercase tracking-widest text-blue-600">
              For Buyers
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Find surplus inventory you actually need.
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Discover products from verified sellers, save interesting items,
              and complete your purchase through a simple shopping experience.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {buyerSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                      <Icon size={20} />
                    </div>

                    <span className="text-2xl font-extrabold text-slate-100">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-5 text-base font-bold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Sellers */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

        <div className="max-w-2xl">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
            <Store size={20} />
          </span>

          <p className="mt-5 text-sm font-bold uppercase tracking-widest text-indigo-600">
            For Sellers
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Turn excess inventory into value.
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            List your surplus products, reach interested buyers, and recover
            value from inventory that is no longer needed.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sellerSteps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
                    <Icon size={20} />
                  </div>

                  <span className="text-2xl font-extrabold text-slate-100">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-5 text-base font-bold text-slate-900">
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

      {/* Trust */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <ShieldCheck size={27} />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-slate-950 sm:text-3xl">
              A marketplace built around trust
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
              Seller verification and product review help maintain a reliable
              marketplace experience, while clear product information helps
              buyers make informed decisions.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium text-slate-600">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-500" />
                Verified sellers
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-500" />
                Product verification
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-500" />
                Transparent pricing
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to make surplus work for you?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400">
            Discover useful inventory or start listing surplus products on
            Surplus Exchange.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Browse Products
              <ArrowRight size={17} />
            </button>

            <button
              onClick={() => navigate("/become-seller")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Become a Seller
              <ArrowRight size={17} />
            </button>
          </div>

        </div>
      </section>

    </main>
  );
}