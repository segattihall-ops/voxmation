/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SITE_URL: "https://voxmation.com",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "2ywrmvccumupilj7.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
