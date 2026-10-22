/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "drive.google.com" }],
  },
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/home2", destination: "/", permanent: true },
      { source: "/home3", destination: "/", permanent: true },
      { source: "/taxi", destination: "/#taxi-booking", permanent: false },
      { source: "/destination/pollanaruwa", destination: "/destination/polonnaruwa", permanent: true },
      { source: "/service", destination: "/tours", permanent: true },
      { source: "/blog", destination: "/destination", permanent: true },
    ];
  },
};
