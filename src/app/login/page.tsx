"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { API_BASE_URL, loginUser } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await loginUser(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#000",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px",
    }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#fff" }}>ZORVIQ</span>
          </Link>
          <p style={{ color: "#555", fontSize: "0.85rem", marginTop: "8px" }}>Welcome back</p>
        </div>

        <form onSubmit={handleSubmit} style={{
          background: "#0D0D0D",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "20px", padding: "36px",
        }}>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#fff", marginBottom: "28px" }}>
            Sign In
          </h1>

          <a href={`${API_BASE_URL}/api/auth/google`} style={{
            width: "100%", padding: "12px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px", color: "#CCC",
            fontSize: "0.9rem", fontWeight: 500, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
            marginBottom: "20px", textDecoration: "none",
          }}>
            <span>G</span> Continue with Google
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
            <span style={{ fontSize: "0.75rem", color: "#444" }}>or</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#888", marginBottom: "6px", fontWeight: 500 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              style={{
                width: "100%", padding: "11px 14px",
                background: "#141414", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px", color: "#CCC", fontSize: "0.9rem", outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#888", marginBottom: "6px", fontWeight: 500 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
              required
              style={{
                width: "100%", padding: "11px 14px",
                background: "#141414", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px", color: "#CCC", fontSize: "0.9rem", outline: "none",
              }}
            />
          </div>

          {error && (
            <p style={{ color: "#f87171", fontSize: "0.82rem", marginBottom: "16px", lineHeight: 1.5 }}>
              {error}
            </p>
          )}

          <button type="submit" disabled={isSubmitting} style={{
            width: "100%", padding: "13px",
            background: "linear-gradient(135deg,#7C3AED,#6366F1)",
            border: "none", borderRadius: "10px",
            color: "#fff", fontWeight: 700, fontSize: "0.95rem", cursor: isSubmitting ? "default" : "pointer",
            boxShadow: "0 0 24px rgba(124,58,237,0.3)",
            opacity: isSubmitting ? 0.65 : 1,
          }}>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>

          <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#444", marginTop: "20px" }}>
            Don&apos;t have an account?{" "}
            <Link href="/signup" style={{ color: "#A78BFA", textDecoration: "none" }}>Sign up free</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
