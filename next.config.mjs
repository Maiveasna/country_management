/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.biggerbolderbaking.com",
        port: "",
        pathname: "/wp-content/**",
      },
    ],
  },
  //experimental: {
  //  appDir: true,
  //},
}

export default nextConfig
