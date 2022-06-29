/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["via.placeholder.com"],

    formats: ["image/webp"],
  },
  // experimental: {
  //   images: {
  //     remotePatterns: [
  //       {
  //         protocol: "https",
  //         hostname: "via.placeholder.com",
  //         // port: "",
  //         // pathname: "/account123/**",
  //       },
  //     ],
  //   },
  // },
};

module.exports = nextConfig;
