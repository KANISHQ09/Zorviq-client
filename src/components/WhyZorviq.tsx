"use client";

const stats = [
  { value: "12K+", label: "Websites Built" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "4.9/5", label: "Average Rating" },
];

const reasons = [
  {
    icon: "⚡",
    title: "Built for speed",
    desc: "Everything is optimized for performance and speed.",
  },
  {
    icon: "🎯",
    title: "Designed to convert",
    desc: "AI that understands what makes a website convert.",
  },
  {
    icon: "🎨",
    title: "Fully customizable",
    desc: "Total creative freedom without any limits.",
  },
];

export default function WhyZorviq() {
  return (
    <section
      id="why"
      style={{ padding: "100px 24px", position: "relative" }}
    >
      {/* Top divider */}
      <div className="divider-glow" style={{ marginBottom: "100px" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "80px", alignItems: "center",
        }} className="why-grid">
          {/* Left */}
          <div>
            <span className="badge" style={{ marginBottom: "20px", display: "inline-flex" }}>
              <span className="badge-dot" /> Why Zorviq?
            </span>
            <h2 style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 900,
              fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", lineHeight: 1.15,
              marginBottom: "40px",
            }}>
              Not another<br />boring builder.<br />
              <span style={{
                background: "linear-gradient(135deg,#A78BFA,#818CF8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>A creative engine.</span>
            </h2>

            {reasons.map((r) => (
              <div key={r.title} style={{
                display: "flex", gap: "16px",
                marginBottom: "28px",
              }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "10px", flexShrink: 0,
                  background: "rgba(124,58,237,0.12)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.1rem",
                }}>
                  {r.icon}
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#fff", marginBottom: "4px" }}>
                    {r.title}
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "#555", lineHeight: 1.6 }}>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Stats + visual */}
          <div>
            {/* Stats row */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3,1fr)",
              gap: "24px", marginBottom: "40px",
            }}>
              {stats.map(({ value, label }) => (
                <div key={label} style={{
                  background: "#0D0D0D",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "14px", padding: "24px 16px",
                  textAlign: "center",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.3)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(124,58,237,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}>
                  <p style={{
                    fontFamily: "'Syne',sans-serif", fontWeight: 900,
                    fontSize: "1.8rem", color: "#fff", marginBottom: "4px",
                  }}>{value}</p>
                  <p style={{ fontSize: "0.72rem", color: "#555" }}>{label}</p>
                </div>
              ))}
            </div>

            {/* Globe / visual */}
            <div style={{
              background: "#0D0D0D",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "20px", padding: "32px",
              display: "flex", alignItems: "center", justifyContent: "center",
              minHeight: "200px",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.12), transparent 70%)",
              }} />
              {/* Animated ring */}
              <div style={{
                width: "160px", height: "160px", borderRadius: "50%",
                border: "2px solid rgba(124,58,237,0.3)",
                position: "relative",
                animation: "rotate 8s linear infinite",
              }}>
                <div style={{
                  position: "absolute", top: "-4px", left: "50%", transform: "translateX(-50%)",
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: "#7C3AED",
                  boxShadow: "0 0 12px rgba(124,58,237,0.8)",
                }} />
              </div>
              <div style={{
                position: "absolute",
                width: "100px", height: "100px", borderRadius: "50%",
                border: "1px solid rgba(99,102,241,0.2)",
                animation: "rotate 12s linear infinite reverse",
              }}>
                <div style={{
                  position: "absolute", bottom: "-3px", left: "50%", transform: "translateX(-50%)",
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: "#6366F1",
                  boxShadow: "0 0 8px rgba(99,102,241,0.8)",
                }} />
              </div>
              <div style={{
                position: "absolute",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
              }}>
                <span style={{ fontSize: "2rem" }}>🌐</span>
                <p style={{ fontSize: "0.7rem", color: "#555", textAlign: "center" }}>
                  Loved by 12,000+ creators<br />and teams worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .why-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
