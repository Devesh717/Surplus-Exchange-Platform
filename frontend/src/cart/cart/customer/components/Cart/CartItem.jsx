import React, { useEffect, useState } from "react";
import {
  ImageOff,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { mediaApi } from "../../../../../product/media/mediaApi";

function formatINR(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}

export default function CartItem({
  item,
  busy,
  onUpdate,
  onRemove,
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(true);
  const [imageFailed, setImageFailed] = useState(false);

  const quantity = Number(item?.quantity || 1);
  const subtotal = Number(item?.subtotal || 0);

  useEffect(() => {
    let cancelled = false;

    async function loadImage() {
      console.log(
        "[CART ITEM] Loading product image:",
        item?.productId
      );

      setImageLoading(true);
      setImageFailed(false);
      setImageUrl("");

      try {
        const data = await mediaApi.getProductImages(
          item?.productId
        );

        const images = Array.isArray(data)
          ? data
          : data?.content || [];

        const primary =
          images.find((image) => image.primaryImage) ||
          images[0];

        if (!cancelled && primary?.imageUrl) {
          console.log(
            "[CART ITEM] Primary image:",
            primary.imageUrl
          );

          setImageUrl(primary.imageUrl);
        }
      } catch (error) {
        console.error(
          "[CART ITEM] Image loading failed:",
          error
        );
      } finally {
        if (!cancelled) {
          setImageLoading(false);
        }
      }
    }

    if (item?.productId) {
      loadImage();
    } else {
      setImageLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [item?.productId]);

  const decrease = () => {
    if (busy || quantity <= 1) return;
    onUpdate(quantity - 1);
  };

  const increase = () => {
    if (busy) return;
    onUpdate(quantity + 1);
  };

  return (
    <article className="flex flex-col gap-5 border-b border-slate-100 p-5 last:border-b-0 sm:flex-row sm:items-center">
      <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        {imageLoading ? (
          <div className="h-full w-full animate-pulse bg-slate-200" />
        ) : imageUrl && !imageFailed ? (
          <img
            src={imageUrl}
            alt={item?.productName || "Product"}
            className="h-full w-full object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <ImageOff className="h-8 w-8" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          Product #{item?.productId}
        </p>

        <h3 className="mt-1 truncate text-lg font-bold text-slate-900">
          {item?.productName || "Product"}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {formatINR(item?.sellingPrice)} / {item?.unit || "unit"}
        </p>
      </div>

      <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1">
        <button
          type="button"
          disabled={busy || quantity <= 1}
          onClick={decrease}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Minus className="h-4 w-4" />
        </button>

        <span className="w-10 text-center text-sm font-bold text-slate-900">
          {quantity}
        </span>

        <button
          type="button"
          disabled={busy}
          onClick={increase}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="w-32 text-right">
        <p className="text-lg font-black text-slate-900">
          {formatINR(subtotal)}
        </p>
        <p className="text-xs text-slate-400">Subtotal</p>
      </div>

      {/* <button
        type="button"
        disabled={busy}
        onClick={onRemove}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label={`Remove ${item?.productName || "item"}`}
      >
        <Trash2 className="h-5 w-5" />
      </button> */}

      <button
  type="button"
  disabled={busy}
  onClick={() => {
    console.log("================================");
    console.log("[CART ITEM] REMOVE CLICKED");
    console.log("[CART ITEM] item:", item);
    console.log("[CART ITEM] itemId:", item?.itemId);
    console.log("[CART ITEM] productId:", item?.productId);
    console.log("================================");

    onRemove();
  }}
  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
  aria-label={`Remove ${item?.productName || "item"}`}
>
  <Trash2 className="h-5 w-5" />
</button>

    </article>
  );
}
