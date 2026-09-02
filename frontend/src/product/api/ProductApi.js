import axios from "axios";
import API_BASE_URL from "../../admin/config/apiConfig";

const PRODUCT_URL = `${API_BASE_URL}/products`;
const CATEGORY_URL = `${API_BASE_URL}/categories`;

const DEFAULT_SORT = "id,desc";

console.log("==================================================");
console.log("[PRODUCT API] MODULE LOADED");
console.log("[PRODUCT API] API_BASE_URL:", API_BASE_URL);
console.log("[PRODUCT API] PRODUCT_URL:", PRODUCT_URL);
console.log("[PRODUCT API] CATEGORY_URL:", CATEGORY_URL);
console.log("[PRODUCT API] DEFAULT_SORT:", DEFAULT_SORT);
console.log("==================================================");

const logRequest = (method, url, config = {}) => {
  console.log("--------------------------------------------------");
  console.log(`[PRODUCT API] ${method} REQUEST`);
  console.log("[PRODUCT API] URL:", url);
  console.log("[PRODUCT API] Params:", config.params || {});
  console.log("[PRODUCT API] Headers:", config.headers || {});
  console.log("--------------------------------------------------");
};

const logSuccess = (method, response) => {
  console.log("--------------------------------------------------");
  console.log(`[PRODUCT API] ${method} SUCCESS`);
  console.log("[PRODUCT API] HTTP status:", response.status);
  console.log("[PRODUCT API] Final URL:", response.config?.url);
  console.log("[PRODUCT API] Final params:", response.config?.params);
  console.log("[PRODUCT API] Response data:", response.data);
  console.log("--------------------------------------------------");
};

const logError = (method, error) => {
  console.error("--------------------------------------------------");
  console.error(`[PRODUCT API] ${method} FAILED`);
  console.error("[PRODUCT API] Message:", error.message);
  console.error("[PRODUCT API] Request URL:", error.config?.url);
  console.error("[PRODUCT API] Request params:", error.config?.params);
  console.error("[PRODUCT API] Response status:", error.response?.status);
  console.error("[PRODUCT API] Response data:", error.response?.data);
  console.error("--------------------------------------------------");
};

export const productApi = {

  // =====================================================
  // CATEGORIES
  // =====================================================

  async getCategories() {
    const url = CATEGORY_URL;

    logRequest("GET CATEGORIES", url);

    try {
      const response = await axios.get(url);

      logSuccess("GET CATEGORIES", response);

      return response.data;
    } catch (error) {
      logError("GET CATEGORIES", error);
      throw error;
    }
  },

  // =====================================================
  // GET ALL PRODUCTS
  // =====================================================

  async getAll({
    page = 0,
    size = 12,
    sort = DEFAULT_SORT,
  } = {}) {

    console.log("[PRODUCT API] getAll() INPUT:", {
      page,
      size,
      sort,
    });

    const params = {
      page,
      size,
      sort,
    };

    logRequest(
      "GET ALL PRODUCTS",
      PRODUCT_URL,
      { params }
    );

    try {
      const response = await axios.get(
        PRODUCT_URL,
        { params }
      );

      logSuccess(
        "GET ALL PRODUCTS",
        response
      );

      return response.data;
    } catch (error) {
      logError(
        "GET ALL PRODUCTS",
        error
      );

      throw error;
    }
  },

  // =====================================================
  // GET PRODUCT BY ID
  // =====================================================

  async getById(id) {

    const url = `${PRODUCT_URL}/${id}`;

    logRequest(
      "GET PRODUCT BY ID",
      url
    );

    try {
      const response =
        await axios.get(url);

      logSuccess(
        "GET PRODUCT BY ID",
        response
      );

      return response.data;
    } catch (error) {
      logError(
        "GET PRODUCT BY ID",
        error
      );

      throw error;
    }
  },

  // =====================================================
  // GET PRODUCTS BY CATEGORY
  // =====================================================

  async getByCategory(
    categoryId,
    {
      page = 0,
      size = 12,
      sort = DEFAULT_SORT,
    } = {}
  ) {

    const url =
      `${PRODUCT_URL}/category/${categoryId}`;

    const params = {
      page,
      size,
      sort,
    };

    console.log(
      "[PRODUCT API] getByCategory() INPUT:",
      {
        categoryId,
        page,
        size,
        sort,
      }
    );

    logRequest(
      "GET PRODUCTS BY CATEGORY",
      url,
      { params }
    );

    try {
      const response =
        await axios.get(url, { params });

      logSuccess(
        "GET PRODUCTS BY CATEGORY",
        response
      );

      return response.data;
    } catch (error) {
      logError(
        "GET PRODUCTS BY CATEGORY",
        error
      );

      throw error;
    }
  },
  // =====================================================
// GET MY PRODUCT BY ID
// =====================================================

async getMyProductById(id) {

  const token =
    localStorage.getItem("se_token");

  const url =
    `${PRODUCT_URL}/seller/${id}`;

  const headers =
    token
      ? {
          Authorization:
            `Bearer ${token}`,
        }
      : {};

  console.log(
    "[PRODUCT API] getMyProductById() ID:",
    id
  );

  console.log(
    "[PRODUCT API] Token present:",
    Boolean(token)
  );

  logRequest(
    "GET MY PRODUCT BY ID",
    url,
    { headers }
  );

  try {

    const response =
      await axios.get(
        url,
        { headers }
      );

    logSuccess(
      "GET MY PRODUCT BY ID",
      response
    );

    return response.data;

  } catch (error) {

    logError(
      "GET MY PRODUCT BY ID",
      error
    );

    throw error;
  }
},

  // =====================================================
  // GET SELLER PRODUCTS
  // =====================================================

  async getMyProducts({
    page = 0,
    size = 12,
    sort = DEFAULT_SORT,
  } = {}) {

    const token =
      localStorage.getItem("se_token");

    const url =
      `${PRODUCT_URL}/seller/me`;

    const params = {
      page,
      size,
      sort,
    };

    const headers =
      token
        ? {
            Authorization:
              `Bearer ${token}`,
          }
        : {};

    console.log(
      "[PRODUCT API] getMyProducts() INPUT:",
      {
        page,
        size,
        sort,
      }
    );

    console.log(
      "[PRODUCT API] Token present:",
      Boolean(token)
    );

    logRequest(
      "GET MY PRODUCTS",
      url,
      {
        params,
        headers,
      }
    );

    try {
      const response =
        await axios.get(
          url,
          {
            params,
            headers,
          }
        );

      logSuccess(
        "GET MY PRODUCTS",
        response
      );

      return response.data;
    } catch (error) {
      logError(
        "GET MY PRODUCTS",
        error
      );

      throw error;
    }
  },

  // =====================================================
  // CREATE PRODUCT
  // =====================================================

  async create(product) {

    const token =
      localStorage.getItem("se_token");

    const headers =
      token
        ? {
            Authorization:
              `Bearer ${token}`,
          }
        : {};

    console.log(
      "[PRODUCT API] create() PRODUCT:",
      product
    );

    console.log(
      "[PRODUCT API] create() Token present:",
      Boolean(token)
    );

    logRequest(
      "CREATE PRODUCT",
      PRODUCT_URL,
      { headers }
    );

    try {
      const response =
        await axios.post(
          PRODUCT_URL,
          product,
          { headers }
        );

      logSuccess(
        "CREATE PRODUCT",
        response
      );

      return response.data;
    } catch (error) {
      logError(
        "CREATE PRODUCT",
        error
      );

      throw error;
    }
  },

  // =====================================================
  // UPLOAD PRODUCT IMAGES
  // =====================================================

  async uploadImages(productId, images) {
  const token =
    localStorage.getItem("se_token");

  if (!productId) {
    throw new Error(
      "Product ID is required for image upload."
    );
  }

  if (
    !images ||
    images.length === 0
  ) {
    console.log(
      "[PRODUCT API] No images to upload."
    );

    return [];
  }

  const url =
    `${API_BASE_URL}/media/${productId}/images`;

  console.log(
    "=========================================="
  );

  console.log(
    "[PRODUCT API] UPLOADING PRODUCT IMAGES"
  );

  console.log(
    "[PRODUCT API] URL:",
    url
  );

  console.log(
    "[PRODUCT API] PRODUCT ID:",
    productId
  );

  console.log(
    "[PRODUCT API] IMAGE COUNT:",
    images.length
  );

  console.log(
    "[PRODUCT API] TOKEN PRESENT:",
    Boolean(token)
  );

  console.log(
    "=========================================="
  );

  const uploadedImages = [];

  try {

    // =================================================
    // BACKEND ACCEPTS ONE FILE PER REQUEST
    // =================================================

    for (
      let i = 0;
      i < images.length;
      i++
    ) {

      const image = images[i];

      const formData =
        new FormData();

      // IMPORTANT:
      // Backend expects "file", NOT "images"
      formData.append(
        "file",
        image
      );

      // First image becomes primary
      const primaryImage =
        i === 0;

      formData.append(
        "primaryImage",
        primaryImage
      );

      console.log(
        `[PRODUCT API] Uploading image ${i + 1}/${images.length}`
      );

      console.log(
        "[PRODUCT API] File:",
        image.name
      );

      console.log(
        "[PRODUCT API] Size:",
        image.size
      );

      console.log(
        "[PRODUCT API] Primary:",
        primaryImage
      );

      const response =
        await axios.post(
          url,
          formData,
          {
            headers: {
              ...(token
                ? {
                    Authorization:
                      `Bearer ${token}`,
                  }
                : {}),
            },
          }
        );

      console.log(
        `[PRODUCT API] IMAGE ${i + 1} UPLOAD SUCCESS`,
        response.data
      );

      uploadedImages.push(
        response.data
      );
    }

    console.log(
      "=========================================="
    );

    console.log(
      "[PRODUCT API] ALL IMAGES UPLOADED"
    );

    console.log(
      "[PRODUCT API] Uploaded:",
      uploadedImages
    );

    console.log(
      "=========================================="
    );

    return uploadedImages;

  } catch (error) {

    console.error(
      "=========================================="
    );

    console.error(
      "[PRODUCT API] IMAGE UPLOAD FAILED"
    );

    console.error(
      "[PRODUCT API] Message:",
      error.message
    );

    console.error(
      "[PRODUCT API] Status:",
      error.response?.status
    );

    console.error(
      "[PRODUCT API] Response:",
      error.response?.data
    );

    console.error(
      "=========================================="
    );

    throw error;
  }
},

  // =====================================================
  // UPDATE PRODUCT
  // =====================================================

  async update(
    id,
    product
  ) {

    const token =
      localStorage.getItem("se_token");

    const url =
      `${PRODUCT_URL}/${id}`;

    const headers =
      token
        ? {
            Authorization:
              `Bearer ${token}`,
          }
        : {};

    console.log(
      "[PRODUCT API] update() ID:",
      id
    );

    console.log(
      "[PRODUCT API] update() PRODUCT:",
      product
    );

    console.log(
      "[PRODUCT API] update() Token present:",
      Boolean(token)
    );

    logRequest(
      "UPDATE PRODUCT",
      url,
      { headers }
    );

    try {

      const response =
        await axios.put(
          url,
          product,
          { headers }
        );

      logSuccess(
        "UPDATE PRODUCT",
        response
      );

      return response.data;

    } catch (error) {

      logError(
        "UPDATE PRODUCT",
        error
      );

      throw error;
    }
  },

  // =====================================================
  // DELETE PRODUCT
  // =====================================================

  async remove(id) {

    const token =
      localStorage.getItem("se_token");

    const url =
      `${PRODUCT_URL}/${id}`;

    const headers =
      token
        ? {
            Authorization:
              `Bearer ${token}`,
          }
        : {};

    console.log(
      "[PRODUCT API] remove() ID:",
      id
    );

    console.log(
      "[PRODUCT API] remove() Token present:",
      Boolean(token)
    );

    logRequest(
      "DELETE PRODUCT",
      url,
      { headers }
    );

    try {

      const response =
        await axios.delete(
          url,
          { headers }
        );

      logSuccess(
        "DELETE PRODUCT",
        response
      );

      return response.data;

    } catch (error) {

      logError(
        "DELETE PRODUCT",
        error
      );

      throw error;
    }
  },
};