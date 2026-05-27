"use client";

const templates = [
  { name: "SaaS", emoji: "💻", color: "#7C3AED" },
  { name: "Portfolio", emoji: "🎨", color: "#6366F1" },
  { name: "Startup", emoji: "🚀", color: "#8B5CF6" },
  { name: "Agency", emoji: "🏢", color: "#7C3AED" },
  { name: "AI Product", emoji: "🤖", color: "#6366F1" },
  { name: "Creator", emoji: "✨", color: "#A78BFA" },
];

export default function Templates() {
  return (
    <section
      id="templates"
      style={{ padding: "100px 24px", position: "relative" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "280px 1fr",
          gap: "60px", alignItems: "center",
        }} className="templates-grid">
          {/* Label */}
          <div>
            <span className="badge" style={{ marginBottom: "20px", display: "inline-flex" }}>
              <span className="badge-dot" /> Templates
            </span>
            <h2 style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 900,
              fontSize: "clamp(1.8rem,3vw,2.5rem)", color: "#fff", lineHeight: 1.2,
            }}>
              Launch faster with<br />stunning templates.
            </h2>
          </div>

          {/* Template cards scroll */}
          <div style={{ overflow: "hidden" }}>
            <div style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "8px" }}>
              {templates.map((t) => (
                <div
                  key={t.name}
                  style={{
                    flexShrink: 0,
                    width: "160px",
                    background: "#0D0D0D",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "translateY(-6px)";
                    el.style.borderColor = "rgba(124,58,237,0.4)";
                    el.style.boxShadow = "0 12px 30px rgba(124,58,237,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "translateY(0)";
                    el.style.borderColor = "rgba(255,255,255,0.06)";
                    el.style.boxShadow = "none";
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{
                    height: "110px",
                    background: `linear-gradient(135deg, ${t.color}22 0%, ${t.color}08 100%)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "2.5rem",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}>
                    {t.emoji}
                  </div>
                  <div style={{ padding: "12px" }}>
                    <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#CCC" }}>{t.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .templates-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
