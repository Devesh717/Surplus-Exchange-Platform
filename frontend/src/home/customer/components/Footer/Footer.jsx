import React from "react";
import { ArrowUpRight, Mail, MessageCircle, Info, HelpCircle, Zap, Package, ArrowLeftRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">

        {/* Brand */}
        <div className="md:col-span-2">
          <button
  onClick={() => navigate("/")}
  className="flex shrink-0 items-center gap-2.5 text-sm font-bold text-gray-900"
>
  <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-600/25">
    <Package size={17} strokeWidth={2.2} />

    <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
      <ArrowLeftRight size={10} strokeWidth={3} />
    </span>
  </span>

  <span className="hidden text-[15px] font-bold tracking-tight sm:block">
    surplus<span className="text-blue-600">exchange</span>
  </span>
</button>

          <p className="mt-4 max-w-md text-sm leading-6 text-gray-500">
            A business marketplace for buying and selling surplus inventory
            with better visibility, pricing, and reuse.
          </p>

          <a
            href="mailto:support@surplusexchange.com"
            className="mt-4 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-blue-600"
          >
            <Mail size={15} />
            support@surplusexchange.com
          </a>
        </div>

        {/* Company */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Company
          </p>

          <div className="mt-4 grid gap-3 text-sm text-gray-500">
            <button
  onClick={() => navigate("/about")}
  className="flex items-center gap-1 text-left transition hover:text-gray-900"
>
  About Us
  <ArrowUpRight size={13} />
</button>

            <button
              onClick={() => navigate("/how-it-works")}
              className="flex items-center gap-1 text-left transition hover:text-gray-900"
            >
              How It Works
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>

        {/* Support */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Support
          </p>

          <div className="mt-4 grid gap-3 text-sm text-gray-500">
            <button
              onClick={() => navigate("/contact")}
              className="flex items-center gap-2 text-left transition hover:text-gray-900"
            >
              <MessageCircle size={15} />
              Contact Us
            </button>

            <button
              onClick={() => navigate("/help-centre")}
              className="flex items-center gap-2 text-left transition hover:text-gray-900"
            >
              <HelpCircle size={15} />
              Help Center
            </button>

            <button
              onClick={() => navigate("/about")}
              className="flex items-center gap-2 text-left transition hover:text-gray-900"
            >
              <Info size={15} />
              About Surplus Exchange
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-100 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 text-xs text-gray-400 sm:flex-row">
          <span>
            © {new Date().getFullYear()} Surplus Exchange. All rights reserved.
          </span>

          <span>
            Built for smarter inventory reuse.
          </span>
        </div>
      </div>
    </footer>
  );
}