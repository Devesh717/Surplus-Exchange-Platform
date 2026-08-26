import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { authApi } from "../../state/Auth/Action";
import "../components/styles/ChangePasswordForm.css";

export default function ChangePasswordForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (form.newPassword.length < 8) {
      setError("New password must contain at least 8 characters");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      setMessage(
        response?.message || "Password changed successfully."
      );

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.message || "Unable to change password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-brand">
          <p className="text-lg font-semibold text-gray-900">
            Change password
          </p>
          <p className="text-sm text-gray-500">
            Update your current account password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 auth-form change-password-form">
          {message && (
            <div className="auth-message auth-success">{message}</div>
          )}
          {error && (
            <div className="auth-message auth-error">{error}</div>
          )}

          <label className="mb-3 block text-sm">
            <span className="label-field">Current password</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              className="input-field"
              value={form.currentPassword}
              onChange={(event) =>
                setForm({
                  ...form,
                  currentPassword: event.target.value,
                })
              }
            />
          </label>

          <label className="mb-3 block text-sm">
            <span className="label-field">New password</span>
            <input
              type="password"
              minLength={8}
              required
              autoComplete="new-password"
              className="input-field"
              value={form.newPassword}
              onChange={(event) =>
                setForm({
                  ...form,
                  newPassword: event.target.value,
                })
              }
            />
          </label>

          <label className="mb-5 block text-sm">
            <span className="label-field">Confirm new password</span>
            <input
              type="password"
              minLength={8}
              required
              autoComplete="new-password"
              className="input-field"
              value={form.confirmPassword}
              onChange={(event) =>
                setForm({
                  ...form,
                  confirmPassword: event.target.value,
                })
              }
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center"
          >
            {loading && <Loader2 className="animate-spin" size={15} />}
            {loading ? "Updating..." : "Change password"}
          </button>
        </form>

        <button
          type="button"
          className="btn-secondary mt-4 w-full justify-center"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
}
