import React, { useEffect, useState } from "react";
import { ImageOff, Loader2, Package } from "lucide-react";
import { mediaApi } from "../../../media/mediaApi";

export default function ProductImages({
  productId,
  productName = "Product",
  className = "",
  showGallery = false,
}) {
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoadError, setImageLoadError] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadImages() {
      console.log("========================================");
      console.log("[PRODUCT IMAGES] LOAD");
      console.log("[PRODUCT IMAGES] Product ID:", productId);
      console.log("========================================");

      if (!productId) {
        console.warn("[PRODUCT IMAGES] Missing product ID");
        if (mounted) {
          setImages([]);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setError(null);
      setImageLoadError(false);

      try {
        const data = await mediaApi.getProductImages(productId);

        console.log("[PRODUCT IMAGES] API response:", data);
        console.log(
          "[PRODUCT IMAGES] Is array:",
          Array.isArray(data)
        );

        if (!mounted) return;

        const productImages = Array.isArray(data)
          ? data
          : data?.images || data?.content || [];

        const sorted = [...productImages].sort(
          (a, b) => Number(b.primaryImage) - Number(a.primaryImage)
        );

        console.log(
          "[PRODUCT IMAGES] Normalized images:",
          sorted
        );
        console.log(
          "[PRODUCT IMAGES] Image count:",
          sorted.length
        );

        sorted.forEach((image, index) => {
          console.log(`[PRODUCT IMAGES] Image ${index}:`, {
            id: image?.id,
            productId: image?.productId,
            imageUrl: image?.imageUrl,
            primaryImage: image?.primaryImage,
          });
        });

        setImages(sorted);
        setSelectedIndex(0);
      } catch (err) {
        if (!mounted) return;

        console.error(
          "[PRODUCT IMAGES] Failed to load product images:",
          err
        );
        console.error(
          "[PRODUCT IMAGES] HTTP status:",
          err.response?.status
        );
        console.error(
          "[PRODUCT IMAGES] HTTP response:",
          err.response?.data
        );

        setImages([]);
        setError("Unable to load product images.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadImages();

    return () => {
      mounted = false;
    };
  }, [productId]);

  const selectedImage = images[selectedIndex];

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-100 ${className}`}
      >
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !images.length || !selectedImage?.imageUrl) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 ${className}`}
      >
        {error ? (
          <ImageOff className="h-16 w-16 text-slate-400" />
        ) : (
          <Package className="h-16 w-16 text-blue-600/60" />
        )}
      </div>
    );
  }

  if (!showGallery) {
    return (
      <img
        src={selectedImage.imageUrl}
        alt={productName}
        className={`h-full w-full object-cover ${className}`}
        onLoad={() => {
          console.log(
            "[PRODUCT IMAGES] IMAGE LOADED:",
            selectedImage.imageUrl
          );
        }}
        onError={(event) => {
          console.error(
            "[PRODUCT IMAGES] IMAGE FAILED TO LOAD:",
            selectedImage.imageUrl
          );
          setImageLoadError(true);
          event.currentTarget.style.display = "none";
        }}
      />
    );
  }

  return (
    <div className={`bg-white ${className}`}>
      <div className="flex min-h-[420px] items-center justify-center overflow-hidden bg-slate-100">
        {!imageLoadError ? (
          <img
            src={selectedImage.imageUrl}
            alt={productName}
            className="max-h-[520px] w-full object-contain"
            onLoad={() => {
              console.log(
                "[PRODUCT IMAGES] GALLERY IMAGE LOADED:",
                selectedImage.imageUrl
              );
              setImageLoadError(false);
            }}
            onError={() => {
              console.error(
                "[PRODUCT IMAGES] GALLERY IMAGE FAILED:",
                selectedImage.imageUrl
              );
              setImageLoadError(true);
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400">
            <ImageOff className="h-16 w-16" />
            <p className="mt-3 text-sm">Image unavailable</p>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto border-t border-slate-100 p-4">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => {
                console.log(
                  "[PRODUCT IMAGES] Thumbnail selected:",
                  index,
                  image.imageUrl
                );
                setImageLoadError(false);
                setSelectedIndex(index);
              }}
              className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 ${
                selectedIndex === index
                  ? "border-blue-600"
                  : "border-slate-200"
              }`}
            >
              <img
                src={image.imageUrl}
                alt={`${productName} ${index + 1}`}
                className="h-full w-full object-cover"
                onError={() =>
                  console.error(
                    "[PRODUCT IMAGES] Thumbnail failed:",
                    image.imageUrl
                  )
                }
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
