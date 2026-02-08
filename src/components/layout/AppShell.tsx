"use client";

import { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
}

/**
 * Client wrapper for consistent layout (e.g. for future sidebar state).
 * Layout structure lives in root layout; this is for client-only chrome.
 */
export function AppShell({ children }: AppShellProps) {
  return <>{children}</>;
}
