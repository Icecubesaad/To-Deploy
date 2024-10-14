module.exports = {
    async rewrites() {
      return [
        {
          source: '/fonts/:path*',
          destination: 'https://external-server.com/fonts/:path*',
        },
      ];
    },
    reactStrictMode: false,
    images: {
      domains: ['png.pngtree.com','res.cloudinary.com','static.vecteezy.com','i.pinimg.com'], // Add the domain here
    },
  };
  