import React, { useState } from "react";
import { ChevronDown, MessageCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const faqSections = [
  {
    title: "Getting Started",
    items: [
      {
        question: "How do I create an account?",
        answer:
          "Click Sign Up and create your account using your name, email address, and password. You may need to verify your email before using certain features.",
      },
      {
        question: "How do I browse products?",
        answer:
          "Go to the Products section to explore available surplus inventory. You can open any product to view its details, pricing, quantity, condition, and other information.",
      },
      {
        question: "How do I place an order?",
        answer:
          "Open a product, select the required quantity, add it to your cart, and proceed through checkout to place your order.",
      },
    ],
  },
  {
    title: "Orders & Payments",
    items: [
      {
        question: "How can I check my orders?",
        answer:
          "Open the Orders section from your account to view your previous and current orders.",
      },
      {
        question: "What happens after I place an order?",
        answer:
          "Your order is created and can be tracked from the Orders section. The seller can then process the order according to the platform workflow.",
      },
      {
        question: "What if I have an issue with my order?",
        answer:
          "If you need assistance with an order, contact our support team with your order details so we can help you.",
      },
    ],
  },
  {
    title: "Wishlist",
    items: [
      {
        question: "How do I add a product to my Wishlist?",
        answer:
          "Click the heart icon on a product card or product details page to save the product to your Wishlist.",
      },
      {
        question: "How do I remove a product from my Wishlist?",
        answer:
          "Open your Wishlist and click the heart icon on the saved product to remove it.",
      },
    ],
  },
  {
    title: "Selling on Surplus Exchange",
    items: [
      {
        question: "How do I become a seller?",
        answer:
          "Use the Become a Seller option to submit your seller application. Once your application is reviewed and approved, you can start listing inventory.",
      },
      {
        question: "How do I list surplus inventory?",
        answer:
          "After becoming a seller, use the seller dashboard to create a product listing with its details, pricing, quantity, condition, category, and images.",
      },
      {
        question: "Why does my product need verification?",
        answer:
          "Product verification helps maintain the quality and trustworthiness of inventory available on the marketplace.",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        question: "Why do I need to verify my email?",
        answer:
          "Email verification helps secure your account and confirms that you have access to the email address associated with it.",
      },
      {
        question: "How can I change my password?",
        answer:
          "Use the Change Password option available in your account area to update your password.",
      },
    ],
  },
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="text-sm font-semibold text-slate-900 sm:text-base">
          {question}
        </span>

        <ChevronDown
          size={19}
          className={`shrink-0 text-slate-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="pb-5 pr-8 text-sm leading-7 text-slate-600">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function HelpCentrePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const normalizedSearch = search.trim().toLowerCase();

  const filteredSections = faqSections
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          !normalizedSearch ||
          item.question.toLowerCase().includes(normalizedSearch) ||
          item.answer.toLowerCase().includes(normalizedSearch)
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              Help Centre
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              How can we help?
            </h1>

            <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
              Find answers to common questions about buying, selling,
              orders, accounts, and using Surplus Exchange.
            </p>

            {/* Search */}
            <div className="relative mx-auto mt-8 max-w-2xl">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for help..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <main className="mx-auto max-w-5xl px-6 py-14 sm:px-8 lg:px-10">
        {filteredSections.length > 0 ? (
          <div className="space-y-8">
            {filteredSections.map((section) => (
              <section
                key={section.title}
                className="rounded-2xl border border-slate-200 bg-white px-6 shadow-sm sm:px-8"
              >
                <h2 className="pt-7 text-xl font-bold text-slate-900">
                  {section.title}
                </h2>

                <div className="mt-3">
                  {section.items.map((item) => (
                    <FAQItem
                      key={item.question}
                      question={item.question}
                      answer={item.answer}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              No results found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try searching with a different keyword.
            </p>
          </div>
        )}

        {/* Contact CTA */}
        <section className="mt-12 rounded-3xl bg-slate-900 px-6 py-10 text-center text-white sm:px-10">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
            <MessageCircle size={22} />
          </div>

          <h2 className="mt-5 text-2xl font-bold">
            Still need help?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300">
            Can't find the answer you're looking for? Our support team is
            here to help.
          </p>

          <button
            onClick={() => navigate("/contact")}
            className="mt-7 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Contact Us
          </button>
        </section>
      </main>
    </div>
  );
}