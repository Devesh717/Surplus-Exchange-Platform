import React, { useState } from "react";
import { Bot, Loader2, Send, User } from "lucide-react";

export default function AiChat({ messages, loading, onSend, onClear }) {
  const [message, setMessage] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    const value = message.trim();
    if (!value || loading) return;

    setMessage("");
    await onSend(value);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <div>
          <h2 className="text-lg font-black text-slate-900">AI customer assistant</h2>
          <p className="mt-1 text-sm text-slate-500">Ask about products, orders, payments, listings, or general marketplace usage.</p>
        </div>
        <button type="button" onClick={onClear} className="text-sm font-bold text-slate-500 hover:text-slate-900">
          Clear
        </button>
      </div>

      <div className="min-h-[360px] max-h-[520px] space-y-4 overflow-y-auto bg-slate-50 p-5">
        {!messages.length && (
          <div className="flex min-h-[300px] items-center justify-center text-center">
            <div className="max-w-md">
              <Bot className="mx-auto h-10 w-10 text-blue-600" />
              <h3 className="mt-4 text-xl font-black text-slate-900">How can I help?</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">Try asking: “Find electronics suitable for a small business under ₹20,000.”</p>
            </div>
          </div>
        )}

        {messages.map((item, index) => (
          <div key={`${item.role}-${index}`} className={`flex gap-3 ${item.role === "user" ? "justify-end" : "justify-start"}`}>
            {item.role !== "user" && (
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                <Bot className="h-4 w-4" />
              </div>
            )}
            <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${item.role === "user" ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-700"}`}>
              {item.content}
            </div>
            {item.role === "user" && (
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <Bot className="h-4 w-4 text-blue-600" />
            <Loader2 className="h-4 w-4 animate-spin" />
            AI is thinking...
          </div>
        )}
      </div>

      <form onSubmit={submit} className="flex gap-3 border-t border-slate-100 p-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={2000}
          placeholder="Ask the AI assistant..."
          className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
        <button type="submit" disabled={loading || !message.trim()} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">
          <Send className="h-4 w-4" />
          Send
        </button>
      </form>
    </div>
  );
}
