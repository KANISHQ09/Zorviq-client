"use client";

const testimonials = [
  { quote: "Built my portfolio in 5 minutes. Absolutely wild. 🤯", author: "@sarahdesigns", role: "UI Designer" },
  { quote: "This is literally magic. Goodbye Wix, goodbye Squarespace. ✨", author: "@alexbuilds", role: "Startup Founder" },
  { quote: "Generated a full SaaS landing page from one sentence. Insane.", author: "@devmark", role: "Developer" },
  { quote: "The AI actually understands context. This is the future. 🚀", author: "@priyacreates", role: "Product Manager" },
  { quote: "3x faster than building from scratch. My clients are obsessed.", author: "@studiojay", role: "Freelancer" },
  { quote: "No-code finally done right. Zorviq is in a different league.", author: "@techfounder", role: "CEO" },
  { quote: "From idea to live website in under 2 minutes. Game changer.", author: "@makerit", role: "Creator" },
  { quote: "I've tried every builder. Zorviq is the one that actually clicks. 💜", author: "@luna_ux", role: "UX Lead" },
];

function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <div style={{
      flexShrink: 0,
      width: "320px",
      background: "#0D0D0D",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "14px",
      padding: "24px",
      margin: "0 10px",
    }}>
      <div style={{
        display: "flex", gap: "2px", marginBottom: "14px",
      }}>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: "#7C3AED", fontSize: "0.85rem" }}>★</span>
        ))}
      </div>
      <p style={{
        fontSize: "0.875rem", color: "#CCC", lineHeight: 1.7,
        marginBottom: "16px", fontStyle: "italic",
      }}>
        &ldquo;{quote}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "32px", height: "32px", borderRadius: "50%",
          background: "linear-gradient(135deg,#7C3AED,#6366F1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.8rem", fontWeight: 700, color: "#fff",
          flexShrink: 0,
        }}>
          {author[1].toUpperCase()}
        </div>
        <div>
          <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "#fff" }}>{author}</p>
          <p style={{ fontSize: "0.68rem", color: "#555" }}>{role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  // Duplicate for infinite loop
  const all = [...testimonials, ...testimonials];

  return (
    <section style={{ padding: "80px 0", overflow: "hidden", position: "relative" }}>
      {/* Fade edges */}
      <div style={{
        position: "absolute", top: 0, left: 0, bottom: 0,
        width: "120px",
        background: "linear-gradient(to right, #000, transparent)",
        zIndex: 2, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: 0, right: 0, bottom: 0,
        width: "120px",
        background: "linear-gradient(to left, #000, transparent)",
        zIndex: 2, pointerEvents: "none",
      }} />

      {/* Row 1 — forward */}
      <div style={{
        display: "flex",
        width: "max-content",
        animation: "marquee 40s linear infinite",
        marginBottom: "16px",
      }}>
        {all.map((t, i) => (
          <TestimonialCard
            key={i}
            quote={t.quote}
            author={t.author}
            role={t.role}
          />
        ))}
      </div>

      {/* Row 2 — reverse */}
      <div style={{
        display: "flex",
        width: "max-content",
        animation: "marquee 40s linear infinite reverse",
      }}>
        {[...all].reverse().map((t, i) => (
          <TestimonialCard
            key={i}
            quote={t.quote}
            author={t.author}
            role={t.role}
          />
        ))}
      </div>
    </section>
  );
}
