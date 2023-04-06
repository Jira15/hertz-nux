import { createProxyMiddleware } from 'http-proxy-middleware';

export default createProxyMiddleware({
  target: 'https://secure.nmi.com', // The base URL of the target API
  changeOrigin: true,
  pathRewrite: {
    '^/api/transact': '/api/transact.php', // Rewrite the path to match the target API's path
  },
});