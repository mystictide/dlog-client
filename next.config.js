/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dapi.herrguller.cc",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src/assets/css")],
  },
};

module.exports = nextConfig;
