module.exports = {
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
      {
        source: "/auth/api/auth/login",
        destination: "/api/auth/login",
      },
      // {
      //   source: "/api/auth/loadusers",
      //   destination: "/api/auth/loadusers",
      // },
    ];
  },
};
