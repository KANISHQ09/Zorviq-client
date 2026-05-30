"use client";
import Link from "next/link";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import WebsiteShowcase from "@/components/WebsiteShowcase";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef, useCallback } from "react";
import "@/i18n";

/* ─── Data ─────────────────────────────────────────── */
const PROMPTS = [
  "Create a portfolio for a motion designer",
  "Build a coffee shop website with online ordering",
  "SaaS landing page for an AI productivity tool",
  "Personal brand site for a freelance developer",
  "E-commerce store for handmade ceramics",
];

const CHIPS = [
  { label: "Portfolio site", icon: "✦" },
  { label: "Coffee shop", icon: "☕" },
  { label: "SaaS landing", icon: "⚡" },
  { label: "Personal brand", icon: "🎯" },
];

const GEN_STEPS = [
  { label: "Understanding prompt" },
  { label: "Creating layout" },
  { label: "Writing content" },
  { label: "Generating assets" },
  { label: "Ready to deploy" },
];

export default function Hero() {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  const [promptIdx, setPromptIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [inputVal, setInputVal] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStep, setGenStep] = useState(-1);
  const [chipHover, setChipHover] = useState<number | null>(null);
  const [promptHover, setPromptHover] = useState(false);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Typewriter ─────────────────────────────────── */
  useEffect(() => {
    if (inputVal) return;
    const target = PROMPTS[promptIdx];
    if (typing) {
      if (displayed.length < target.length) {
        typingRef.current = setTimeout(
          () => setDisplayed(target.slice(0, displayed.length + 1)),
          38
        );
      } else {
        typingRef.current = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        typingRef.current = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          18
        );
      } else {
        setPromptIdx((i) => (i + 1) % PROMPTS.length);
        setTyping(true);
      }
    }
    return () => { if (typingRef.current) clearTimeout(typingRef.current); };
  }, [displayed, typing, promptIdx, inputVal]);

  /* ── Chip click → generate sequence ────────────── */
  const handleChipClick = useCallback((label: string) => {
    setInputVal(label);
    setIsGenerating(true);
    setGenStep(0);
    let step = 0;
    const advance = () => {
      step++;
      if (step < GEN_STEPS.length) {
        setGenStep(step);
        setTimeout(advance, 600);
      } else {
        setTimeout(() => { setIsGenerating(false); setGenStep(-1); }, 1400);
      }
    };
    setTimeout(advance, 600);
  }, []);

  /* ── Three.js wave grid — +25% visibility ───────── */
  useEffect(() => {
    let THREE: typeof import("three");
    let renderer: import("three").WebGLRenderer;
    let scene: import("three").Scene;
    let camera: import("three").PerspectiveCamera;
    let gridLines: import("three").LineSegments;
    let time = 0;
    /* Denser grid for more presence */
    const COLS = 32, ROWS = 20, SPACING = 1.6;

    async function init() {
      THREE = await import("three");
      const canvas = canvasRef.current;
      if (!canvas) return;
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(52, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
      camera.position.set(0, 9, 15);
      camera.lookAt(0, 0, 0);
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setClearColor(0x000000, 0);

      const positions: number[] = [];
      const W = COLS * SPACING, D = ROWS * SPACING;
      for (let r = 0; r <= ROWS; r++) {
        const z = -D / 2 + r * SPACING;
        for (let c = 0; c < COLS; c++) {
          positions.push(-W / 2 + c * SPACING, 0, z, -W / 2 + (c + 1) * SPACING, 0, z);
        }
      }
      for (let c = 0; c <= COLS; c++) {
        const x = -W / 2 + c * SPACING;
        for (let r = 0; r < ROWS; r++) {
          positions.push(x, 0, -D / 2 + r * SPACING, x, 0, -D / 2 + (r + 1) * SPACING);
        }
      }
      const geo = new THREE.BufferGeometry();
      const posArr = new Float32Array(positions);
      geo.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
      geo.setAttribute("origPos", new THREE.BufferAttribute(posArr.slice(), 3));
      /* Opacity 0.28 — slightly reduced for better headline hierarchy */
      const mat = new THREE.LineBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.28 });
      gridLines = new THREE.LineSegments(geo, mat);
      scene.add(gridLines);
      /* Lighter fog so grid reads more clearly */
      scene.fog = new THREE.FogExp2(0x060606, 0.026);
      animate(0);
    }

    let lastFrame = 0;
    function animate(ts: number) {
      animRef.current = requestAnimationFrame(animate);
      if (ts - lastFrame < 33) return;
      lastFrame = ts;
      time += 0.013;
      const posAttr = gridLines.geometry.getAttribute("position") as import("three").BufferAttribute;
      const origAttr = gridLines.geometry.getAttribute("origPos") as import("three").BufferAttribute;
      for (let i = 0; i < posAttr.count; i++) {
        const ox = origAttr.getX(i), oz = origAttr.getZ(i);
        /* Slightly higher amplitude: 0.58 → 0.72 */
        posAttr.setY(i, Math.sin(ox * 0.38 + time) * Math.cos(oz * 0.28 + time * 0.65) * 0.72);
      }
      posAttr.needsUpdate = true;
      camera.position.x += (mouseRef.current.x * 1.2 - camera.position.x) * 0.022;
      camera.position.y += (9 - mouseRef.current.y * 0.7 - camera.position.y) * 0.022;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }

    const onResize = () => {
      const canvas = canvasRef.current;
      if (!canvas || !renderer) return;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    init();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      renderer?.dispose();
    };
  }, []);

  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      paddingTop: "90px",
      paddingBottom: "70px",
      background: "#060606",
    }}>
      {/* Three.js canvas */}
      <canvas ref={canvasRef} style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0, opacity: 1,
      }} />

      {/* Primary ambient glow — strengthened */}
      <div style={{
        position: "absolute", top: "-60px", left: "50%", transform: "translateX(-50%)",
        width: "1300px", height: "620px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(124,58,237,0.22) 0%, rgba(109,40,217,0.09) 42%, transparent 68%)",
        filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
      }} />
      {/* Secondary accent — bottom right */}
      <div style={{
        position: "absolute", bottom: "0", left: "58%", transform: "translateX(-50%)",
        width: "700px", height: "360px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 62%)",
        filter: "blur(70px)", pointerEvents: "none", zIndex: 0,
      }} />

      {/* Vignette — tighter to preserve grid in center */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        background: "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 45%, #060606 100%)",
      }} />

      {/* ═══ Main layout ═══ */}
      <div style={{
        position: "relative", zIndex: 2,
        width: "100%", maxWidth: "1320px",
        margin: "0 auto", padding: "0 56px",
        display: "flex",
        alignItems: "center",
        gap: "84px",
        animation: "heroIn 1s cubic-bezier(0.16,1,0.3,1) both",
      }}>

        {/* ── Left column ── */}
        <div style={{ flex: "1 1 520px", minWidth: 0 }}>

          {/* Badge */}
          <div style={{
            marginBottom: "36px",
            animation: "heroIn 1s cubic-bezier(0.16,1,0.3,1) 0.08s both",
          }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "5px 16px 5px 10px", borderRadius: "9999px",
              background: "rgba(124,58,237,0.08)",
              border: "1px solid rgba(124,58,237,0.20)",
              color: "#C4B5FD",
              fontSize: "0.655rem",
              fontWeight: 500,
              letterSpacing: "0.07em",
              fontFamily: "'Inter', sans-serif",
              textTransform: "uppercase" as const,
              boxShadow: "0 0 20px rgba(124,58,237,0.08), inset 0 1px 0 rgba(167,139,250,0.07)",
            }}>
              <span style={{
                width: "5px", height: "5px", borderRadius: "50%",
                background: "#A78BFA",
                boxShadow: "0 0 10px rgba(167,139,250,0.9), 0 0 4px rgba(167,139,250,0.6)",
                flexShrink: 0,
              }} />
              {t("hero.badge")}
            </span>
          </div>

          {/* Headline — display weight, tighter tracking */}
          <h1 style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.9rem, 4.8vw, 4.6rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.048em",
            marginBottom: "32px",
            fontFeatureSettings: "'cv02','cv03','cv04','cv11'",
            animation: "heroIn 1s cubic-bezier(0.16,1,0.3,1) 0.12s both",
          }}>
            <span style={{ display: "block", color: "#f4f4f4", marginBottom: "2px" }}>
              {t("hero.title1")}
            </span>
            <span style={{
              display: "block",
              background: "linear-gradient(128deg, #EDE9FE 0%, #C4B5FD 22%, #A78BFA 48%, #8B5CF6 74%, #7C3AED 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "2px",
            }}>
              {t("hero.title2")}
            </span>
            <span style={{ display: "block", color: "#f4f4f4" }}>
              {t("hero.title3")}
            </span>
          </h1>

          {/* Subtext — stronger presence */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.05rem",
            color: "rgba(255,255,255,0.62)",
            lineHeight: 1.75,
            maxWidth: "400px",
            marginBottom: "52px",
            fontWeight: 400,
            letterSpacing: "0.005em",
            animation: "heroIn 1s cubic-bezier(0.16,1,0.3,1) 0.18s both",
          }}>
            {t("hero.subheading")}
          </p>

          {/* ── Prompt input ── */}
          <div style={{
            maxWidth: "520px",
            marginBottom: "20px",
            position: "relative",
            animation: "heroIn 1s cubic-bezier(0.16,1,0.3,1) 0.24s both",
          }}>
            {/* Ambient glow behind input */}
            <div style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "130%", height: "280%",
              borderRadius: "50%",
              background: promptHover
                ? "radial-gradient(ellipse, rgba(124,58,237,0.13) 0%, transparent 65%)"
                : "radial-gradient(ellipse, rgba(124,58,237,0.05) 0%, transparent 65%)",
              filter: "blur(50px)",
              pointerEvents: "none",
              transition: "all 0.7s ease",
              zIndex: 0,
            }} />
            {/* Rotating border glow */}
            <div style={{
              position: "absolute", inset: "-1px", borderRadius: "14px",
              background: promptHover
                ? "conic-gradient(from 0deg, transparent 30%, rgba(124,58,237,0.55) 52%, rgba(167,139,250,0.35) 68%, transparent 83%)"
                : "conic-gradient(from 0deg, transparent 52%, rgba(124,58,237,0.28) 70%, transparent 87%)",
              animation: "spinGlow 8s linear infinite",
              zIndex: 0,
              transition: "all 0.6s ease",
            }} />
            <div
              onMouseEnter={() => setPromptHover(true)}
              onMouseLeave={() => setPromptHover(false)}
              style={{
                position: "relative", zIndex: 1,
                background: "rgba(10,10,10,0.96)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: promptHover
                  ? "1px solid rgba(124,58,237,0.32)"
                  : "1px solid rgba(255,255,255,0.07)",
                borderRadius: "13px",
                padding: "7px 7px 7px 18px",
                boxShadow: promptHover
                  ? "0 24px 64px rgba(0,0,0,0.65), 0 0 0 1px rgba(124,58,237,0.08), inset 0 1px 0 rgba(255,255,255,0.04)"
                  : "0 16px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.02)",
                display: "flex", alignItems: "center",
                transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                cursor: "text",
              }}
            >
              <Sparkles size={14} color={promptHover ? "#A78BFA" : "#6D28D9"} style={{
                flexShrink: 0, opacity: 0.75,
                transition: "all 0.3s ease",
              }} />
              <span style={{
                flex: 1, fontSize: "0.84rem",
                color: "rgba(255,255,255,0.30)",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 400,
                padding: "11px 16px",
                whiteSpace: "nowrap", overflow: "hidden",
                letterSpacing: "0.01em",
              }}>
                {inputVal || displayed}
                {!inputVal && (
                  <span style={{
                    display: "inline-block", width: "1.5px", height: "13px",
                    background: "#7C3AED", marginLeft: "1px", verticalAlign: "middle",
                    animation: "blink 1s step-end infinite",
                    opacity: 0.85,
                  }} />
                )}
              </span>
              <Link href="/signup" style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                color: "#fff", textDecoration: "none",
                fontSize: "0.78rem", fontWeight: 500,
                fontFamily: "'Inter', sans-serif",
                padding: "11px 22px", borderRadius: "9px",
                whiteSpace: "nowrap", flexShrink: 0,
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                boxShadow: "0 1px 0 rgba(255,255,255,0.10) inset, 0 0 20px rgba(124,58,237,0.22)",
                letterSpacing: "0.012em",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 0 rgba(255,255,255,0.12) inset, 0 0 32px rgba(124,58,237,0.40)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 0 rgba(255,255,255,0.10) inset, 0 0 20px rgba(124,58,237,0.22)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {t("hero.cta_primary")} <ArrowRight size={13} strokeWidth={2} />
              </Link>
            </div>
          </div>

          {/* ── Prompt chips ── */}
          <div style={{
            display: "flex", gap: "7px", flexWrap: "wrap", alignItems: "center",
            marginBottom: "36px",
            animation: "heroIn 1s cubic-bezier(0.16,1,0.3,1) 0.32s both",
          }}>
            <span style={{
              fontSize: "0.67rem",
              color: "rgba(255,255,255,0.24)",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 450,
              marginRight: "2px",
              letterSpacing: "0.02em",
            }}>Try:</span>
            {CHIPS.map((chip, i) => (
              <button
                key={chip.label}
                onClick={() => handleChipClick(chip.label)}
                onMouseEnter={() => setChipHover(i)}
                onMouseLeave={() => setChipHover(null)}
                style={{
                  background: chipHover === i
                    ? "rgba(124,58,237,0.12)"
                    : "rgba(255,255,255,0.035)",
                  border: chipHover === i
                    ? "1px solid rgba(124,58,237,0.32)"
                    : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  padding: "6px 13px",
                  fontSize: "0.71rem",
                  color: chipHover === i ? "#D4C5FE" : "rgba(255,255,255,0.36)",
                  cursor: "pointer",
                  transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                  fontWeight: 450,
                  fontFamily: "'Inter', sans-serif",
                  display: "inline-flex", alignItems: "center", gap: "5px",
                  transform: chipHover === i ? "translateY(-1.5px)" : "none",
                  letterSpacing: "0.008em",
                  boxShadow: chipHover === i ? "0 6px 20px rgba(124,58,237,0.16), 0 0 0 1px rgba(124,58,237,0.06)" : "none",
                }}
              >
                <span style={{ fontSize: "0.64rem", opacity: chipHover === i ? 1 : 0.65 }}>{chip.icon}</span>
                {chip.label}
              </button>
            ))}
          </div>

          {/* Credibility signals */}
          <div style={{
            display: "flex", gap: "20px", alignItems: "center",
            animation: "heroIn 1s cubic-bezier(0.16,1,0.3,1) 0.38s both",
          }}>
            {[
              { label: "React & Next.js" },
              { label: "Production-ready" },
              { label: "Deploy in seconds" },
            ].map((item) => (
              <span key={item.label} style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                fontSize: "0.665rem",
                color: "rgba(255,255,255,0.22)",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                letterSpacing: "0.02em",
              }}>
                <span style={{
                  width: "3px", height: "3px", borderRadius: "50%",
                  background: "rgba(167,139,250,0.5)", flexShrink: 0,
                }} />
                {item.label}
              </span>
            ))}
          </div>

          {/* ── AI Generation progress ── */}
          {isGenerating && (
            <div style={{
              marginTop: "36px",
              background: "rgba(124,58,237,0.03)",
              border: "1px solid rgba(124,58,237,0.09)",
              borderRadius: "12px",
              padding: "18px 22px",
              maxWidth: "320px",
              animation: "fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1) both",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "8px",
                marginBottom: "16px", paddingBottom: "12px",
                borderBottom: "1px solid rgba(124,58,237,0.07)",
              }}>
                <div style={{
                  width: "5px", height: "5px", borderRadius: "50%",
                  background: "#A78BFA",
                  boxShadow: "0 0 10px rgba(167,139,250,0.6)",
                  animation: "subtlePulse 2s ease-in-out infinite",
                }} />
                <span style={{
                  fontSize: "0.62rem",
                  color: "rgba(167,139,250,0.75)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                }}>
                  Generating
                </span>
              </div>

              {GEN_STEPS.map((step, i) => (
                <div key={step.label} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "5px 0",
                  opacity: i <= genStep ? 1 : 0.12,
                  transition: "opacity 0.5s ease",
                }}>
                  <span style={{
                    width: "16px", height: "16px",
                    borderRadius: "50%",
                    background: i < genStep
                      ? "rgba(124,58,237,0.85)"
                      : i === genStep
                        ? "rgba(124,58,237,0.10)"
                        : "rgba(255,255,255,0.02)",
                    border: i === genStep
                      ? "1px solid rgba(124,58,237,0.45)"
                      : i < genStep
                        ? "1px solid transparent"
                        : "1px solid rgba(255,255,255,0.04)",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                  }}>
                    {i < genStep && <Check size={9} color="#fff" strokeWidth={2.5} />}
                    {i === genStep && (
                      <span style={{
                        width: "5px", height: "5px", borderRadius: "50%",
                        background: "#A78BFA",
                        animation: "subtlePulse 1.2s ease-in-out infinite",
                        display: "block",
                      }} />
                    )}
                  </span>
                  <span style={{
                    fontSize: "0.72rem",
                    color: i <= genStep ? "rgba(255,255,255,0.52)" : "rgba(255,255,255,0.10)",
                    fontFamily: "'Inter', sans-serif",
                    transition: "color 0.5s ease",
                    fontWeight: i === genStep ? 500 : 400,
                    letterSpacing: "0.005em",
                  }}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>



        {/* ── Right: Website Showcase ── */}
        <WebsiteShowcase />

      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes spinGlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes subtlePulse {
          0%,100% { opacity: 1; }
          50%     { opacity: 0.45; }
        }
        @media (max-width: 900px) {
          .hero-preview { display: none !important; }
        }
        @media (max-width: 600px) {
          h1 { font-size: 2.3rem !important; }
        }
      `}</style>
    </section>
  );
}