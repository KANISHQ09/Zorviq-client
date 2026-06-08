import clsx from "clsx";

export function Skeleton({ className }: { className?: string }) {
  return <div className={clsx("ui-skeleton", className)} aria-hidden />;
}
