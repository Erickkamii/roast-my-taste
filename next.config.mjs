/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'i.scdn.co', pathname: '/**' },
      { protocol: 'https', hostname: 'mosaic.scdn.co', pathname: '/**' },
      { protocol: 'https', hostname: 'wrapped-images.spotifycdn.com', pathname: '/**' },
    ],
  },
}
export default nextConfig