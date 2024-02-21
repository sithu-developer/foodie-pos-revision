/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "msquarefdc.sgp1.digitaloceanspaces.com",
      },
    ],
  }
}
