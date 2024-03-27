import nextMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfigBase = {
    pageExtensions: ["md", "mdx", "tsx", "ts"],
};

// The following is needed to be able to render mdx content
const withMdx = nextMDX();
const nextConfig = withMdx(nextConfigBase);

export default nextConfig;
