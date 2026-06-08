export function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className="ui-error" role="alert">
      {message}
    </p>
  );
}
