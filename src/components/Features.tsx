"use client";

const features = [
  {
    icon: "⚡",
    title: "AI Page Generator",
    desc: "Generate complete pages from a simple prompt.",
  },
  {
    icon: "✍️",
    title: "AI Copywriting",
    desc: "Write compelling content that converts instantly.",
  },
  {
    icon: "🎨",
    title: "AI Design System",
    desc: "Get on-brand colors, fonts & components.",
  },
  {
    icon: "🎬",
    title: "AI Animations",
    desc: "Add smooth, reveals, animations in one click.",
  },
  {
    icon: "🚀",
    title: "One Click Deploy",
    desc: "Publish your site to the web in a single click.",
  },
  {
    icon: "🔧",
    title: "Figma to Website",
    desc: "Convert your Figma designs instantly.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      style={{ padding: "120px 24px", position: "relative", overflow: "hidden" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center", marginBottom: "70px" }} className="features-header">
          <div>
            <span className="badge" style={{ marginBottom: "16px", display: "inline-flex" }}>
              <span className="badge-dot" /> Powered by AI
            </span>
            <h2 style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 900,
              fontSize: "clamp(2rem,4vw,3rem)", color: "#fff",
              lineHeight: 1.2,
            }}>
              Everything you need,<br />
              supercharged with{" "}
              <span style={{
                background: "linear-gradient(135deg,#A78BFA,#818CF8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>AI.</span>
            </h2>
          </div>
        </div>

        {/* Feature cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: "16px",
        }}>
          {features.map((feat, i) => (
            <div
              key={feat.title}
              style={{
                background: "#0D0D0D",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "14px",
                padding: "24px",
                transition: "all 0.3s ease",
                cursor: "pointer",
                animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(-6px)";
                el.style.borderColor = "rgba(124,58,237,0.35)";
                el.style.boxShadow = "0 12px 40px rgba(124,58,237,0.15)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(0)";
                el.style.borderColor = "rgba(255,255,255,0.06)";
                el.style.boxShadow = "none";
              }}
            >
              <div style={{
                fontSize: "1.8rem", marginBottom: "14px",
                transition: "transform 0.3s",
              }}>
                {feat.icon}
              </div>
              <h3 style={{
                fontFamily: "'Inter',sans-serif", fontWeight: 700,
                fontSize: "0.95rem", color: "#fff", marginBottom: "8px",
              }}>
                {feat.title}
              </h3>
              <p style={{ fontSize: "0.8rem", color: "#555", lineHeight: 1.6 }}>
                {feat.desc}
              </p>
              <div style={{
                marginTop: "16px",
                width: "28px", height: "28px", borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#555", fontSize: "0.75rem",
                transition: "all 0.3s",
              }}>→</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .features-header { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
