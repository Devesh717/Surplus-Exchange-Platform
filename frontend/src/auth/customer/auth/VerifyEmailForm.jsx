import React, { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Loader2, Zap } from "lucide-react";
import { useAuth } from "./AuthModel";
import { authApi } from "../../state/Auth/Action";

export default function VerifyEmailForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState(
    location.state?.email || ""
  );

  /*
   * Password is received only through React Router state.
   *
   * It is NOT stored in localStorage.
   */
  const [password] = useState(
    location.state?.password || ""
  );

  const [otp, setOtp] = useState("");

  const [message, setMessage] = useState(
    location.state?.message || ""
  );

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!/^\d{6}$/.test(otp)) {
      setError("OTP must be exactly 6 digits.");
      return;
    }

    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }

    setLoading(true);

    try {
      /*
       * STEP 1
       * Verify email.
       */
      const verificationResponse =
        await authApi.verifyEmail({
          email,
          otp,
        });

      /*
       * If your verification endpoint itself returns a JWT,
       * we can use it directly.
       */
      if (verificationResponse?.token) {
        localStorage.setItem(
          "se_token",
          verificationResponse.token
        );

        if (verificationResponse.role) {
          localStorage.setItem(
            "se_role",
            verificationResponse.role
          );
        }

        if (verificationResponse.userId) {
          localStorage.setItem(
            "se_user_id",
            verificationResponse.userId
          );
        }

        localStorage.setItem(
          "se_email_verified",
          "true"
        );

        window.dispatchEvent(
          new Event("auth-changed")
        );

        setMessage(
          verificationResponse.message ||
            "Email verified successfully."
        );

        setTimeout(() => {
          navigate("/overview", {
            replace: true,
          });
        }, 800);

        return;
      }

      /*
       * STEP 2
       *
       * If verification only verifies the email and
       * doesn't return a token, automatically log in
       * using the credentials from registration.
       */
      if (!password) {
        /*
         * This can happen if the user directly opened
         * /verify-email instead of coming from registration.
         *
         * In that case we cannot automatically log in.
         */
        setMessage(
          verificationResponse?.message ||
            "Email verified successfully."
        );

        setTimeout(() => {
          navigate("/login", {
            replace: true,
            state: {
              verified: true,
              email,
            },
          });
        }, 800);

        return;
      }

      /*
       * Automatically login.
       *
       * useAuth().login() already:
       *
       * - stores se_token
       * - stores se_role
       * - stores se_user_id
       * - updates auth state
       */
      const loginResponse = await login({
        email,
        password,
      });

      /*
       * Email has now definitely been verified.
       */
      localStorage.setItem(
        "se_email_verified",
        "true"
      );

      window.dispatchEvent(
        new Event("auth-changed")
      );

      setMessage(
        verificationResponse?.message ||
          "Email verified successfully."
      );

      /*
       * Small delay so the user can see the
       * success message.
       */
      setTimeout(() => {
        const destination =
          loginResponse?.role === "ADMIN"
            ? "/admin/dashboard"
            : loginResponse?.role === "SELLER"
            ? "/seller/dashboard"
            : "/overview";

        navigate(destination, {
          replace: true,
        });
      }, 800);

    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Email verification failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <div className="w-full">

          {/* Header */}
          <div className="mb-7 text-center">

            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200">
              <Zap
                size={22}
                fill="currentColor"
              />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Verify your email
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Enter the 6-digit OTP sent to your email
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-gray-200 bg-white p-7 shadow-xl shadow-gray-200/60"
          >

            {/* Success */}
            {message && (
              <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                {message}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* OTP */}
            <div className="mb-6">
              <label
                htmlFor="otp"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Verification code
              </label>

              <input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                value={otp}
                onChange={(event) => {
                  const value = event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 6);

                  setOtp(value);
                }}
                placeholder="123456"
                autoComplete="one-time-code"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-center text-xl font-semibold tracking-[0.5em] text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                Enter the 6-digit verification code sent to your email.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && (
                <Loader2
                  size={17}
                  className="animate-spin"
                />
              )}

              {loading
                ? "Verifying..."
                : "Verify email"}
            </button>
          </form>

          {/* Fallback */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already verified?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
            >
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}