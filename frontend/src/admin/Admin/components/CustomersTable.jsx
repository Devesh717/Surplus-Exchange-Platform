import React, { useEffect } from "react";
import { Users } from "lucide-react";
import { useStore } from "../../../Store";
import { getUsers } from "../../state/Admin/Action";
import Loader from "./common/Loader";
import ErrorMessage from "./common/ErrorMessage";
import EmptyState from "./common/EmptyState";

import "./styles/CustomersTable.css";
export default function CustomersTable() {
  const { state, dispatch } = useStore();
  const { users, loading, errors } = state.admin;

  useEffect(() => {
    dispatch(getUsers(0, 10));
  }, [dispatch]);

  function loadPage(page) {
    dispatch(getUsers(page, users.size || 10));
  }

  if (loading.users && !users.content.length) {
    return <Loader label="Loading users..." />;
  }

  if (errors.users && !users.content.length) {
    return (
      <ErrorMessage
        message={errors.users}
        onRetry={() => dispatch(getUsers(users.number || 0, users.size || 10))}
      />
    );
  }

  if (!users.content.length) {
    return <EmptyState icon={Users} title="No users found" />;
  }

  return (
    <div className="admin-users-page">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
        Admin
      </p>
      <h1 className="mt-1 text-2xl font-semibold text-gray-900">Users</h1>

      <div className="card mt-5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-users-table w-full text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wide text-gray-400">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Email verified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.content.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3 font-medium text-gray-900">{user.name}</td>
                  <td className="px-4 py-3 text-gray-600">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className="badge bg-brand-50 text-brand-700">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`badge ${
                        user.emailVerified
                          ? "bg-brand-50 text-brand-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {user.emailVerified ? "Verified" : "Unverified"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-users-pagination flex items-center justify-between border-t border-gray-100 px-4 py-3 text-xs text-gray-500">
          <span>
            Page {users.number + 1} of {Math.max(users.totalPages, 1)}
          </span>
          <div className="flex gap-2">
            <button
              className="btn-secondary !py-1.5"
              disabled={users.number <= 0 || loading.users}
              onClick={() => loadPage(users.number - 1)}
            >
              Previous
            </button>
            <button
              className="btn-secondary !py-1.5"
              disabled={
                users.number + 1 >= users.totalPages || loading.users
              }
              onClick={() => loadPage(users.number + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
