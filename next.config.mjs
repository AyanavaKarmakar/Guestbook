// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */

!process.env.SKIP_ENV_VALIDATION &&
  !process.env.CI &&
  (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: [
      "user-images.githubusercontent.com",
      "avatars.githubusercontent.com",
      "ayanava-karmakar.imgix.net",
    ],
  },
  eslint: { ignoreDuringBuilds: !!process.env.CI },
};

export default config;
