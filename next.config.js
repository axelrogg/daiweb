/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "media.vanityfair.com",
                port: "",
                pathname: "/photos/**"
            }
        ]
    }
};

module.exports = nextConfig;
