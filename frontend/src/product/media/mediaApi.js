import axios from "axios";
import API_BASE_URL from "../../admin/config/apiConfig";

const MEDIA_URL = `${API_BASE_URL}/media`;

function authConfig() {
  const token = localStorage.getItem("se_token");

  return token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};
}

export const mediaApi = {

  // =====================================================
  // GET PRODUCT IMAGES
  // =====================================================

  async getProductImages(productId) {
    console.log(
      "[MEDIA API] Getting images for product:",
      productId
    );

    const response = await axios.get(
      `${MEDIA_URL}/${productId}/images`
    );

    console.log(
      "[MEDIA API] Product images response:",
      response.data
    );

    return response.data;
  },

  // Backward-compatible alias used by older components.
  async getImages(productId) {
    console.log(
      "[MEDIA API] getImages alias -> getProductImages:",
      productId
    );

    return this.getProductImages(productId);
  },

  // =====================================================
  // UPLOAD PRODUCT IMAGE
  // =====================================================

  async uploadProductImage(
    productId,
    file,
    primaryImage = false
  ) {
    console.log(
      "[MEDIA API] Uploading image",
      {
        productId,
        fileName: file?.name,
        fileType: file?.type,
        fileSize: file?.size,
        primaryImage,
      }
    );

    const formData = new FormData();

    formData.append("file", file);
    formData.append(
      "primaryImage",
      primaryImage
    );

    const response = await axios.post(
      `${MEDIA_URL}/${productId}/images`,
      formData,
      {
        ...authConfig(),
        headers: {
          ...(authConfig().headers || {}),
        },
      }
    );

    console.log(
      "[MEDIA API] Upload response:",
      response.data
    );

    return response.data;
  },

  // =====================================================
  // DELETE PRODUCT IMAGE
  // =====================================================

  async deleteProductImage(
    productId,
    imageId
  ) {
    console.log(
      "[MEDIA API] Deleting image:",
      {
        productId,
        imageId,
      }
    );

    const response = await axios.delete(
      `${MEDIA_URL}/${productId}/images/${imageId}`,
      authConfig()
    );

    console.log(
      "[MEDIA API] Delete response:",
      response.data
    );

    return response.data;
  },

  // =====================================================
  // SET PRIMARY IMAGE
  // =====================================================

  async setPrimaryImage(
    productId,
    imageId
  ) {
    console.log(
      "[MEDIA API] Setting primary image:",
      {
        productId,
        imageId,
      }
    );

    const response = await axios.put(
      `${MEDIA_URL}/${productId}/images/${imageId}/primary`,
      {},
      authConfig()
    );

    console.log(
      "[MEDIA API] Set primary response:",
      response.data
    );

    return response.data;
  },
};