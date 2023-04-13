import * as httpProxy$1 from 'http-proxy';
import require$$0$6 from 'unenv/runtime/npm/debug';
import * as isGlob$1 from 'is-glob';
import * as micromatch$1 from 'micromatch';
import * as url$2 from 'url';
import * as isPlainObj$2 from 'is-plain-obj';
import * as zlib$1 from 'zlib';
import * as querystring$1 from 'querystring';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : "undefined" !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

var dist = {};

var httpProxyMiddleware = {};

const require$$0$5 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(httpProxy$1);

var configuration = {};

var errors = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ERRORS = void 0;
	(function (ERRORS) {
	    ERRORS["ERR_CONFIG_FACTORY_TARGET_MISSING"] = "[HPM] Missing \"target\" option. Example: {target: \"http://www.example.org\"}";
	    ERRORS["ERR_CONTEXT_MATCHER_GENERIC"] = "[HPM] Invalid context. Expecting something like: \"/api\" or [\"/api\", \"/ajax\"]";
	    ERRORS["ERR_CONTEXT_MATCHER_INVALID_ARRAY"] = "[HPM] Invalid pathFilter. Expecting something like: [\"/api\", \"/ajax\"] or [\"/api/**\", \"!**.html\"]";
	    ERRORS["ERR_PATH_REWRITER_CONFIG"] = "[HPM] Invalid pathRewrite config. Expecting object with pathRewrite config or a rewrite function";
	})(exports.ERRORS || (exports.ERRORS = {}));
} (errors));

Object.defineProperty(configuration, "__esModule", { value: true });
configuration.verifyConfig = void 0;
const errors_1$2 = errors;
function verifyConfig(options) {
    if (!options.target && !options.router) {
        throw new Error(errors_1$2.ERRORS.ERR_CONFIG_FACTORY_TARGET_MISSING);
    }
}
configuration.verifyConfig = verifyConfig;

var getPlugins$1 = {};

var _default = {};

var debugProxyErrorsPlugin$1 = {};

var debug$6 = {};

Object.defineProperty(debug$6, "__esModule", { value: true });
debug$6.Debug = void 0;
const createDebug = require$$0$6;
/**
 * Debug instance with the given namespace: http-proxy-middleware
 */
debug$6.Debug = createDebug('http-proxy-middleware');

Object.defineProperty(debugProxyErrorsPlugin$1, "__esModule", { value: true });
debugProxyErrorsPlugin$1.debugProxyErrorsPlugin = void 0;
const debug_1$6 = debug$6;
const debug$5 = debug_1$6.Debug.extend('debug-proxy-errors-plugin');
/**
 * Subscribe to {@link https://www.npmjs.com/package/http-proxy#listening-for-proxy-events http-proxy error events} to prevent server from crashing.
 * Errors are logged with {@link https://www.npmjs.com/package/debug debug} library.
 */
const debugProxyErrorsPlugin = (proxyServer) => {
    /**
     * http-proxy doesn't handle any errors by default (https://github.com/http-party/node-http-proxy#listening-for-proxy-events)
     * Prevent server from crashing when http-proxy errors (uncaught errors)
     */
    proxyServer.on('error', (error, req, res, target) => {
        debug$5(`http-proxy error event: \n%O`, error);
    });
    proxyServer.on('proxyReq', (proxyReq, req, socket) => {
        socket.on('error', (error) => {
            debug$5('Socket error in proxyReq event: \n%O', error);
        });
    });
    /**
     * Fix SSE close events
     * @link https://github.com/chimurai/http-proxy-middleware/issues/678
     * @link https://github.com/http-party/node-http-proxy/issues/1520#issue-877626125
     */
    proxyServer.on('proxyRes', (proxyRes, req, res) => {
        res.on('close', () => {
            if (!res.writableEnded) {
                debug$5('Destroying proxyRes in proxyRes close event');
                proxyRes.destroy();
            }
        });
    });
    /**
     * Fix crash when target server restarts
     * https://github.com/chimurai/http-proxy-middleware/issues/476#issuecomment-746329030
     * https://github.com/webpack/webpack-dev-server/issues/1642#issuecomment-790602225
     */
    proxyServer.on('proxyReqWs', (proxyReq, req, socket) => {
        socket.on('error', (error) => {
            debug$5('Socket error in proxyReqWs event: \n%O', error);
        });
    });
    proxyServer.on('open', (proxySocket) => {
        proxySocket.on('error', (error) => {
            debug$5('Socket error in open event: \n%O', error);
        });
    });
    proxyServer.on('close', (req, socket, head) => {
        socket.on('error', (error) => {
            debug$5('Socket error in close event: \n%O', error);
        });
    });
    // https://github.com/webpack/webpack-dev-server/issues/1642#issuecomment-1103136590
    proxyServer.on('econnreset', (error, req, res, target) => {
        debug$5(`http-proxy econnreset event: \n%O`, error);
    });
};
debugProxyErrorsPlugin$1.debugProxyErrorsPlugin = debugProxyErrorsPlugin;

var errorResponsePlugin$1 = {};

var statusCode = {};

Object.defineProperty(statusCode, "__esModule", { value: true });
statusCode.getStatusCode = void 0;
function getStatusCode(errorCode) {
    let statusCode;
    if (/HPE_INVALID/.test(errorCode)) {
        statusCode = 502;
    }
    else {
        switch (errorCode) {
            case 'ECONNRESET':
            case 'ENOTFOUND':
            case 'ECONNREFUSED':
            case 'ETIMEDOUT':
                statusCode = 504;
                break;
            default:
                statusCode = 500;
                break;
        }
    }
    return statusCode;
}
statusCode.getStatusCode = getStatusCode;

Object.defineProperty(errorResponsePlugin$1, "__esModule", { value: true });
errorResponsePlugin$1.errorResponsePlugin = void 0;
const status_code_1 = statusCode;
const errorResponsePlugin = (proxyServer, options) => {
    proxyServer.on('error', (err, req, res, target) => {
        // Re-throw error. Not recoverable since req & res are empty.
        if (!req && !res) {
            throw err; // "Error: Must provide a proper URL as target"
        }
        if (res.writeHead && !res.headersSent) {
            const statusCode = (0, status_code_1.getStatusCode)(err.code);
            res.writeHead(statusCode);
        }
        const host = req.headers && req.headers.host;
        res.end(`Error occurred while trying to proxy: ${host}${req.url}`);
    });
};
errorResponsePlugin$1.errorResponsePlugin = errorResponsePlugin;

var loggerPlugin$1 = {};

var logger = {};

/* eslint-disable @typescript-eslint/no-empty-function */
Object.defineProperty(logger, "__esModule", { value: true });
logger.getLogger = void 0;
/**
 * Compatibility matrix
 *
  | Library  |  log  |  info  | warn  |  error  | \<interpolation\> |
  |----------|:------|:-------|:------|:--------|:------------------|
  | console  |   ✅   |  ✅   |   ✅   |   ✅    |   ✅ (%s %o %O)   |
  | bunyan   |   ❌   |  ✅   |   ✅   |   ✅    |   ✅ (%s %o %O)   |
  | pino     |   ❌   |  ✅   |   ✅   |   ✅    |   ✅ (%s %o %O)   |
  | winston  |   ❌   |  ✅   |   ✅   |   ✅    |   ✅ (%s %o %O)^1 |
  | log4js   |   ❌   |  ✅   |   ✅   |   ✅    |   ✅ (%s %o %O)   |
 *
 * ^1: https://github.com/winstonjs/winston#string-interpolation
 */
const noopLogger = {
    info: () => { },
    warn: () => { },
    error: () => { },
};
function getLogger(options) {
    return options.logger || noopLogger;
}
logger.getLogger = getLogger;

Object.defineProperty(loggerPlugin$1, "__esModule", { value: true });
loggerPlugin$1.loggerPlugin = void 0;
const logger_1$1 = logger;
const loggerPlugin = (proxyServer, options) => {
    const logger = (0, logger_1$1.getLogger)(options);
    proxyServer.on('error', (err, req, res, target) => {
        var _a;
        const hostname = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.host;
        const requestHref = `${hostname}${req === null || req === void 0 ? void 0 : req.url}`;
        const targetHref = `${target === null || target === void 0 ? void 0 : target.href}`; // target is undefined when websocket errors
        const errorMessage = '[HPM] Error occurred while proxying request %s to %s [%s] (%s)';
        const errReference = 'https://nodejs.org/api/errors.html#errors_common_system_errors'; // link to Node Common Systems Errors page
        logger.error(errorMessage, requestHref, targetHref, err.code || err, errReference);
    });
    /**
     * Log request and response
     * @example
     * ```shell
     * [HPM] GET /users/ -> http://jsonplaceholder.typicode.com/users/ [304]
     * ```
     */
    proxyServer.on('proxyRes', (proxyRes, req, res) => {
        var _a;
        // BrowserSync uses req.originalUrl
        // Next.js doesn't have req.baseUrl
        const originalUrl = (_a = req.originalUrl) !== null && _a !== void 0 ? _a : `${req.baseUrl || ''}${req.url}`;
        const exchange = `[HPM] ${req.method} ${originalUrl} -> ${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path} [${proxyRes.statusCode}]`;
        logger.info(exchange);
    });
    /**
     * When client opens WebSocket connection
     */
    proxyServer.on('open', (socket) => {
        logger.info('[HPM] Client connected: %o', socket.address());
    });
    /**
     * When client closes WebSocket connection
     */
    proxyServer.on('close', (req, proxySocket, proxyHead) => {
        logger.info('[HPM] Client disconnected: %o', proxySocket.address());
    });
};
loggerPlugin$1.loggerPlugin = loggerPlugin;

var proxyEvents = {};

var _function = {};

/* eslint-disable @typescript-eslint/ban-types */
Object.defineProperty(_function, "__esModule", { value: true });
_function.getFunctionName = void 0;
function getFunctionName(fn) {
    return fn.name || '[anonymous Function]';
}
_function.getFunctionName = getFunctionName;

Object.defineProperty(proxyEvents, "__esModule", { value: true });
proxyEvents.proxyEventsPlugin = void 0;
const debug_1$5 = debug$6;
const function_1$2 = _function;
const debug$4 = debug_1$5.Debug.extend('proxy-events-plugin');
/**
 * Implements option.on object to subscribe to http-proxy events.
 *
 * @example
 * ```js
 * createProxyMiddleware({
 *  on: {
 *    error: (error, req, res, target) => {},
 *    proxyReq: (proxyReq, req, res, options) => {},
 *    proxyReqWs: (proxyReq, req, socket, options) => {},
 *    proxyRes: (proxyRes, req, res) => {},
 *    open: (proxySocket) => {},
 *    close: (proxyRes, proxySocket, proxyHead) => {},
 *    start: (req, res, target) => {},
 *    end: (req, res, proxyRes) => {},
 *    econnreset: (error, req, res, target) => {},
 *  }
 * });
 * ```
 */
const proxyEventsPlugin = (proxyServer, options) => {
    Object.entries(options.on || {}).forEach(([eventName, handler]) => {
        debug$4(`register event handler: "${eventName}" -> "${(0, function_1$2.getFunctionName)(handler)}"`);
        proxyServer.on(eventName, handler);
    });
};
proxyEvents.proxyEventsPlugin = proxyEventsPlugin;

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(debugProxyErrorsPlugin$1, exports);
	__exportStar(errorResponsePlugin$1, exports);
	__exportStar(loggerPlugin$1, exports);
	__exportStar(proxyEvents, exports);
} (_default));

Object.defineProperty(getPlugins$1, "__esModule", { value: true });
getPlugins$1.getPlugins = void 0;
const default_1 = _default;
function getPlugins(options) {
    var _a, _b;
    // don't load default errorResponsePlugin if user has specified their own
    const maybeErrorResponsePlugin = !!((_a = options.on) === null || _a === void 0 ? void 0 : _a.error) ? [] : [default_1.errorResponsePlugin];
    const defaultPlugins = !!options.ejectPlugins
        ? [] // no default plugins when ejecting
        : [default_1.debugProxyErrorsPlugin, default_1.proxyEventsPlugin, default_1.loggerPlugin, ...maybeErrorResponsePlugin];
    const userPlugins = (_b = options.plugins) !== null && _b !== void 0 ? _b : [];
    return [...defaultPlugins, ...userPlugins];
}
getPlugins$1.getPlugins = getPlugins;

var pathFilter = {};

const require$$0$4 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(isGlob$1);

const require$$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(micromatch$1);

const require$$0$3 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(url$2);

Object.defineProperty(pathFilter, "__esModule", { value: true });
pathFilter.matchPathFilter = void 0;
const isGlob = require$$0$4;
const micromatch = require$$1;
const url$1 = require$$0$3;
const errors_1$1 = errors;
function matchPathFilter(pathFilter = '/', uri, req) {
    // single path
    if (isStringPath(pathFilter)) {
        return matchSingleStringPath(pathFilter, uri);
    }
    // single glob path
    if (isGlobPath(pathFilter)) {
        return matchSingleGlobPath(pathFilter, uri);
    }
    // multi path
    if (Array.isArray(pathFilter)) {
        if (pathFilter.every(isStringPath)) {
            return matchMultiPath(pathFilter, uri);
        }
        if (pathFilter.every(isGlobPath)) {
            return matchMultiGlobPath(pathFilter, uri);
        }
        throw new Error(errors_1$1.ERRORS.ERR_CONTEXT_MATCHER_INVALID_ARRAY);
    }
    // custom matching
    if (typeof pathFilter === 'function') {
        const pathname = getUrlPathName(uri);
        return pathFilter(pathname, req);
    }
    throw new Error(errors_1$1.ERRORS.ERR_CONTEXT_MATCHER_GENERIC);
}
pathFilter.matchPathFilter = matchPathFilter;
/**
 * @param  {String} pathFilter '/api'
 * @param  {String} uri     'http://example.org/api/b/c/d.html'
 * @return {Boolean}
 */
function matchSingleStringPath(pathFilter, uri) {
    const pathname = getUrlPathName(uri);
    return pathname.indexOf(pathFilter) === 0;
}
function matchSingleGlobPath(pattern, uri) {
    const pathname = getUrlPathName(uri);
    const matches = micromatch([pathname], pattern);
    return matches && matches.length > 0;
}
function matchMultiGlobPath(patternList, uri) {
    return matchSingleGlobPath(patternList, uri);
}
/**
 * @param  {String} pathFilterList ['/api', '/ajax']
 * @param  {String} uri     'http://example.org/api/b/c/d.html'
 * @return {Boolean}
 */
function matchMultiPath(pathFilterList, uri) {
    let isMultiPath = false;
    for (const context of pathFilterList) {
        if (matchSingleStringPath(context, uri)) {
            isMultiPath = true;
            break;
        }
    }
    return isMultiPath;
}
/**
 * Parses URI and returns RFC 3986 path
 *
 * @param  {String} uri from req.url
 * @return {String}     RFC 3986 path
 */
function getUrlPathName(uri) {
    return uri && url$1.parse(uri).pathname;
}
function isStringPath(pathFilter) {
    return typeof pathFilter === 'string' && !isGlob(pathFilter);
}
function isGlobPath(pathFilter) {
    return isGlob(pathFilter);
}

var pathRewriter = {};

const require$$0$2 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(isPlainObj$2);

Object.defineProperty(pathRewriter, "__esModule", { value: true });
pathRewriter.createPathRewriter = void 0;
const isPlainObj$1 = require$$0$2;
const errors_1 = errors;
const debug_1$4 = debug$6;
const debug$3 = debug_1$4.Debug.extend('path-rewriter');
/**
 * Create rewrite function, to cache parsed rewrite rules.
 *
 * @param {Object} rewriteConfig
 * @return {Function} Function to rewrite paths; This function should accept `path` (request.url) as parameter
 */
function createPathRewriter(rewriteConfig) {
    let rulesCache;
    if (!isValidRewriteConfig(rewriteConfig)) {
        return;
    }
    if (typeof rewriteConfig === 'function') {
        const customRewriteFn = rewriteConfig;
        return customRewriteFn;
    }
    else {
        rulesCache = parsePathRewriteRules(rewriteConfig);
        return rewritePath;
    }
    function rewritePath(path) {
        let result = path;
        for (const rule of rulesCache) {
            if (rule.regex.test(path)) {
                result = result.replace(rule.regex, rule.value);
                debug$3('rewriting path from "%s" to "%s"', path, result);
                break;
            }
        }
        return result;
    }
}
pathRewriter.createPathRewriter = createPathRewriter;
function isValidRewriteConfig(rewriteConfig) {
    if (typeof rewriteConfig === 'function') {
        return true;
    }
    else if (isPlainObj$1(rewriteConfig)) {
        return Object.keys(rewriteConfig).length !== 0;
    }
    else if (rewriteConfig === undefined || rewriteConfig === null) {
        return false;
    }
    else {
        throw new Error(errors_1.ERRORS.ERR_PATH_REWRITER_CONFIG);
    }
}
function parsePathRewriteRules(rewriteConfig) {
    const rules = [];
    if (isPlainObj$1(rewriteConfig)) {
        for (const [key, value] of Object.entries(rewriteConfig)) {
            rules.push({
                regex: new RegExp(key),
                value: value,
            });
            debug$3('rewrite rule created: "%s" ~> "%s"', key, value);
        }
    }
    return rules;
}

var router = {};

Object.defineProperty(router, "__esModule", { value: true });
router.getTarget = void 0;
const isPlainObj = require$$0$2;
const debug_1$3 = debug$6;
const debug$2 = debug_1$3.Debug.extend('router');
async function getTarget(req, config) {
    let newTarget;
    const router = config.router;
    if (isPlainObj(router)) {
        newTarget = getTargetFromProxyTable(req, router);
    }
    else if (typeof router === 'function') {
        newTarget = await router(req);
    }
    return newTarget;
}
router.getTarget = getTarget;
function getTargetFromProxyTable(req, table) {
    let result;
    const host = req.headers.host;
    const path = req.url;
    const hostAndPath = host + path;
    for (const [key, value] of Object.entries(table)) {
        if (containsPath(key)) {
            if (hostAndPath.indexOf(key) > -1) {
                // match 'localhost:3000/api'
                result = value;
                debug$2('match: "%s" -> "%s"', key, result);
                break;
            }
        }
        else {
            if (key === host) {
                // match 'localhost:3000'
                result = value;
                debug$2('match: "%s" -> "%s"', host, result);
                break;
            }
        }
    }
    return result;
}
function containsPath(v) {
    return v.indexOf('/') > -1;
}

Object.defineProperty(httpProxyMiddleware, "__esModule", { value: true });
httpProxyMiddleware.HttpProxyMiddleware = void 0;
const httpProxy = require$$0$5;
const configuration_1 = configuration;
const get_plugins_1 = getPlugins$1;
const path_filter_1 = pathFilter;
const PathRewriter = pathRewriter;
const Router = router;
const debug_1$2 = debug$6;
const function_1$1 = _function;
class HttpProxyMiddleware {
    constructor(options) {
        this.wsInternalSubscribed = false;
        this.serverOnCloseSubscribed = false;
        // https://github.com/Microsoft/TypeScript/wiki/'this'-in-TypeScript#red-flags-for-this
        this.middleware = async (req, res, next) => {
            var _a, _b;
            if (this.shouldProxy(this.proxyOptions.pathFilter, req)) {
                try {
                    const activeProxyOptions = await this.prepareProxyRequest(req);
                    (0, debug_1$2.Debug)(`proxy request to target: %O`, activeProxyOptions.target);
                    this.proxy.web(req, res, activeProxyOptions);
                }
                catch (err) {
                    next && next(err);
                }
            }
            else {
                next && next();
            }
            /**
             * Get the server object to subscribe to server events;
             * 'upgrade' for websocket and 'close' for graceful shutdown
             *
             * NOTE:
             * req.socket: node >= 13
             * req.connection: node < 13 (Remove this when node 12/13 support is dropped)
             */
            const server = (_b = (((_a = req.socket) !== null && _a !== void 0 ? _a : req.connection))) === null || _b === void 0 ? void 0 : _b.server;
            if (server && !this.serverOnCloseSubscribed) {
                server.on('close', () => {
                    (0, debug_1$2.Debug)('server close signal received: closing proxy server');
                    this.proxy.close();
                });
                this.serverOnCloseSubscribed = true;
            }
            if (this.proxyOptions.ws === true) {
                // use initial request to access the server object to subscribe to http upgrade event
                this.catchUpgradeRequest(server);
            }
        };
        this.catchUpgradeRequest = (server) => {
            if (!this.wsInternalSubscribed) {
                (0, debug_1$2.Debug)('subscribing to server upgrade event');
                server.on('upgrade', this.handleUpgrade);
                // prevent duplicate upgrade handling;
                // in case external upgrade is also configured
                this.wsInternalSubscribed = true;
            }
        };
        this.handleUpgrade = async (req, socket, head) => {
            if (this.shouldProxy(this.proxyOptions.pathFilter, req)) {
                const activeProxyOptions = await this.prepareProxyRequest(req);
                this.proxy.ws(req, socket, head, activeProxyOptions);
                (0, debug_1$2.Debug)('server upgrade event received. Proxying WebSocket');
            }
        };
        /**
         * Determine whether request should be proxied.
         */
        this.shouldProxy = (pathFilter, req) => {
            return (0, path_filter_1.matchPathFilter)(pathFilter, req.url, req);
        };
        /**
         * Apply option.router and option.pathRewrite
         * Order matters:
         *    Router uses original path for routing;
         *    NOT the modified path, after it has been rewritten by pathRewrite
         * @param {Object} req
         * @return {Object} proxy options
         */
        this.prepareProxyRequest = async (req) => {
            /**
             * Incorrect usage confirmed: https://github.com/expressjs/express/issues/4854#issuecomment-1066171160
             * Temporary restore req.url patch for {@link src/legacy/create-proxy-middleware.ts legacyCreateProxyMiddleware()}
             * FIXME: remove this patch in future release
             */
            if (this.middleware.__LEGACY_HTTP_PROXY_MIDDLEWARE__) {
                req.url = req.originalUrl || req.url;
            }
            const newProxyOptions = Object.assign({}, this.proxyOptions);
            // Apply in order:
            // 1. option.router
            // 2. option.pathRewrite
            await this.applyRouter(req, newProxyOptions);
            await this.applyPathRewrite(req, this.pathRewriter);
            return newProxyOptions;
        };
        // Modify option.target when router present.
        this.applyRouter = async (req, options) => {
            let newTarget;
            if (options.router) {
                newTarget = await Router.getTarget(req, options);
                if (newTarget) {
                    (0, debug_1$2.Debug)('router new target: "%s"', newTarget);
                    options.target = newTarget;
                }
            }
        };
        // rewrite path
        this.applyPathRewrite = async (req, pathRewriter) => {
            if (pathRewriter) {
                const path = await pathRewriter(req.url, req);
                if (typeof path === 'string') {
                    (0, debug_1$2.Debug)('pathRewrite new path: %s', req.url);
                    req.url = path;
                }
                else {
                    (0, debug_1$2.Debug)('pathRewrite: no rewritten path found: %s', req.url);
                }
            }
        };
        (0, configuration_1.verifyConfig)(options);
        this.proxyOptions = options;
        (0, debug_1$2.Debug)(`create proxy server`);
        this.proxy = httpProxy.createProxyServer({});
        this.registerPlugins(this.proxy, this.proxyOptions);
        this.pathRewriter = PathRewriter.createPathRewriter(this.proxyOptions.pathRewrite); // returns undefined when "pathRewrite" is not provided
        // https://github.com/chimurai/http-proxy-middleware/issues/19
        // expose function to upgrade externally
        this.middleware.upgrade = (req, socket, head) => {
            if (!this.wsInternalSubscribed) {
                this.handleUpgrade(req, socket, head);
            }
        };
    }
    registerPlugins(proxy, options) {
        const plugins = (0, get_plugins_1.getPlugins)(options);
        plugins.forEach((plugin) => {
            (0, debug_1$2.Debug)(`register plugin: "${(0, function_1$1.getFunctionName)(plugin)}"`);
            plugin(proxy, options);
        });
    }
}
httpProxyMiddleware.HttpProxyMiddleware = HttpProxyMiddleware;

var handlers = {};

var _public$1 = {};

var responseInterceptor$1 = {};

const require$$0$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(zlib$1);

Object.defineProperty(responseInterceptor$1, "__esModule", { value: true });
responseInterceptor$1.responseInterceptor = void 0;
const zlib = require$$0$1;
const debug_1$1 = debug$6;
const function_1 = _function;
const debug$1 = debug_1$1.Debug.extend('response-interceptor');
/**
 * Intercept responses from upstream.
 * Automatically decompress (deflate, gzip, brotli).
 * Give developer the opportunity to modify intercepted Buffer and http.ServerResponse
 *
 * NOTE: must set options.selfHandleResponse=true (prevent automatic call of res.end())
 */
function responseInterceptor(interceptor) {
    return async function proxyResResponseInterceptor(proxyRes, req, res) {
        debug$1('intercept proxy response');
        const originalProxyRes = proxyRes;
        let buffer = Buffer.from('', 'utf8');
        // decompress proxy response
        const _proxyRes = decompress(proxyRes, proxyRes.headers['content-encoding']);
        // concat data stream
        _proxyRes.on('data', (chunk) => (buffer = Buffer.concat([buffer, chunk])));
        _proxyRes.on('end', async () => {
            // copy original headers
            copyHeaders(proxyRes, res);
            // call interceptor with intercepted response (buffer)
            debug$1('call interceptor function: %s', (0, function_1.getFunctionName)(interceptor));
            const interceptedBuffer = Buffer.from(await interceptor(buffer, originalProxyRes, req, res));
            // set correct content-length (with double byte character support)
            debug$1('set content-length: %s', Buffer.byteLength(interceptedBuffer, 'utf8'));
            res.setHeader('content-length', Buffer.byteLength(interceptedBuffer, 'utf8'));
            debug$1('write intercepted response');
            res.write(interceptedBuffer);
            res.end();
        });
        _proxyRes.on('error', (error) => {
            res.end(`Error fetching proxied request: ${error.message}`);
        });
    };
}
responseInterceptor$1.responseInterceptor = responseInterceptor;
/**
 * Streaming decompression of proxy response
 * source: https://github.com/apache/superset/blob/9773aba522e957ed9423045ca153219638a85d2f/superset-frontend/webpack.proxy-config.js#L116
 */
function decompress(proxyRes, contentEncoding) {
    let _proxyRes = proxyRes;
    let decompress;
    switch (contentEncoding) {
        case 'gzip':
            decompress = zlib.createGunzip();
            break;
        case 'br':
            decompress = zlib.createBrotliDecompress();
            break;
        case 'deflate':
            decompress = zlib.createInflate();
            break;
    }
    if (decompress) {
        debug$1(`decompress proxy response with 'content-encoding': %s`, contentEncoding);
        _proxyRes.pipe(decompress);
        _proxyRes = decompress;
    }
    return _proxyRes;
}
/**
 * Copy original headers
 * https://github.com/apache/superset/blob/9773aba522e957ed9423045ca153219638a85d2f/superset-frontend/webpack.proxy-config.js#L78
 */
function copyHeaders(originalResponse, response) {
    debug$1('copy original response headers');
    response.statusCode = originalResponse.statusCode;
    response.statusMessage = originalResponse.statusMessage;
    if (response.setHeader) {
        let keys = Object.keys(originalResponse.headers);
        // ignore chunked, brotli, gzip, deflate headers
        keys = keys.filter((key) => !['content-encoding', 'transfer-encoding'].includes(key));
        keys.forEach((key) => {
            let value = originalResponse.headers[key];
            if (key === 'set-cookie') {
                // remove cookie domain
                value = Array.isArray(value) ? value : [value];
                value = value.map((x) => x.replace(/Domain=[^;]+?/i, ''));
            }
            response.setHeader(key, value);
        });
    }
    else {
        response.headers = originalResponse.headers;
    }
}

var fixRequestBody$1 = {};

const require$$0 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(querystring$1);

Object.defineProperty(fixRequestBody$1, "__esModule", { value: true });
fixRequestBody$1.fixRequestBody = void 0;
const querystring = require$$0;
/**
 * Fix proxied body if bodyParser is involved.
 */
function fixRequestBody(proxyReq, req) {
    const requestBody = req.body;
    if (!requestBody) {
        return;
    }
    const contentType = proxyReq.getHeader('Content-Type');
    const writeBody = (bodyData) => {
        // deepcode ignore ContentLengthInCode: bodyParser fix
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
    };
    if (contentType && contentType.includes('application/json')) {
        writeBody(JSON.stringify(requestBody));
    }
    if (contentType && contentType.includes('application/x-www-form-urlencoded')) {
        writeBody(querystring.stringify(requestBody));
    }
}
fixRequestBody$1.fixRequestBody = fixRequestBody;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.fixRequestBody = exports.responseInterceptor = void 0;
	var response_interceptor_1 = responseInterceptor$1;
	Object.defineProperty(exports, "responseInterceptor", { enumerable: true, get: function () { return response_interceptor_1.responseInterceptor; } });
	var fix_request_body_1 = fixRequestBody$1;
	Object.defineProperty(exports, "fixRequestBody", { enumerable: true, get: function () { return fix_request_body_1.fixRequestBody; } });
} (_public$1));

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(_public$1, exports);
} (handlers));

var legacy = {};

var _public = {};

var createProxyMiddleware = {};

var optionsAdapter = {};

Object.defineProperty(optionsAdapter, "__esModule", { value: true });
optionsAdapter.legacyOptionsAdapter = void 0;
const url = require$$0$3;
const debug_1 = debug$6;
const logger_1 = logger;
const debug = debug_1.Debug.extend('legacy-options-adapter');
// https://github.com/chimurai/http-proxy-middleware/blob/7341704d0aa9d1606dfd37ebfdffddd34c894784/src/_handlers.ts#L20-L27
const proxyEventMap = {
    onError: 'error',
    onProxyReq: 'proxyReq',
    onProxyRes: 'proxyRes',
    onProxyReqWs: 'proxyReqWs',
    onOpen: 'open',
    onClose: 'close',
};
/**
 * Convert {@link LegacyOptions legacy Options} to new {@link Options}
 */
function legacyOptionsAdapter(legacyContext, legacyOptions) {
    let options;
    let logger;
    // https://github.com/chimurai/http-proxy-middleware/pull/716
    if (typeof legacyContext === 'string' && !!url.parse(legacyContext).host) {
        throw new Error(`Shorthand syntax is removed from legacyCreateProxyMiddleware().
      Please use "legacyCreateProxyMiddleware({ target: 'http://www.example.org' })" instead.`);
    }
    // detect old "context" argument and convert to "options.pathFilter"
    // https://github.com/chimurai/http-proxy-middleware/pull/722/files#diff-a2a171449d862fe29692ce031981047d7ab755ae7f84c707aef80701b3ea0c80L4
    if (legacyContext && legacyOptions) {
        debug('map legacy context/filter to options.pathFilter');
        options = { ...legacyOptions, pathFilter: legacyContext };
        logger = getLegacyLogger(options);
        logger.warn(`[http-proxy-middleware] Legacy "context" argument is deprecated. Migrate your "context" to "options.pathFilter":

      const options = {
        pathFilter: '${legacyContext}',
      }

      More details: https://github.com/chimurai/http-proxy-middleware/blob/master/MIGRATION.md
      `);
    }
    else if (legacyContext && !legacyOptions) {
        options = { ...legacyContext };
        logger = getLegacyLogger(options);
    }
    // map old event names to new event names
    // https://github.com/chimurai/http-proxy-middleware/pull/745/files#diff-c54113cf61ec99691748a3890bfbeb00e10efb3f0a76f03a0fd9ec49072e410aL48-L53
    Object.entries(proxyEventMap).forEach(([legacyEventName, proxyEventName]) => {
        if (options[legacyEventName]) {
            options.on = { ...options.on };
            options.on[proxyEventName] = options[legacyEventName];
            debug('map legacy event "%s" to "on.%s"', legacyEventName, proxyEventName);
            logger.warn(`[http-proxy-middleware] Legacy "${legacyEventName}" is deprecated. Migrate to "options.on.${proxyEventName}":

        const options = {
          on: {
            ${proxyEventName}: () => {},
          },
        }

        More details: https://github.com/chimurai/http-proxy-middleware/blob/master/MIGRATION.md
        `);
        }
    });
    // map old logProvider to new logger
    // https://github.com/chimurai/http-proxy-middleware/pull/749
    const logProvider = options.logProvider && options.logProvider();
    const logLevel = options.logLevel;
    debug('legacy logLevel', logLevel);
    debug('legacy logProvider: %O', logProvider);
    if (typeof logLevel === 'string' && logLevel !== 'silent') {
        debug('map "logProvider" to "logger"');
        logger.warn(`[http-proxy-middleware] Legacy "logLevel" and "logProvider" are deprecated. Migrate to "options.logger":

      const options = {
        logger: console,
      }

      More details: https://github.com/chimurai/http-proxy-middleware/blob/master/MIGRATION.md
      `);
    }
    return options;
}
optionsAdapter.legacyOptionsAdapter = legacyOptionsAdapter;
function getLegacyLogger(options) {
    const legacyLogger = options.logProvider && options.logProvider();
    if (legacyLogger) {
        options.logger = legacyLogger;
    }
    return (0, logger_1.getLogger)(options);
}

var hasRequiredCreateProxyMiddleware;

function requireCreateProxyMiddleware () {
	if (hasRequiredCreateProxyMiddleware) return createProxyMiddleware;
	hasRequiredCreateProxyMiddleware = 1;
	Object.defineProperty(createProxyMiddleware, "__esModule", { value: true });
	createProxyMiddleware.legacyCreateProxyMiddleware = void 0;
	const __1 = requireDist();
	const debug_1 = debug$6;
	const options_adapter_1 = optionsAdapter;
	const debug = debug_1.Debug.extend('legacy-create-proxy-middleware');
	function legacyCreateProxyMiddleware(legacyContext, legacyOptions) {
	    debug('init');
	    const options = (0, options_adapter_1.legacyOptionsAdapter)(legacyContext, legacyOptions);
	    const proxyMiddleware = (0, __1.createProxyMiddleware)(options);
	    // https://github.com/chimurai/http-proxy-middleware/pull/731/files#diff-07e6ad10bda0df091b737caed42767657cd0bd74a01246a1a0b7ab59c0f6e977L118
	    debug('add marker for patching req.url (old behavior)');
	    proxyMiddleware.__LEGACY_HTTP_PROXY_MIDDLEWARE__ = true;
	    return proxyMiddleware;
	}
	createProxyMiddleware.legacyCreateProxyMiddleware = legacyCreateProxyMiddleware;
	return createProxyMiddleware;
}

var hasRequired_public;

function require_public () {
	if (hasRequired_public) return _public;
	hasRequired_public = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.legacyCreateProxyMiddleware = void 0;
		var create_proxy_middleware_1 = requireCreateProxyMiddleware();
		Object.defineProperty(exports, "legacyCreateProxyMiddleware", { enumerable: true, get: function () { return create_proxy_middleware_1.legacyCreateProxyMiddleware; } });
} (_public));
	return _public;
}

var hasRequiredLegacy;

function requireLegacy () {
	if (hasRequiredLegacy) return legacy;
	hasRequiredLegacy = 1;
	(function (exports) {
		var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		__exportStar(require_public(), exports);
} (legacy));
	return legacy;
}

var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist;
	hasRequiredDist = 1;
	(function (exports) {
		var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.createProxyMiddleware = void 0;
		const http_proxy_middleware_1 = httpProxyMiddleware;
		function createProxyMiddleware(options) {
		    const { middleware } = new http_proxy_middleware_1.HttpProxyMiddleware(options);
		    return middleware;
		}
		exports.createProxyMiddleware = createProxyMiddleware;
		__exportStar(handlers, exports);
		/**
		 * Default plugins
		 */
		__exportStar(_default, exports);
		/**
		 * Legacy exports
		 */
		__exportStar(requireLegacy(), exports);
} (dist));
	return dist;
}

var distExports = requireDist();

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
