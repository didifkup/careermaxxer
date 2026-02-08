import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Use project root for file tracing (avoids "multiple lockfiles" warning when parent has package-lock.json)
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
