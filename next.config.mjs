import nextMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfigBase = {
    // `reactStrictMode` is enabled by default but let's make sure it's `true`
    reactStrictMode: true,
    pageExtensions: ["md", "mdx", "tsx", "ts"],
};

// The following is needed to be able to render mdx content
const withMdx = nextMDX();
const nextConfig = withMdx(nextConfigBase);

export default nextConfig;
