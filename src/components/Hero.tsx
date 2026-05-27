"use client";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import "@/i18n";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >
      {/* Background radial glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.25), transparent 65%)",
        pointerEvents: "none",
      }} />
      {/* Star dots */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {Array.from({ length: 60 }).map((_, i) => {
          // Deterministic pseudo-random using index
          const seed = (i * 2654435761) >>> 0;
          const top = ((seed % 10000) / 100).toFixed(2);
          const left = (((seed * 1234567) % 10000) / 100).toFixed(2);
          const size = (((seed * 987) % 20) / 10 + 1).toFixed(1);
          const dur = (((seed * 321) % 30) / 10 + 2).toFixed(1);
          const delay = (((seed * 654) % 30) / 10).toFixed(1);
          return (
            <div key={i} style={{
              position: "absolute",
              width: size + "px", height: size + "px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.35)",
              top: top + "%", left: left + "%",
              animation: `blink ${dur}s ease-in-out infinite`,
              animationDelay: delay + "s",
            }} />
          );
        })}
      </div>

      {/* Abstract purple orbs */}
      <div style={{
        position: "absolute", right: "-5%", top: "10%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
        animation: "float 6s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", left: "-8%", bottom: "20%",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        animation: "float 8s ease-in-out infinite reverse",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: "1280px", margin: "0 auto",
        padding: "0 24px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "60px",
        alignItems: "center",
      }} className="hero-grid">

        {/* LEFT CONTENT */}
        <div style={{ animation: "fadeInUp 0.8s ease-out both" }}>
          {/* Badge */}
          <div style={{ marginBottom: "28px" }}>
            <span className="badge">
              <span className="badge-dot" />
              {t("hero.badge")}
            </span>
          </div>

          {/* H1 */}
          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.6rem, 5vw, 4.2rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            marginBottom: "24px",
          }}>
            {t("hero.title1")}<br />
            {t("hero.title2")}{" "}
            <span style={{
              background: "linear-gradient(135deg,#A78BFA,#818CF8,#C4B5FD)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {t("hero.title3")}
            </span>
          </h1>

          {/* Subheading */}
          <p style={{
            fontSize: "1.05rem",
            color: "#888",
            lineHeight: 1.7,
            marginBottom: "36px",
            maxWidth: "480px",
            whiteSpace: "pre-line",
          }}>
            {t("hero.subheading")}
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link
              href="/signup"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "linear-gradient(135deg,#7C3AED,#6366F1)",
                color: "#fff", textDecoration: "none",
                fontSize: "0.95rem", fontWeight: 600,
                padding: "14px 28px", borderRadius: "10px",
                boxShadow: "0 0 30px rgba(124,58,237,0.4)",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 50px rgba(124,58,237,0.7)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(124,58,237,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              id="hero-cta-primary"
            >
              {t("hero.cta_primary")} <ArrowRight size={16} />
            </Link>
            <button
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "none", border: "none",
                color: "#CCC", fontSize: "0.9rem", fontWeight: 500,
                cursor: "pointer", padding: "14px 4px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#CCC")}
              id="hero-watch-demo"
            >
              <span style={{
                width: "36px", height: "36px", borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(255,255,255,0.04)",
              }}>
                <Play size={12} fill="currentColor" />
              </span>
              {t("hero.watch_demo")}
            </button>
          </div>

          {/* Trust logos */}
          <div style={{ marginTop: "48px" }}>
            <p style={{ fontSize: "0.72rem", color: "#444", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>
              {t("hero.trusted")}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "28px", flexWrap: "wrap" }}>
              {["Webflow", "Vercel", "Framer", "Notion", "HubSpot", "Airtable"].map((brand) => (
                <span key={brand} style={{ color: "#444", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.02em" }}>
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Floating UI mockup */}
        <div style={{ position: "relative", animation: "fadeInUp 1s ease-out 0.2s both" }}>
          {/* Main editor card */}
          <div className="bg-glass" style={{
            borderRadius: "16px",
            padding: "0",
            overflow: "hidden",
            boxShadow: "0 0 80px rgba(124,58,237,0.12), 0 24px 60px rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
            {/* Window chrome */}
            <div style={{
              background: "#141414",
              padding: "12px 16px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ display: "flex", gap: "8px" }}>
                {["#EF4444","#F59E0B","#10B981"].map((c,i) => (
                  <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
                ))}
              </div>
              <span style={{ fontSize: "0.7rem", color: "#555", fontFamily: "monospace" }}>{t("hero.editor")}</span>
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={{ width: "14px", height: "14px", borderRadius: "2px", background: "rgba(255,255,255,0.1)" }} />
              </div>
            </div>
            {/* Editor content */}
            <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", minHeight: "260px" }}>
              {/* Sidebar */}
              <div style={{ background: "#0D0D0D", padding: "16px", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
                {[
                  { icon: "⚡", label: "Generate" },
                  { icon: "🎨", label: "Design" },
                  { icon: "📄", label: "Content" },
                  { icon: "🖼️", label: "Images" },
                  { icon: "⚙️", label: "Customize" },
                  { icon: "🚀", label: "Publish" },
                ].map((item) => (
                  <div key={item.label} style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "8px 10px", borderRadius: "6px",
                    marginBottom: "2px",
                    background: item.label === "Generate" ? "rgba(124,58,237,0.15)" : "transparent",
                    color: item.label === "Generate" ? "#A78BFA" : "#555",
                    fontSize: "0.78rem", fontWeight: 500,
                    cursor: "pointer",
                  }}>
                    <span style={{ fontSize: "0.9rem" }}>{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
              {/* Preview area */}
              <div style={{ padding: "20px", position: "relative" }}>
                <div style={{
                  background: "linear-gradient(135deg,rgba(124,58,237,0.06),rgba(99,102,241,0.06))",
                  borderRadius: "8px", padding: "16px",
                  border: "1px solid rgba(124,58,237,0.15)",
                  marginBottom: "12px",
                }}>
                  <p style={{ fontSize: "0.75rem", color: "#666", marginBottom: "6px" }}>{t("hero.ready")}</p>
                  <p style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", fontFamily: "'Syne',sans-serif" }}>{t("hero.design_that")}</p>
                  <p style={{ fontSize: "1rem", fontWeight: 700, color: "#A78BFA" }}>{t("hero.inspires")}</p>
                  <p style={{ fontSize: "0.65rem", color: "#555", marginTop: "6px" }}>{t("hero.design_desc")}</p>
                  <div style={{
                    marginTop: "10px",
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    background: "rgba(124,58,237,0.2)", padding: "5px 12px",
                    borderRadius: "6px", fontSize: "0.65rem", color: "#A78BFA", fontWeight: 600, cursor: "pointer",
                  }}>
                    {t("hero.preview")}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  {["Generating layout...","Adding content...","Optimizing...","Website Ready!"].map((step, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <div style={{
                        width: "6px", height: "6px", borderRadius: "50%",
                        background: i === 3 ? "#10B981" : i < 3 ? "#7C3AED" : "#333",
                        boxShadow: i <= 2 ? "0 0 6px rgba(124,58,237,0.6)" : "none",
                      }} />
                      <span style={{ fontSize: "0.55rem", color: i <= 2 ? "#888" : "#444", whiteSpace: "nowrap" }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating AI card */}
          <div className="bg-glass" style={{
            position: "absolute", right: "-24px", top: "20px",
            width: "160px", padding: "14px",
            borderRadius: "12px",
            border: "1px solid rgba(124,58,237,0.25)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            animation: "float 5s ease-in-out infinite",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "50%",
                background: "linear-gradient(135deg,#7C3AED,#6366F1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.75rem",
              }}>🤖</div>
              <div>
                <p style={{ fontSize: "0.65rem", color: "#fff", fontWeight: 600 }}>{t("hero.ai_assistant")}</p>
                <p style={{ fontSize: "0.55rem", color: "#555" }}>{t("hero.online")}</p>
              </div>
            </div>
            <p style={{ fontSize: "0.65rem", color: "#888", lineHeight: 1.5 }}>{t("hero.greeting")}</p>
            <div style={{
              marginTop: "8px", background: "rgba(124,58,237,0.1)",
              borderRadius: "6px", padding: "6px 8px",
              fontSize: "0.58rem", color: "#A78BFA",
            }}>{t("hero.prompt")}</div>
          </div>

          {/* Stats card */}
          <div className="bg-glass" style={{
            position: "absolute", left: "-20px", bottom: "-20px",
            padding: "14px 20px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.07)",
            animation: "float 7s ease-in-out infinite reverse",
          }}>
            <div style={{ display: "flex", gap: "20px" }}>
              {[{ n: "12K+", l: "Sites Built" }, { n: "98%", l: "Satisfaction" }, { n: "4.9/5", l: "Rating" }].map(({ n, l }) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "1rem", fontWeight: 800, color: "#fff", fontFamily: "'Syne',sans-serif" }}>{n}</p>
                  <p style={{ fontSize: "0.58rem", color: "#555" }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
