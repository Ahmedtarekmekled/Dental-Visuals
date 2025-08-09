/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Disable typed routes for now to avoid build issues
    // typedRoutes: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "sketchfab.com" },
      { protocol: "https", hostname: "*.sketchfab.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Permissions-Policy",
            value:
              "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
