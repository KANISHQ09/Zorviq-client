"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function AIDemo() {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [step, setStep] = useState(0);

  const steps = ["Generating layout...", "Adding content...", "Optimizing design...", "Website Ready! ✨"];

  const handleGenerate = () => {
    if (!prompt.trim() || generating) return;
    setGenerating(true);
    setStep(0);
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setGenerating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 900);
  };

  return (
    <section
      id="demo"
      style={{ padding: "100px 24px", position: "relative" }}
    >
      {/* Background accent */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.07), transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "60px", alignItems: "start" }} className="demo-grid">
          {/* Left label */}
          <div>
            <span className="badge" style={{ marginBottom: "20px", display: "inline-flex" }}>
              <span className="badge-dot" /> AI Magic
            </span>
            <h2 style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 900,
              fontSize: "clamp(1.8rem,3.5vw,2.5rem)", color: "#fff", lineHeight: 1.2,
              marginBottom: "16px",
            }}>
              From prompt to<br />live website.<br />
              <span style={{
                background: "linear-gradient(135deg,#A78BFA,#818CF8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>In moments.</span>
            </h2>
            <p style={{ color: "#555", fontSize: "0.9rem", lineHeight: 1.7 }}>
              Type any prompt. Watch Zorviq instantly generate a live, beautiful website.
            </p>
          </div>

          {/* Right: Interactive demo */}
          <div>
            {/* Prompt input */}
            <div style={{
              background: "#0D0D0D",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "14px",
              padding: "20px 24px",
              marginBottom: "16px",
              display: "flex", alignItems: "center", gap: "16px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                placeholder="Create a futuristic portfolio for a UI/UX designer"
                style={{
                  flex: 1, background: "none", border: "none", outline: "none",
                  color: "#CCC", fontSize: "0.95rem", fontFamily: "'DM Sans',sans-serif",
                }}
              />
              <button
                onClick={handleGenerate}
                disabled={generating}
                style={{
                  width: "42px", height: "42px", borderRadius: "10px",
                  background: generating ? "rgba(124,58,237,0.4)" : "linear-gradient(135deg,#7C3AED,#6366F1)",
                  border: "none", cursor: generating ? "wait" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", transition: "all 0.2s",
                  boxShadow: "0 0 16px rgba(124,58,237,0.4)",
                  flexShrink: 0,
                }}
              >
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Progress steps */}
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {steps.map((s, i) => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{
                    width: "7px", height: "7px", borderRadius: "50%",
                    background: generating && i <= step ? "#7C3AED"
                      : !generating && step === steps.length - 1 && i === step ? "#10B981"
                      : "#222",
                    boxShadow: generating && i <= step ? "0 0 8px rgba(124,58,237,0.7)" : "none",
                    transition: "all 0.4s",
                  }} />
                  <span style={{
                    fontSize: "0.7rem",
                    color: generating && i <= step ? "#A78BFA"
                      : !generating && step === steps.length - 1 && i === step ? "#10B981"
                      : "#333",
                    transition: "color 0.4s",
                  }}>{s}</span>
                </div>
              ))}
            </div>

            {/* Preview mock */}
            {step >= steps.length - 1 && !generating && (
              <div style={{
                marginTop: "20px",
                background: "#0D0D0D",
                border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: "14px",
                overflow: "hidden",
                animation: "fadeInUp 0.5s ease-out",
              }}>
                <div style={{
                  background: "#141414",
                  padding: "10px 16px",
                  display: "flex", alignItems: "center", gap: "8px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>
                  {["#EF4444","#F59E0B","#10B981"].map((c,i) => (
                    <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c }} />
                  ))}
                  <span style={{ fontSize: "0.65rem", color: "#444", marginLeft: "8px" }}>your-portfolio.zorviq.app</span>
                </div>
                <div style={{ padding: "24px" }}>
                  <div style={{ marginBottom: "12px" }}>
                    <p style={{ fontSize: "0.6rem", color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>UI/UX Designer</p>
                    <p style={{ fontSize: "1.4rem", fontFamily: "'Syne',sans-serif", fontWeight: 800, color: "#fff" }}>I&apos;m Alex,</p>
                    <p style={{ fontSize: "1.1rem", fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "#A78BFA" }}>UI/UX Designer</p>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "#555", lineHeight: 1.6, marginBottom: "16px" }}>
                    I craft intuitive digital experiences that delight users and drive results.
                  </p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div style={{ padding: "8px 16px", borderRadius: "6px", background: "linear-gradient(135deg,#7C3AED,#6366F1)", fontSize: "0.7rem", color: "#fff", fontWeight: 600 }}>View My Work</div>
                    <div style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.1)", fontSize: "0.7rem", color: "#888" }}>Contact Me</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .demo-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
