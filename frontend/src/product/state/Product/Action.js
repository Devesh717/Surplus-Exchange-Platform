import { productApi } from "../../product/api/ProductApi";
import { PRODUCT_ACTION_TYPES as T } from "./ActionType";

const logAction = (name, data) => {
  console.log("==================================================");
  console.log(`[PRODUCT ACTION] ${name}`);
  console.log(data);
  console.log("==================================================");
};

export const getProducts = (params = {}) => async (dispatch) => {
  const finalParams = {
    page: params.page ?? 0,
    size: params.size ?? 12,
    sort: params.sort ?? "id,desc",
  };

  logAction("getProducts() START", {
    receivedParams: params,
    finalParams,
  });

  dispatch({ type: T.PRODUCTS_REQUEST });
  console.log("[PRODUCT ACTION] PRODUCTS_REQUEST dispatched");

  try {
    console.log("[PRODUCT ACTION] Calling productApi.getAll with:", finalParams);
    const data = await productApi.getAll(finalParams);

    logAction("getProducts() SUCCESS", {
      data,
      contentLength: data?.content?.length,
      totalElements: data?.totalElements,
      totalPages: data?.totalPages,
    });

    dispatch({ type: T.PRODUCTS_SUCCESS, payload: data });
    console.log("[PRODUCT ACTION] PRODUCTS_SUCCESS dispatched");
    return data;
  } catch (error) {
    console.error("[PRODUCT ACTION] getProducts() FAILED", error);
    console.error("[PRODUCT ACTION] Axios config:", error.config);
    console.error("[PRODUCT ACTION] Axios response:", error.response);

    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Unable to load products.";

    dispatch({ type: T.PRODUCTS_FAILURE, payload: message });
    console.error("[PRODUCT ACTION] PRODUCTS_FAILURE dispatched:", message);
    throw error;
  }
};

export const getProductsByCategory = (categoryId, params = {}) => async (dispatch) => {
  const finalParams = {
    page: params.page ?? 0,
    size: params.size ?? 12,
    sort: params.sort ?? "id,desc",
  };

  logAction("getProductsByCategory() START", {
    categoryId,
    receivedParams: params,
    finalParams,
  });

  dispatch({ type: T.PRODUCTS_REQUEST });
  console.log("[PRODUCT ACTION] PRODUCTS_REQUEST dispatched for category");

  try {
    console.log(
      "[PRODUCT ACTION] Calling productApi.getByCategory with:",
      categoryId,
      finalParams
    );

    const data = await productApi.getByCategory(categoryId, finalParams);

    logAction("getProductsByCategory() SUCCESS", {
      categoryId,
      data,
      contentLength: data?.content?.length,
    });

    dispatch({ type: T.PRODUCTS_SUCCESS, payload: data });
    console.log("[PRODUCT ACTION] PRODUCTS_SUCCESS dispatched for category");
    return data;
  } catch (error) {
    console.error("[PRODUCT ACTION] getProductsByCategory() FAILED", error);
    console.error("[PRODUCT ACTION] Axios config:", error.config);
    console.error("[PRODUCT ACTION] Axios response:", error.response);

    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Unable to load products.";

    dispatch({ type: T.PRODUCTS_FAILURE, payload: message });
    throw error;
  }
};

export const getProduct = (id) => async (dispatch) => {
  logAction("getProduct() START", { id });
  dispatch({ type: T.PRODUCT_REQUEST });

  try {
    const data = await productApi.getById(id);
    logAction("getProduct() SUCCESS", { id, data });
    dispatch({ type: T.PRODUCT_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error("[PRODUCT ACTION] getProduct() FAILED", error);
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Product not found.";
    dispatch({ type: T.PRODUCT_FAILURE, payload: message });
    throw error;
  }
};

export const getMyProducts = (params = {}) => async (dispatch) => {
  logAction("getMyProducts() START", { params });
  dispatch({ type: T.PRODUCTS_REQUEST });

  try {
    const data = await productApi.getMyProducts(params);
    logAction("getMyProducts() SUCCESS", { data });
    dispatch({ type: T.PRODUCTS_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error("[PRODUCT ACTION] getMyProducts() FAILED", error);
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Unable to load your products.";
    dispatch({ type: T.PRODUCTS_FAILURE, payload: message });
    throw error;
  }
};

export const createProduct = (product) => async (dispatch) => {
  logAction("createProduct() START", { product });
  dispatch({ type: T.PRODUCT_MUTATION_REQUEST });

  try {
    const data = await productApi.create(product);
    logAction("createProduct() SUCCESS", { data });
    dispatch({ type: T.PRODUCT_MUTATION_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error("[PRODUCT ACTION] createProduct() FAILED", error);
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Unable to create product.";
    dispatch({ type: T.PRODUCT_MUTATION_FAILURE, payload: message });
    throw error;
  }
};

export const updateProduct = (id, product) => async (dispatch) => {
  logAction("updateProduct() START", { id, product });
  dispatch({ type: T.PRODUCT_MUTATION_REQUEST });

  try {
    const data = await productApi.update(id, product);
    logAction("updateProduct() SUCCESS", { id, data });
    dispatch({ type: T.PRODUCT_MUTATION_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error("[PRODUCT ACTION] updateProduct() FAILED", error);
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Unable to update product.";
    dispatch({ type: T.PRODUCT_MUTATION_FAILURE, payload: message });
    throw error;
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  logAction("deleteProduct() START", { id });
  dispatch({ type: T.PRODUCT_MUTATION_REQUEST });

  try {
    await productApi.remove(id);
    logAction("deleteProduct() SUCCESS", { id });
    dispatch({ type: T.PRODUCT_MUTATION_SUCCESS, payload: { id } });
  } catch (error) {
    console.error("[PRODUCT ACTION] deleteProduct() FAILED", error);
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Unable to delete product.";
    dispatch({ type: T.PRODUCT_MUTATION_FAILURE, payload: message });
    throw error;
  }
};
