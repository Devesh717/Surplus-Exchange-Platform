import React, { useState } from "react";
import { Bot, FileText, Lightbulb, Sparkles } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

import { useStore } from "../../../Store";
import {
  clearAiChat,
  clearAiDescription,
  clearAiError,
  clearAiRecommendation,
  generateProductDescription,
  getAiRecommendations,
  sendChatMessage,
} from "../../state/Ai/Action";

import AiModeCard from "../../components/AiModeCard";
import AiChat from "../../components/AiChat";
import AiRecommendation from "../../components/AiRecommendation";
import ProductDescriptionGenerator from "../../components/ProductDescriptionGenerator";

import Navigation from "../../../home/customer/components/Navigation/Navigation";
import Footer from "../../../home/customer/components/Footer/Footer";

const MODES = {
  chat: "chat",
  recommendations: "recommendations",
  description: "description",
};

export default function AiPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();
  const [mode, setMode] = useState(MODES.chat);

  const token = localStorage.getItem("se_token");
  const aiState = state.ai || {};

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
  <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
  <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

  <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

    {/* Back button + AI badge */}
    <div className="flex flex-col items-start gap-5">

      <button
        type="button"
        onClick={() => navigate("/products")}
        className="text-sm font-semibold text-blue-100 transition hover:text-white"
      >
        ← Back to products
      </button>

      <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
        <Sparkles className="h-4 w-4" />
        AI marketplace assistant
      </div>

    </div>

    <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
      Smarter surplus marketplace.
    </h1>

    <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-100">
      Get marketplace assistance, discover suitable products from live inventory,
      or generate a factual product description for your listing.
    </p>

  </div>
</section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {aiState.error && (
            <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              <span>{aiState.error}</span>
              <button type="button" onClick={() => dispatch(clearAiError())} className="font-bold hover:underline">Dismiss</button>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-3">
            <AiModeCard
              icon={Bot}
              title="AI assistant"
              description="Ask questions about marketplace usage and products."
              active={mode === MODES.chat}
              onClick={() => setMode(MODES.chat)}
            />
            <AiModeCard
              icon={Lightbulb}
              title="Product recommendations"
              description="Describe what you need and search marketplace inventory."
              active={mode === MODES.recommendations}
              onClick={() => setMode(MODES.recommendations)}
            />
            <AiModeCard
              icon={FileText}
              title="Product description"
              description="Generate a professional description from listing details."
              active={mode === MODES.description}
              onClick={() => setMode(MODES.description)}
            />
          </div>

          <div className="mt-8">
            {mode === MODES.chat && (
              <AiChat
                messages={aiState.chatMessages || []}
                loading={Boolean(aiState.chatLoading)}
                onSend={(message) => dispatch(sendChatMessage(message)).catch(() => {})}
                onClear={() => dispatch(clearAiChat())}
              />
            )}

            {mode === MODES.recommendations && (
              <AiRecommendation
                result={aiState.recommendation}
                loading={Boolean(aiState.recommendationLoading)}
                onSubmit={(requirement) => dispatch(getAiRecommendations(requirement)).catch(() => {})}
                onClear={() => dispatch(clearAiRecommendation())}
              />
            )}

            {mode === MODES.description && (
              <ProductDescriptionGenerator
                result={aiState.productDescription}
                loading={Boolean(aiState.descriptionLoading)}
                onSubmit={(payload) => dispatch(generateProductDescription(payload)).catch(() => {})}
                onClear={() => dispatch(clearAiDescription())}
              />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
