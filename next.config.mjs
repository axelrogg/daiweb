"use strict";

import nextMDX from "@next/mdx";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import rehypeHighlight from "rehype-highlight";
import checkEnvironmentVariables from "./environment.config.mjs";

/** @type {import('next').NextConfig} */
const nextConfigBase = {
    // `reactStrictMode` is enabled by default but let's make sure it's `true`
    experimental: {
        serverComponentsExternalPackages: ["pino"],
    },
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
                hostname: "lh3.googleusercontent.com",
            },
        ],
    },
};

// The following is needed to be able to render mdx content
const withMdx = nextMDX({
    options: {
        rehypePlugins: [rehypeSlug, rehypeHighlight],
        remarkPlugins: [[remarkToc, { heading: "Contenidos" }]],
    },
});
const nextConfig = withMdx(nextConfigBase);

export default nextConfig;
