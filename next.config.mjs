"use strict";

import nextMDX from "@next/mdx";
import checkEnvironmentVariables from "./environment.config.mjs";

/** @type {import('next').NextConfig} */
const nextConfigBase = {
    // `reactStrictMode` is enabled by default but let's make sure it's `true`
    reactStrictMode: true,
    pageExtensions: ["md", "mdx", "tsx", "ts"],
    webpack: (config) => {
        checkEnvironmentVariables();
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.clerk.com",
                port: "",
            },
        ],
    },
};

// The following is needed to be able to render mdx content
const withMdx = nextMDX();
const nextConfig = withMdx(nextConfigBase);

export default nextConfig;
