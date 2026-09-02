import React, { useEffect, useState } from "react";
import { ArrowRight, Image as ImageIcon, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {mediaApi} from "../../../../../product/media/mediaApi";

export default function FeaturedProductCard({ product }) {
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);

  const productId = product?.id;

  const productName =
    product?.name ||
    product?.productName ||
    "Unnamed product";

  const category =
    product?.category?.name ||
    product?.categoryName ||
    product?.category ||
    "Other";

  const sellingPrice =
    product?.sellingPrice ??
    product?.price ??
    null;

  const originalPrice =
    product?.originalPrice ??
    null;

  const condition =
    product?.condition || "USED";

  const unit =
    product?.unit || "";

  /*
   * =====================================================
   * LOAD PRODUCT IMAGE
   * =====================================================
   */

  useEffect(() => {
    let mounted = true;

    const loadImage = async () => {
      if (!productId) {
        setImageLoading(false);
        return;
      }

      try {
        setImageLoading(true);

        const data =
          await mediaApi.getProductImages(productId);

        if (!mounted) return;

        const images = Array.isArray(data)
          ? data
          : Array.isArray(data?.images)
          ? data.images
          : Array.isArray(data?.content)
          ? data.content
          : [];

        if (images.length > 0) {
          const primaryImage =
            images.find(
              (image) =>
                image.primaryImage === true ||
                image.isPrimary === true
            ) || images[0];

          const url =
            primaryImage?.imageUrl ||
            primaryImage?.url ||
            primaryImage?.secureUrl ||
            primaryImage?.image;

          setImageUrl(url || null);
        } else {
          setImageUrl(null);
        }
      } catch (error) {
        console.error(
          "Failed to load featured product image:",
          error
        );

        if (mounted) {
          setImageUrl(null);
        }
      } finally {
        if (mounted) {
          setImageLoading(false);
        }
      }
    };

    loadImage();

    return () => {
      mounted = false;
    };
  }, [productId]);

  /*
   * =====================================================
   * CARD CLICK
   * =====================================================
   */

  const handleClick = () => {
    if (productId) {
      navigate(`/products/${productId}`);
    }
  };

  return (
    <article
      onClick={handleClick}
      className="group cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >

      {/* =================================================
          IMAGE
      ================================================= */}

      <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-brand-50 to-brand-100">

        {imageLoading ? (
          <Loader2
            size={24}
            className="animate-spin text-brand-500"
          />
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt={productName}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            onError={() => setImageUrl(null)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-300">
            <ImageIcon size={40} />

            <span className="mt-2 text-xs text-gray-400">
              No image available
            </span>
          </div>
        )}

        {/* CONDITION */}

        <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-1 text-[11px] font-medium uppercase text-gray-600 shadow-sm">
          {condition}
        </span>

      </div>

      {/* =================================================
          PRODUCT DETAILS
      ================================================= */}

      <div className="p-4">

        {/* CATEGORY */}

        <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">
          {category}
        </p>

        {/* NAME */}

        <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-gray-900">
          {productName}
        </h3>

        {/* PRICE */}

        <div className="mt-4 flex items-end justify-between">

          <div>

            {sellingPrice !== null ? (
              <div className="flex items-center gap-2">

                <p className="text-base font-semibold text-gray-900">
                  ₹{Number(sellingPrice).toLocaleString("en-IN")}
                </p>

                {originalPrice !== null &&
                  Number(originalPrice) >
                    Number(sellingPrice) && (
                    <span className="text-xs text-gray-400 line-through">
                      ₹
                      {Number(originalPrice).toLocaleString("en-IN")}
                    </span>
                  )}

              </div>
            ) : (
              <p className="text-sm text-gray-400">
                Price not available
              </p>
            )}

            {unit && (
              <span className="text-xs font-normal text-gray-400">
                /{unit}
              </span>
            )}

          </div>

          {/* ARROW */}

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-500 transition group-hover:bg-brand-50 group-hover:text-brand-700">
            <ArrowRight size={15} />
          </div>

        </div>

      </div>

    </article>
  );
}