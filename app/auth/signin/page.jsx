"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [firebaseError, setFirebaseError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{8,}$/.test(
      password
    );

  useEffect(() => {
    if (emailTouched)
      setEmailError(validateEmail(email) ? "" : "Invalid email format");
  }, [email, emailTouched]);

  useEffect(() => {
    if (passwordTouched)
      setPasswordError(
        validatePassword(password)
          ? ""
          : "Must be 8+ chars with upper, lower, number, and special char."
      );
  }, [password, passwordTouched]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setFirebaseError("");
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!validateEmail(email) || !validatePassword(password)) return;

    setLoading(true);
    try {
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Signed in successfully! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err) {
      setFirebaseError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setFirebaseError("");
    setLoading(true);
    try {
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );
      await signInWithPopup(auth, googleProvider);
      setSuccessMessage("Signed in with Google! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err) {
      setFirebaseError(err.message || "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3>Sign in</h3>
      <form onSubmit={handleSignIn}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control border rounded-3"
            id="email"
            name="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailTouched(true)}
            disabled={loading}
          />
          {emailError && <div className="text-danger">{emailError}</div>}
        </div>
        <div className="mb-3 position-relative">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control border rounded-3"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setPasswordTouched(true)}
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-0"
            style={{ zIndex: 5, border: "none", background: "transparent" }}
            disabled={loading}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {passwordError && <div className="text-danger">{passwordError}</div>}
        </div>
        <div className="d-flex justify-content-between">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={loading}
            />
            <label className="form-check-label text-light" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          <div className="forgot-link">
            <a href="/auth/forgot-password">Forgot Password</a>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-gradient mt-3 w-100"
          disabled={loading}
        >
          <span className="m-auto">
            {" "}
            {loading ? "Signing In..." : "Sign In"}
          </span>
        </button>
        {firebaseError && (
          <div className="text-danger mt-3">{firebaseError}</div>
        )}
        {successMessage && (
          <div className="text-success mt-3">{successMessage}</div>
        )}

        <div className="social-icons mt-4 d-flex justify-content-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
            alt="Google"
            onClick={handleGoogleSignIn}
            style={{ cursor: "pointer", width: 32, height: 32 }}
          />
        </div>
      </form>
    </>
  );
}
