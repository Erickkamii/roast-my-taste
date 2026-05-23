const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8080').replace(/\/$/, '')

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: `${backendUrl}/api/:path*`,
    },
    {
      source: '/oauth2/:path*',
      destination: `${backendUrl}/oauth2/:path*`,
    },
    {
      source: '/login/:path*',
      destination: `${backendUrl}/login/:path*`,
    },
    {
      source: '/logout',
      destination: `${backendUrl}/logout`,
    },
  ]
},
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mosaic.scdn.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wrapped-images.spotifycdn.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
