"use client";

import { useState, useRef, useEffect } from "react";

const FEATURES = [
  {
    id: "generator",
    tag: "Core",
    title: "AI Page Generator",
    headline: "From prompt to production in seconds.",
    desc: "Describe your vision in plain English. ZORVIQ writes the code, structures the layout, and generates pixel-perfect pages — no templates, no drag-and-drop.",
    stat: "< 5s",
    statLabel: "avg. generation time",
    accent: "#7C3AED",
    preview: (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {/* Prompt bar */}
        <div style={{
          background: "rgba(8,8,8,0.95)",
          border: "1px solid rgba(124,58,237,0.22)",
          borderRadius: "8px",
          padding: "9px 14px",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}>
          <span style={{ fontSize: "0.65rem", color: "rgba(167,139,250,0.5)", fontFamily: "'JetBrains Mono', monospace" }}>✦</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.67rem", color: "rgba(255,255,255,0.4)" }}>
            Landing page for Forge — CI/CD tool for dev teams
          </span>
          <span style={{
            display: "inline-block", width: "1.5px", height: "11px",
            background: "#7C3AED", marginLeft: "2px", verticalAlign: "middle",
            animation: "blink 1s step-end infinite",
          }} />
        </div>

        {/* Browser chrome */}
        <div style={{
          background: "#111",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "10px",
          overflow: "hidden",
        }}>
          {/* Browser top bar */}
          <div style={{
            background: "#1a1a1a",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "7px 12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>
            <div style={{ display: "flex", gap: "5px" }}>
              {["#FF5F57","#FEBC2E","#28C840"].map(c => (
                <div key={c} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c, opacity: 0.8 }} />
              ))}
            </div>
            <div style={{
              flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: "5px",
              padding: "3px 10px", display: "flex", alignItems: "center", gap: "6px",
              maxWidth: "220px", margin: "0 auto",
            }}>
              <span style={{ fontSize: "0.55rem", color: "rgba(16,185,129,0.7)" }}>🔒</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.3)" }}>
                forge.dev
              </span>
            </div>
          </div>

          {/* Page content */}
          <div style={{ background: "#0C0C14", padding: "14px 16px" }}>
            {/* Nav */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: "16px", paddingBottom: "10px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "18px", height: "18px", background: "linear-gradient(135deg,#7C3AED,#4F46E5)", borderRadius: "5px" }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "#fff" }}>Forge</span>
              </div>
              <div style={{ display: "flex", gap: "14px" }}>
                {["Product","Docs","Pricing","Changelog"].map(n => (
                  <span key={n} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.3)" }}>{n}</span>
                ))}
              </div>
              <div style={{
                background: "linear-gradient(135deg,#7C3AED,#6D28D9)",
                borderRadius: "5px", padding: "4px 10px",
                fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, color: "#fff",
              }}>Start free</div>
            </div>

            {/* Hero */}
            <div style={{ textAlign: "center", padding: "4px 0 12px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)",
                borderRadius: "99px", padding: "2px 8px", marginBottom: "8px",
              }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#10B981" }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", color: "rgba(16,185,129,0.8)" }}>Now in General Availability</span>
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: "5px", letterSpacing: "-0.03em" }}>
                Merge with confidence.<br />
                <span style={{ background: "linear-gradient(120deg,#818CF8,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Ship without fear.
                </span>
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.3)", marginBottom: "10px", lineHeight: 1.5 }}>
                CI/CD pipelines that understand your codebase.<br />Zero-config deploys for teams who move fast.
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
                <div style={{ background: "#4F46E5", borderRadius: "5px", padding: "5px 14px", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, color: "#fff" }}>
                  Start building free
                </div>
                <div style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: "5px", padding: "5px 12px", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.4)" }}>
                  View demo →
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
              {[
                { v: "12,400+", l: "Teams" },
                { v: "99.97%", l: "Uptime" },
                { v: "2.1s", l: "Avg build" },
              ].map((s, i) => (
                <div key={i} style={{
                  flex: 1, background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  borderRadius: "6px", padding: "6px 8px", textAlign: "center",
                }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#fff" }}>{s.v}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.52rem", color: "rgba(255,255,255,0.22)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Generated badge */}
        <div style={{
          position: "absolute", bottom: "6px", right: "6px",
          background: "rgba(16,185,129,0.09)",
          border: "1px solid rgba(16,185,129,0.22)",
          borderRadius: "6px",
          padding: "3px 9px",
          display: "flex", alignItems: "center", gap: "5px",
        }}>
          <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 5px #10B981" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "rgba(16,185,129,0.8)" }}>AI-generated · 4.2s</span>
        </div>
      </div>
    ),
  },
  {
    id: "copy",
    tag: "Content",
    title: "AI Copywriting",
    headline: "Words that convert, written instantly.",
    desc: "Headlines, CTAs, feature descriptions — ZORVIQ writes on-brand copy that resonates. Trained on the highest-converting landing pages on the web.",
    stat: "3×",
    statLabel: "avg. conversion lift",
    accent: "#6D28D9",
    preview: (
      <div style={{ display: "flex", flexDirection: "column", gap: "0", background: "rgba(8,8,8,0.95)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", overflow: "hidden" }}>
        {/* Editor toolbar */}
        <div style={{
          background: "#141414",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "7px 12px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}>
          <div style={{ display: "flex", gap: "5px" }}>
            {["#FF5F57","#FEBC2E","#28C840"].map(c => (
              <div key={c} style={{ width: "7px", height: "7px", borderRadius: "50%", background: c, opacity: 0.7 }} />
            ))}
          </div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.25)", marginLeft: "4px" }}>meridian-copy.md — ZORVIQ Editor</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
            <div style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: "4px", padding: "2px 8px", fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", color: "#A78BFA" }}>✦ 3 variants</div>
          </div>
        </div>

        {/* Editor body */}
        <div style={{ padding: "14px 16px" }}>
          {/* Selected / active copy block */}
          <div style={{
            background: "rgba(124,58,237,0.07)",
            border: "1px solid rgba(124,58,237,0.18)",
            borderLeft: "3px solid #7C3AED",
            borderRadius: "0 6px 6px 0",
            padding: "10px 12px",
            marginBottom: "8px",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", top: "6px", right: "8px",
              background: "rgba(124,58,237,0.2)", borderRadius: "4px", padding: "1px 6px",
              fontFamily: "'Inter', sans-serif", fontSize: "0.52rem", color: "#C4B5FD",
            }}>Selected · 94% confidence</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: "rgba(167,139,250,0.5)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Hero Headline</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", fontWeight: 800, color: "#fff", lineHeight: 1.25, letterSpacing: "-0.02em" }}>
              Turn data into decisions.<br />
              <span style={{ color: "#A78BFA" }}>In real time.</span>
            </div>
          </div>

          {/* Variant 2 */}
          <div style={{
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "6px",
            padding: "8px 12px",
            marginBottom: "6px",
            opacity: 0.65,
          }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.22)", marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Variant B</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "-0.015em" }}>
              Every metric. Every moment. One dashboard.
            </div>
          </div>

          {/* CTA rows */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginTop: "8px" }}>
            {[
              { label: "Primary CTA", text: "Get started free →", score: 97 },
              { label: "Secondary CTA", text: "See it in action", score: 88 },
            ].map((item, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "6px",
                padding: "8px 10px",
              }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.52rem", color: "rgba(255,255,255,0.2)", marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: "5px" }}>{item.text}</div>
                <div style={{ height: "2px", background: "rgba(255,255,255,0.04)", borderRadius: "1px" }}>
                  <div style={{ height: "100%", width: `${item.score}%`, background: "linear-gradient(90deg,#7C3AED,#A78BFA)", borderRadius: "1px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "design",
    tag: "Design",
    title: "AI Design System",
    headline: "Brand-perfect, every single time.",
    desc: "ZORVIQ extracts your brand DNA — colors, typography, spacing — and applies it consistently across every component and page it generates.",
    stat: "100%",
    statLabel: "brand consistency",
    accent: "#8B5CF6",
    preview: (
      <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
        {/* Token panel header */}
        <div style={{
          background: "rgba(8,8,8,0.95)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "10px",
          overflow: "hidden",
        }}>
          <div style={{
            background: "#141414",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "7px 12px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.3)" }}>
              meridian-tokens.json
            </span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", color: "rgba(167,139,250,0.5)" }}>42 tokens · synced</span>
          </div>
          <div style={{ padding: "12px 14px" }}>
            {/* Color swatches with hex */}
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "7px" }}>Color / Brand</div>
            <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
              {[
                { hex: "#0F62FE", name: "primary" },
                { hex: "#161616", name: "bg" },
                { hex: "#393939", name: "surface" },
                { hex: "#F4F4F4", name: "text" },
                { hex: "#42BE65", name: "success" },
              ].map(c => (
                <div key={c.hex} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                  <div style={{ width: "26px", height: "26px", background: c.hex, borderRadius: "5px", border: "1px solid rgba(255,255,255,0.06)" }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.45rem", color: "rgba(255,255,255,0.2)" }}>{c.hex}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.45rem", color: "rgba(255,255,255,0.2)" }}>{c.name}</span>
                </div>
              ))}
            </div>

            {/* Typography */}
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "7px" }}>Typography</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "10px" }}>
              {[
                { size: "1.6rem", weight: 800, sample: "IBM Plex Sans", role: "Display / 800" },
                { size: "0.85rem", weight: 600, sample: "IBM Plex Sans", role: "Heading / 600" },
                { size: "0.68rem", weight: 400, sample: "IBM Plex Mono", role: "Mono / 400" },
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: t.size, fontWeight: t.weight, color: "rgba(255,255,255,0.7)", lineHeight: 1 }}>{t.sample}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.52rem", color: "rgba(255,255,255,0.18)" }}>{t.role}</span>
                </div>
              ))}
            </div>

            {/* Spacing + radius tokens */}
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "7px" }}>Tokens</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "5px" }}>
              {[
                { k: "space-4", v: "16px" },
                { k: "radius-md", v: "8px" },
                { k: "shadow-lg", v: "0 8px 32px" },
                { k: "border", v: "1px solid" },
                { k: "duration", v: "220ms" },
                { k: "ease", v: "cubic-bezier" },
              ].map(t => (
                <div key={t.k} style={{
                  background: "rgba(124,58,237,0.06)",
                  border: "1px solid rgba(124,58,237,0.1)",
                  borderRadius: "5px",
                  padding: "5px 7px",
                }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.48rem", color: "rgba(167,139,250,0.55)", marginBottom: "1px" }}>{t.k}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.52rem", color: "rgba(255,255,255,0.45)" }}>{t.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "deploy",
    tag: "Deploy",
    title: "One Click Deploy",
    headline: "Live on the web in under a second.",
    desc: "No CI/CD configuration. No DNS headaches. Hit deploy and your site is globally distributed on edge infrastructure — instantly.",
    stat: "0.8s",
    statLabel: "avg. deploy time",
    accent: "#5B21B6",
    preview: (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {/* Terminal */}
        <div style={{
          background: "#0D0D0D",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "10px",
          overflow: "hidden",
        }}>
          <div style={{
            background: "#161616",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "7px 12px",
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            <div style={{ display: "flex", gap: "5px" }}>
              {["#FF5F57","#FEBC2E","#28C840"].map(c => (
                <div key={c} style={{ width: "7px", height: "7px", borderRadius: "50%", background: c, opacity: 0.7 }} />
              ))}
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.22)" }}>Terminal — zorviq deploy</span>
          </div>
          <div style={{ padding: "12px 14px", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", lineHeight: 1.85 }}>
            {[
              { text: "$ zorviq deploy --prod", color: "rgba(255,255,255,0.55)" },
              { text: "  Deploying meridian-landing (main@a3f82c1)", color: "rgba(255,255,255,0.3)" },
              { text: "✓ Build completed in 1.8s", color: "rgba(16,185,129,0.75)" },
              { text: "✓ Assets optimized · 147kb gzipped", color: "rgba(16,185,129,0.75)" },
              { text: "✓ Edge network propagated · 38 regions", color: "rgba(16,185,129,0.75)" },
              { text: "✓ SSL certificate issued", color: "rgba(16,185,129,0.75)" },
              { text: "", color: "" },
              { text: "  ⬡  meridian.app  (0.81s)", color: "#A78BFA" },
            ].map((line, i) => (
              <div key={i} style={{ color: line.color, animation: `fadeInUp 0.25s ease-out ${i * 0.1}s both` }}>{line.text || "\u00A0"}</div>
            ))}
          </div>
        </div>

        {/* Live URL + metrics */}
        <div style={{
          background: "rgba(16,185,129,0.06)",
          border: "1px solid rgba(16,185,129,0.18)",
          borderRadius: "8px",
          padding: "10px 14px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 7px #10B981", flexShrink: 0 }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "rgba(255,255,255,0.65)" }}>meridian.app</span>
          </div>
          <div style={{ display: "flex", gap: "14px" }}>
            {[{ l: "P99", v: "38ms" }, { l: "Score", v: "99" }].map(m => (
              <div key={m.l} style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "#fff" }}>{m.v}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", color: "rgba(255,255,255,0.22)" }}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Region grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "4px" }}>
          {["IAD","LHR","SIN","NRT","SYD","GRU","CDG","SEA","ORD","FRA","BOM","YYZ"].map((r, i) => (
            <div key={r} style={{
              background: i < 8 ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${i < 8 ? "rgba(16,185,129,0.18)" : "rgba(255,255,255,0.04)"}`,
              borderRadius: "4px",
              padding: "3px 0",
              textAlign: "center",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.5rem",
              color: i < 8 ? "rgba(16,185,129,0.7)" : "rgba(255,255,255,0.18)",
            }}>{r}</div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "figma",
    tag: "Import",
    title: "Figma to Website",
    headline: "Your designs, shipped — not translated.",
    desc: "Paste a Figma link. ZORVIQ reads your layers, extracts design tokens, and outputs clean, responsive React components that match your designs exactly.",
    stat: "1:1",
    statLabel: "design fidelity",
    accent: "#6D28D9",
    preview: (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {/* Top label bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: "6px", padding: "5px 10px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "0.65rem" }}>🎨</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.3)" }}>figma.com/file/vNx8a…/Apex-v2</span>
          </div>
          <div style={{ padding: "5px 10px", background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: "6px", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: "#A78BFA" }}>Sync</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          {/* Figma canvas side */}
          <div style={{
            background: "#1E1E1E",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "8px",
            overflow: "hidden",
          }}>
            <div style={{ background: "#2C2C2C", padding: "5px 8px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ fontSize: "0.55rem" }}>◆</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", color: "rgba(255,255,255,0.35)" }}>Apex / Hero / Desktop</span>
            </div>
            <div style={{ padding: "10px 10px", background: "#1a1a2e" }}>
              {/* Simulated Figma frame */}
              <div style={{ border: "1px dashed rgba(114,237,246,0.3)", borderRadius: "3px", padding: "8px" }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: "4px" }}>
                  Ship products<br />
                  <span style={{ color: "#818CF8" }}>10× faster.</span>
                </div>
                <div style={{ width: "80%", height: "3px", background: "rgba(255,255,255,0.12)", borderRadius: "2px", marginBottom: "3px" }} />
                <div style={{ width: "65%", height: "3px", background: "rgba(255,255,255,0.07)", borderRadius: "2px", marginBottom: "8px" }} />
                <div style={{ display: "inline-flex", background: "#4F46E5", borderRadius: "4px", padding: "4px 10px" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", color: "#fff", fontWeight: 600 }}>Get started</span>
                </div>
              </div>
              {/* Layer names */}
              <div style={{ marginTop: "6px", display: "flex", flexDirection: "column", gap: "2px" }}>
                {["Frame / Hero","Text / Headline","Text / Sub","Button / Primary"].map((l, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span style={{ fontSize: "0.45rem", color: "rgba(114,237,246,0.4)" }}>▸</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", color: "rgba(255,255,255,0.22)" }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Generated code side */}
          <div style={{
            background: "#0D1117",
            border: "1px solid rgba(124,58,237,0.15)",
            borderRadius: "8px",
            overflow: "hidden",
          }}>
            <div style={{ background: "#161b22", padding: "5px 8px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", color: "rgba(167,139,250,0.5)" }}>Hero.tsx — generated</span>
            </div>
            <div style={{ padding: "10px 10px", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.54rem", lineHeight: 1.75 }}>
              <div style={{ color: "rgba(255,255,255,0.18)" }}>{"export default function Hero() {"}</div>
              <div style={{ color: "rgba(255,255,255,0.18)", paddingLeft: "8px" }}>{"return ("}</div>
              <div style={{ color: "rgba(167,139,250,0.65)", paddingLeft: "16px" }}>{"<section"}</div>
              <div style={{ color: "rgba(255,255,255,0.25)", paddingLeft: "24px" }}>{"className={styles.hero}"}</div>
              <div style={{ color: "rgba(167,139,250,0.65)", paddingLeft: "16px" }}>{"/>"}</div>
              <div style={{ color: "rgba(255,255,255,0.18)", paddingLeft: "8px" }}>{");"}</div>
              <div style={{ color: "rgba(255,255,255,0.18)" }}>{"}"}</div>
            </div>
            {/* Match score */}
            <div style={{
              borderTop: "1px solid rgba(255,255,255,0.05)",
              padding: "6px 10px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.52rem", color: "rgba(255,255,255,0.2)" }}>Fidelity match</span>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <div style={{ width: "50px", height: "2px", background: "rgba(255,255,255,0.06)", borderRadius: "1px" }}>
                  <div style={{ width: "98%", height: "100%", background: "linear-gradient(90deg,#7C3AED,#10B981)", borderRadius: "1px" }} />
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "rgba(16,185,129,0.7)" }}>98%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "animations",
    tag: "Motion",
    title: "AI Animations",
    headline: "Motion that communicates, not decorates.",
    desc: "Purposeful reveals, smooth transitions, scroll-driven effects — ZORVIQ adds animation that enhances your UX without you writing a single keyframe.",
    stat: "60fps",
    statLabel: "guaranteed smooth",
    accent: "#7C3AED",
    preview: (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {/* Timeline editor */}
        <div style={{
          background: "#0D0D0D",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "10px",
          overflow: "hidden",
        }}>
          <div style={{
            background: "#161616",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "6px 12px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.25)" }}>Motion Timeline — Hero Section</span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "rgba(255,255,255,0.2)" }}>0:00 / 1.2s</span>
              <div style={{ width: "18px", height: "18px", background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.55rem", color: "#A78BFA" }}>▶</div>
            </div>
          </div>

          {/* Track rows */}
          <div style={{ padding: "8px 0" }}>
            {[
              { layer: "Navbar", color: "#818CF8", start: 0, width: 15, delay: "0s" },
              { layer: "Badge", color: "#A78BFA", start: 8, width: 18, delay: "0.08s" },
              { layer: "Headline", color: "#7C3AED", start: 12, width: 24, delay: "0.12s" },
              { layer: "Subtext", color: "#6D28D9", start: 18, width: 20, delay: "0.18s" },
              { layer: "Input", color: "#5B21B6", start: 24, width: 22, delay: "0.24s" },
              { layer: "Chips", color: "#4C1D95", start: 32, width: 18, delay: "0.32s" },
            ].map((track, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0", marginBottom: "3px" }}>
                <div style={{
                  width: "80px", flexShrink: 0,
                  padding: "3px 10px",
                  fontFamily: "'Inter', sans-serif", fontSize: "0.58rem",
                  color: "rgba(255,255,255,0.3)",
                  borderRight: "1px solid rgba(255,255,255,0.04)",
                }}>{track.layer}</div>
                <div style={{ flex: 1, position: "relative", height: "18px", background: "rgba(255,255,255,0.02)" }}>
                  <div style={{
                    position: "absolute",
                    left: `${track.start}%`,
                    width: `${track.width}%`,
                    top: "3px", bottom: "3px",
                    background: track.color,
                    opacity: 0.6,
                    borderRadius: "3px",
                    animation: `fadeInUp 0.3s ease-out ${track.delay} both`,
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Easing curve row */}
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            padding: "8px 12px",
            display: "flex", alignItems: "center", gap: "12px",
          }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", color: "rgba(255,255,255,0.2)" }}>Easing</span>
            {["cubic-bezier(0.16,1,0.3,1)","ease-out","spring(1,90,22)"].map((e, i) => (
              <div key={i} style={{
                background: i === 0 ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${i === 0 ? "rgba(124,58,237,0.25)" : "rgba(255,255,255,0.05)"}`,
                borderRadius: "4px",
                padding: "2px 8px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.5rem",
                color: i === 0 ? "#A78BFA" : "rgba(255,255,255,0.2)",
              }}>{e}</div>
            ))}
          </div>
        </div>

        {/* Live preview chips */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
          {[
            { name: "fadeInUp", dur: "0.6s", ease: "spring" },
            { name: "scaleReveal", dur: "0.4s", ease: "cubic" },
            { name: "staggerList", dur: "0.1s/item", ease: "ease-out" },
            { name: "scrollDriven", dur: "auto", ease: "linear" },
          ].map((anim, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "7px",
              padding: "8px 10px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "rgba(167,139,250,0.7)", marginBottom: "2px" }}>{anim.name}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.52rem", color: "rgba(255,255,255,0.2)" }}>{anim.ease}</div>
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "rgba(255,255,255,0.25)" }}>{anim.dur}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function Features() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActive(a => (a + 1) % FEATURES.length);
      if (e.key === "ArrowLeft") setActive(a => (a - 1 + FEATURES.length) % FEATURES.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const feat = FEATURES[active];

  return (
    <section
      id="features"
      aria-label="Product features"
      style={{
        position: "relative",
        padding: "0 24px 140px",
        background: "#060606",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow — continuous with hero */}
      <div style={{
        position: "absolute",
        top: "-200px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "900px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(124,58,237,0.10) 0%, transparent 65%)",
        filter: "blur(80px)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* ── Section header ── */}
        <div style={{
          textAlign: "center",
          marginBottom: "72px",
          animation: "featIn 0.8s cubic-bezier(0.16,1,0.3,1) both",
        }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            padding: "4px 14px 4px 10px",
            borderRadius: "9999px",
            background: "rgba(124,58,237,0.08)",
            border: "1px solid rgba(124,58,237,0.18)",
            color: "#C4B5FD",
            fontSize: "0.635rem",
            fontWeight: 500,
            letterSpacing: "0.08em",
            fontFamily: "'Inter', sans-serif",
            textTransform: "uppercase" as const,
            marginBottom: "24px",
          }}>
            <span style={{
              width: "4px", height: "4px", borderRadius: "50%",
              background: "#A78BFA",
              boxShadow: "0 0 8px rgba(167,139,250,0.9)",
            }} />
            Built for speed
          </span>

          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.2rem, 4vw, 3.6rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            color: "#f4f4f4",
            marginBottom: "18px",
          }}>
            Every tool you need,{" "}
            <span style={{
              background: "linear-gradient(128deg, #EDE9FE 0%, #C4B5FD 25%, #A78BFA 55%, #7C3AED 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>nothing you don&apos;t.</span>
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            color: "rgba(255,255,255,0.38)",
            maxWidth: "460px",
            margin: "0 auto",
            lineHeight: 1.7,
            fontWeight: 400,
            letterSpacing: "0.005em",
          }}>
            Six powerful capabilities. One unified platform. Ship your website before you finish your coffee.
          </p>
        </div>

        {/* ── Main interactive panel ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "340px 1fr",
          gap: "2px",
          background: "rgba(255,255,255,0.04)",
          borderRadius: "20px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.05)",
          animation: "featIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both",
          minHeight: "480px",
        }} className="features-panel">

          {/* ── Tab list ── */}
          <div style={{
            background: "#0A0A0A",
            borderRight: "1px solid rgba(255,255,255,0.04)",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }} role="tablist" aria-label="Feature tabs">
            {FEATURES.map((f, i) => {
              const isActive = active === i;
              const isHov = hovered === i;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${f.id}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    all: "unset",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    background: isActive
                      ? "rgba(124,58,237,0.10)"
                      : isHov
                      ? "rgba(255,255,255,0.025)"
                      : "transparent",
                    border: isActive
                      ? "1px solid rgba(124,58,237,0.20)"
                      : "1px solid transparent",
                    transition: "all 0.22s cubic-bezier(0.16,1,0.3,1)",
                    outline: "none",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Active left bar */}
                  {isActive && (
                    <div style={{
                      position: "absolute",
                      left: 0, top: "20%", bottom: "20%",
                      width: "2px",
                      background: "linear-gradient(180deg, #7C3AED, #A78BFA)",
                      borderRadius: "0 2px 2px 0",
                    }} />
                  )}

                  {/* Number */}
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    color: isActive ? "rgba(167,139,250,0.6)" : "rgba(255,255,255,0.15)",
                    minWidth: "16px",
                    transition: "color 0.2s",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Tag */}
                    <div style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.55rem",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase" as const,
                      color: isActive ? "rgba(167,139,250,0.55)" : "rgba(255,255,255,0.18)",
                      marginBottom: "2px",
                      transition: "color 0.2s",
                    }}>
                      {f.tag}
                    </div>
                    {/* Title */}
                    <div style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.82rem",
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                      transition: "color 0.2s, font-weight 0.2s",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}>
                      {f.title}
                    </div>
                  </div>

                  {/* Arrow */}
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    color: isActive ? "rgba(167,139,250,0.6)" : "rgba(255,255,255,0.1)",
                    transition: "all 0.2s",
                    transform: isActive ? "translateX(0)" : "translateX(-4px)",
                    opacity: isActive ? 1 : 0,
                  }}>→</span>
                </button>
              );
            })}
          </div>

          {/* ── Detail panel ── */}
          <div
            id={`panel-${feat.id}`}
            role="tabpanel"
            ref={previewRef}
            key={feat.id}
            style={{
              background: "#080808",
              padding: "48px 52px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "52px",
              alignItems: "center",
              animation: "panelIn 0.35s cubic-bezier(0.16,1,0.3,1) both",
            }}
            className="feat-detail"
          >
            {/* Left: copy */}
            <div>
              {/* Stat */}
              <div style={{ marginBottom: "28px" }}>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  background: "linear-gradient(128deg, #EDE9FE 0%, #A78BFA 60%, #7C3AED 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1,
                  marginBottom: "4px",
                }}>
                  {feat.stat}
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase" as const,
                  fontWeight: 500,
                }}>
                  {feat.statLabel}
                </div>
              </div>

              <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.3rem, 2vw, 1.65rem)",
                letterSpacing: "-0.03em",
                color: "#f4f4f4",
                lineHeight: 1.2,
                marginBottom: "14px",
              }}>
                {feat.headline}
              </h3>

              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.42)",
                lineHeight: 1.75,
                fontWeight: 400,
                letterSpacing: "0.005em",
                marginBottom: "32px",
              }}>
                {feat.desc}
              </p>

              <button
                style={{
                  all: "unset",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  color: "#A78BFA",
                  cursor: "pointer",
                  letterSpacing: "0.01em",
                  padding: "0",
                  transition: "gap 0.2s ease",
                  borderBottom: "1px solid rgba(167,139,250,0.25)",
                  paddingBottom: "2px",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.gap = "10px"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.gap = "6px"; }}
              >
                Learn more <span>→</span>
              </button>
            </div>

            {/* Right: visual preview */}
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "14px",
              padding: "20px",
              minHeight: "220px",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Corner accent */}
              <div style={{
                position: "absolute",
                top: 0, right: 0,
                width: "120px", height: "120px",
                background: `radial-gradient(circle at top right, ${feat.accent}18, transparent 70%)`,
                pointerEvents: "none",
              }} />
              {feat.preview}
            </div>
          </div>
        </div>

        {/* ── Bottom mini-stats strip ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          background: "rgba(255,255,255,0.04)",
          borderRadius: "14px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.05)",
          marginTop: "2px",
          animation: "featIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both",
        }} className="features-strip">
          {[
            { stat: "10,000+", label: "Sites launched" },
            { stat: "< 5s", label: "Generation time" },
            { stat: "99.99%", label: "Uptime SLA" },
            { stat: "38 regions", label: "Edge deployment" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: "#090909",
                padding: "22px 28px",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.04)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#090909"; }}
            >
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.4rem",
                fontWeight: 800,
                letterSpacing: "-0.035em",
                color: "#fff",
                marginBottom: "4px",
              }}>
                {item.stat}
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.25)",
                fontWeight: 400,
                letterSpacing: "0.02em",
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes featIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes panelIn {
          from { opacity: 0; transform: translateX(8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%,100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (max-width: 900px) {
          .features-panel {
            grid-template-columns: 1fr !important;
          }
          .feat-detail {
            grid-template-columns: 1fr !important;
            padding: 32px 24px !important;
            gap: 28px !important;
          }
          .features-strip {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          .features-strip {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}