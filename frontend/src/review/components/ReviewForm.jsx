import React, { useState } from "react";
import { Loader2, Star, X } from "lucide-react";

import { useStore, useReviewState } from "../../Store";
import { createReview } from "../../review/state/Action";

export default function ReviewForm({
  productId,
  productName,
  onClose,
  onSuccess,
}) {
  const { dispatch } = useStore();
  const reviewState = useReviewState();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (rating < 1 || rating > 5) {
      return;
    }

    if (!comment.trim()) {
      return;
    }

    try {
      const review = await dispatch(
        createReview(productId, {
          rating,
          comment: comment.trim(),
        })
      );

      onSuccess?.(review);
    } catch {
      // Error is already stored in review state.
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">

        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              Write a Review
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {productName}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {reviewState.error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {reviewState.error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6">

          <label className="text-sm font-bold text-slate-700">
            Rating
          </label>

          <div className="mt-3 flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className="rounded-lg p-1"
              >
                <Star
                  className={`h-8 w-8 ${
                    value <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-300"
                  }`}
                />
              </button>
            ))}
          </div>

          <label
            htmlFor="review-comment"
            className="mt-6 block text-sm font-bold text-slate-700"
          >
            Your review
          </label>

          <textarea
            id="review-comment"
            value={comment}
            onChange={(event) =>
              setComment(event.target.value)
            }
            maxLength={2000}
            rows={5}
            placeholder="Tell us about your experience..."
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <div className="mt-1 text-right text-xs text-slate-400">
            {comment.length}/2000
          </div>

          <button
            type="submit"
            disabled={
              reviewState.mutationLoading ||
              rating === 0 ||
              !comment.trim()
            }
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {reviewState.mutationLoading && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}

            {reviewState.mutationLoading
              ? "Submitting..."
              : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}