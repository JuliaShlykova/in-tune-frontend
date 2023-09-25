const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/auth/google',
    createProxyMiddleware({
      target: process.env.API_URL,
      // changeOrigin: true,
    })
  );
};