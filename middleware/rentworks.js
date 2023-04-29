import { createProxyMiddleware } from 'http-proxy-middleware';

export default createProxyMiddleware({
  target: 'https://rwwebe.barscloud.com:8716', // The base URL of the target API
  changeOrigin: true,
  pathRewrite: {
    '^/thrpanama/soap': '/thrpanama/soap', // Rewrite the path to match the target API's path
  },
});