import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, Zap } from "lucide-react";
import { authApi } from "../../state/Auth/Action";
import "../components/styles/ResetPasswordForm.css";

export default function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [token, setToken] = useState(searchParams.get("token") || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!token.trim()) {
      setError("Reset token is required");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must contain at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.resetPassword({
        token: token.trim(),
        newPassword,
      });

      setMessage(
        response?.message || "Password reset successfully."
      );

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);
    } catch (err) {
      setError(err.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-brand">
          <span className="auth-brand-icon">
            <Zap size={17} fill="currentColor" />
          </span>
          <p className="text-lg font-semibold text-gray-900">
            Reset password
          </p>
          <p className="text-sm text-gray-500">
            Choose a new password for your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 auth-form reset-password-form">
          {message && (
            <div className="auth-message auth-success">{message}</div>
          )}
          {error && (
            <div className="auth-message auth-error">{error}</div>
          )}

          <label className="mb-3 block text-sm">
            <span className="label-field">Reset token</span>
            <input
              required
              className="input-field"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="Paste reset token"
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
              value={newPassword}
              onChange={(event) =>
                setNewPassword(event.target.value)
              }
            />
          </label>

          <label className="mb-5 block text-sm">
            <span className="label-field">Confirm password</span>
            <input
              type="password"
              minLength={8}
              required
              autoComplete="new-password"
              className="input-field"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center"
          >
            {loading && <Loader2 className="animate-spin" size={15} />}
            {loading ? "Resetting..." : "Reset password"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          <Link
            to="/login"
            className="font-medium text-brand-700 hover:underline"
          >
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
