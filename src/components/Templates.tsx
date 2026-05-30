"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Layers, Zap, Users } from "lucide-react";

/* ─── Preview components ────────────────────────────── */

function SaaSPreview() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#07070D", display: "flex", flexDirection: "column", fontFamily: "'Inter',sans-serif", position: "relative", overflow: "hidden", padding: "12px 14px" }}>
      <div style={{ position: "absolute", top: -20, left: "50%", transform: "translateX(-50%)", width: 180, height: 80, background: "radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 1, marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 7, height: 7, borderRadius: 2, background: "linear-gradient(135deg,#7C3AED,#6D28D9)" }} />
          <span style={{ fontSize: 6, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>Supra</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {["Product", "Docs", "Pricing", "Blog"].map(t => (
            <span key={t} style={{ fontSize: 4.5, color: "rgba(255,255,255,0.38)" }}>{t}</span>
          ))}
          <div style={{ padding: "1.5px 5px", background: "linear-gradient(135deg,#7C3AED,#6D28D9)", borderRadius: 3, display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 4, color: "#fff", fontWeight: 600 }}>Start free</span>
          </div>
        </div>
      </div>

      {/* Announcement bar */}
      <div style={{ zIndex: 1, display: "flex", justifyContent: "center", marginBottom: 8 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 3, background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.18)", padding: "1.5px 6px", borderRadius: 99 }}>
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#7C3AED", display: "inline-block" }} />
          <span style={{ fontSize: 3.8, color: "#A78BFA", fontWeight: 600, letterSpacing: "0.04em" }}>Supra 3.0 is here — read the announcement</span>
          <span style={{ fontSize: 3.8, color: "rgba(167,139,250,0.6)" }}>→</span>
        </div>
      </div>

      {/* Hero */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", zIndex: 1, gap: 4 }}>
        <h1 style={{ fontSize: 10, fontWeight: 800, color: "#fff", letterSpacing: "-0.035em", lineHeight: 1.12, margin: 0, maxWidth: 200 }}>
          The database built for the modern web.
        </h1>
        <p style={{ fontSize: 4.5, color: "rgba(255,255,255,0.42)", maxWidth: 180, lineHeight: 1.4, margin: 0 }}>
          Serverless Postgres with branching, point-in-time recovery, and a generous free tier.
        </p>
        <div style={{ display: "flex", gap: 4, marginTop: 3 }}>
          <div style={{ padding: "2.5px 8px", background: "linear-gradient(135deg,#7C3AED,#6D28D9)", borderRadius: 4, fontSize: 4.5, color: "#fff", fontWeight: 600, boxShadow: "0 4px 12px rgba(124,58,237,0.35)" }}>
            Get started free
          </div>
          <div style={{ padding: "2.5px 8px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, fontSize: 4.5, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>
            View docs →
          </div>
        </div>
        <p style={{ fontSize: 3.8, color: "rgba(255,255,255,0.22)", margin: 0 }}>No credit card required · Free tier includes 0.5 GB storage</p>
      </div>
    </div>
  );
}

function PortfolioPreview() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#FAFAF8", display: "flex", flexDirection: "column", fontFamily: "'Inter',sans-serif", position: "relative", overflow: "hidden", padding: "12px 14px" }}>
      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, borderBottom: "1px solid rgba(0,0,0,0.05)", paddingBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=48&h=48&q=80" style={{ width: 11, height: 11, borderRadius: "50%", objectFit: "cover" }} alt="Marcus" />
          <span style={{ fontSize: 6, fontWeight: 700, color: "#111", letterSpacing: "-0.01em" }}>Marcus Wei</span>
        </div>
        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
          {["Work", "Writing", "About"].map(t => (
            <span key={t} style={{ fontSize: 5, color: "#444", fontWeight: 500 }}>{t}</span>
          ))}
          <span style={{ fontSize: 4.5, color: "#10B981", background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.18)", padding: "1px 5px", borderRadius: 3, fontWeight: 600 }}>Available</span>
        </div>
      </div>

      {/* Layout */}
      <div style={{ display: "flex", gap: 10, flex: 1, alignItems: "flex-start" }}>
        {/* Left */}
        <div style={{ flex: 1.1, display: "flex", flexDirection: "column", gap: 4 }}>
          <h2 style={{ fontSize: 9.5, fontWeight: 800, color: "#111", letterSpacing: "-0.03em", lineHeight: 1.2, margin: 0 }}>
            Product engineer & design systems lead.
          </h2>
          <p style={{ fontSize: 4.5, color: "#666", lineHeight: 1.4, margin: 0 }}>
            5 years at Vercel, Linear, and startups. I build the interfaces people actually use.
          </p>
          <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginTop: 2 }}>
            {["React", "TypeScript", "Figma", "Node"].map(tag => (
              <span key={tag} style={{ fontSize: 3.8, color: "#555", background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.07)", padding: "1px 4px", borderRadius: 3 }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Right — selected work */}
        <div style={{ flex: 0.9, display: "flex", flexDirection: "column", gap: 3, background: "#fff", border: "1px solid rgba(0,0,0,0.05)", borderRadius: 6, padding: "5px 7px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
          <span style={{ fontSize: 4.2, color: "#999", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Selected work</span>
          {[
            { name: "Velo Editor", sub: "Rust · WebAssembly", yr: "2026", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=48&h=48&q=80" },
            { name: "Helix Sync", sub: "Local-first DB", yr: "2025", img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=48&h=48&q=80" },
            { name: "Orbit Design", sub: "Design system", yr: "2024", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=48&h=48&q=80" },
          ].map((p, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: i < 2 ? 2.5 : 0, borderBottom: i < 2 ? "1px solid rgba(0,0,0,0.04)" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <img src={p.img} style={{ width: 13, height: 13, borderRadius: 3, objectFit: "cover" }} alt={p.name} />
                <div>
                  <div style={{ fontSize: 5, fontWeight: 700, color: "#111" }}>{p.name}</div>
                  <div style={{ fontSize: 3.8, color: "#888" }}>{p.sub}</div>
                </div>
              </div>
              <span style={{ fontSize: 3.8, color: "#aaa" }}>{p.yr}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AgencyPreview() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#040404", display: "flex", flexDirection: "column", fontFamily: "'Inter',sans-serif", overflow: "hidden", position: "relative", padding: "12px 14px" }}>
      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 7, marginBottom: 10 }}>
        <span style={{ fontSize: 6.5, fontWeight: 800, color: "#fff", letterSpacing: "0.18em" }}>FORM</span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {["Work", "Studio", "Process", "Contact"].map(t => (
            <span key={t} style={{ fontSize: 4.5, color: "rgba(255,255,255,0.35)" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", gap: 12, flex: 1, alignItems: "center" }}>
        {/* Left */}
        <div style={{ flex: 1.3, display: "flex", flexDirection: "column", gap: 5 }}>
          <div style={{ fontSize: 4, color: "rgba(255,255,255,0.3)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Est. 2019 · Berlin</div>
          <h2 style={{ fontSize: 10.5, fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.08, textTransform: "uppercase", margin: 0 }}>
            Design that moves <span style={{ color: "#E84040" }}>people</span> and products forward.
          </h2>
          <p style={{ fontSize: 4.5, color: "rgba(255,255,255,0.35)", lineHeight: 1.45, margin: 0 }}>
            Brand, digital, and motion for companies that refuse to blend in.
          </p>
        </div>

        {/* Right — selected work list */}
        <div style={{ flex: 0.7, display: "flex", flexDirection: "column", gap: 4, borderLeft: "1px solid rgba(255,255,255,0.07)", paddingLeft: 10 }}>
          <span style={{ fontSize: 4, color: "rgba(255,255,255,0.25)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Recent work</span>
          {[
            { n: "Figura App", l: "Brand identity", img: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=48&h=48&q=80" },
            { n: "Lumen Finance", l: "Web & product", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=48&h=48&q=80" },
            { n: "Cove Hotels", l: "Campaign design", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=48&h=48&q=80" },
          ].map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <img src={c.img} style={{ width: 14, height: 14, borderRadius: 3, objectFit: "cover", opacity: 0.85 }} alt={c.n} />
              <div>
                <div style={{ fontSize: 5, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>{c.n}</div>
                <div style={{ fontSize: 3.8, color: "rgba(255,255,255,0.3)" }}>{c.l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AIProductPreview() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#020509", display: "flex", flexDirection: "column", fontFamily: "'Inter',sans-serif", position: "relative", overflow: "hidden", padding: "12px 14px" }}>
      <div style={{ position: "absolute", top: "35%", left: "50%", transform: "translate(-50%,-50%)", width: 160, height: 90, background: "radial-gradient(ellipse,rgba(0,210,190,0.1) 0%,transparent 70%)", pointerEvents: "none" }} />

      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: 6, marginBottom: 9, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 7, height: 7, borderRadius: 2, background: "linear-gradient(135deg,#00D2BE,#0891B2)" }} />
          <span style={{ fontSize: 6, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>Nexus</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          {["Models", "API", "Pricing", "Docs"].map(t => (
            <span key={t} style={{ fontSize: 4.5, color: "rgba(255,255,255,0.35)" }}>{t}</span>
          ))}
          <span style={{ fontSize: 4.2, color: "#00D2BE", border: "1px solid rgba(0,210,190,0.22)", background: "rgba(0,210,190,0.05)", borderRadius: 3, padding: "1.5px 5px", fontWeight: 500 }}>Console →</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", gap: 10, flex: 1, alignItems: "center", position: "relative", zIndex: 1 }}>
        {/* Copy */}
        <div style={{ flex: 1.1, display: "flex", flexDirection: "column", gap: 3.5 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 3, background: "rgba(0,210,190,0.07)", border: "1px solid rgba(0,210,190,0.15)", padding: "1px 5px", borderRadius: 99, width: "fit-content" }}>
            <span style={{ width: 3.5, height: 3.5, background: "#00D2BE", borderRadius: "50%", display: "inline-block" }} />
            <span style={{ fontSize: 3.8, color: "#00D2BE", fontWeight: 600 }}>Nexus-3 now available</span>
          </div>
          <h2 style={{ fontSize: 9.5, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.12, margin: 0 }}>
            Run frontier models at <span style={{ background: "linear-gradient(120deg, #00D2BE, #38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>production scale.</span>
          </h2>
          <p style={{ fontSize: 4.5, color: "rgba(255,255,255,0.38)", lineHeight: 1.4, margin: 0 }}>
            Sub-10ms TTFT. 99.99% uptime SLA. Pay per token.
          </p>
        </div>

        {/* Status panel */}
        <div style={{ flex: 0.9, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 7, padding: "6px 7px", display: "flex", flexDirection: "column", gap: 3.5 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 2.5, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <span style={{ fontSize: 4.2, color: "rgba(255,255,255,0.28)", fontWeight: 500 }}>Inference status</span>
            <span style={{ fontSize: 4, color: "#10B981", fontWeight: 600 }}>● All systems normal</span>
          </div>
          {[
            { l: "us-east-1", v: "7.2 ms", c: "#10B981" },
            { l: "eu-west-2", v: "11.8 ms", c: "#10B981" },
            { l: "ap-southeast-1", v: "19.3 ms", c: "#F59E0B" },
          ].map(e => (
            <div key={e.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 4.5, color: "rgba(255,255,255,0.4)" }}>{e.l}</span>
              <span style={{ fontSize: 4.5, color: e.c, fontWeight: 600 }}>{e.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CreatorPreview() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#08020F", display: "flex", flexDirection: "column", fontFamily: "'Inter',sans-serif", overflow: "hidden", position: "relative", padding: "12px 14px" }}>
      <div style={{ position: "absolute", top: "-15%", right: "-5%", width: 100, height: 100, background: "radial-gradient(ellipse,rgba(224,64,251,0.12) 0%,transparent 70%)", pointerEvents: "none" }} />

      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 6, marginBottom: 9, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80" style={{ width: 11, height: 11, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(255,255,255,0.12)" }} alt="Lena" />
          <span style={{ fontSize: 6, fontWeight: 700, color: "#fff" }}>lenamarks.co</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {["Archive", "About", "Uses"].map(t => (
            <span key={t} style={{ fontSize: 4.5, color: "rgba(255,255,255,0.35)" }}>{t}</span>
          ))}
          <div style={{ background: "#E040FB", borderRadius: 3, padding: "1.5px 5px" }}>
            <span style={{ fontSize: 4, color: "#fff", fontWeight: 600 }}>Subscribe</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", gap: 10, flex: 1, alignItems: "center", position: "relative", zIndex: 1 }}>
        {/* Left */}
        <div style={{ flex: 1.1, display: "flex", flexDirection: "column", gap: 4 }}>
          <h2 style={{ fontSize: 9.5, fontWeight: 800, color: "#fff", letterSpacing: "-0.025em", margin: 0, lineHeight: 1.2 }}>
            Writing about product, craft, and <span style={{ color: "#E040FB" }}>building in public.</span>
          </h2>
          <p style={{ fontSize: 4.5, color: "rgba(255,255,255,0.38)", lineHeight: 1.4, margin: 0 }}>
            6,200 readers · published weekly since 2021.
          </p>
          <div style={{ display: "flex", gap: 3 }}>
            <div style={{ flex: 1, height: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, display: "flex", alignItems: "center", paddingLeft: 6 }}>
              <span style={{ fontSize: 4.2, color: "rgba(255,255,255,0.28)" }}>your@email.com</span>
            </div>
            <div style={{ background: "#fff", borderRadius: 4, height: 14, display: "flex", alignItems: "center", padding: "0 7px" }}>
              <span style={{ fontSize: 4.2, color: "#000", fontWeight: 700 }}>Join free</span>
            </div>
          </div>
        </div>

        {/* Right — issues */}
        <div style={{ flex: 0.9, display: "flex", flexDirection: "column", gap: 3, background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 6, padding: "5px 7px" }}>
          <span style={{ fontSize: 4, color: "rgba(255,255,255,0.25)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Latest issues</span>
          {[
            { t: "Why I killed my SaaS after 18 months", d: "May 28" },
            { t: "The focus protocol that changed my output", d: "May 14" },
            { t: "What Figma got right about constraints", d: "Apr 30" },
          ].map((issue, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none", paddingBottom: i < 2 ? 2.5 : 0 }}>
              <span style={{ fontSize: 5, color: "rgba(255,255,255,0.8)", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 68 }}>{issue.t}</span>
              <span style={{ fontSize: 3.8, color: "rgba(255,255,255,0.28)", flexShrink: 0, marginLeft: 4 }}>{issue.d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EcommercePreview() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#F8F7F4", display: "flex", flexDirection: "column", fontFamily: "'Inter',sans-serif", position: "relative", overflow: "hidden", padding: "12px 14px" }}>
      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(0,0,0,0.05)", paddingBottom: 6, marginBottom: 9 }}>
        <div>
          <div style={{ fontSize: 6.5, fontWeight: 800, color: "#111", letterSpacing: "0.08em" }}>LUMĒ</div>
          <div style={{ fontSize: 3.5, color: "#888", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 0.5 }}>Handmade ceramics</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {["New", "Shop", "About"].map(l => <span key={l} style={{ fontSize: 5, color: "#555", fontWeight: 500 }}>{l}</span>)}
          <span style={{ fontSize: 4.5, color: "#111", fontWeight: 600, background: "rgba(0,0,0,0.05)", padding: "1.5px 5px", borderRadius: 3 }}>Bag (2)</span>
        </div>
      </div>

      {/* Products */}
      <div style={{ flex: 1, display: "flex", gap: 7, alignItems: "stretch" }}>
        {[
          { name: "Soren Mug", price: "$34", tag: "Bestseller", img: "https://images.unsplash.com/photo-1576697440240-9764516d7a42?auto=format&fit=crop&w=160&h=200&q=80" },
          { name: "Kobe Vase", price: "$52", tag: "New", img: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=160&h=200&q=80" },
          { name: "Osa Bowl Set", price: "$68", tag: "Limited", img: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=160&h=200&q=80" },
        ].map((p, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ flex: 1, background: "#fff", border: "1px solid rgba(0,0,0,0.04)", borderRadius: 5, overflow: "hidden", position: "relative" }}>
              <img src={p.img} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} alt={p.name} />
              {p.tag && (
                <div style={{ position: "absolute", top: 4, left: 4, background: "#111", color: "#fff", fontSize: 3.5, fontWeight: 600, padding: "1px 4px", borderRadius: 2 }}>{p.tag}</div>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 5, fontWeight: 600, color: "#111" }}>{p.name}</span>
              <span style={{ fontSize: 5, color: "#555" }}>{p.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Template data ─────────────────────────────────── */
const TEMPLATES = [
  { id: "saas",       name: "SaaS Landing",  category: "Software",       filter: "SaaS",      accent: "#7C3AED", rgb: "124,58,237",  badge: "Popular",  Preview: SaaSPreview },
  { id: "portfolio",  name: "Portfolio",     category: "Personal",       filter: "Portfolio", accent: "#6B7280", rgb: "107,114,128", badge: "Free",     Preview: PortfolioPreview },
  { id: "agency",     name: "Agency",        category: "Studio",         filter: "Agency",    accent: "#E84040", rgb: "232,64,64",   badge: "Featured", Preview: AgencyPreview },
  { id: "ai-product", name: "AI Product",   category: "Technology",     filter: "AI",        accent: "#00D2BE", rgb: "0,210,190",   badge: "New",      Preview: AIProductPreview },
  { id: "creator",    name: "Creator",       category: "Personal Brand", filter: "Creator",   accent: "#E040FB", rgb: "224,64,251",  badge: "Free",     Preview: CreatorPreview },
  { id: "ecommerce",  name: "Ecommerce",     category: "Shop",           filter: "Ecommerce", accent: "#D4A373", rgb: "212,163,115", badge: "Premium",  Preview: EcommercePreview },
];

const FILTERS = ["All", "SaaS", "Portfolio", "Agency", "AI", "Ecommerce", "Creator"] as const;

const BADGE_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  Popular:  { color: "#A78BFA", bg: "rgba(124,58,237,0.08)",  border: "rgba(124,58,237,0.2)" },
  Free:     { color: "rgba(255,255,255,0.35)", bg: "rgba(255,255,255,0.03)", border: "rgba(255,255,255,0.08)" },
  Featured: { color: "#F87171", bg: "rgba(232,64,64,0.08)",   border: "rgba(232,64,64,0.2)" },
  New:      { color: "#34D399", bg: "rgba(16,185,129,0.07)",  border: "rgba(16,185,129,0.2)" },
  Premium:  { color: "#FCD34D", bg: "rgba(245,158,11,0.07)",  border: "rgba(245,158,11,0.2)" },
};

const METRICS = [
  { icon: Layers, label: "Templates", value: "47+" },
  { icon: Zap,    label: "Deployed today", value: "1,240" },
  { icon: Users,  label: "Builders using Zorviq", value: "8,300+" },
];

/* ── Section ───────────────────────────────────────── */
export default function Templates() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const visible = activeFilter === "All"
    ? TEMPLATES
    : TEMPLATES.filter(t => t.filter === activeFilter);

  return (
    <section
      id="templates"
      style={{
        padding: "60px 24px 90px",
        position: "relative",
        background: "#060608",
        overflow: "hidden",
      }}
    >
      {/* Ambient layer — extremely subtle top-left purple and bottom-right neutral */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: [
          "radial-gradient(ellipse 60% 40% at 15% 0%, rgba(124,58,237,0.055) 0%, transparent 100%)",
          "radial-gradient(ellipse 50% 35% at 85% 100%, rgba(255,255,255,0.018) 0%, transparent 100%)",
        ].join(","),
      }} />

      {/* Top fade from preceding section */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 64,
        background: "linear-gradient(to bottom, #060608, transparent)",
        pointerEvents: "none", zIndex: 1,
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>

        {/* ── Section header ── */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <span className="badge" style={{ marginBottom: 12, display: "inline-flex" }}>
            <span className="badge-dot" /> Templates
          </span>
          <h2 style={{
            fontFamily: "'Inter',sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.85rem,3vw,2.55rem)",
            color: "#F2F2F2",
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            margin: "0 0 10px",
          }}>
            Launch faster with{" "}
            <span style={{
              background: "linear-gradient(128deg,#EDE9FE 0%,#C4B5FD 22%,#A78BFA 48%,#8B5CF6 74%,#7C3AED 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              stunning templates.
            </span>
          </h2>
          <p style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: "0.92rem",
            color: "rgba(255,255,255,0.36)",
            maxWidth: 420,
            margin: "0 auto",
            lineHeight: 1.68,
          }}>
            Production-ready starting points — fully customizable by AI, deployed in seconds.
          </p>
        </div>

        {/* ── Marketplace metrics bar ── */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 0,
          marginBottom: 22,
        }}>
          {METRICS.map(({ icon: Icon, label, value }, i) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 20px",
                borderRight: i < METRICS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}
            >
              <Icon size={13} strokeWidth={1.75} color="rgba(255,255,255,0.3)" />
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", fontWeight: 700, color: "rgba(255,255,255,0.82)", letterSpacing: "-0.01em" }}>{value}</span>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.28)", fontWeight: 400 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* ── Filter pills ── */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 6,
          marginBottom: 24,
          flexWrap: "wrap",
        }}>
          {FILTERS.map(f => {
            const active = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.76rem",
                  fontWeight: active ? 600 : 500,
                  color: active ? "#fff" : "rgba(255,255,255,0.38)",
                  background: active ? "rgba(255,255,255,0.08)" : "transparent",
                  border: active ? "1px solid rgba(255,255,255,0.14)" : "1px solid transparent",
                  borderRadius: 99,
                  padding: "5px 13px",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  letterSpacing: "0.01em",
                  outline: "none",
                }}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* ── Card grid ── */}
        <div className="tpl-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gridAutoRows: "1fr",
          gap: 20,
        }}>
          {visible.map(({ id, name, category, accent, rgb, badge, Preview }) => {
            const on = hovered === id;
            const bs = BADGE_STYLES[badge] ?? BADGE_STYLES.Free;
            return (
              <div
                key={id}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 14,
                  overflow: "hidden",
                  border: on
                    ? "1px solid rgba(255,255,255,0.13)"
                    : "1px solid rgba(255,255,255,0.07)",
                  cursor: "pointer",
                  transform: on ? "translateY(-3px)" : "translateY(0)",
                  transition: "transform 0.28s cubic-bezier(0.16,1,0.3,1), box-shadow 0.28s ease, border-color 0.25s ease",
                  boxShadow: on
                    ? "0 8px 24px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.3)"
                    : "0 2px 8px rgba(0,0,0,0.35)",
                  background: "#0A0A0E",
                }}
              >
                {/* Preview */}
                <div style={{ height: 164, overflow: "hidden", position: "relative", flexShrink: 0 }}>
                  <Preview />
                  {/* Bottom vignette */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    height: 40,
                    background: "linear-gradient(to top, rgba(10,10,14,0.7) 0%, transparent 100%)",
                    pointerEvents: "none",
                  }} />
                  {/* Hover overlay */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: on ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0)",
                    backdropFilter: on ? "blur(2px)" : "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.25s ease, backdrop-filter 0.25s ease",
                    pointerEvents: on ? "auto" : "none",
                  }}>
                    {on && (
                      <Link
                        href="/signup"
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          background: "#fff",
                          color: "#000", textDecoration: "none",
                          fontSize: "0.72rem", fontWeight: 650,
                          fontFamily: "'Inter',sans-serif",
                          padding: "7px 14px", borderRadius: 7,
                          boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        Use template <ArrowRight size={12} strokeWidth={2.2} />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Card footer */}
                <div style={{
                  padding: "11px 15px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: on ? "#0D0D12" : "#0A0A0E",
                  transition: "background 0.25s ease",
                }}>
                  <div>
                    <p style={{
                      fontSize: "0.8rem", fontWeight: 600,
                      color: on ? "#fff" : "rgba(255,255,255,0.78)",
                      fontFamily: "'Inter',sans-serif",
                      letterSpacing: "-0.015em",
                      transition: "color 0.2s ease",
                      margin: 0,
                      lineHeight: 1.2,
                    }}>{name}</p>
                    <p style={{
                      fontSize: "0.62rem",
                      color: "rgba(255,255,255,0.25)",
                      fontFamily: "'Inter',sans-serif",
                      marginTop: 2,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                    }}>{category}</p>
                  </div>
                  {/* Badge */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 4,
                    padding: "3px 8px",
                    borderRadius: 99,
                    border: `1px solid ${bs.border}`,
                    background: bs.bg,
                  }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: accent }} />
                    <span style={{
                      fontSize: "0.58rem",
                      color: bs.color,
                      fontFamily: "'Inter',sans-serif",
                      fontWeight: 600,
                      letterSpacing: "0.03em",
                    }}>{badge}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <div style={{
          marginTop: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}>
          {/* Divider */}
          <div style={{
            width: "100%",
            maxWidth: 600,
            height: 1,
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent 100%)",
          }} />

          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <Link
              href="/templates"
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
                color: "rgba(255,255,255,0.55)",
                textDecoration: "none",
                fontSize: "0.8rem",
                fontFamily: "'Inter',sans-serif",
                fontWeight: 500,
                padding: "9px 18px",
                borderRadius: 99,
                transition: "all 0.2s ease",
                letterSpacing: "0.005em",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "rgba(255,255,255,0.85)";
                el.style.borderColor = "rgba(255,255,255,0.15)";
                el.style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "rgba(255,255,255,0.55)";
                el.style.borderColor = "rgba(255,255,255,0.09)";
                el.style.background = "rgba(255,255,255,0.05)";
              }}
            >
              Browse all 47 templates <ArrowRight size={13} strokeWidth={1.75} />
            </Link>

            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.18)" }}>·</span>

            <Link
              href="/signup"
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                color: "#fff",
                textDecoration: "none",
                fontSize: "0.8rem",
                fontFamily: "'Inter',sans-serif",
                fontWeight: 600,
                padding: "9px 18px",
                borderRadius: 99,
                boxShadow: "0 4px 16px rgba(124,58,237,0.3)",
                letterSpacing: "-0.01em",
                transition: "opacity 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.boxShadow = "0 6px 24px rgba(124,58,237,0.45)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.boxShadow = "0 4px 16px rgba(124,58,237,0.3)";
              }}
            >
              Start building free <ArrowRight size={13} strokeWidth={2} />
            </Link>
          </div>

          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.2)", margin: 0 }}>
            No credit card required · Deploy in seconds
          </p>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .tpl-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 560px) {
          .tpl-grid { grid-template-columns: 1fr !important; }
        }
        #templates button:hover {
          color: rgba(255,255,255,0.7) !important;
          background: rgba(255,255,255,0.07) !important;
          border-color: rgba(255,255,255,0.1) !important;
        }
      `}</style>
    </section>
  );
}
