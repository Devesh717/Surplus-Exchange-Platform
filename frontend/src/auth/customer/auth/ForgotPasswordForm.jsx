import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Zap } from "lucide-react";
import { authApi } from "../../state/Auth/Action";
import "../components/styles/ForgotPasswordForm.css";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await authApi.forgotPassword({ email });
      setMessage(
        response?.message ||
          "If the email is registered, a password reset link has been sent."
      );
    } catch (err) {
      setError(err.message || "Unable to process the request");
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
            Forgot password
          </p>
          <p className="text-sm text-gray-500">
            Request a password reset link
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 auth-form forgot-password-form">
          {message && (
            <div className="auth-message auth-success">{message}</div>
          )}
          {error && (
            <div className="auth-message auth-error">{error}</div>
          )}

          <label className="mb-5 block text-sm">
            <span className="label-field">Email</span>
            <input
              type="email"
              required
              className="input-field"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@business.com"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center"
          >
            {loading && <Loader2 className="animate-spin" size={15} />}
            {loading ? "Sending..." : "Send reset link"}
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
