/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 't3.ftcdn.net'},
            { protocol: 'https', hostname: 'images.ctfassets.net'},
        ]
    }
};

export default nextConfig;
