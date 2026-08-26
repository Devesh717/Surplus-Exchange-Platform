import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import LoginForm from "../customer/auth/LoginForm";
import RegisterForm from "../customer/auth/RegisterForm";
import VerifyEmailForm from "../customer/auth/VerifyEmailForm";
import ForgotPasswordForm from "../customer/auth/ForgotPasswordForm";
import ResetPasswordForm from "../customer/auth/ResetPasswordForm";
import ChangePasswordForm from "../customer/auth/ChangePasswordForm";

export default function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />

      <Route path="/register" element={<RegisterForm />} />

      <Route
        path="/verify-email"
        element={<VerifyEmailForm />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPasswordForm />}
      />

      <Route
        path="/reset-password"
        element={<ResetPasswordForm />}
      />

      <Route
        path="/change-password"
        element={<ChangePasswordForm />}
      />

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}