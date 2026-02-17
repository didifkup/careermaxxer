"use client";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "object" && error !== null && "message" in error) {
    const m = (error as { message: unknown }).message;
    const s = typeof m === "string" ? m : String(m ?? "");
    if (s && s !== "[object Object]" && !s.startsWith("[object ")) return s;
  }
  if (typeof error === "string" && !error.startsWith("[object ")) return error;
  return "An unexpected error occurred";
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const message = getErrorMessage(error);
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui", padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ color: "#b91c1c", marginBottom: "1rem" }}>Something went wrong</h1>
        <p style={{ color: "#444", marginBottom: "0.5rem" }}>{message}</p>
        {typeof error === "object" && error !== null && "digest" in error && (error as { digest?: string }).digest && (
          <p style={{ fontSize: "0.875rem", color: "#888" }}>Digest: {(error as { digest: string }).digest}</p>
        )}
        <p style={{ fontSize: "0.875rem", color: "#666", marginTop: "1rem" }}>
          Check the terminal where you ran <code>npm run dev</code> for the full stack trace.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            background: "#0a2463",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
