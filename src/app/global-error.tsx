"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui", padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ color: "#b91c1c", marginBottom: "1rem" }}>Something went wrong</h1>
        <p style={{ color: "#444", marginBottom: "0.5rem" }}>{error.message}</p>
        {error.digest && (
          <p style={{ fontSize: "0.875rem", color: "#888" }}>Digest: {error.digest}</p>
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
