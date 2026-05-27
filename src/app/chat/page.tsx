"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  Paperclip,
  Mic,
  Sparkles,
  Monitor,
  Tablet,
  Phone,
  RotateCw,
  Globe,
  Check,
  Zap,
  ShoppingBag,
  User,
  Send
} from "lucide-react";

let messageIdCounter = 0;
const generateMessageId = () => {
  messageIdCounter++;
  return `msg-${messageIdCounter}-${Math.random().toString(36).substr(2, 9)}`;
};

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
  isSteps?: boolean;
}

export default function ChatPage() {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [currentScenario, setCurrentScenario] = useState<"none" | "saas" | "portfolio" | "shop">("none");
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hello! I'm Zorviq AI, your expert design and development assistant. What kind of website or application would you like to build today? You can type a prompt below or click one of our popular pre-built templates to watch me generate them instantly!",
      timestamp: "Just now"
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const steps = [
    "Structuring layouts and DOM tree...",
    "Injecting HSL-accented styling systems...",
    "Creating interactive responsive micro-components...",
    "Deploying static assets to Vercel Edge CDN...",
    "Website Live! ✨"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, generating, activeStep]);

  const runSimulation = (scenario: "saas" | "portfolio" | "shop", customPrompt?: string) => {
    if (generating) return;

    const promptText = customPrompt || (
      scenario === "saas" ? "Build a futuristic SaaS landing page for an AI dev tool with glowing grid backgrounds and cards" :
      scenario === "portfolio" ? "Create a highly premium UI/UX designer portfolio with filter tags and sleek glassmorphic projects" :
      "Design a modern dark mode e-commerce store with product cards, cart metrics and neon tags"
    );

    // Add user message
    const userMsgId = generateMessageId();
    setMessages((prev) => [
      ...prev,
      {
        id: userMsgId,
        sender: "user",
        text: promptText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    setGenerating(true);
    setActiveStep(0);

    // Simulate AI thinking and starting
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: generateMessageId(),
          sender: "ai",
          text: `Got it! Starting to generate your customized ${scenario === "saas" ? "AI SaaS Landing Page" : scenario === "portfolio" ? "Designer Portfolio" : "Dark Mode E-commerce Shop"} based on the prompt.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          id: generateMessageId(),
          sender: "ai",
          text: "",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isSteps: true
        }
      ]);

      // Cycle through steps
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        if (currentStep >= steps.length) {
          clearInterval(interval);
          setGenerating(false);
          setCurrentScenario(scenario);
          // Add completion success message
          setMessages((prev) => [
            ...prev,
            {
              id: generateMessageId(),
              sender: "ai",
              text: `Done! The website has been successfully generated, optimized, and deployed live to production! You can now preview it in the interactive frame on the right side. Let me know if you want to apply any revisions (e.g. 'make the hero button green' or 'change the copy')!`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        } else {
          setActiveStep(currentStep);
        }
      }, 1000);
    }, 800);
  };

  const handleCustomSubmit = () => {
    if (!prompt.trim() || generating) return;
    const userPrompt = prompt.trim().toLowerCase();
    setPrompt("");

    let scenario: "saas" | "portfolio" | "shop" = "saas";
    if (userPrompt.includes("port") || userPrompt.includes("design") || userPrompt.includes("alex") || userPrompt.includes("work")) {
      scenario = "portfolio";
    } else if (userPrompt.includes("shop") || userPrompt.includes("store") || userPrompt.includes("ecommerce") || userPrompt.includes("buy")) {
      scenario = "shop";
    }

    runSimulation(scenario, prompt);
  };

  return (
    <div style={{
      background: "#000",
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "360px 1fr",
      color: "#CCC",
      fontFamily: "'DM Sans', sans-serif"
    }} className="chat-layout">

      {/* LEFT SIDEBAR (AI Chat Console) */}
      <div style={{
        background: "#050505",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "relative"
      }}>
        {/* Sidebar Header */}
        <div style={{
          padding: "16px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link href="/" style={{
              color: "#888",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "28px", height: "28px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#888"}
            >
              <ArrowLeft size={14} />
            </Link>
            <div>
              <p style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 900,
                fontSize: "1rem",
                color: "#fff",
                letterSpacing: "0.02em"
              }}>ZORVIQ <span style={{ color: "#7C3AED", fontSize: "0.8rem", fontWeight: 700 }}>AI</span></p>
              <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "1px" }}>
                <span style={{
                  width: "5px", height: "5px",
                  borderRadius: "50%",
                  background: "#10B981",
                  boxShadow: "0 0 6px #10B981"
                }} />
                <span style={{ fontSize: "0.6rem", color: "#666", fontWeight: 600, textTransform: "uppercase" }}>Active Engine</span>
              </div>
            </div>
          </div>
          <Sparkles size={16} style={{ color: "#A78BFA" }} />
        </div>

        {/* Chat Stream (Scrollable) */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "18px"
        }}
        className="custom-scrollbar"
        >
          {messages.map((m) => {
            if (m.isSteps) {
              return (
                <div key={m.id} style={{
                  background: "rgba(124,58,237,0.05)",
                  border: "1px solid rgba(124,58,237,0.15)",
                  borderRadius: "12px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  animation: "fadeInUp 0.3s ease"
                }}>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#A78BFA", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Generating Assets...
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {steps.map((s, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{
                          width: "14px", height: "14px",
                          borderRadius: "50%",
                          background: idx < activeStep ? "#10B981" : idx === activeStep ? "#7C3AED" : "rgba(255,255,255,0.05)",
                          display: "flex", alignItems: "center", justifyItems: "center",
                          justifyContent: "center",
                          fontSize: "8px",
                          color: "#fff",
                          boxShadow: idx === activeStep ? "0 0 8px rgba(124,58,237,0.5)" : "none"
                        }}>
                          {idx < activeStep ? <Check size={8} strokeWidth={4} /> : idx === activeStep ? <RotateCw size={8} className="spin" /> : null}
                        </div>
                        <span style={{
                          fontSize: "0.75rem",
                          color: idx < activeStep ? "#10B981" : idx === activeStep ? "#FFF" : "#444",
                          fontWeight: idx === activeStep ? 600 : 400
                        }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            const isAi = m.sender === "ai";
            return (
              <div key={m.id} style={{
                display: "flex",
                gap: "10px",
                alignSelf: isAi ? "flex-start" : "flex-end",
                maxWidth: "88%",
                flexDirection: isAi ? "row" : "row-reverse"
              }}>
                {isAi && (
                  <div style={{
                    width: "28px", height: "28px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#7C3AED,#6366F1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <Bot size={14} style={{ color: "#fff" }} />
                  </div>
                )}
                <div>
                  <div style={{
                    background: isAi ? "rgba(255,255,255,0.03)" : "rgba(124,58,237,0.15)",
                    border: isAi ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(124,58,237,0.25)",
                    borderRadius: isAi ? "0px 14px 14px 14px" : "14px 0px 14px 14px",
                    padding: "12px 14px",
                    color: isAi ? "#BBB" : "#FFF",
                    fontSize: "0.82rem",
                    lineHeight: 1.5,
                    whiteSpace: "pre-line"
                  }}>
                    {m.text}
                  </div>
                  <span style={{
                    fontSize: "0.65rem",
                    color: "#444",
                    marginTop: "4px",
                    display: "block",
                    textAlign: isAi ? "left" : "right"
                  }}>{m.timestamp}</span>
                </div>
              </div>
            );
          })}

          {/* Show preset templates if it's the beginning */}
          {messages.length === 1 && !generating && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Select a template
              </p>
              {[
                { type: "saas" as const, label: "Futuristic SaaS App", desc: "Launch a SaaS landing page in dark cyber style", icon: <Zap size={12} /> },
                { type: "portfolio" as const, label: "Designer Portfolio", desc: "Minimalist profile with filter grids", icon: <User size={12} /> },
                { type: "shop" as const, label: "Dark Commerce Store", desc: "Modern shop front with products & tag chips", icon: <ShoppingBag size={12} /> }
              ].map((scen) => (
                <button
                  key={scen.type}
                  onClick={() => runSimulation(scen.type)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "10px",
                    color: "#AAA",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(124,58,237,0.05)";
                    e.currentTarget.style.borderColor = "rgba(124,58,237,0.25)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "8px",
                    background: "rgba(124,58,237,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#A78BFA", flexShrink: 0
                  }}>
                    {scen.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#fff" }}>{scen.label}</p>
                    <p style={{ fontSize: "0.68rem", color: "#555", marginTop: "2px" }}>{scen.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar (Glassmorphic) */}
        <div style={{
          padding: "16px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(5,5,5,0.9)"
        }}>
          <div style={{
            background: "#0D0D0D",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <button style={{ background: "none", border: "none", color: "#555", cursor: "pointer", display: "flex" }}>
              <Paperclip size={16} />
            </button>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCustomSubmit()}
              placeholder="Ask Zorviq to edit or build..."
              disabled={generating}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                color: "#FFF",
                fontSize: "0.82rem",
                fontFamily: "'DM Sans', sans-serif"
              }}
            />
            <button style={{ background: "none", border: "none", color: "#555", cursor: "pointer", display: "flex" }}>
              <Mic size={16} />
            </button>
            <button
              onClick={handleCustomSubmit}
              disabled={generating || !prompt.trim()}
              style={{
                width: "28px", height: "28px", borderRadius: "8px",
                background: (generating || !prompt.trim()) ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg,#7C3AED,#6366F1)",
                color: (generating || !prompt.trim()) ? "#333" : "#FFF",
                border: "none", cursor: (generating || !prompt.trim()) ? "default" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}
            >
              <Send size={12} />
            </button>
          </div>
          <p style={{ fontSize: "0.62rem", color: "#444", textAlign: "center", marginTop: "8px" }}>
            Zorviq Sandbox. Generates and renders static React previews instantly.
          </p>
        </div>
      </div>

      {/* RIGHT PREVIEW SCREEN */}
      <div style={{
        background: "#080808",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        height: "100vh"
      }}>
        {/* Toolbar Frame */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px"
        }}>
          {/* Mock URL Bar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "#0D0D0D",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "8px",
            padding: "6px 14px",
            width: "380px"
          }}>
            <Globe size={12} style={{ color: "#555" }} />
            <span style={{ fontSize: "0.72rem", color: "#777", fontFamily: "monospace" }}>
              {currentScenario === "none" ? "zorviq.ai/sandbox" :
               currentScenario === "saas" ? "cyberdev-saas.zorviq.app" :
               currentScenario === "portfolio" ? "alexdesign.zorviq.app" :
               "neonshop-commerce.zorviq.app"}
            </span>
          </div>

          {/* View Mode controls */}
          <div style={{ display: "flex", gap: "4px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: "4px", borderRadius: "8px" }}>
            {([
              { mode: "desktop" as const, icon: <Monitor size={14} /> },
              { mode: "tablet" as const, icon: <Tablet size={14} /> },
              { mode: "mobile" as const, icon: <Phone size={14} /> }
            ]).map((item) => (
              <button
                key={item.mode}
                onClick={() => setViewMode(item.mode)}
                style={{
                  width: "28px", height: "28px",
                  borderRadius: "6px",
                  background: viewMode === item.mode ? "rgba(124,58,237,0.15)" : "transparent",
                  color: viewMode === item.mode ? "#A78BFA" : "#555",
                  border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}
              >
                {item.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Live Preview Pane */}
        <div style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative"
        }}>
          {/* Preview Container Frame */}
          <div style={{
            background: "#0D0D0D",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            boxShadow: "0 12px 48px rgba(0,0,0,0.6)",
            width: viewMode === "desktop" ? "100%" : viewMode === "tablet" ? "768px" : "375px",
            height: "100%",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            position: "relative"
          }}
          className="custom-scrollbar"
          >
            {/* RENDER ACTIVE SCENARIO */}

            {currentScenario === "none" && (
              <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px",
                textAlign: "center"
              }}>
                <div style={{
                  width: "64px", height: "64px",
                  borderRadius: "16px",
                  background: "rgba(124,58,237,0.1)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#A78BFA",
                  marginBottom: "20px"
                }}>
                  <Bot size={32} />
                </div>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 900,
                  fontSize: "1.5rem",
                  color: "#fff",
                  marginBottom: "10px"
                }}>Your Interactive AI Sandbox</h3>
                <p style={{
                  fontSize: "0.82rem",
                  color: "#555",
                  maxWidth: "420px",
                  lineHeight: 1.6
                }}>
                  Describe what you want to build or pick a template from the chat stream on the left, and watch the AI build and deploy it right here in real-time.
                </p>
              </div>
            )}

            {/* SCENARIO 1: FUTURISTIC SAAS LANDING PAGE */}
            {currentScenario === "saas" && (
              <div style={{ flex: 1, background: "#000", position: "relative" }}>
                {/* Cybergrid backgrounds */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to bottom, rgba(124,58,237,0.04), transparent 50%), radial-gradient(circle at 50% 0%, rgba(99,102,241,0.08), transparent 50%)",
                  pointerEvents: "none"
                }} />
                
                {/* SaaS Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px", borderBottom: "1px solid rgba(255,255,255,0.04)", position: "relative", zIndex: 1 }}>
                  <span style={{ fontWeight: 800, fontFamily: "'Syne', sans-serif", fontSize: "0.9rem", color: "#FFF" }}>CYBER<span style={{ color: "#7C3AED" }}>DEV</span></span>
                  <div style={{ display: "flex", gap: "16px", fontSize: "0.75rem", color: "#888" }}>
                    <span>Features</span>
                    <span>Docs</span>
                    <span>Pricing</span>
                  </div>
                  <button style={{ padding: "6px 14px", borderRadius: "6px", background: "#FFF", border: "none", color: "#000", fontWeight: 700, fontSize: "0.7rem", cursor: "pointer" }}>Get Started</button>
                </div>

                {/* SaaS Hero */}
                <div style={{ padding: "60px 32px 30px", textAlign: "center", position: "relative", zIndex: 1 }}>
                  <span className="badge" style={{ marginBottom: "16px", fontSize: "0.6rem" }}>
                    <span className="badge-dot" /> Version 2.0 Released
                  </span>
                  <h1 style={{
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    color: "#fff",
                    lineHeight: 1.1,
                    letterSpacing: "-0.01em",
                    marginBottom: "16px"
                  }}>
                    Next-Gen AI <br />
                    <span style={{ background: "linear-gradient(135deg,#A78BFA,#818CF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Dev Agent Toolkit.</span>
                  </h1>
                  <p style={{ fontSize: "0.82rem", color: "#888", maxWidth: "460px", margin: "0 auto 28px", lineHeight: 1.6 }}>
                    Describe your application and let our advanced autonomous agents design, compile, and scale your code instantly.
                  </p>
                  <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                    <button style={{ padding: "10px 22px", borderRadius: "8px", background: "linear-gradient(135deg,#7C3AED,#6366F1)", border: "none", color: "#fff", fontWeight: 700, fontSize: "0.78rem", cursor: "pointer", boxShadow: "0 0 20px rgba(124,58,237,0.3)" }}>Deploy Free</button>
                    <button style={{ padding: "10px 22px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", color: "#888", fontWeight: 600, fontSize: "0.78rem", cursor: "pointer" }}>Read Docs</button>
                  </div>
                </div>

                {/* SaaS Features grid */}
                <div style={{ padding: "30px 24px 60px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", position: "relative", zIndex: 1 }}>
                  {[
                    { t: "Autonomous Flow", d: "Agents design, write and package full structures.", i: "🤖" },
                    { t: "Infinite Scalability", d: "Stateless edge CDN hosting with ultra-fast page speeds.", i: "⚡" },
                    { t: "Interactive Debug", d: "Instant feedback sandbox with code audit trace outputs.", i: "🛡️" }
                  ].map((feat) => (
                    <div key={feat.t} style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "12px",
                      padding: "20px",
                      transition: "all 0.2s"
                    }}
                    className="card-hover"
                    >
                      <span style={{ fontSize: "1.5rem", display: "block", marginBottom: "12px" }}>{feat.i}</span>
                      <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>{feat.t}</h3>
                      <p style={{ fontSize: "0.72rem", color: "#555", lineHeight: 1.5 }}>{feat.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SCENARIO 2: UI/UX DESIGNER PORTFOLIO */}
            {currentScenario === "portfolio" && (
              <div style={{ flex: 1, background: "#050505", padding: "40px 32px" }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "48px" }}>
                  <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: "1.1rem", color: "#fff" }}>ALEX.</span>
                  <div style={{ display: "flex", gap: "16px", fontSize: "0.75rem", color: "#555" }}>
                    <span style={{ color: "#FFF", fontWeight: 600 }}>Projects</span>
                    <span>About</span>
                    <span>Contact</span>
                  </div>
                </div>

                {/* Profile intro */}
                <div style={{ marginBottom: "40px" }}>
                  <span style={{ fontSize: "0.68rem", color: "#7C3AED", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700, display: "block", marginBottom: "8px" }}>UI/UX Specialist</span>
                  <h1 style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 900,
                    fontSize: "2.2rem",
                    lineHeight: 1.1,
                    color: "#FFF",
                    marginBottom: "16px"
                  }}>
                    I craft digital <br />
                    experiences <span style={{ color: "#A78BFA" }}>that inspire.</span>
                  </h1>
                  <p style={{ fontSize: "0.82rem", color: "#555", lineHeight: 1.6, maxWidth: "420px" }}>
                    Hi, I&apos;m Alex — a visual product designer focusing on building highly tactile interfaces, premium motion designs, and seamless visual branding.
                  </p>
                </div>

                {/* Portfolio grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="portfolio-grid">
                  {[
                    { title: "Zorviq Branding", category: "Brand Design / 3D Graphics", img: "🔮" },
                    { title: "Vortex SaaS UI", category: "Product Development", img: "⚡" },
                    { title: "Aether Crypto Wallet", category: "Mobile App Design", img: "🎨" },
                    { title: "Lumina Studio", category: "Web Design / Interactive", img: "✨" }
                  ].map((proj) => (
                    <div key={proj.title} style={{
                      background: "#0D0D0D",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "12px",
                      overflow: "hidden",
                      transition: "all 0.2s"
                    }}
                    className="card-hover"
                    >
                      <div style={{
                        height: "120px",
                        background: "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(99,102,241,0.08))",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "2.5rem"
                      }}>
                        {proj.img}
                      </div>
                      <div style={{ padding: "16px" }}>
                        <h4 style={{ fontSize: "0.82rem", color: "#FFF", fontWeight: 700, marginBottom: "4px" }}>{proj.title}</h4>
                        <p style={{ fontSize: "0.68rem", color: "#444" }}>{proj.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SCENARIO 3: DARK COMMERCE STORE */}
            {currentScenario === "shop" && (
              <div style={{ flex: 1, background: "#080808", padding: "30px 24px" }}>
                {/* Shop Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "16px", marginBottom: "28px" }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "0.95rem", color: "#fff" }}>NEON<span style={{ color: "#10B981" }}>SHOP</span></span>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.72rem", color: "#888" }}>
                      <span>Cart</span>
                      <span style={{ padding: "2px 6px", borderRadius: "50%", background: "#10B981", color: "#000", fontWeight: 700, fontSize: "9px" }}>3</span>
                    </div>
                  </div>
                </div>

                {/* Promo Badge */}
                <div style={{
                  background: "linear-gradient(90deg, rgba(16,185,129,0.1), rgba(124,58,237,0.1))",
                  border: "1px solid rgba(16,185,129,0.2)",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  marginBottom: "28px",
                  display: "flex", alignItems: "center", justifyContent: "space-between"
                }}>
                  <div>
                    <h5 style={{ fontSize: "0.78rem", fontWeight: 700, color: "#fff" }}>Summer Tech Fest</h5>
                    <p style={{ fontSize: "0.65rem", color: "#888", marginTop: "1px" }}>Use code NEON25 for 25% off all glowing accessories</p>
                  </div>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#10B981" }}>Active</span>
                </div>

                {/* Shop products */}
                <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>Trending items</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
                  {[
                    { name: "Cyberpunk Headphones", price: "$249", tag: "Hot", color: "#10B981", icon: "🎧" },
                    { name: "RGB Keypad Matrix", price: "$189", tag: "Limited", color: "#7C3AED", icon: "⌨️" },
                    { name: "Holographic Visor", price: "$120", tag: "Sale", color: "#3B82F6", icon: "🕶️" },
                    { name: "Autonomous Core Pod", price: "$350", tag: "New", color: "#EF4444", icon: "🔮" }
                  ].map((prod) => (
                    <div key={prod.name} style={{
                      background: "#0D0D0D",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "12px",
                      padding: "16px",
                      display: "flex", flexDirection: "column",
                      justifyContent: "space-between"
                    }}
                    className="card-hover"
                    >
                      <div>
                        {/* Upper row */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                          <span style={{
                            padding: "2px 6px", borderRadius: "4px",
                            background: `rgba(${prod.color === "#10B981" ? "16,185,129" : prod.color === "#7C3AED" ? "124,58,237" : "59,130,246"}, 0.1)`,
                            border: `1px solid ${prod.color}`,
                            color: prod.color, fontSize: "8px", fontWeight: 700, textTransform: "uppercase"
                          }}>{prod.tag}</span>
                          <span style={{ fontSize: "1.5rem" }}>{prod.icon}</span>
                        </div>
                        <h4 style={{ fontSize: "0.78rem", color: "#fff", fontWeight: 700, marginBottom: "4px" }}>{prod.name}</h4>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px" }}>
                        <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#fff" }}>{prod.price}</span>
                        <button style={{
                          padding: "6px 12px", borderRadius: "6px",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          color: "#888", fontSize: "0.68rem", fontWeight: 600, cursor: "pointer",
                          transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#fff"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#888"; }}
                        >Add</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Embedded CSS rules */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #7C3AED; }
        
        .spin {
          animation: spin 1.5s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-hover:hover {
          transform: translateY(-2px);
          border-color: rgba(124,58,237,0.25) !important;
          box-shadow: 0 4px 20px rgba(124,58,237,0.05);
        }
        @media (max-width: 900px) {
          .chat-layout {
            grid-template-columns: 1fr !important;
          }
          .hidden-mobile {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
