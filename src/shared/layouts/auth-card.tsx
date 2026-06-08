import Link from "next/link";
import { ReactNode } from "react";

export function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <main className="auth-page">
      <div className="auth-shell">
        <div className="auth-brand">
          <Link href="/" className="auth-logo">
            ZORVIQ
          </Link>
          <p>{subtitle}</p>
        </div>
        <section className="auth-card">
          <h1>{title}</h1>
          {children}
        </section>
      </div>
    </main>
  );
}
