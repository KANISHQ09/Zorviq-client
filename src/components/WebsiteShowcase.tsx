"use client";
import { Globe } from "lucide-react";

/* ── Browser Chrome ── */
function Chrome({ url }: { url: string }) {
  return (
    <div style={{ background: "#161616", padding: "7px 12px", display: "flex", alignItems: "center", gap: "6px", borderBottom: "1px solid rgba(255,255,255,0.05)", flexShrink: 0 }}>
      {["#ff5f57", "#febc2e", "#28c840"].map(c => <span key={c} style={{ width: "6px", height: "6px", borderRadius: "50%", background: c, opacity: 0.85 }} />)}
      <div style={{ flex: 1, marginLeft: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", padding: "3px 8px", fontSize: "0.42rem", color: "rgba(255,255,255,0.22)", fontFamily: "'Inter',sans-serif", display: "flex", alignItems: "center", gap: "4px" }}>
        <Globe size={7} style={{ opacity: 0.35 }} /> {url}
      </div>
    </div>
  );
}

/* ═══ Card 1: Finance Dashboard — Dark — Back Left ═══ */
function PortfolioCard() {
  const bars = [62, 45, 78, 55, 90, 67, 83, 49, 71, 88, 60, 95];

  return (
    <div style={{
      position: "absolute", width: "290px", left: "12px", top: "80px",
      transformOrigin: "center", transform: "rotate(-5deg) scale(0.86)",
      zIndex: 3, filter: "none", opacity: 0.80,
      borderRadius: "12px", overflow: "hidden",
      boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07)",
      animation: "floatLeft 13s ease-in-out 1s infinite",
      pointerEvents: "none",
    }}>
      <Chrome url="app.finch.so/dashboard" />

      {/* App shell */}
      <div style={{ background: "#0a0a0d", display: "flex", height: "338px", fontFamily: "'Inter',sans-serif" }}>

        {/* ── Sidebar ── */}
        <div style={{ width: "38px", background: "#121216", borderRight: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "10px", gap: "1px", flexShrink: 0 }}>
          {/* wordmark */}
          <div style={{ width: "20px", height: "20px", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.38rem", color: "#000", fontWeight: 800, letterSpacing: "-0.03em" }}>F</span>
          </div>
          {/* nav icons as colored pills */}
          {[
            { bg: "#fff", active: true },
            { bg: "rgba(255,255,255,0.15)" },
            { bg: "rgba(255,255,255,0.15)" },
            { bg: "rgba(255,255,255,0.15)" },
            { bg: "rgba(255,255,255,0.15)" },
          ].map((n, i) => (
            <div key={i} style={{
              width: n.active ? "22px" : "18px",
              height: "6px",
              borderRadius: "3px",
              background: n.active ? "#fff" : "rgba(255,255,255,0.1)",
              marginBottom: "5px",
              transition: "all 0.2s",
            }} />
          ))}
          {/* bottom avatar */}
          <div style={{ marginTop: "auto", marginBottom: "8px", width: "20px", height: "20px", borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }} />
        </div>

        {/* ── Main content ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Top bar */}
          <div style={{ padding: "7px 10px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#121216" }}>
            <div>
              <div style={{ fontSize: "0.44rem", fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.02em" }}>Financials</div>
              <div style={{ fontSize: "0.26rem", color: "rgba(255,255,255,0.4)", marginTop: "0.5px" }}>November 2024</div>
            </div>
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "4px", padding: "2px 6px", fontSize: "0.26rem", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>+ New</div>
              <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "linear-gradient(135deg,#f97316,#fb923c)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "0.24rem", color: "#fff", fontWeight: 700 }}>MK</span>
              </div>
            </div>
          </div>

          {/* KPI row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            {[
              { label: "Revenue", value: "$84.2K", delta: "+14.3%", up: true },
              { label: "Expenses", value: "$31.7K", delta: "-3.1%", up: true },
              { label: "Net Margin", value: "62.3%", delta: "+4.8pp", up: true },
            ].map((k, i) => (
              <div key={i} style={{ background: "#121216", padding: "6px 8px" }}>
                <div style={{ fontSize: "0.22rem", color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: "2px" }}>{k.label}</div>
                <div style={{ fontSize: "0.52rem", fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.03em" }}>{k.value}</div>
                <div style={{ fontSize: "0.22rem", color: "#10b981", fontWeight: 600, marginTop: "1px" }}>{k.delta}</div>
              </div>
            ))}
          </div>

          {/* Revenue chart area */}
          <div style={{ background: "#121216", padding: "7px 10px 5px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <span style={{ fontSize: "0.28rem", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>Monthly Revenue</span>
              <div style={{ display: "flex", gap: "3px" }}>
                {["1M","3M","YTD","1Y"].map((t,i) => (
                  <span key={t} style={{ fontSize: "0.22rem", padding: "1px 4px", borderRadius: "3px", background: i===2 ? "rgba(255,255,255,0.1)" : "transparent", color: i===2 ? "#fff" : "rgba(255,255,255,0.4)", fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </div>
            {/* Bar chart */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "36px" }}>
              {bars.map((h, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "1px" }}>
                  <div style={{
                    width: "100%", height: `${h * 0.36}px`,
                    borderRadius: "2px 2px 0 0",
                    background: i === 10 ? "#6366f1" : i === 11 ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.1)",
                  }} />
                </div>
              ))}
            </div>
            {/* x-axis labels */}
            <div style={{ display: "flex", gap: "2px", marginTop: "2px" }}>
              {["J","F","M","A","M","J","J","A","S","O","N","D"].map((m, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center" as const, fontSize: "0.20rem", color: i === 10 ? "#6366f1" : "rgba(255,255,255,0.3)", fontWeight: i===10 ? 700 : 400 }}>{m}</div>
              ))}
            </div>
          </div>

          {/* Transactions list */}
          <div style={{ background: "#121216", flex: 1, overflow: "hidden", padding: "5px 0 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 10px 4px" }}>
              <span style={{ fontSize: "0.28rem", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>Recent Transactions</span>
              <span style={{ fontSize: "0.24rem", color: "#6366f1", fontWeight: 500 }}>View all →</span>
            </div>
            {[
              { name: "Vercel Inc.", cat: "Infrastructure", amt: "-$240.00", time: "2h ago", avatar: "#222", letter: "V", badge: "Infra" },
              { name: "Stripe Payout", cat: "Revenue", amt: "+$12,400", time: "4h ago", avatar: "#635bff", letter: "S", badge: "Income" },
              { name: "Figma", cat: "Design • SaaS", amt: "-$75.00", time: "1d ago", avatar: "#f97316", letter: "F", badge: "Tools" },
              { name: "AWS", cat: "Cloud • Monthly", amt: "-$1,832", time: "2d ago", avatar: "#f59e0b", letter: "A", badge: "Infra" },
              { name: "Linear", cat: "Project Mgmt", amt: "-$120.00", time: "3d ago", avatar: "#5e6ad2", letter: "L", badge: "Tools" },
            ].map((tx, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "4px 10px",
                borderBottom: "1px solid rgba(255,255,255,0.02)",
              }}>
                <div style={{ width: "18px", height: "18px", borderRadius: "5px", background: tx.avatar, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "0.26rem", color: "#fff", fontWeight: 700 }}>{tx.letter}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "0.28rem", fontWeight: 600, color: "rgba(255,255,255,0.9)", whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis" }}>{tx.name}</div>
                  <div style={{ fontSize: "0.22rem", color: "rgba(255,255,255,0.4)" }}>{tx.cat}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
                  <span style={{ fontSize: "0.28rem", fontWeight: 700, color: tx.amt.startsWith("+") ? "#10b981" : "rgba(255,255,255,0.9)" }}>{tx.amt}</span>
                  <span style={{ fontSize: "0.20rem", color: "rgba(255,255,255,0.3)" }}>{tx.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ Card 2: Pulse SaaS — Dark — Front Center ═══ */
function SaasCard() {
  return (
    <div style={{
      position: "absolute", width: "368px", left: "50%", top: "58px",
      transform: "translateX(-50%)", zIndex: 10,
      borderRadius: "13px", overflow: "hidden",
      boxShadow: "0 44px 108px rgba(0,0,0,0.72), 0 0 0 1px rgba(124,58,237,0.10), 0 0 48px rgba(124,58,237,0.04)",
      border: "1px solid rgba(255,255,255,0.07)",
      animation: "floatFront 9s ease-in-out infinite",
    }}>
      <Chrome url="usepulse.io" />
      <div style={{ background: "#0a0a0d" }}>
        {/* Nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "14px", height: "14px", borderRadius: "4px", background: "linear-gradient(135deg,#10b981,#059669)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "0.40rem", color: "#fff", fontWeight: 800 }}>P</span>
            </div>
            <span style={{ fontSize: "0.54rem", fontWeight: 700, color: "rgba(255,255,255,0.92)", fontFamily: "'Inter',sans-serif", letterSpacing: "-0.02em" }}>Pulse</span>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {["Product", "Docs", "Pricing", "Blog"].map(l => <span key={l} style={{ fontSize: "0.36rem", color: "rgba(255,255,255,0.28)", fontWeight: 450 }}>{l}</span>)}
            <div style={{ background: "#10b981", borderRadius: "5px", padding: "3px 9px", fontSize: "0.38rem", color: "#fff", fontWeight: 600 }}>Get started</div>
          </div>
        </div>

        {/* Hero */}
        <div style={{ padding: "14px 14px 8px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "20px", padding: "2px 9px", marginBottom: "8px" }}>
            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 5px rgba(16,185,129,0.7)" }} />
            <span style={{ fontSize: "0.30rem", color: "#34d399", fontWeight: 500, letterSpacing: "0.04em" }}>Now in General Availability</span>
          </div>
          <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, lineHeight: 1.1, marginBottom: "6px", letterSpacing: "-0.035em" }}>
            <span style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.95)", display: "block" }}>Ship faster.</span>
            <span style={{ fontSize: "1.05rem", background: "linear-gradient(120deg,#10b981 0%,#34d399 50%,#6ee7b7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}>Together.</span>
          </div>
          <div style={{ fontSize: "0.36rem", color: "rgba(255,255,255,0.30)", lineHeight: 1.55, maxWidth: "220px", margin: "0 auto 10px" }}>
            Engineering velocity for modern teams. Understand where time is spent and ship with confidence.
          </div>
          <div style={{ display: "flex", gap: "5px", justifyContent: "center", marginBottom: "10px" }}>
            <div style={{ background: "#10b981", borderRadius: "5px", padding: "4px 12px", fontSize: "0.40rem", color: "#fff", fontWeight: 600 }}>Start free trial</div>
            <div style={{ border: "1px solid rgba(255,255,255,0.10)", borderRadius: "5px", padding: "4px 12px", fontSize: "0.40rem", color: "rgba(255,255,255,0.42)", fontWeight: 450 }}>View demo →</div>
          </div>
        </div>

        {/* Feature highlights */}
        <div style={{ padding: "0 14px 6px" }}>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "7px", overflow: "hidden" }}>
            {[
              { icon: "⏱", title: "Cycle Time Tracking", desc: "Know where time is lost in your pipeline." },
              { icon: "🔍", title: "PR Health Monitoring", desc: "Surface blockers before they slow your team." },
              { icon: "🚀", title: "Deploy Intelligence", desc: "Correlate releases with incidents instantly." },
            ].map((f, i) => (
              <div key={f.title} style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "6px 10px",
                borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}>
                <span style={{ fontSize: "0.52rem", flexShrink: 0, opacity: 0.8 }}>{f.icon}</span>
                <div>
                  <div style={{ fontSize: "0.36rem", fontWeight: 600, color: "rgba(255,255,255,0.72)", fontFamily: "'Inter',sans-serif", marginBottom: "1px" }}>{f.title}</div>
                  <div style={{ fontSize: "0.30rem", color: "rgba(255,255,255,0.28)", lineHeight: 1.45 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust bar */}
        <div style={{ padding: "4px 14px 8px" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "14px", padding: "5px 0", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            {["Vercel", "Linear", "Cal.com", "Loom", "Dub"].map(n => (
              <span key={n} style={{ fontSize: "0.34rem", color: "rgba(255,255,255,0.14)", fontWeight: 600, fontFamily: "'Inter',sans-serif" }}>{n}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ Card 3: Agency — Dark, Editorial — Back Right ═══ */
function AgencyCard() {
  return (
    <div style={{
      position: "absolute", width: "290px", right: "12px", top: "80px",
      transformOrigin: "center", transform: "rotate(5deg) scale(0.86)",
      zIndex: 3, filter: "none", opacity: 0.80,
      borderRadius: "12px", overflow: "hidden",
      boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07)",
      animation: "floatRight 11s ease-in-out 2s infinite",
      pointerEvents: "none",
    }}>
      <Chrome url="basement.studio" />
      <div style={{ background: "#080808" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <span style={{ fontSize: "0.54rem", fontWeight: 800, color: "rgba(255,255,255,0.94)", letterSpacing: "0.10em", fontFamily: "'Inter',sans-serif", textTransform: "uppercase" as const }}>BSMNT</span>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {["Work", "Services", "Lab"].map(l => <span key={l} style={{ fontSize: "0.38rem", color: "rgba(255,255,255,0.28)", fontWeight: 450 }}>{l}</span>)}
            <div style={{ border: "1px solid rgba(255,255,255,0.18)", borderRadius: "4px", padding: "3px 9px", fontSize: "0.38rem", color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>Contact</div>
          </div>
        </div>
        <div style={{ padding: "20px 14px 12px" }}>
          <div style={{ fontSize: "0.30rem", color: "rgba(255,255,255,0.20)", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: "9px" }}>Digital Studio — NYC</div>
          <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, lineHeight: 1.06, marginBottom: "9px", letterSpacing: "-0.035em" }}>
            <div style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.93)" }}>We craft</div>
            <div style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.93)" }}>digital</div>
            <div style={{ fontSize: "1.05rem", background: "linear-gradient(90deg,#f97316,#ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>experiences.</div>
          </div>
          <div style={{ fontSize: "0.36rem", color: "rgba(255,255,255,0.25)", lineHeight: 1.65, maxWidth: "170px" }}>Strategy, design, and engineering for brands that demand exceptional work.</div>
        </div>
        <div style={{ padding: "4px 14px 7px" }}>
          <div style={{ fontSize: "0.28rem", fontWeight: 600, color: "rgba(255,255,255,0.14)", letterSpacing: "0.06em", textTransform: "uppercase" as const, marginBottom: "5px" }}>Featured Case Study</div>
          <div style={{ borderRadius: "7px", background: "linear-gradient(155deg,#1a1008,#120c04)", height: "56px", padding: "9px 11px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden", border: "1px solid rgba(249,115,22,0.07)" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: "45%", height: "100%", background: "radial-gradient(circle at 80% 30%, rgba(249,115,22,0.07), transparent 70%)" }} />
            <span style={{ fontSize: "0.32rem", color: "rgba(249,115,22,0.58)", fontWeight: 600, letterSpacing: "0.04em" }}>APEX FINTECH</span>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <span style={{ fontSize: "0.34rem", color: "rgba(255,255,255,0.42)", fontWeight: 450 }}>Brand & Platform Redesign</span>
              <span style={{ fontSize: "0.52rem", fontWeight: 700, color: "rgba(255,255,255,0.75)", fontFamily: "'Inter',sans-serif" }}>+240%</span>
            </div>
          </div>
        </div>
        <div style={{ padding: "4px 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
          {[
            { name: "Vercel", metric: "3× faster", bg: "#0d0d12" },
            { name: "Loom", metric: "2.8M users", bg: "#0d0a14" },
          ].map(c => (
            <div key={c.name} style={{ background: c.bg, borderRadius: "5px", padding: "6px 8px", border: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ fontSize: "0.34rem", color: "rgba(255,255,255,0.40)", fontWeight: 600 }}>{c.name}</div>
              <div style={{ fontSize: "0.28rem", color: "rgba(255,255,255,0.18)", marginTop: "1px" }}>{c.metric}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: "7px 14px 11px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {["Stripe", "Notion", "Linear", "Figma"].map(n => (
              <span key={n} style={{ fontSize: "0.36rem", color: "rgba(255,255,255,0.14)", fontWeight: 600, fontFamily: "'Inter',sans-serif" }}>{n}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ Main Export ═══ */
export default function WebsiteShowcase() {
  return (
    <>
      <div style={{
        flex: "0 0 560px", position: "relative",
        height: "490px", minWidth: 0,
      }} className="hero-preview">
        {/* Ambient glow — reduced ~10% */}
        <div style={{
          position: "absolute", top: "38%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "380px", height: "260px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(16,185,129,0.04) 0%, rgba(124,58,237,0.07) 50%, transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
        }} />
        <PortfolioCard />
        <AgencyCard />
        <SaasCard />

      </div>
      <style>{`
        @keyframes floatFront {
          0%,100% { transform: translateX(-50%) translateY(0px); }
          50%     { transform: translateX(-50%) translateY(-10px); }
        }
        @keyframes floatLeft {
          0%,100% { transform: rotate(-5deg) scale(0.86) translateY(0px); }
          50%     { transform: rotate(-5deg) scale(0.86) translateY(-5px); }
        }
        @keyframes floatRight {
          0%,100% { transform: rotate(5deg) scale(0.86) translateY(0px); }
          50%     { transform: rotate(5deg) scale(0.86) translateY(-4px); }
        }
      `}</style>
    </>
  );
}