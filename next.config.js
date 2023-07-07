module.exports = {
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
    optimizeFonts: false,
  },
  serverRuntimeConfig: {
    // Increase payload limit to 10MB (adjust as needed)
    maxPayload: 1024 * 1024 * 10, // 10MB in bytes
  },
}
// const withImages = require('next-images');
// module.exports = withImages();
