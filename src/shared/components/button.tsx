import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  isLoading?: boolean;
  icon?: ReactNode;
};

export function Button({
  variant = "primary",
  isLoading = false,
  icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx("ui-button", `ui-button--${variant}`, className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <span className="ui-spinner" aria-hidden /> : icon}
      <span>{children}</span>
    </button>
  );
}
