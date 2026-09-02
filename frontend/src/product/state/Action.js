import { productApi } from "../api/ProductApi";
import { PRODUCT_ACTION_TYPES as T } from "./ActionType";

// ============================================================
// GET ALL PRODUCTS
// ============================================================

export const getProducts = (params = {}) => async (dispatch) => {

  console.log("====================================");
  console.log("[PRODUCT ACTION] getProducts() CALLED");
  console.log("[PRODUCT ACTION] params:", params);
  console.log("====================================");

  dispatch({
    type: T.PRODUCTS_REQUEST,
  });

  try {

    // --------------------------------------------------------
    // FORCE VALID DEFAULT SORT
    // Product entity has sellingPrice, not price
    // --------------------------------------------------------

    const requestParams = {
      page: 0,
      size: 12,
      sort: "sellingPrice,asc",
      ...params,
    };

    console.log("====================================");
    console.log("[PRODUCT ACTION] FINAL REQUEST PARAMS");
    console.log("[PRODUCT ACTION] page:", requestParams.page);
    console.log("[PRODUCT ACTION] size:", requestParams.size);
    console.log("[PRODUCT ACTION] sort:", requestParams.sort);
    console.log("====================================");

    console.log(
      "[PRODUCT ACTION] Calling productApi.getAll()"
    );

    const data = await productApi.getAll(requestParams);

    console.log("====================================");
    console.log("[PRODUCT ACTION] API DATA RECEIVED");
    console.log("[PRODUCT ACTION] data:", data);
    console.log("[PRODUCT ACTION] content:", data?.content);
    console.log(
      "[PRODUCT ACTION] content length:",
      data?.content?.length
    );
    console.log("====================================");

    dispatch({
      type: T.PRODUCTS_SUCCESS,
      payload: data,
    });

    console.log(
      "[PRODUCT ACTION] PRODUCTS_SUCCESS dispatched"
    );

    return data;

  } catch (error) {

    console.error("====================================");
    console.error("[PRODUCT ACTION] ERROR");
    console.error(error);
    console.error("====================================");

    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Unable to load products.";

    dispatch({
      type: T.PRODUCTS_FAILURE,
      payload: message,
    });

    throw error;
  }
};


// ============================================================
// GET PRODUCTS BY CATEGORY
// ============================================================

export const getProductsByCategory =
  (categoryId, params = {}) =>
  async (dispatch) => {

    console.log("");
    console.log(
      "================================================"
    );
    console.log(
      "[PRODUCT ACTION] getProductsByCategory()"
    );
    console.log(
      "================================================"
    );

    console.log(
      "[PRODUCT ACTION] Category ID:",
      categoryId
    );

    console.log(
      "[PRODUCT ACTION] Params:",
      params
    );

    dispatch({
      type: T.PRODUCTS_REQUEST,
    });

    try {

      // --------------------------------------------------------
      // FORCE VALID DEFAULT SORT
      // --------------------------------------------------------

      const requestParams = {
        page: 0,
        size: 12,
        sort: "sellingPrice,asc",
        ...params,
      };

      console.log("====================================");
      console.log(
        "[PRODUCT ACTION] CATEGORY REQUEST PARAMS"
      );
      console.log(
        "[PRODUCT ACTION] page:",
        requestParams.page
      );
      console.log(
        "[PRODUCT ACTION] size:",
        requestParams.size
      );
      console.log(
        "[PRODUCT ACTION] sort:",
        requestParams.sort
      );
      console.log("====================================");

      console.log(
        "[PRODUCT ACTION] Calling productApi.getByCategory()"
      );

      const data = await productApi.getByCategory(
        categoryId,
        requestParams
      );

      console.log(
        "[PRODUCT ACTION] Category API response:",
        data
      );

      console.log(
        "[PRODUCT ACTION] Category content:",
        data?.content
      );

      dispatch({
        type: T.PRODUCTS_SUCCESS,
        payload: data,
      });

      return data;

    } catch (error) {

      console.error(
        "[PRODUCT ACTION] Category API error:",
        error
      );

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Unable to load products.";

      dispatch({
        type: T.PRODUCTS_FAILURE,
        payload: message,
      });

      throw error;
    }
  };


// ============================================================
// GET SINGLE PRODUCT
// ============================================================

export const getProduct = (id) => async (dispatch) => {

  console.log(
    "[PRODUCT ACTION] getProduct() ID:",
    id
  );

  dispatch({
    type: T.PRODUCT_REQUEST,
  });

  try {

    const data = await productApi.getById(id);

    console.log(
      "[PRODUCT ACTION] Single product response:",
      data
    );

    dispatch({
      type: T.PRODUCT_SUCCESS,
      payload: data,
    });

    return data;

  } catch (error) {

    console.error(
      "[PRODUCT ACTION] Single product error:",
      error
    );

    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Product not found.";

    dispatch({
      type: T.PRODUCT_FAILURE,
      payload: message,
    });

    throw error;
  }
};

// ============================================================
// GET MY PRODUCT BY ID
// ============================================================

export const getMyProduct = (id) => async (dispatch) => {

  console.log(
    "[PRODUCT ACTION] getMyProduct() ID:",
    id
  );

  dispatch({
    type: T.PRODUCT_REQUEST,
  });

  try {

    const data = await productApi.getMyProductById(id);

    console.log(
      "[PRODUCT ACTION] My product response:",
      data
    );

    dispatch({
      type: T.PRODUCT_SUCCESS,
      payload: data,
    });

    return data;

  } catch (error) {

    console.error(
      "[PRODUCT ACTION] My product error:",
      error
    );

    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Product not found.";

    dispatch({
      type: T.PRODUCT_FAILURE,
      payload: message,
    });

    throw error;
  }
};


// ============================================================
// GET MY PRODUCTS
// ============================================================

export const getMyProducts = (params = {}) => async (dispatch) => {

  dispatch({
    type: T.PRODUCTS_REQUEST,
  });

  try {

    const requestParams = {
      page: 0,
      size: 12,
      sort: "id,desc",
      ...params,
    };

    console.log(
      "[PRODUCT ACTION] getMyProducts() params:",
      requestParams
    );

    const data = await productApi.getMyProducts(
      requestParams
    );

    dispatch({
      type: T.PRODUCTS_SUCCESS,
      payload: data,
    });

    return data;

  } catch (error) {

    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Unable to load your products.";

    dispatch({
      type: T.PRODUCTS_FAILURE,
      payload: message,
    });

    throw error;
  }
};


// ============================================================
// CREATE PRODUCT
// ============================================================

export const createProduct = (product) => async (dispatch) => {

  dispatch({
    type: T.PRODUCT_MUTATION_REQUEST,
  });

  try {

    const data = await productApi.create(product);

    dispatch({
      type: T.PRODUCT_MUTATION_SUCCESS,
      payload: data,
    });

    return data;

  } catch (error) {

    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Unable to create product.";

    dispatch({
      type: T.PRODUCT_MUTATION_FAILURE,
      payload: message,
    });

    throw error;
  }
};


// ============================================================
// UPDATE PRODUCT
// ============================================================

export const updateProduct =
  (id, product) =>
  async (dispatch) => {

    dispatch({
      type: T.PRODUCT_MUTATION_REQUEST,
    });

    try {

      const data = await productApi.update(
        id,
        product
      );

      dispatch({
        type: T.PRODUCT_MUTATION_SUCCESS,
        payload: data,
      });

      return data;

    } catch (error) {

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Unable to update product.";

      dispatch({
        type: T.PRODUCT_MUTATION_FAILURE,
        payload: message,
      });

      throw error;
    }
  };


// ============================================================
// DELETE PRODUCT
// ============================================================

export const deleteProduct = (id) => async (dispatch) => {

  dispatch({
    type: T.PRODUCT_MUTATION_REQUEST,
  });

  try {

    await productApi.remove(id);

    dispatch({
      type: T.PRODUCT_MUTATION_SUCCESS,
      payload: {
        id,
      },
    });

  } catch (error) {

    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Unable to delete product.";

    dispatch({
      type: T.PRODUCT_MUTATION_FAILURE,
      payload: message,
    });

    throw error;
  }
};