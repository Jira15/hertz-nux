import { d as distExports } from './rollup/index.mjs';
import 'http-proxy';
import 'unenv/runtime/npm/debug';
import 'is-glob';
import 'micromatch';
import 'url';
import 'is-plain-obj';
import 'zlib';
import 'querystring';

const proxy = distExports.createProxyMiddleware({
  target: "https://secure.nmi.com",
  // The base URL of the target API
  changeOrigin: true,
  pathRewrite: {
    "^/api/transact": "/api/transact.php"
    // Rewrite the path to match the target API's path
  }
});

export { proxy as default };
//# sourceMappingURL=proxy-d8f1f544.mjs.map
