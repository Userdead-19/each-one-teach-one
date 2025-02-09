/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable if you want to continue using Turbopack
    turbo: {
      // Configure Turbopack options
      resolveAlias: {
        // Add any necessary module aliases here
      }
    }
  },
  // Other existing config options...
}

module.exports = nextConfig