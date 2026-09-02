import React, { useEffect, useState } from "react";
import {
  Heart,
  Image as ImageIcon,
  Loader2,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { mediaApi } from "../../../product/media/mediaApi";

export default function WishlistItemCard({
  item,
  onRemove,
  removing,
}) {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadImage = async () => {
      setImageLoading(true);

      try {
        const data = await mediaApi.getProductImages(item.productId);

        const images = Array.isArray(data)
          ? data
          : data?.images || data?.content || [];

        const sorted = [...images].sort(
          (a, b) =>
            Number(Boolean(b?.primaryImage ?? b?.isPrimary)) -
            Number(Boolean(a?.primaryImage ?? a?.isPrimary))
        );

        const first = sorted[0];

        const url =
          first?.secureUrl ||
          first?.url ||
          first?.imageUrl ||
          first?.image ||
          "";

        if (!cancelled) {
          setImageUrl(url);
        }
      } catch (_) {
        if (!cancelled) {
          setImageUrl("");
        }
      } finally {
        if (!cancelled) {
          setImageLoading(false);
        }
      }
    };

    loadImage();

    return () => {
      cancelled = true;
    };
  }, [item.productId]);

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div
        className="relative flex h-52 cursor-pointer items-center justify-center overflow-hidden bg-gray-50"
        onClick={() => navigate(`/products/${item.productId}`)}
      >
        {imageLoading ? (
          <Loader2 className="animate-spin text-gray-300" size={24} />
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt={item.productName}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-300">
            <ImageIcon size={34} />
            <span className="text-xs">No image</span>
          </div>
        )}

        <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-red-500 shadow-sm">
          <Heart size={17} fill="currentColor" />
        </div>

        {!item.available && (
          <div className="absolute inset-x-0 bottom-0 bg-gray-900/75 px-3 py-2 text-center text-xs font-semibold text-white">
            Currently unavailable
          </div>
        )}
      </div>

      <div className="p-5">
        <button
          onClick={() => navigate(`/products/${item.productId}`)}
          className="line-clamp-2 text-left text-base font-semibold text-gray-900 transition hover:text-blue-600"
        >
          {item.productName}
        </button>

        <div className="mt-3 flex items-end justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-gray-900">
              ₹{Number(item.sellingPrice || 0).toLocaleString("en-IN")}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {item.quantity ?? 0} {item.unit || "units"} available
            </p>
          </div>

          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              item.available
                ? "bg-emerald-50 text-emerald-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {item.available ? "Available" : "Unavailable"}
          </span>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            disabled={!item.available}
            onClick={() => navigate(`/products/${item.productId}`)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
          >
            <ShoppingCart size={15} />
            View Product
          </button>

          <button
            type="button"
            disabled={removing}
            onClick={() => onRemove(item.itemId)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={`Remove ${item.productName} from wishlist`}
            title="Remove from wishlist"
          >
            {removing ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
