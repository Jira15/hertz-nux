import { createProxyMiddleware } from "http-proxy-middleware";
const proxy = createProxyMiddleware({
  target: "https://secure.nmi.com",
  // The base URL of the target API
  changeOrigin: true,
  pathRewrite: {
    "^/api/transact": "/api/transact.php"
    // Rewrite the path to match the target API's path
  }
});
export {
  proxy as default
};
//# sourceMappingURL=proxy-d8f1f544.js.map
