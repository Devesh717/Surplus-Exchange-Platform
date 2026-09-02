import React, { useEffect } from "react";
import { Loader2, Star } from "lucide-react";

import { useStore, useReviewState } from "../../Store";
import { getProductReviews } from "../../review/state/Action";

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          className={`h-4 w-4 ${
            value <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-slate-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function ReviewList({ productId }) {
  const { dispatch } = useStore();
  const reviewState = useReviewState();

  useEffect(() => {
    if (!productId) return;

    dispatch(
      getProductReviews(productId, {
        page: 0,
        size: 10,
      })
    ).catch(() => {});
  }, [dispatch, productId]);

  if (reviewState.loading) {
    return (
      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-center gap-2 py-10 text-sm font-semibold text-slate-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading reviews...
        </div>
      </section>
    );
  }

  const reviews = reviewState.reviews || [];

  const averageRating =
    reviews.length > 0
      ? reviews.reduce(
          (sum, review) =>
            sum + Number(review.rating || 0),
          0
        ) / reviews.length
      : 0;

  return (
    <section className="mt-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              Customer Reviews
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {reviews.length === 0
                ? "No reviews yet."
                : `${reviews.length} ${
                    reviews.length === 1
                      ? "review"
                      : "reviews"
                  }`}
            </p>
          </div>

          {reviews.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-slate-900">
                {averageRating.toFixed(1)}
              </span>

              <div>
                <Stars rating={Math.round(averageRating)} />

                <p className="mt-1 text-xs text-slate-500">
                  Average rating
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="mt-6 divide-y divide-slate-100">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="py-6 first:pt-0 last:pb-0"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                  <div>
                    <h3 className="font-bold text-slate-900">
                      {review.buyerName || "Anonymous"}
                    </h3>

                    <div className="mt-1">
                      <Stars
                        rating={Number(review.rating)}
                      />
                    </div>
                  </div>

                  {review.createdAt && (
                    <span className="text-xs text-slate-400">
                      {new Date(
                        review.createdAt
                      ).toLocaleDateString("en-IN", {
                        dateStyle: "medium",
                      })}
                    </span>
                  )}
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {review.comment}
                </p>

                {review.verifiedPurchase && (
                  <span className="mt-3 inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    Verified Purchase
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}