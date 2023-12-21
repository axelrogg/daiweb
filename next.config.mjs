import createMDX from "@next/mdx";
import rehypeSlug from "rehype-slug";

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "media.vanityfair.com",
                port: "",
                pathname: "/photos/**",
            },
        ],
    },
};

const withMDX = createMDX({
    options: {
        rehypePlugins: [rehypeSlug],
    },
});

export default withMDX(nextConfig);
