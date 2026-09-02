import React from "react";
import { Heart, Loader2 } from "lucide-react";
import { useStore } from "../../../Store";
import { addToWishlist, getWishlist } from "../../state/Action";

export default function WishlistButton({
  productId,
  className = "",
  showLabel = false,
}) {
  const { state, dispatch } = useStore();
  const items = state.wishlist?.items || [];
  const loading = state.wishlist?.mutationLoading || false;

  const saved = items.some(
    (item) => Number(item.productId) === Number(productId)
  );

  const handleClick = async (event) => {
    event.stopPropagation();

    if (saved || loading) return;

    try {
      await dispatch(addToWishlist(productId));
    } catch (error) {
      // If the wishlist was not loaded yet, refresh it after the attempt.
      if (error?.status === 400) {
        try {
          await dispatch(getWishlist());
        } catch (_) {}
      }
    }
  };

  return (
   <button
  type="button"
  onClick={handleClick}
  disabled={saved || loading}
  aria-label={saved ? "Already in wishlist" : "Add to wishlist"}
  title={saved ? "Already in wishlist" : "Add to wishlist"}
  className={`inline-flex items-center justify-center gap-2 rounded-full border px-3 py-3 transition ${
    saved
      ? "border-red-100 bg-red-50 text-red-500"
      : "border-gray-200 bg-white text-slate-500 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
  } ${className}`}
>
  {loading ? (
    <Loader2 size={21} className="animate-spin" />
  ) : (
    <Heart
      size={100}
      strokeWidth={2}
      fill={saved ? "currentColor" : "none"}
    />
  )}

  {showLabel && (saved ? "Saved" : "Wishlist")}
</button>
  );
}
