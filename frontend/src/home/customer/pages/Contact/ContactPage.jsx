import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ContactPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Connect this to your backend contact API later.
    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="bg-white text-slate-900">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-semibold text-blue-700 shadow-sm">
              <MessageCircle size={14} />
              We're here to help
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              Get in touch with
              <span className="block text-blue-600">
                Surplus Exchange
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Have a question about a product, order, seller account, or the
              marketplace? Send us a message and our team will get back to you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">

          {/* Contact information */}
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Contact Information
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              We'd love to hear from you.
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              Whether you need help with your account or simply want to learn
              more about Surplus Exchange, we're happy to help.
            </p>

            <div className="mt-8 space-y-4">

              {/* Email */}
              <a
                href="mailto:support@surplusexchange.com"
                className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Mail size={20} />
                </span>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Email us
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    support@surplusexchange.com
                  </p>

                  <p className="mt-2 text-xs font-medium text-blue-600 opacity-0 transition group-hover:opacity-100">
                    Send an email →
                  </p>
                </div>
              </a>

              {/* Response */}
              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Clock3 size={20} />
                </span>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Response time
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    We aim to respond within 1–2 business days.
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <MapPin size={20} />
                </span>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Surplus Exchange
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Connecting businesses through a smarter surplus
                    marketplace.
                  </p>
                </div>
              </div>

            </div>

            {/* Trust card */}
            <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Your information is safe
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    We only use the information you provide to respond to your
                    enquiry.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 sm:p-8">

            {submitted ? (
              <div className="flex min-h-[480px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={32} />
                </div>

                <h2 className="mt-5 text-2xl font-bold text-slate-900">
                  Message received!
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                  Thank you for contacting Surplus Exchange. Our team will
                  review your message and get back to you soon.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-7 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                    Send a Message
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-950">
                    How can we help?
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Fill out the form below and we'll get back to you.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-5"
                >

                  {/* Name + Email */}
                  <div className="grid gap-5 sm:grid-cols-2">

                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Email
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                      />
                    </div>

                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Subject
                    </label>

                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    >
                      <option value="" disabled>
                        Select a topic
                      </option>
                      <option value="product">
                        Product enquiry
                      </option>
                      <option value="order">
                        Order support
                      </option>
                      <option value="seller">
                        Seller support
                      </option>
                      <option value="account">
                        Account help
                      </option>
                      <option value="other">
                        Other
                      </option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      required
                      rows={6}
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                  >
                    Send Message
                    <Send size={16} />
                  </button>

                  <p className="text-center text-xs leading-5 text-slate-400">
                    By submitting this form, you agree to be contacted about
                    your enquiry.
                  </p>
                </form>
              </>
            )}

          </div>
        </div>
      </section>

      {/* FAQ / Quick help */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                Need something else?
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-950">
                Explore Surplus Exchange
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Learn more about the marketplace or start discovering products.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate("/how-it-works")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                How It Works
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => navigate("/products")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Browse Products
                <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}