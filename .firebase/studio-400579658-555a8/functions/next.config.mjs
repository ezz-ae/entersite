// next.config.mjs
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var nextConfig = {
  reactStrictMode: true,
  turbopack: {
    // Force Next.js to treat this folder as the workspace root so .env.local is loaded here.
    root: __dirname
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**"
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "4.5mb"
    }
  }
};
var next_config_default = nextConfig;
export {
  next_config_default as default
};
