globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseStatus, setResponseHeader, getRequestHeaders, createError, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import defu, { defuFn } from 'defu';
import { hash } from 'ohash';
import { parseURL, withoutBase, joinURL, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage, prefixStorage } from 'unstorage';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"envPrefix":"NUXT_","routeRules":{"/__nuxt_error":{"cache":false},"/_nuxt/**":{"headers":{"cache-control":"public, max-age=31536000, immutable"}}}},"public":{"directus":{"url":"https://admin.intermarketing.com.pa","autoFetch":true,"fetchUserParams":"","token":""}}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
overrideConfig(_runtimeConfig);
const runtimeConfig = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => runtimeConfig;
deepFreeze(appConfig);
function getEnv(key) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
}
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

storage.mount('/assets', assets$1);

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(key, () => fn(...args), shouldInvalidateCache);
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return key.replace(/[^\dA-Za-z]/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const key = await opts.getKey?.(event);
      if (key) {
        return escapeKey(key);
      }
      const url = event.node.req.originalUrl || event.node.req.url;
      const friendlyName = escapeKey(decodeURI(parseURL(url).pathname)).slice(
        0,
        16
      );
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const reqProxy = cloneWithProxy(incomingEvent.node.req, { headers: {} });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString();
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      }
      return proxyRequest(event, target, {
        fetch: $fetch.raw,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.node.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(path, useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('./error-500.mjs');
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  event.node.res.end(await res.text());
});

const assets = {
  "/_nuxt/ac.7222318b.js": {
    "type": "application/javascript",
    "etag": "\"2b5e-Ang9cMF1Nwy2Li3oreALn5ndDiA\"",
    "mtime": "2023-05-05T16:14:20.459Z",
    "size": 11102,
    "path": "../public/_nuxt/ac.7222318b.js"
  },
  "/_nuxt/actualizar.25c2246b.js": {
    "type": "application/javascript",
    "etag": "\"22c-eK7ffe7C9K2DV19QUrrxn+dDOX0\"",
    "mtime": "2023-05-05T16:14:20.459Z",
    "size": 556,
    "path": "../public/_nuxt/actualizar.25c2246b.js"
  },
  "/_nuxt/checkout.44c663f4.js": {
    "type": "application/javascript",
    "etag": "\"e70a-+6sfzjmt1y8Ppe4290HxkuHEcZw\"",
    "mtime": "2023-05-05T16:14:20.478Z",
    "size": 59146,
    "path": "../public/_nuxt/checkout.44c663f4.js"
  },
  "/_nuxt/checkout.ac74ce70.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"11b5-Ru4o6Mp7wESqZNBXXatw0LILGvo\"",
    "mtime": "2023-05-05T16:14:20.444Z",
    "size": 4533,
    "path": "../public/_nuxt/checkout.ac74ce70.css"
  },
  "/_nuxt/clientes.52c96267.js": {
    "type": "application/javascript",
    "etag": "\"5f3-k6EeiFgQ6594FpglxQouKgHGx3w\"",
    "mtime": "2023-05-05T16:14:20.475Z",
    "size": 1523,
    "path": "../public/_nuxt/clientes.52c96267.js"
  },
  "/_nuxt/clientes.c79ba4f7.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"51d-8v2ZKrmmumVcU2ifAg+Dauh2dTc\"",
    "mtime": "2023-05-05T16:14:20.451Z",
    "size": 1309,
    "path": "../public/_nuxt/clientes.c79ba4f7.css"
  },
  "/_nuxt/corpo1.0779bdda.jpg": {
    "type": "image/jpeg",
    "etag": "\"13d7f-Iil6KaOzzPZwFkvOsBV5/28HxMw\"",
    "mtime": "2023-05-05T16:14:20.451Z",
    "size": 81279,
    "path": "../public/_nuxt/corpo1.0779bdda.jpg"
  },
  "/_nuxt/Desglose.ac52ee89.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"af4-IH3vGpjk/UxKHgSyCK/5Gh2DC/w\"",
    "mtime": "2023-05-05T16:14:20.458Z",
    "size": 2804,
    "path": "../public/_nuxt/Desglose.ac52ee89.css"
  },
  "/_nuxt/Desglose.c2af3c8b.js": {
    "type": "application/javascript",
    "etag": "\"1c88-mhOdybdl946TWStlPwO0qisM4Ow\"",
    "mtime": "2023-05-05T16:14:20.475Z",
    "size": 7304,
    "path": "../public/_nuxt/Desglose.c2af3c8b.js"
  },
  "/_nuxt/entry.a38ffb54.js": {
    "type": "application/javascript",
    "etag": "\"66a4c-56j0HqHaMWYVbAhDnpjQUqx+HlY\"",
    "mtime": "2023-05-05T16:14:20.481Z",
    "size": 420428,
    "path": "../public/_nuxt/entry.a38ffb54.js"
  },
  "/_nuxt/entry.ebd40751.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6070-4s2rucSZaoBoEDVjreWwx3gVAI4\"",
    "mtime": "2023-05-05T16:14:20.451Z",
    "size": 24688,
    "path": "../public/_nuxt/entry.ebd40751.css"
  },
  "/_nuxt/error-404.23f2309d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-ivsbEmi48+s9HDOqtrSdWFvddYQ\"",
    "mtime": "2023-05-05T16:14:20.458Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.23f2309d.css"
  },
  "/_nuxt/error-404.e2f71bd5.js": {
    "type": "application/javascript",
    "etag": "\"8a3-2m09TNd6zrCr62k+n5d7Am22vQQ\"",
    "mtime": "2023-05-05T16:14:20.475Z",
    "size": 2211,
    "path": "../public/_nuxt/error-404.e2f71bd5.js"
  },
  "/_nuxt/error-500.aa16ed4d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-7j4Tsx89siDo85YoIs0XqsPWmPI\"",
    "mtime": "2023-05-05T16:14:20.458Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.aa16ed4d.css"
  },
  "/_nuxt/error-500.befdff28.js": {
    "type": "application/javascript",
    "etag": "\"751-hjPATDAVpHp90RamN0C8Uqe34go\"",
    "mtime": "2023-05-05T16:14:20.478Z",
    "size": 1873,
    "path": "../public/_nuxt/error-500.befdff28.js"
  },
  "/_nuxt/error-component.e1412fa8.js": {
    "type": "application/javascript",
    "etag": "\"45e-OoKDRrkDNyXKW3O+FZMgn9noPJc\"",
    "mtime": "2023-05-05T16:14:20.459Z",
    "size": 1118,
    "path": "../public/_nuxt/error-component.e1412fa8.js"
  },
  "/_nuxt/error.10c0243f.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"225-QIEk48KnauhgcQpwAuqH/37QXyI\"",
    "mtime": "2023-05-05T16:14:20.451Z",
    "size": 549,
    "path": "../public/_nuxt/error.10c0243f.css"
  },
  "/_nuxt/error.4afdbb4a.js": {
    "type": "application/javascript",
    "etag": "\"25e-U3bXYkM+fDKHhu5xIs5WMQeG88s\"",
    "mtime": "2023-05-05T16:14:20.459Z",
    "size": 606,
    "path": "../public/_nuxt/error.4afdbb4a.js"
  },
  "/_nuxt/get-asset-url.2ad900aa.js": {
    "type": "application/javascript",
    "etag": "\"5e-qtj99hQve6lFSs+V1VJ+AIYam44\"",
    "mtime": "2023-05-05T16:14:20.458Z",
    "size": 94,
    "path": "../public/_nuxt/get-asset-url.2ad900aa.js"
  },
  "/_nuxt/index.0766fa35.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"269c-jKzmZBMN4pmkNRYvhdLULz5SBMY\"",
    "mtime": "2023-05-05T16:14:20.458Z",
    "size": 9884,
    "path": "../public/_nuxt/index.0766fa35.css"
  },
  "/_nuxt/index.5afef92a.js": {
    "type": "application/javascript",
    "etag": "\"9935-J4z0aciCRhdb0xTUTIa6+Ad3Qt4\"",
    "mtime": "2023-05-05T16:14:20.478Z",
    "size": 39221,
    "path": "../public/_nuxt/index.5afef92a.js"
  },
  "/_nuxt/index.620cf6e9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6e5-Ll68RpyBoFS3C6yFjvLX+Ml2o0o\"",
    "mtime": "2023-05-05T16:14:20.452Z",
    "size": 1765,
    "path": "../public/_nuxt/index.620cf6e9.css"
  },
  "/_nuxt/index.648ed283.js": {
    "type": "application/javascript",
    "etag": "\"b1a-Zjdk9nwG/SMj50LbFJ18Bl2qal8\"",
    "mtime": "2023-05-05T16:14:20.475Z",
    "size": 2842,
    "path": "../public/_nuxt/index.648ed283.js"
  },
  "/_nuxt/instagram.3347813e.svg": {
    "type": "image/svg+xml",
    "etag": "\"71b-wOycLEfsNIT+BUvlZ0P7caZGCK4\"",
    "mtime": "2023-05-05T16:14:20.451Z",
    "size": 1819,
    "path": "../public/_nuxt/instagram.3347813e.svg"
  },
  "/_nuxt/Lato-Regular.089ab6d4.ttf": {
    "type": "font/ttf",
    "etag": "\"945e8-X5lhQ8aEyTiCQABitVZLmUJtSkM\"",
    "mtime": "2023-05-05T16:14:20.451Z",
    "size": 607720,
    "path": "../public/_nuxt/Lato-Regular.089ab6d4.ttf"
  },
  "/_nuxt/logo.e1e7add7.png": {
    "type": "image/png",
    "etag": "\"6572-O6WaF/E92w8VcG6Nc8V4jpfHxfY\"",
    "mtime": "2023-05-05T16:14:20.451Z",
    "size": 25970,
    "path": "../public/_nuxt/logo.e1e7add7.png"
  },
  "/_nuxt/maneja.339af319.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d2d-pgjwhMYu0XyI962Vo0xnWYqXDS8\"",
    "mtime": "2023-05-05T16:14:20.451Z",
    "size": 3373,
    "path": "../public/_nuxt/maneja.339af319.css"
  },
  "/_nuxt/maneja.683106d7.js": {
    "type": "application/javascript",
    "etag": "\"ea5-UH2+iNOTsIifKZ1GdmqvcsRC4hU\"",
    "mtime": "2023-05-05T16:14:20.460Z",
    "size": 3749,
    "path": "../public/_nuxt/maneja.683106d7.js"
  },
  "/_nuxt/moment.fbc5633a.js": {
    "type": "application/javascript",
    "etag": "\"e9f4-oBuncbOapdUtzVdBQ7arLWLL49M\"",
    "mtime": "2023-05-05T16:14:20.478Z",
    "size": 59892,
    "path": "../public/_nuxt/moment.fbc5633a.js"
  },
  "/_nuxt/paga2.08930589.png": {
    "type": "image/png",
    "etag": "\"3798e-ZhC9rdMFDj5g91lpV4v4RZfCcfI\"",
    "mtime": "2023-05-05T16:14:20.450Z",
    "size": 227726,
    "path": "../public/_nuxt/paga2.08930589.png"
  },
  "/_nuxt/pasajeros.f900f86a.png": {
    "type": "image/png",
    "etag": "\"1255-vDhe3/mMuSjw7T1h/TOkBhAJj6Q\"",
    "mtime": "2023-05-05T16:14:20.450Z",
    "size": 4693,
    "path": "../public/_nuxt/pasajeros.f900f86a.png"
  },
  "/_nuxt/paypal.a6f247f0.js": {
    "type": "application/javascript",
    "etag": "\"188e-qNRQqXTMWIUOvvt1JTewNY3O9JA\"",
    "mtime": "2023-05-05T16:14:20.459Z",
    "size": 6286,
    "path": "../public/_nuxt/paypal.a6f247f0.js"
  },
  "/_nuxt/pedido.c13ba931.js": {
    "type": "application/javascript",
    "etag": "\"ee31-ZZqITHsviusgYGgGtGlO7TA4tgQ\"",
    "mtime": "2023-05-05T16:14:20.480Z",
    "size": 60977,
    "path": "../public/_nuxt/pedido.c13ba931.js"
  },
  "/_nuxt/promo.3fe5fee9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a1-4Y7vlRBvoHAMUF2Z03a/lYmF5b8\"",
    "mtime": "2023-05-05T16:14:20.451Z",
    "size": 161,
    "path": "../public/_nuxt/promo.3fe5fee9.css"
  },
  "/_nuxt/promo.e1137e5e.js": {
    "type": "application/javascript",
    "etag": "\"12fd-C2pOkpds8zYWQbc6pyd1QcLHiMU\"",
    "mtime": "2023-05-05T16:14:20.459Z",
    "size": 4861,
    "path": "../public/_nuxt/promo.e1137e5e.js"
  },
  "/_nuxt/proxy.fa9558ae.js": {
    "type": "application/javascript",
    "etag": "\"1f89e-jfuAPK6doO8yyYAKPvgw7NFOboQ\"",
    "mtime": "2023-05-05T16:14:20.480Z",
    "size": 129182,
    "path": "../public/_nuxt/proxy.fa9558ae.js"
  },
  "/_nuxt/reserva.222e74b0.js": {
    "type": "application/javascript",
    "etag": "\"f6f-q45Ct3yIAyfoewGJnPwrkASOGPA\"",
    "mtime": "2023-05-05T16:14:20.478Z",
    "size": 3951,
    "path": "../public/_nuxt/reserva.222e74b0.js"
  },
  "/_nuxt/reserva.fa24708d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"13d7-dAv0gEIt9S7qBypedhbVCMv+gHg\"",
    "mtime": "2023-05-05T16:14:20.458Z",
    "size": 5079,
    "path": "../public/_nuxt/reserva.fa24708d.css"
  },
  "/_nuxt/sucursales.665ee3ee.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3d6-4nYmNmUFxXAVk3gspsLE0AItc4U\"",
    "mtime": "2023-05-05T16:14:20.451Z",
    "size": 982,
    "path": "../public/_nuxt/sucursales.665ee3ee.css"
  },
  "/_nuxt/sucursales.fbc3f0c8.js": {
    "type": "application/javascript",
    "etag": "\"4798-p2CCXtWIW6b/mGeWqoL3UubXfw8\"",
    "mtime": "2023-05-05T16:14:20.478Z",
    "size": 18328,
    "path": "../public/_nuxt/sucursales.fbc3f0c8.js"
  },
  "/_nuxt/thanks.4c4eb255.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d6a-mwrNwnRWNpOyVSwIpfW2fsCP/So\"",
    "mtime": "2023-05-05T16:14:20.452Z",
    "size": 3434,
    "path": "../public/_nuxt/thanks.4c4eb255.css"
  },
  "/_nuxt/thanks.85352df4.js": {
    "type": "application/javascript",
    "etag": "\"23a-m83LERJo8kznem6q1C0g+rhu+/U\"",
    "mtime": "2023-05-05T16:14:20.459Z",
    "size": 570,
    "path": "../public/_nuxt/thanks.85352df4.js"
  },
  "/_nuxt/ThePrompt.5aec3d05.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"538-+O7PkF9AGNzOWbMRl9iabehHApc\"",
    "mtime": "2023-05-05T16:14:20.451Z",
    "size": 1336,
    "path": "../public/_nuxt/ThePrompt.5aec3d05.css"
  },
  "/_nuxt/ThePrompt.e6365938.js": {
    "type": "application/javascript",
    "etag": "\"643-upYn2Us0fhJUBtPs2CA0HSE0bk8\"",
    "mtime": "2023-05-05T16:14:20.475Z",
    "size": 1603,
    "path": "../public/_nuxt/ThePrompt.e6365938.js"
  },
  "/_nuxt/TheSearch.428b8139.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"836-7cOM3J5tWMB4UJ3smKJqeHwbDKo\"",
    "mtime": "2023-05-05T16:14:20.452Z",
    "size": 2102,
    "path": "../public/_nuxt/TheSearch.428b8139.css"
  },
  "/_nuxt/TheSearch.6bfe6824.js": {
    "type": "application/javascript",
    "etag": "\"1629-cI1cfypURk7ddde95siS2vXDgkc\"",
    "mtime": "2023-05-05T16:14:20.476Z",
    "size": 5673,
    "path": "../public/_nuxt/TheSearch.6bfe6824.js"
  },
  "/_nuxt/usa1.da7d731b.jpg": {
    "type": "image/jpeg",
    "etag": "\"136d6-1fA6ICcJSC9AAn5XEKOpaLZy4Lg\"",
    "mtime": "2023-05-05T16:14:20.450Z",
    "size": 79574,
    "path": "../public/_nuxt/usa1.da7d731b.jpg"
  },
  "/_nuxt/useDirectusItems.23889d1a.js": {
    "type": "application/javascript",
    "etag": "\"4b9-R0LVEAnn5SYoWedpVN3c0OQ6cEc\"",
    "mtime": "2023-05-05T16:14:20.459Z",
    "size": 1209,
    "path": "../public/_nuxt/useDirectusItems.23889d1a.js"
  },
  "/_nuxt/vacante-gracias.597d72c1.js": {
    "type": "application/javascript",
    "etag": "\"1b9-tLlWxIhiWc7KNWcmJyvtPORkzYM\"",
    "mtime": "2023-05-05T16:14:20.460Z",
    "size": 441,
    "path": "../public/_nuxt/vacante-gracias.597d72c1.js"
  },
  "/_nuxt/vacante-gracias.c43c81de.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d6a-AxMXE6hf0meGBXMgqQJzAyYpIWg\"",
    "mtime": "2023-05-05T16:14:20.451Z",
    "size": 3434,
    "path": "../public/_nuxt/vacante-gracias.c43c81de.css"
  },
  "/_nuxt/vacantes.7b47a8e3.js": {
    "type": "application/javascript",
    "etag": "\"e47-u033RnVHBgygl5sj7OFpToqc9G0\"",
    "mtime": "2023-05-05T16:14:20.475Z",
    "size": 3655,
    "path": "../public/_nuxt/vacantes.7b47a8e3.js"
  },
  "/_nuxt/vacantes.a0a3b6a1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"52a-6DwoQUB1UE4+Ce9RbUvCbX4Ao58\"",
    "mtime": "2023-05-05T16:14:20.452Z",
    "size": 1322,
    "path": "../public/_nuxt/vacantes.a0a3b6a1.css"
  },
  "/_nuxt/_commonjsHelpers.edff4021.js": {
    "type": "application/javascript",
    "etag": "\"26f-3fqoGOjZrkqYra0rKeFrWveT+TU\"",
    "mtime": "2023-05-05T16:14:20.459Z",
    "size": 623,
    "path": "../public/_nuxt/_commonjsHelpers.edff4021.js"
  },
  "/_nuxt/_id_.016a8a96.js": {
    "type": "application/javascript",
    "etag": "\"1073-jsc93BPw0RFSOon1O//ZW3IysVw\"",
    "mtime": "2023-05-05T16:14:20.475Z",
    "size": 4211,
    "path": "../public/_nuxt/_id_.016a8a96.js"
  },
  "/_nuxt/_id_.580a8449.js": {
    "type": "application/javascript",
    "etag": "\"1ac1-PIp0qV46wlqVVgLOd/4IBt51fOc\"",
    "mtime": "2023-05-05T16:14:20.478Z",
    "size": 6849,
    "path": "../public/_nuxt/_id_.580a8449.js"
  },
  "/_nuxt/_id_.9ca12b1f.js": {
    "type": "application/javascript",
    "etag": "\"628-UFJUFCqBt53tBOxeQz6QjQesiR8\"",
    "mtime": "2023-05-05T16:14:20.459Z",
    "size": 1576,
    "path": "../public/_nuxt/_id_.9ca12b1f.js"
  },
  "/_nuxt/_id_.b7f143f8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"f6c-52JK4JGpns7bDzkZNX0iMoYvm4U\"",
    "mtime": "2023-05-05T16:14:20.458Z",
    "size": 3948,
    "path": "../public/_nuxt/_id_.b7f143f8.css"
  },
  "/_nuxt/_id_.de7152e7.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"23e-wpLU3ZBEG+iIFOQvp3/y9NDj+dU\"",
    "mtime": "2023-05-05T16:14:20.451Z",
    "size": 574,
    "path": "../public/_nuxt/_id_.de7152e7.css"
  },
  "/_nuxt/_id_.e75e10d6.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"14ff-cTMMWZiedi5l0u4szbqITZ9jwOU\"",
    "mtime": "2023-05-05T16:14:20.458Z",
    "size": 5375,
    "path": "../public/_nuxt/_id_.e75e10d6.css"
  },
  "/_nuxt/___vite-browser-external.bfa11e9f.js": {
    "type": "application/javascript",
    "etag": "\"28bf-QYJ86H6M0MP6kc3/t7LV5K6LfPg\"",
    "mtime": "2023-05-05T16:14:20.475Z",
    "size": 10431,
    "path": "../public/_nuxt/___vite-browser-external.bfa11e9f.js"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.node.req.method && !METHODS.has(event.node.req.method)) {
    return;
  }
  let id = decodeURIComponent(
    withLeadingSlash(
      withoutTrailingSlash(parseURL(event.node.req.url).pathname)
    )
  );
  let asset;
  const encodingHeader = String(
    event.node.req.headers["accept-encoding"] || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.node.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.node.res.removeHeader("cache-control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.node.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  const ifModifiedSinceH = event.node.req.headers["if-modified-since"];
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  if (asset.type && !event.node.res.getHeader("Content-Type")) {
    event.node.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.node.res.getHeader("ETag")) {
    event.node.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.node.res.getHeader("Last-Modified")) {
    event.node.res.setHeader("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.node.res.getHeader("Content-Encoding")) {
    event.node.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.node.res.getHeader("Content-Length")) {
    event.node.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_hoh4Gf = () => import('./renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_hoh4Gf, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_hoh4Gf, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(
    eventHandler((event) => {
      const envContext = event.node.req.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: $fetch });
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on(
    "unhandledRejection",
    (err) => console.error("[nitro] [dev] [unhandledRejection] " + err)
  );
  process.on(
    "uncaughtException",
    (err) => console.error("[nitro] [dev] [uncaughtException] " + err)
  );
}
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
