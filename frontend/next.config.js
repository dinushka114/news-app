/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'news-backend.azurewebsites.net',
                port: '',
                pathname: '/uploads/**',
            },
        ],
    },
    output: 'standalone',
}

module.exports = nextConfig
