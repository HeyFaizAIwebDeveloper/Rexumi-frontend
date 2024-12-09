/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ["res.cloudinary.com"],
    },
    async rewrites() {
        return [
            {
                source: "/api/v1/:path*",
                destination: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/:path*`,
            },
        ];
    },
};

module.exports = nextConfig;
