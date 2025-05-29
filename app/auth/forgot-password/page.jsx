"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(
      validateEmail(email) ? "" : "Please enter a valid email address."
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailTouched(true);
    setStatusMessage("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email, {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/signin`, // ✅ Redirect after reset
        handleCodeInApp: false,
      });
      setStatusMessage("Password reset email sent! Check your inbox.");
    } catch (error) {
      setStatusMessage(error.message || "Error sending password reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3>Forgot Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          {/* <label htmlFor="email" className="form-label text-light">
            Email address
          </label> */}
          <input
            type="email"
            className="form-control border rounded-3"
            id="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
            disabled={loading}
          />
          {emailTouched && emailError && (
            <div className="text-danger mt-1">{emailError}</div>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-gradient w-100"
          disabled={loading}
        >
          <span className="m-auto">
            {" "}
            {loading ? "Sending..." : "Send Reset Link"}
          </span>
        </button>
        {statusMessage && <div className="mt-3 text-info">{statusMessage}</div>}
      </form>

      <div className=" login-link">
        <a href="/auth/signin">← Back to Sign In</a>
      </div>
    </>
  );
}
