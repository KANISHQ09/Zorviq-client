"use client";

import Link from "next/link";

export default function SignUpPage() {
  return (
    <div style={{
      minHeight: "100vh", background: "#000",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px",
    }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#fff" }}>ZORVIQ</span>
          </Link>
          <p style={{ color: "#555", fontSize: "0.85rem", marginTop: "8px" }}>Create your free account</p>
        </div>

        {/* Form card */}
        <div style={{
          background: "#0D0D0D",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "20px",
          padding: "36px",
        }}>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#fff", marginBottom: "28px" }}>
            Get started
          </h1>

          {/* Google OAuth */}
          <button style={{
            width: "100%", padding: "12px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px", color: "#CCC",
            fontSize: "0.9rem", fontWeight: 500, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
            marginBottom: "20px", transition: "all 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
          >
            <span>G</span> Continue with Google
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
            <span style={{ fontSize: "0.75rem", color: "#444" }}>or</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
          </div>

          {/* Fields */}
          {[
            { label: "Email", type: "email", placeholder: "you@example.com" },
            { label: "Password", type: "password", placeholder: "Min. 8 characters" },
          ].map(({ label, type, placeholder }) => (
            <div key={label} style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "0.8rem", color: "#888", marginBottom: "6px", fontWeight: 500 }}>
                {label}
              </label>
              <input
                type={type}
                placeholder={placeholder}
                style={{
                  width: "100%", padding: "11px 14px",
                  background: "#141414",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px", color: "#CCC", fontSize: "0.9rem",
                  outline: "none", transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
              />
            </div>
          ))}

          <Link href="/dashboard" style={{
            width: "100%", padding: "13px",
            background: "linear-gradient(135deg,#7C3AED,#6366F1)",
            border: "none", borderRadius: "10px",
            color: "#fff", fontWeight: 700, fontSize: "0.95rem",
            cursor: "pointer", marginTop: "8px",
            boxShadow: "0 0 24px rgba(124,58,237,0.3)",
            transition: "all 0.2s",
            display: "block", textAlign: "center", textDecoration: "none"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 40px rgba(124,58,237,0.6)")}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 24px rgba(124,58,237,0.3)")}
          >
            Create Account →
          </Link>

          <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#444", marginTop: "20px" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#A78BFA", textDecoration: "none" }}>Log in</Link>
          </p>
        </div>

        <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#333", marginTop: "20px" }}>
          By signing up you agree to our{" "}
          <Link href="#" style={{ color: "#555" }}>Terms</Link> and{" "}
          <Link href="#" style={{ color: "#555" }}>Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
