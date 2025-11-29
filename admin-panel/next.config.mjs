/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['react-dropzone'],
  },
  images: {
    domains: ['localhost', 'img.youtube.com'],
  },
};

export default nextConfig;
