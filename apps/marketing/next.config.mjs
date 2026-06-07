/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SITE_URL: "https://www.voxmation.com",
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400, // 31 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "2ywrmvccumupilj7.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
