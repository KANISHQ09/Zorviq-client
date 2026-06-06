"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ApiUser,
  Project,
  authStore,
  createProject,
  deleteProject,
  getMe,
  listProjects,
  logoutUser,
  updateProject,
} from "@/lib/api";

const relativeTime = (date?: string) => {
  if (!date) return "recently";
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.max(1, Math.floor(diff / 60000));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

const projectColor = (index: number) => ["#7C3AED", "#8B5CF6", "#A78BFA", "#6366F1"][index % 4];

const promptTitle = (prompt: string) => {
  const clean = prompt.replace(/\s+/g, " ").trim();
  return clean.length > 60 ? `${clean.slice(0, 57)}...` : clean;
};

export default function DashboardPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [user, setUser] = useState<ApiUser | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const firstName = useMemo(() => {
    const name = user?.fullname || authStore.getUser()?.fullname || "Builder";
    return name.split(" ")[0] || "Builder";
  }, [user]);

  useEffect(() => {
    let alive = true;

    const load = async () => {
      try {
        const [profile, projectList] = await Promise.all([getMe(), listProjects()]);
        if (!alive) return;
        setUser(profile);
        setProjects(projectList);
      } catch {
        authStore.clear();
        router.replace("/login");
      } finally {
        if (alive) setIsLoading(false);
      }
    };

    load();
    return () => {
      alive = false;
    };
  }, [router]);

  const handleEdit = async (id: string) => {
    const current = projects.find((project) => project._id === id);
    const newTitle = window.prompt("Enter new project title:", current?.name ?? "");
    if (!newTitle?.trim()) return;

    try {
      const updated = await updateProject(id, { name: newTitle.trim() });
      setProjects((items) => items.map((item) => (item._id === id ? updated : item)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update project");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await deleteProject(id);
      setProjects((items) => items.filter((item) => item._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete project");
    }
  };

  const startProject = async (initialPrompt?: string) => {
    const content = initialPrompt?.trim() || prompt.trim();
    if (!content || isCreating) return;

    setError("");
    setIsCreating(true);
    try {
      const project = await createProject(promptTitle(content));
      sessionStorage.setItem("initialPrompt", content);
      router.push(`/chat?id=${project._id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create project");
    } finally {
      setIsCreating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      startProject();
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/login");
  };

  if (isLoading) {
    return (
      <div className="dashboard-root loading-screen">
        <div>Loading dashboard...</div>
        <style jsx>{`
          .dashboard-root { min-height: 100vh; background: #060606; color: #888; display: flex; align-items: center; justify-content: center; font-family: 'Segoe UI', system-ui, sans-serif; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="dashboard-root">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">Z</div>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-btn active" title="Home">⌂</button>
          <button className="nav-btn" title="Projects">⊞</button>
        </nav>
        <div className="sidebar-bottom">
          <div className="avatar">{firstName.charAt(0).toUpperCase()}</div>
          <button className="nav-btn" title="Logout" onClick={handleLogout}>↪</button>
        </div>
      </aside>

      <main className="main">
        <section className="hero">
          <h1 className="hero-title">Ready to build, {firstName}?</h1>

          <div className="prompt-card">
            <textarea
              className="prompt-input"
              placeholder="Ask Zorviq to generate a website..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
            />
            <div className="prompt-actions">
              <button className="icon-btn" type="button" onClick={() => setPrompt("")}>+</button>
              <div className="prompt-right">
                <span className="plan-badge">Build</span>
                <button
                  className="send-btn"
                  onClick={() => startProject()}
                  disabled={!prompt.trim() || isCreating}
                >
                  {isCreating ? "…" : "↑"}
                </button>
              </div>
            </div>
          </div>
          {error && <p className="error-text">{error}</p>}
        </section>

        <section className="projects-section">
          <div className="tabs">
            <button className="tab active">My projects</button>
            <span className="browse-all">{projects.length} total</span>
          </div>

          <div className="projects-grid">
            <div className="project-card create-new-card" onClick={() => startProject("Create a modern responsive website")}>
              <div className="create-new-content">
                <div className="plus-icon">+</div>
                <div>Create New Project</div>
              </div>
            </div>

            {projects.map((project, index) => {
              const color = projectColor(index);
              return (
                <div key={project._id} className="project-card" onClick={() => router.push(`/chat?id=${project._id}`)}>
                  <div className="project-preview" style={{ background: `linear-gradient(135deg, ${color}22, ${color}44)` }}>
                    <div className="preview-mock">
                      <div className="mock-bar" />
                      <div className="mock-line" />
                      <div className="mock-line short" />
                    </div>
                  </div>
                  <div className="project-info">
                    <div className="project-avatar" style={{ background: color }}>{firstName.charAt(0).toUpperCase()}</div>
                    <div className="project-text">
                      <div className="project-title">{project.name}</div>
                      <div className="project-sub">{project.currentCode ? "Generated" : "Draft"} · {relativeTime(project.updatedAt)}</div>
                    </div>
                    <div className="project-actions">
                      <button onClick={(e) => { e.stopPropagation(); handleEdit(project._id); }} className="action-btn" title="Edit">✎</button>
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(project._id); }} className="action-btn delete" title="Delete">⌫</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <style jsx>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .dashboard-root { display: flex; min-height: 100vh; background: #060606; color: #fff; font-family: 'Segoe UI', system-ui, sans-serif; }
        .sidebar { width: 60px; background: #0a0a0a; display: flex; flex-direction: column; align-items: center; padding: 16px 0; border-right: 1px solid rgba(255,255,255,0.05); position: fixed; top: 0; left: 0; bottom: 0; z-index: 10; }
        .sidebar-logo { margin-bottom: 24px; }
        .logo-icon { width: 32px; height: 32px; border-radius: 8px; background: #171717; color: #A78BFA; display: flex; align-items: center; justify-content: center; font-weight: 800; }
        .sidebar-nav { display: flex; flex-direction: column; gap: 8px; flex: 1; }
        .sidebar-bottom { display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .nav-btn { width: 38px; height: 38px; border-radius: 10px; border: none; background: transparent; color: #888; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s, color 0.15s; }
        .nav-btn:hover, .nav-btn.active { background: #1e1e1e; color: #fff; }
        .avatar { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #7C3AED, #6D28D9); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #fff; }
        .main { margin-left: 60px; flex: 1; display: flex; flex-direction: column; }
        .hero { min-height: 52vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 24px 40px; background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.15) 0%, rgba(109,40,217,0.05) 45%, transparent 70%), linear-gradient(180deg, rgba(6,6,6,0.5) 0%, #060606 100%); }
        .hero-title { font-size: clamp(26px, 4vw, 42px); font-weight: 700; text-align: center; margin-bottom: 32px; }
        .prompt-card { width: 100%; max-width: 660px; background: rgba(10,10,10,0.96); border: 1px solid rgba(255,255,255,0.07); border-radius: 18px; padding: 16px 16px 12px; box-shadow: 0 8px 40px #0008; }
        .prompt-input { width: 100%; background: transparent; border: none; outline: none; color: #ccc; font-size: 15px; resize: none; min-height: 52px; line-height: 1.5; }
        .prompt-input::placeholder { color: #555; }
        .prompt-actions { display: flex; align-items: center; justify-content: space-between; margin-top: 8px; }
        .prompt-right { display: flex; align-items: center; gap: 8px; }
        .plan-badge { font-size: 13px; color: #A78BFA; padding: 4px 8px; border-radius: 8px; background: rgba(124,58,237,0.15); }
        .icon-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #2a2a2a; background: transparent; color: #888; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .icon-btn:hover { background: #222; color: #fff; }
        .send-btn { width: 36px; height: 36px; border-radius: 50%; border: none; background: linear-gradient(135deg, #7C3AED, #6D28D9); color: #fff; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .send-btn:disabled { opacity: 0.4; cursor: default; }
        .error-text { color: #f87171; font-size: 13px; margin-top: 16px; }
        .projects-section { border-top: 1px solid rgba(255,255,255,0.05); padding: 24px 32px 40px; flex: 1; }
        .tabs { display: flex; align-items: center; gap: 4px; margin-bottom: 24px; flex-wrap: wrap; }
        .tab { padding: 6px 16px; border-radius: 8px; border: 1px solid transparent; background: transparent; color: #888; font-size: 14px; cursor: pointer; }
        .tab.active { background: #1e1e1e; color: #fff; border-color: #2a2a2a; }
        .browse-all { margin-left: auto; font-size: 13px; color: #888; }
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
        .project-card { background: #0A0A0A; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; overflow: hidden; cursor: pointer; transition: border-color 0.15s, transform 0.15s; }
        .project-card:hover { border-color: rgba(124,58,237,0.3); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(124,58,237,0.1); }
        .project-preview { height: 180px; display: flex; align-items: center; justify-content: center; padding: 24px; }
        .preview-mock { width: 100%; max-width: 200px; display: flex; flex-direction: column; gap: 8px; }
        .mock-bar { height: 8px; border-radius: 4px; background: rgba(255,255,255,0.15); width: 60%; }
        .mock-line { height: 5px; border-radius: 3px; background: rgba(255,255,255,0.08); width: 100%; }
        .mock-line.short { width: 70%; }
        .project-info { display: flex; align-items: center; gap: 10px; padding: 12px 14px; border-top: 1px solid #1e1e1e; }
        .project-avatar { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #fff; flex-shrink: 0; }
        .project-text { flex: 1; min-width: 0; }
        .project-title { font-size: 14px; font-weight: 600; color: #e5e5e5; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .project-sub { font-size: 12px; color: #666; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .project-actions { display: flex; gap: 4px; opacity: 0; transition: opacity 0.2s; }
        .project-card:hover .project-actions { opacity: 1; }
        .action-btn { background: transparent; border: none; color: #888; font-size: 14px; cursor: pointer; padding: 4px; border-radius: 4px; }
        .action-btn:hover { background: #222; color: #fff; }
        .action-btn.delete:hover { color: #f87171; }
        .create-new-card { display: flex; align-items: center; justify-content: center; background: transparent; border: 1px dashed rgba(255,255,255,0.15); height: 100%; min-height: 240px; }
        .create-new-card:hover { background: rgba(255,255,255,0.02); border-color: rgba(124,58,237,0.4); }
        .create-new-content { display: flex; flex-direction: column; align-items: center; gap: 12px; color: #888; font-size: 14px; }
        .plus-icon { width: 40px; height: 40px; border-radius: 50%; background: #1a1a1a; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #A78BFA; }
      `}</style>
    </div>
  );
}
