/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  typescript: { ignoreBuildErrors: true },
  compiler: {
    emotion: true,
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  images: {
    domains: ["rickandmortyapi.com"],
  },
  async redirects() {
    return [
      {
        source: "/episode",
        destination: "/episode/1",
        permanent: true,
      },
      {
        source: "/episode/details",
        destination: "/episode/1",
        permanent: true,
      },
      {
        source: "/character",
        destination: "/character/1",
        permanent: true,
      },
      {
        source: "/character/details",
        destination: "/character/1",
        permanent: true,
      },
    ];
  },
  // webpack: (config, { isServer, webpack }) => {
  //   if (!isServer) {
  //     // Ensures no server modules are included on the client.
  //     config.plugins.push(
  //       new webpack.IgnorePlugin({
  //         resourceRegExp: /lib\/server/,
  //       })
  //     );
  //   }

  //   return config;
  // },
};

module.exports = nextConfig;
