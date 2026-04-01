/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    SITE_URL: "https://voxmation.com",
  },
};

export default nextConfig;
