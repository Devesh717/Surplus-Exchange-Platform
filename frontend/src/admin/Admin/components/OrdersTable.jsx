import React, { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";
import { useStore } from "../../../Store";
import { getOrders } from "../../state/Admin/Action";
import { AdminApi } from "../api/AdminApi";
import Loader from "./common/Loader";
import ErrorMessage from "./common/ErrorMessage";
import EmptyState from "./common/EmptyState";

import "./styles/OrdersTable.css";
export default function OrdersTable() {
  const { state, dispatch } = useStore();
  const { orders, loading, errors } = state.admin;
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");

  useEffect(() => {
    dispatch(getOrders(0, 10));
  }, [dispatch]);

  async function viewOrder(orderId) {
    setDetailLoading(true);
    setDetailError("");
    try {
      const data = await AdminApi.getOrderById(orderId);
      setSelectedOrder(data);
    } catch (error) {
      setDetailError(error.message);
    } finally {
      setDetailLoading(false);
    }
  }

  if (loading.orders && !orders.content.length) {
    return <Loader label="Loading orders..." />;
  }

  if (errors.orders && !orders.content.length) {
    return (
      <ErrorMessage
        message={errors.orders}
        onRetry={() => dispatch(getOrders(orders.number || 0, orders.size || 10))}
      />
    );
  }

  if (!orders.content.length) {
    return <EmptyState icon={ClipboardList} title="No orders found" />;
  }

  return (
    <div className="admin-orders-page">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
        Admin
      </p>
      <h1 className="mt-1 text-2xl font-semibold text-gray-900">Orders</h1>

      <div className="card mt-5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-orders-table w-full text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wide text-gray-400">
              <tr>
                <th className="px-4 py-3 font-medium">Order ID</th>
                <th className="px-4 py-3 font-medium">Buyer ID</th>
                <th className="px-4 py-3 font-medium">Total amount</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.content.map((order) => (
                <tr key={order.orderId}>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    #{order.orderId}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{order.buyerId}</td>
                  <td className="px-4 py-3 text-gray-700">
                    ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="btn-secondary !py-1.5"
                      onClick={() => viewOrder(order.orderId)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 text-xs text-gray-500">
          <span>
            Page {orders.number + 1} of {Math.max(orders.totalPages, 1)}
          </span>
          <div className="flex gap-2">
            <button
              className="btn-secondary !py-1.5"
              disabled={orders.number <= 0 || loading.orders}
              onClick={() => dispatch(getOrders(orders.number - 1, orders.size))}
            >
              Previous
            </button>
            <button
              className="btn-secondary !py-1.5"
              disabled={
                orders.number + 1 >= orders.totalPages || loading.orders
              }
              onClick={() => dispatch(getOrders(orders.number + 1, orders.size))}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {(detailLoading || selectedOrder || detailError) && (
        <div className="admin-order-details card mt-5 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">
              Order details
            </h2>
            <button
              className="text-sm text-gray-400 hover:text-gray-700"
              onClick={() => setSelectedOrder(null)}
            >
              Close
            </button>
          </div>

          {detailLoading && <p className="mt-3 text-sm text-gray-500">Loading...</p>}
          {detailError && <p className="mt-3 text-sm text-red-600">{detailError}</p>}

          {selectedOrder && (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 text-sm">
              <div>
                <p className="text-xs text-gray-400">Order ID</p>
                <p className="font-medium text-gray-900">#{selectedOrder.orderId}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Buyer ID</p>
                <p className="font-medium text-gray-900">{selectedOrder.buyerId}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Total amount</p>
                <p className="font-medium text-gray-900">
                  ₹{Number(selectedOrder.totalAmount || 0).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
