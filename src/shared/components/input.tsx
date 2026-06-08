import { InputHTMLAttributes, useId } from "react";
import clsx from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ label, error, id, className, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className={clsx("ui-field", className)}>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        {...props}
      />
      {error && <p id={errorId}>{error}</p>}
    </div>
  );
}
