/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    // WebP only: AVIF encoding of the large source PNGs takes 10-30s per image, so slides rotated before they loaded
    formats: ["image/webp"],
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
