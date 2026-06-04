import Link from "next/link";

export default function LoginPage() {
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
          <p style={{ color: "#555", fontSize: "0.85rem", marginTop: "8px" }}>Welcome back 👋</p>
        </div>

        <div style={{
          background: "#0D0D0D",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "20px", padding: "36px",
        }}>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#fff", marginBottom: "28px" }}>
            Sign In
          </h1>

          <button style={{
            width: "100%", padding: "12px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px", color: "#CCC",
            fontSize: "0.9rem", fontWeight: 500, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
            marginBottom: "20px",
          }}>
            <span>G</span> Continue with Google
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
            <span style={{ fontSize: "0.75rem", color: "#444" }}>or</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
          </div>

          {[
            { label: "Email", type: "email", placeholder: "you@example.com" },
            { label: "Password", type: "password", placeholder: "Your password" },
          ].map(({ label, type, placeholder }) => (
            <div key={label} style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "0.8rem", color: "#888", marginBottom: "6px", fontWeight: 500 }}>
                {label}
              </label>
              <input type={type} placeholder={placeholder} style={{
                width: "100%", padding: "11px 14px",
                background: "#141414", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px", color: "#CCC", fontSize: "0.9rem", outline: "none",
              }} />
            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
            <Link href="#" style={{ fontSize: "0.78rem", color: "#555", textDecoration: "none" }}>
              Forgot password?
            </Link>
          </div>

          <Link href="/dashboard" style={{
            width: "100%", padding: "13px",
            background: "linear-gradient(135deg,#7C3AED,#6366F1)",
            border: "none", borderRadius: "10px",
            color: "#fff", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer",
            boxShadow: "0 0 24px rgba(124,58,237,0.3)",
            display: "block", textAlign: "center", textDecoration: "none"
          }}>
            Sign In →
          </Link>

          <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#444", marginTop: "20px" }}>
            Don&apos;t have an account?{" "}
            <Link href="/signup" style={{ color: "#A78BFA", textDecoration: "none" }}>Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
