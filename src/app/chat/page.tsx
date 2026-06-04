"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
}

interface Chat {
  id: string;
  title: string;
  lastMessage: string;
  time: string;
  color: string;
}

const MOCK_CHATS: Chat[] = [
  { id: "1", title: "Your Civic Companion", lastMessage: "Built the home page with hero section", time: "2h ago", color: "#7C3AED" },
  { id: "2", title: "Civic Insight", lastMessage: "Dashboard with charts and filters", time: "5h ago", color: "#8B5CF6" },
  { id: "3", title: "Cost Explorer", lastMessage: "FinOps pipeline overview", time: "1d ago", color: "#A78BFA" },
  { id: "4", title: "Landing Page", lastMessage: "Gradient hero with CTA buttons", time: "2d ago", color: "#6D28D9" },
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  "1": [
    { id: "m1", role: "user", content: "Build a civic companion app homepage", time: "22:10" },
    { id: "m2", role: "assistant", content: "Working on it! Designing a bold hero section with gradient text, an issue-reporting flow, and government scheme cards...", time: "22:11" },
  ],
  "2": [
    { id: "m1", role: "user", content: "Create a civic insight dashboard with charts", time: "19:30" },
    { id: "m2", role: "assistant", content: "Dashboard built with bar charts, pie charts, and filterable data table. Added real-time refresh support.", time: "19:32" },
  ],
};

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatId = searchParams.get("id") ?? "new";
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [activeChat, setActiveChat] = useState<string>(chatId);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES[chatId] ?? []);
  const [input, setInput] = useState("");
  const [isWorking, setIsWorking] = useState(false);
  const [workingStatus, setWorkingStatus] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load initial prompt from dashboard
  useEffect(() => {
    const initialPrompt = sessionStorage.getItem("initialPrompt");
    if (initialPrompt && chatId === "new") {
      sessionStorage.removeItem("initialPrompt");
      handleSend(initialPrompt);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isWorking]);

  const switchChat = (id: string) => {
    setActiveChat(id);
    setMessages(MOCK_MESSAGES[id] ?? []);
    router.push(`/chat?id=${id}`);
  };

  const handleSend = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isWorking) return;
    setInput("");

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsWorking(true);
    setWorkingStatus("Designing prompt-driven chat dashboard flow");

    // Simulate AI response
    await new Promise((r) => setTimeout(r, 1800));
    setWorkingStatus("Writing components and styles");
    await new Promise((r) => setTimeout(r, 1200));

    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: `I've processed your request: "${content}"\n\nHere's what I built:\n• Created the main layout with responsive grid\n• Added gradient hero with animated entrance\n• Wired up the interactive prompt input\n• Set up routing between dashboard and chat`,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, assistantMsg]);
    setIsWorking(false);
    setWorkingStatus("");
  };

  return (
    <div className="chat-root">
      {/* Left sidebar */}
      <aside className={`chat-sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <button className="back-btn" onClick={() => router.push("/dashboard")}>← Dashboard</button>
          <button className="new-chat-btn" onClick={() => { setActiveChat("new"); setMessages([]); }}>+ New</button>
        </div>

        <div className="chats-list">
          <p className="chats-label">Recent</p>
          {MOCK_CHATS.map((chat) => (
            <button
              key={chat.id}
              className={`chat-item ${activeChat === chat.id ? "active" : ""}`}
              onClick={() => switchChat(chat.id)}
            >
              <div className="chat-dot" style={{ background: chat.color }} />
              <div className="chat-item-body">
                <span className="chat-item-title">{chat.title}</span>
                <span className="chat-item-sub">{chat.lastMessage}</span>
              </div>
              <span className="chat-item-time">{chat.time}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main chat area */}
      <div className="chat-main">
        {/* Top bar */}
        <header className="chat-header">
          <div className="chat-header-left">
            <button className="toggle-sidebar" onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </button>
            <span className="chat-header-title">
              {activeChat !== "new"
                ? MOCK_CHATS.find((c) => c.id === activeChat)?.title ?? "Chat"
                : "New Chat"}
            </span>
          </div>
          <div className="chat-header-right">
            <button className="header-btn active">Preview</button>
            <button className="header-btn">Code</button>
            <button className="header-btn publish">Publish</button>
          </div>
        </header>

        {/* Messages */}
        <div className="messages-area">
          {messages.length === 0 && !isWorking && (
            <div className="empty-state">
              <div className="empty-icon">✦</div>
              <p>Start building something amazing</p>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.role}`}>
              {msg.role === "assistant" && (
                <div className="msg-avatar assistant-avatar">✦</div>
              )}
              <div className="msg-bubble">
                <pre className="msg-content">{msg.content}</pre>
                <span className="msg-time">{msg.time}</span>
              </div>
            </div>
          ))}

          {isWorking && (
            <div className="message assistant">
              <div className="msg-avatar assistant-avatar">✦</div>
              <div className="working-bubble">
                <div className="working-header">
                  <span className="working-dot" />
                  <span>Working...</span>
                </div>
                <p className="working-status">{workingStatus}</p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="input-area">
          <div className="input-card">
            <textarea
              className="chat-input"
              placeholder="Queue follow-up..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              rows={1}
            />
            <div className="input-actions">
              <div className="input-left">
                <button className="icon-sm">+</button>
                <button className="visual-btn">✎ Visual edits</button>
              </div>
              <div className="input-right">
                <span className="build-badge">Build ▾</span>
                <button className="icon-sm">🎤</button>
                <button
                  className={`send-btn ${isWorking ? "stop" : ""}`}
                  onClick={() => isWorking ? setIsWorking(false) : handleSend()}
                >
                  {isWorking ? "■" : "↑"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .chat-root {
          display: flex;
          height: 100vh;
          background: #060606;
          color: #e5e5e5;
          font-family: 'Segoe UI', system-ui, sans-serif;
          overflow: hidden;
        }

        /* Sidebar */
        .chat-sidebar {
          width: 260px;
          background: #0A0A0A;
          border-right: 1px solid rgba(255,255,255,0.05);
          display: flex;
          flex-direction: column;
          transition: width 0.2s, opacity 0.2s;
          overflow: hidden;
          flex-shrink: 0;
        }
        .chat-sidebar.closed { width: 0; opacity: 0; }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 14px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          gap: 8px;
        }
        .back-btn {
          font-size: 13px;
          color: #888;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 4px 0;
          white-space: nowrap;
        }
        .back-btn:hover { color: #fff; }
        .new-chat-btn {
          font-size: 12px;
          background: #1e1e1e;
          border: 1px solid #2a2a2a;
          color: #ccc;
          border-radius: 7px;
          padding: 5px 10px;
          cursor: pointer;
          white-space: nowrap;
        }
        .new-chat-btn:hover { background: #2a2a2a; color: #fff; }

        .chats-list { flex: 1; overflow-y: auto; padding: 12px 8px; }
        .chats-label { font-size: 11px; color: #555; text-transform: uppercase; letter-spacing: 0.08em; padding: 0 8px; margin-bottom: 6px; }

        .chat-item {
          width: 100%;
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 9px 10px;
          border-radius: 9px;
          border: none;
          background: transparent;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s;
          margin-bottom: 2px;
        }
        .chat-item:hover { background: #1a1a1a; }
        .chat-item.active { background: #1e1e1e; }
        .chat-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          margin-top: 5px;
          flex-shrink: 0;
        }
        .chat-item-body { flex: 1; min-width: 0; }
        .chat-item-title { display: block; font-size: 13px; font-weight: 500; color: #ddd; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .chat-item-sub { display: block; font-size: 11px; color: #666; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .chat-item-time { font-size: 10px; color: #555; flex-shrink: 0; margin-top: 3px; }

        /* Main */
        .chat-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* Header */
        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          background: #0A0A0A;
        }
        .chat-header-left { display: flex; align-items: center; gap: 10px; }
        .toggle-sidebar {
          background: transparent; border: none; color: #888; font-size: 18px; cursor: pointer; padding: 4px;
        }
        .toggle-sidebar:hover { color: #fff; }
        .chat-header-title { font-size: 14px; font-weight: 600; color: #e5e5e5; }
        .chat-header-right { display: flex; gap: 6px; align-items: center; }
        .header-btn {
          padding: 5px 12px;
          border-radius: 7px;
          font-size: 12px;
          border: 1px solid #2a2a2a;
          background: transparent;
          color: #888;
          cursor: pointer;
          transition: all 0.15s;
        }
        .header-btn:hover { background: #1e1e1e; color: #fff; }
        .header-btn.active { background: rgba(124,58,237,0.15); border-color: rgba(124,58,237,0.3); color: #A78BFA; }
        .header-btn.publish { background: linear-gradient(135deg, #7C3AED, #6D28D9); border: none; color: #fff; font-weight: 600; }

        /* Messages */
        .messages-area {
          flex: 1;
          overflow-y: auto;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: #444;
          height: 100%;
        }
        .empty-icon { font-size: 36px; color: #2a2a2a; }

        .message {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          max-width: 720px;
        }
        .message.user { flex-direction: row-reverse; margin-left: auto; }
        .msg-avatar {
          width: 28px; height: 28px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px;
          flex-shrink: 0;
        }
        .assistant-avatar { background: linear-gradient(135deg, #7C3AED, #6D28D9); color: #fff; }
        .msg-bubble {
          background: rgba(10,10,10,0.96);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 10px 14px;
          max-width: 600px;
        }
        .message.user .msg-bubble { background: rgba(124,58,237,0.15); border-color: rgba(124,58,237,0.3); }
        .msg-content {
          font-size: 14px;
          color: #ddd;
          white-space: pre-wrap;
          font-family: inherit;
          line-height: 1.6;
        }
        .msg-time { display: block; font-size: 10px; color: #555; margin-top: 6px; text-align: right; }

        .working-bubble {
          background: rgba(10,10,10,0.96);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 12px 16px;
          min-width: 220px;
        }
        .working-header { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #e5e5e5; margin-bottom: 6px; }
        .working-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #A78BFA;
          animation: pulse 1s ease-in-out infinite;
        }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .working-status { font-size: 12px; color: #888; }

        /* Input */
        .input-area {
          padding: 12px 16px 16px;
          background: #060606;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .input-card {
          background: rgba(10,10,10,0.96);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 12px 14px 10px;
        }
        .chat-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: #ccc;
          font-size: 14px;
          resize: none;
          line-height: 1.5;
          min-height: 40px;
          max-height: 120px;
          overflow-y: auto;
          font-family: inherit;
        }
        .chat-input::placeholder { color: #444; }
        .input-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 8px;
        }
        .input-left, .input-right { display: flex; align-items: center; gap: 6px; }
        .icon-sm {
          width: 28px; height: 28px;
          border-radius: 7px;
          border: 1px solid #2a2a2a;
          background: transparent;
          color: #888;
          font-size: 15px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
        }
        .icon-sm:hover { background: #222; color: #fff; }
        .visual-btn {
          padding: 5px 10px;
          border-radius: 7px;
          border: 1px solid #2a2a2a;
          background: transparent;
          color: #888;
          font-size: 12px;
          cursor: pointer;
        }
        .visual-btn:hover { background: #222; color: #fff; }
        .build-badge {
          font-size: 12px;
          color: #A78BFA;
          background: rgba(124,58,237,0.15);
          border: 1px solid rgba(124,58,237,0.3);
          border-radius: 7px;
          padding: 4px 9px;
          cursor: pointer;
        }
        .send-btn {
          width: 32px; height: 32px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #7C3AED, #6D28D9);
          color: #fff;
          font-size: 16px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: opacity 0.15s, transform 0.15s;
        }
        .send-btn.stop { background: #333; border: 1px solid #444; }
        .send-btn:hover { transform: scale(1.08); }
      `}</style>
    </div>
  );
}