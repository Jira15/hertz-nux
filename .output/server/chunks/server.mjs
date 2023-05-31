import { version, getCurrentInstance, inject, reactive, ref, watchEffect, watch, defineComponent, computed, h, resolveComponent, useSSRContext, createApp, shallowReactive, markRaw, effectScope, isRef, isReactive, toRaw, unref, getCurrentScope, onScopeDispose, nextTick, useSlots, toRef, onMounted, onUnmounted, openBlock, createElementBlock, normalizeClass, createVNode, mergeProps, createSlots, renderList, withCtx, renderSlot, normalizeProps, guardReactiveProps, createBlock, Teleport, createCommentVNode, provide, onErrorCaptured, onServerPrefetch, resolveDynamicComponent, toRefs, shallowRef, isReadonly, withKeys, withModifiers, Transition, createElementVNode, Fragment as Fragment$1, normalizeStyle, createTextVNode, toDisplayString, defineAsyncComponent, withDirectives, vShow, onBeforeUpdate, Suspense } from 'vue';
import { $fetch as $fetch$1 } from 'ofetch';
import { createHooks } from 'hookable';
import { getContext, executeAsync } from 'unctx';
import destr from 'destr';
import { renderSSRHead } from '@unhead/ssr';
import { getActiveHead, createServerHead as createServerHead$1 } from 'unhead';
import { defineHeadPlugin } from '@unhead/shared';
import { createMemoryHistory, createRouter, RouterView } from 'vue-router';
import { createError as createError$1, sendRedirect, setResponseStatus as setResponseStatus$1, appendHeader } from 'h3';
import { hasProtocol, parseURL, parseQuery, withTrailingSlash, withoutTrailingSlash, joinURL, isEqual as isEqual$1 } from 'ufo';
import { parse, serialize } from 'cookie-es';
import { isEqual } from 'ohash';
import { format, getMonth, getDay, getYear, getHours, getMinutes, getSeconds, isValid, parseISO, startOfWeek, endOfWeek, setMonth, setYear, addDays, set, add, addMonths, subMonths, setHours, setMinutes, setSeconds, setMilliseconds, isBefore, isEqual as isEqual$2, isAfter, getISOWeek, parse as parse$1, differenceInCalendarDays, addYears, subYears, isDate, eachDayOfInterval, sub } from 'date-fns';
import { defineRule } from 'vee-validate';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode, ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { defu } from 'defu';
import { a as useRuntimeConfig$1 } from './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';

const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.4.0";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      data: shallowReactive({}),
      state: shallowReactive({}),
      _errors: shallowReactive({}),
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    async function contextCaller(hooks, args) {
      for (const hook of hooks) {
        await nuxtAppCtx.call(nuxtApp, () => hook(...args));
      }
    }
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
    }
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext._payloadReducers = {};
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }
      return target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = [];
  for (const plugin of _plugins2) {
    if (typeof plugin !== "function") {
      continue;
    }
    let _plugin = plugin;
    if (plugin.length > 1) {
      _plugin = (nuxtApp) => plugin(nuxtApp, nuxtApp.provide);
    }
    plugins2.push(_plugin);
  }
  plugins2.sort((a, b) => {
    var _a2, _b;
    return (((_a2 = a.meta) == null ? void 0 : _a2.order) || orderMap.default) - (((_b = b.meta) == null ? void 0 : _b.order) || orderMap.default);
  });
  return plugins2;
}
const orderMap = {
  pre: -20,
  default: 0,
  post: 20
};
function defineNuxtPlugin(plugin, meta) {
  var _a2;
  if (typeof plugin === "function") {
    return /* @__PURE__ */ defineNuxtPlugin({ setup: plugin }, meta);
  }
  const wrapper = (nuxtApp) => {
    if (plugin.hooks) {
      nuxtApp.hooks.addHooks(plugin.hooks);
    }
    if (plugin.setup) {
      return plugin.setup(nuxtApp);
    }
  };
  wrapper.meta = {
    name: (meta == null ? void 0 : meta.name) || plugin.name || ((_a2 = plugin.setup) == null ? void 0 : _a2.name),
    order: (meta == null ? void 0 : meta.order) || plugin.order || orderMap[plugin.enforce || "default"] || orderMap.default
  };
  wrapper[NuxtPluginIndicator] = true;
  return wrapper;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    const vm = getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const isVue2 = false;
/*!
  * pinia v2.0.33
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function isPlainObject(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin) => _p.push(plugin));
        toBeInstalled = [];
      }
    },
    use(plugin) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin);
      } else {
        _p.push(plugin);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  }
  if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && (!("production" !== "production") )) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  const $subscribeOptions = {
    deep: true
    // flush: 'post',
  };
  let isListening;
  let isSyncListening;
  let subscriptions = markRaw([]);
  let actionSubscriptions = markRaw([]);
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (!("production" !== "production") )) {
    {
      pinia.state.value[$id] = {};
    }
  }
  ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  } : (
    /* istanbul ignore next */
    noop
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(partialStore);
  pinia._s.set($id, store);
  const setupStore = pinia._e.run(() => {
    scope = effectScope();
    return scope.run(() => setup());
  });
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
    } else if (typeof prop === "function") {
      const actionValue = wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      optionsForPlugin.actions[key] = prop;
    } else ;
  }
  {
    assign(store, setupStore);
    assign(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => pinia.state.value[$id],
    set: (state) => {
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  pinia._p.forEach((extender) => {
    {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    const currentInstance = getCurrentInstance();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (pinia) || currentInstance && inject(piniaSymbol, null);
    if (pinia)
      setActivePinia(pinia);
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
    }
    const store = pinia._s.get(id);
    return store;
  }
  useStore.$id = id;
  return useStore;
}
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}
const Vue3 = version.startsWith("3");
const headSymbol = "usehead";
function injectHead() {
  return getCurrentInstance() && inject(headSymbol) || getActiveHead();
}
function vueInstall(head) {
  const plugin = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin.install;
}
function createServerHead(options = {}) {
  const head = createServerHead$1({
    ...options,
    plugins: [
      VueReactiveUseHeadPlugin(),
      ...(options == null ? void 0 : options.plugins) || []
    ]
  });
  head.install = vueInstall(head);
  return head;
}
const VueReactiveUseHeadPlugin = () => {
  return defineHeadPlugin({
    hooks: {
      "entries:resolve": function(ctx) {
        for (const entry2 of ctx.entries)
          entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
      }
    }
  });
};
function clientUseHead(input, options = {}) {
  const head = injectHead();
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry2 = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry2.patch(e);
  });
  getCurrentInstance();
  return entry2;
}
function serverUseHead(input, options = {}) {
  const head = injectHead();
  return head.push(input, options);
}
function useHead(input, options = {}) {
  var _a2;
  const head = injectHead();
  if (head) {
    const isBrowser = !!((_a2 = head.resolvedOptions) == null ? void 0 : _a2.document);
    if (options.mode === "server" && isBrowser || options.mode === "client" && !isBrowser)
      return;
    return isBrowser ? clientUseHead(input, options) : serverUseHead(input, options);
  }
}
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a2;
  return (_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.event;
}
function setResponseStatus(arg1, arg2, arg3) {
  if (arg1 && typeof arg1 !== "number") {
    return setResponseStatus$1(arg1, arg2, arg3);
  }
  return setResponseStatus$1(useRequestEvent(), arg1, arg2);
}
const useRouter = () => {
  var _a2;
  return (_a2 = useNuxtApp()) == null ? void 0 : _a2.$router;
};
const useRoute = () => {
  if (getCurrentInstance()) {
    return inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const defineNuxtRouteMiddleware = (middleware) => middleware;
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal = (options == null ? void 0 : options.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal && !(options == null ? void 0 : options.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `navigateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      if (isProcessingMiddleware() && !isExternal) {
        setResponseStatus(nuxtApp.ssrContext.event, (options == null ? void 0 : options.redirectCode) || 302);
        return to;
      }
      const redirectLocation = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, router.resolve(to).fullPath || "/");
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, (options == null ? void 0 : options.redirectCode) || 302));
    }
  }
  if (isExternal) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    nuxtApp.callHook("app:error", err);
    const error = useError();
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a2;
  const opts = { ...CookieDefaults, ..._opts };
  const cookies = readRawCookies(opts) || {};
  const cookie = ref(cookies[name] ?? ((_a2 = opts.default) == null ? void 0 : _a2.call(opts)));
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (!isEqual(cookie.value, cookies[name])) {
        writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
      }
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:redirected", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  var _a2;
  {
    return parse(((_a2 = useRequestEvent()) == null ? void 0 : _a2.req.headers.cookie) || "", opts);
  }
}
function serializeCookie(name, value, opts = {}) {
  if (value === null || value === void 0) {
    return serialize(name, value, { ...opts, maxAge: -1 });
  }
  return serialize(name, value, opts);
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    appendHeader(event, "Set-Cookie", serializeCookie(name, value, opts));
  }
}
const appHead = { "meta": [{ "charset": "utf-8" }, { "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "hid": "description", "name": "description", "content": "" }, { "name": "Hertz Rent a car Panamá", "content": "Hertz. Estamos aquí para llevarlo allá. Disfrute de nuestra mejor flota hasta ahora y de velocidad, innovación y servicio galardonados en más de 10 000 localidades en todo el mundo." }], "link": [{ "rel": "icon", "type": "image/x-icon", "href": "./favicon.ico" }], "style": [], "script": [{ "children": "  !function(f,b,e,v,n,t,s) {if(f.fbq)return;n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)}; if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';    n.queue=[];t=b.createElement(e);t.async=!0;     t.src=v;s=b.getElementsByTagName(e)[0];     s.parentNode.insertBefore(t,s)}(window, document,'script', 'https://connect.facebook.net/en_US/fbevents.js');    fbq('init', '341027038002326');   fbq('track', 'PageView');" }], "noscript": [{ "children": ' <img height="1" width="1" style="display:none"   src="https://www.facebook.com/tr?id=341027038002326&ev=PageView&noscript=1"/>' }], "title": "Hertz Rent a car Panamá" };
const appPageTransition = false;
const appKeepalive = false;
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  const resolveTrailingSlashBehavior = (to, resolve) => {
    if (!to || options.trailingSlash !== "append" && options.trailingSlash !== "remove") {
      return to;
    }
    const normalizeTrailingSlash = options.trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
    if (typeof to === "string") {
      return normalizeTrailingSlash(to, true);
    }
    const path = "path" in to ? to.path : resolve(to).path;
    return {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: normalizeTrailingSlash(path, true)
    };
  };
  return /* @__PURE__ */ defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = computed(() => {
        const path = props.to || props.href || "";
        return resolveTrailingSlashBehavior(path, router.resolve);
      });
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, { acceptRelative: true });
      });
      const prefetched = ref(false);
      const el2 = void 0;
      const elRef = void 0;
      return () => {
        var _a2, _b;
        if (!isExternal.value) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            if (prefetched.value) {
              routerLinkProps.class = props.prefetchedClass || options.prefetchedClass;
            }
            routerLinkProps.rel = props.rel;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const href = typeof to.value === "object" ? ((_a2 = router.resolve(to.value)) == null ? void 0 : _a2.href) ?? null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate,
            get route() {
              if (!href) {
                return void 0;
              }
              const url = parseURL(href);
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                // stub properties for compat with vue-router
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href
              };
            },
            rel,
            target,
            isExternal: isExternal.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el2, href, rel, target }, (_b = slots.default) == null ? void 0 : _b.call(slots));
      };
    }
  });
}
const __nuxt_component_0$1 = /* @__PURE__ */ defineNuxtLink({ componentName: "NuxtLink" });
const plugin_vue3_A0OWXRrUgq = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
  setActivePinia(pinia);
  {
    nuxtApp.payload.pinia = pinia.state.value;
  }
  return {
    provide: {
      pinia
    }
  };
});
const components = {};
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const name in components) {
      nuxtApp.vueApp.component(name, components[name]);
      nuxtApp.vueApp.component("Lazy" + name, components[name]);
    }
  }
});
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  setup(nuxtApp) {
    const createHead = createServerHead;
    const head = createHead();
    head.push(appHead);
    nuxtApp.vueApp.use(head);
    {
      nuxtApp.ssrContext.renderMeta = async () => {
        const meta = await renderSSRHead(head);
        return {
          ...meta,
          bodyScriptsPrepend: meta.bodyTagsOpen,
          // resolves naming difference with NuxtMeta and Unhead
          bodyScripts: meta.bodyTags
        };
      };
    }
  }
});
const _routes = [
  {
    name: "clientes",
    path: "/clientes",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./clientes-a5269192.mjs').then((m) => m.default || m)
  },
  {
    name: "error",
    path: "/error",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./error-d4356d7a.mjs').then((m) => m.default || m)
  },
  {
    name: "flota-reserva-id",
    path: "/flota/:reserva()/:id()",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_id_-7d55e44d.mjs').then((m) => m.default || m)
  },
  {
    name: "flota-reserva-checkout",
    path: "/flota/:reserva()/checkout",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./checkout-872ec133.mjs').then((m) => m.default || m)
  },
  {
    name: "flota",
    path: "/flota",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./index-1b333d0f.mjs').then((m) => m.default || m)
  },
  {
    name: "index",
    path: "/",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./index-b3686f23.mjs').then((m) => m.default || m)
  },
  {
    name: "maneja",
    path: "/maneja",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./maneja-ccf7e187.mjs').then((m) => m.default || m)
  },
  {
    name: "orden-id",
    path: "/orden/:id()",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_id_-da6226e4.mjs').then((m) => m.default || m)
  },
  {
    name: "paginas-id",
    path: "/paginas/:id()",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_id_-128a2b31.mjs').then((m) => m.default || m)
  },
  {
    name: "prechecking-id",
    path: "/prechecking/:id()",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_id_-8eb22c09.mjs').then((m) => m.default || m)
  },
  {
    name: "prechecking",
    path: "/prechecking",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./index-36702ffa.mjs').then((m) => m.default || m)
  },
  {
    name: "reserva",
    path: "/reserva",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./reserva-4636d869.mjs').then((m) => m.default || m)
  },
  {
    name: "sucursales",
    path: "/sucursales",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./sucursales-0540dcac.mjs').then((m) => m.default || m)
  },
  {
    name: "thanks",
    path: "/thanks",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./thanks-13ad3ca1.mjs').then((m) => m.default || m)
  },
  {
    name: "vacante-gracias",
    path: "/vacante-gracias",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./vacante-gracias-6f02de6b.mjs').then((m) => m.default || m)
  },
  {
    name: "vacantes",
    path: "/vacantes",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./vacantes-c9256a01.mjs').then((m) => m.default || m)
  }
];
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    let position = savedPosition || void 0;
    if (!position && from && to && to.meta.scrollToTop !== false && _isDifferentRoute(from, to)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
      }
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await nextTick();
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = document.querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
function _isDifferentRoute(a, b) {
  const samePageComponent = a.matched[0] === b.matched[0];
  if (!samePageComponent) {
    return true;
  }
  if (samePageComponent && JSON.stringify(a.params) !== JSON.stringify(b.params)) {
    return true;
  }
  return false;
}
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a2;
  let __temp, __restore;
  if (!((_a2 = to.meta) == null ? void 0 : _a2.validate)) {
    return;
  }
  useNuxtApp();
  useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  {
    return result;
  }
});
const globalMiddleware = [
  validate
];
const namedMiddleware = {
  proxy: () => import('./proxy-d8f1f544.mjs'),
  rentworks: () => import('./rentworks-ccebc729.mjs')
};
const router_jmwsqit4Rs = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a2, _b;
    let __temp, __restore;
    let routerBase = useRuntimeConfig().app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = ((_a2 = routerOptions.history) == null ? void 0 : _a2.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = ((_b = routerOptions.routes) == null ? void 0 : _b.call(routerOptions, _routes)) ?? _routes;
    const initialURL = nuxtApp.ssrContext.url;
    const router = createRouter({
      ...routerOptions,
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const _route = shallowRef(router.resolve(initialURL));
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a3, _b2, _c, _d;
      if (((_b2 = (_a3 = to.matched[0]) == null ? void 0 : _a3.components) == null ? void 0 : _b2.default) === ((_d = (_c = from.matched[0]) == null ? void 0 : _c.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      route[key] = computed(() => _route.value[key]);
    }
    nuxtApp._route = reactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    useError();
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => callWithNuxt(nuxtApp, showError, [error2])), await __temp, __restore();
    }
    const initialLayout = useState("_layout");
    router.beforeEach(async (to, from) => {
      var _a3;
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout.value && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout.value;
      }
      nuxtApp._processingMiddleware = true;
      const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
      for (const component of to.matched) {
        const componentMiddleware = component.meta.middleware;
        if (!componentMiddleware) {
          continue;
        }
        if (Array.isArray(componentMiddleware)) {
          for (const entry2 of componentMiddleware) {
            middlewareEntries.add(entry2);
          }
        } else {
          middlewareEntries.add(componentMiddleware);
        }
      }
      for (const entry2 of middlewareEntries) {
        const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_a3 = namedMiddleware[entry2]) == null ? void 0 : _a3.call(namedMiddleware).then((r) => r.default || r)) : entry2;
        if (!middleware) {
          throw new Error(`Unknown route middleware: '${entry2}'.`);
        }
        const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
        {
          if (result === false || result instanceof Error) {
            const error2 = result || createError$1({
              statusCode: 404,
              statusMessage: `Page Not Found: ${initialURL}`
            });
            await callWithNuxt(nuxtApp, showError, [error2]);
            return false;
          }
        }
        if (result || result === false) {
          return result;
        }
      }
    });
    router.afterEach(async (to) => {
      delete nuxtApp._processingMiddleware;
      if (to.matched.length === 0) {
        await callWithNuxt(nuxtApp, showError, [createError$1({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`
        })]);
      } else {
        const currentURL = to.fullPath || "/";
        if (!isEqual$1(currentURL, initialURL, { trailingSlash: true })) {
          const event = await callWithNuxt(nuxtApp, useRequestEvent);
          const options = { redirectCode: event.node.res.statusCode !== 200 ? event.node.res.statusCode || 302 : 302 };
          await callWithNuxt(nuxtApp, navigateTo, [currentURL, options]);
        }
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        await router.replace({
          ...router.resolve(initialURL),
          name: void 0,
          // #4920, #$4982
          force: true
        });
      } catch (error2) {
        await callWithNuxt(nuxtApp, showError, [error2]);
      }
    });
    return { provide: { router } };
  }
}, 1);
const useDirectusUrl = () => {
  const config = /* @__PURE__ */ useRuntimeConfig();
  return config.public.directus.url;
};
const useDirectusToken = () => {
  const nuxtApp = useNuxtApp();
  const baseUrl = useDirectusUrl();
  const token = () => {
    nuxtApp._cookies = nuxtApp._cookies || {};
    if (nuxtApp._cookies.directus_token) {
      return nuxtApp._cookies.directus_token;
    }
    const cookie = useCookie("directus_token");
    nuxtApp._cookies.directus_token = cookie;
    return cookie;
  };
  const refreshToken = () => {
    nuxtApp._cookies = nuxtApp._cookies || {};
    if (nuxtApp._cookies.directus_refresh_token) {
      return nuxtApp._cookies.directus_refresh_token;
    }
    const cookie = useCookie("directus_refresh_token");
    nuxtApp._cookies.directus_refresh_token = cookie;
    return cookie;
  };
  const expires = () => {
    nuxtApp._cookies = nuxtApp._cookies || {};
    if (nuxtApp._cookies.directus_token_expired_at) {
      return nuxtApp._cookies.directus_token_expired_at;
    }
    const cookie = useCookie("directus_token_expired_at");
    nuxtApp._cookies.directus_token_expired_at = cookie;
    return cookie;
  };
  const refreshTokens = async () => {
    if (refreshToken() && refreshToken().value) {
      const body = {
        refresh_token: refreshToken().value
      };
      const data = await $fetch("/auth/refresh", {
        baseURL: baseUrl,
        body,
        method: "POST"
      });
      expires().value = (/* @__PURE__ */ new Date()).getTime() + data.data.expires;
      token().value = data.data.access_token;
      refreshToken().value = data.data.refresh_token;
      return data.data;
    } else {
      return null;
    }
  };
  return { token: token(), refreshToken: refreshToken(), refreshTokens, expires: expires() };
};
const useDirectus = () => {
  const baseURL2 = useDirectusUrl();
  const config = /* @__PURE__ */ useRuntimeConfig();
  const { token } = useDirectusToken();
  return async (url, fetchOptions = {}, useStaticToken = true) => {
    var _a2, _b, _c, _d;
    const headers = {};
    if (token && token.value) {
      headers.Authorization = `Bearer ${token.value}`;
    } else if (config.public.directus.token && useStaticToken) {
      headers.Authorization = `Bearer ${config.public.directus.token}`;
    }
    try {
      return await $fetch(url, {
        baseURL: baseURL2,
        ...fetchOptions,
        headers: {
          ...headers,
          ...fetchOptions.headers
        }
      });
    } catch (err) {
      {
        console.error(
          "[Directus Error]: " + ((_a2 = err.response) == null ? void 0 : _a2.status) + ", " + ((_b = err.response) == null ? void 0 : _b.statusText)
        );
      }
      throw createError({
        statusCode: (_c = err.response) == null ? void 0 : _c.status,
        statusMessage: (_d = err.response) == null ? void 0 : _d.statusText
      });
    }
  };
};
const useDirectusUser = () => useState("directus.user");
const useDirectusAuth = () => {
  useDirectusUrl();
  const config = /* @__PURE__ */ useRuntimeConfig();
  const directus = useDirectus();
  const user = useDirectusUser();
  const { token, refreshToken, expires } = useDirectusToken();
  const setToken = (value, _refreshToken, _expires) => {
    token.value = value;
    if (_refreshToken) {
      refreshToken.value = _refreshToken;
      if (_expires) {
        expires.value = _expires;
      }
    }
  };
  const setUser = (value) => {
    user.value = value;
  };
  const fetchUser = async (useStaticToken) => {
    var _a2, _b;
    if (token.value) {
      try {
        if ((_a2 = config.public.directus.fetchUserParams) == null ? void 0 : _a2.filter) {
          config.public.directus.fetchUserParams.filter = JSON.stringify(
            config.public.directus.fetchUserParams.filter
          );
        }
        if ((_b = config.public.directus.fetchUserParams) == null ? void 0 : _b.deep) {
          config.public.directus.fetchUserParams.deep = JSON.stringify(
            config.public.directus.fetchUserParams.deep
          );
        }
        if (config.public.directus.fetchUserParams) {
          const res = await directus("/users/me", {
            params: config.public.directus.fetchUserParams
          }, useStaticToken);
          setUser(res.data);
        } else {
          const res = await directus("/users/me", useStaticToken);
          setUser(res.data);
        }
      } catch (e) {
        setToken(null);
      }
    }
    return user;
  };
  const login = async (data, useStaticToken) => {
    setToken(null);
    const response = await directus(
      "/auth/login",
      {
        method: "POST",
        body: data
      },
      useStaticToken
    );
    if (!response.data.access_token) {
      throw new Error("Login failed, please check your credentials.");
    }
    setToken(response.data.access_token, response.data.refresh_token, response.data.expires);
    const user2 = await fetchUser();
    return {
      user: user2,
      access_token: response.data.access_token,
      expires: response.data.expires
    };
  };
  const createUser = async (data, useStaticToken) => {
    return await directus("/users", {
      method: "POST",
      body: data
    }, useStaticToken);
  };
  const register = async (data) => {
    return createUser(data);
  };
  const requestPasswordReset = async (data, useStaticToken) => {
    await directus("/auth/password/request", {
      method: "POST",
      body: data
    }, useStaticToken);
  };
  const resetPassword = async (data, useStaticToken) => {
    await directus("/auth/password/reset", {
      method: "POST",
      body: data
    }, useStaticToken);
  };
  const logout = async () => {
    await directus("/auth/logout", {
      method: "POST",
      body: { refresh_token: refreshToken.value }
    });
    setToken(null, null, null);
    setUser(null);
    await fetchUser();
  };
  return {
    setToken,
    setUser,
    fetchUser,
    login,
    requestPasswordReset,
    resetPassword,
    logout,
    createUser,
    register
  };
};
const plugin_1doCGnr5OF = /* @__PURE__ */ defineNuxtPlugin(async (nuxtApp) => {
  let __temp, __restore;
  const config = /* @__PURE__ */ useRuntimeConfig();
  if (config.public.directus.autoFetch) {
    const { fetchUser } = useDirectusAuth();
    [__temp, __restore] = executeAsync(() => fetchUser()), await __temp, __restore();
  }
}, 1);
const it = (e, n) => {
  const a = e.__vccOpts || e;
  for (const [t, o] of n)
    a[t] = o;
  return a;
}, da = {}, ca = {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "32",
  height: "32",
  viewBox: "0 0 32 32",
  class: "dp__icon"
}, fa = /* @__PURE__ */ createElementVNode("path", { d: "M29.333 8c0-2.208-1.792-4-4-4h-18.667c-2.208 0-4 1.792-4 4v18.667c0 2.208 1.792 4 4 4h18.667c2.208 0 4-1.792 4-4v-18.667zM26.667 8v18.667c0 0.736-0.597 1.333-1.333 1.333 0 0-18.667 0-18.667 0-0.736 0-1.333-0.597-1.333-1.333 0 0 0-18.667 0-18.667 0-0.736 0.597-1.333 1.333-1.333 0 0 18.667 0 18.667 0 0.736 0 1.333 0.597 1.333 1.333z" }, null, -1), ma = /* @__PURE__ */ createElementVNode("path", { d: "M20 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z" }, null, -1), va = /* @__PURE__ */ createElementVNode("path", { d: "M9.333 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z" }, null, -1), ya = /* @__PURE__ */ createElementVNode("path", { d: "M4 14.667h24c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333h-24c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333z" }, null, -1), ha = [
  fa,
  ma,
  va,
  ya
];
function ga(e, n) {
  return openBlock(), createElementBlock("svg", ca, ha);
}
const Ft = /* @__PURE__ */ it(da, [["render", ga]]), pa = {}, ka = {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "32",
  height: "32",
  viewBox: "0 0 32 32",
  class: "dp__icon"
}, wa = /* @__PURE__ */ createElementVNode("path", { d: "M23.057 7.057l-16 16c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l16-16c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0z" }, null, -1), ba = /* @__PURE__ */ createElementVNode("path", { d: "M7.057 8.943l16 16c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885l-16-16c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z" }, null, -1), $a = [
  wa,
  ba
];
function Da(e, n) {
  return openBlock(), createElementBlock("svg", ka, $a);
}
const Ma = /* @__PURE__ */ it(pa, [["render", Da]]), _a = {}, Ta = {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "32",
  height: "32",
  viewBox: "0 0 32 32",
  class: "dp__icon"
}, Aa = /* @__PURE__ */ createElementVNode("path", { d: "M20.943 23.057l-7.057-7.057c0 0 7.057-7.057 7.057-7.057 0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-8 8c-0.521 0.521-0.521 1.365 0 1.885l8 8c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z" }, null, -1), Ca = [
  Aa
];
function Sa(e, n) {
  return openBlock(), createElementBlock("svg", Ta, Ca);
}
const wn = /* @__PURE__ */ it(_a, [["render", Sa]]), Pa = {}, Na = {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "32",
  height: "32",
  viewBox: "0 0 32 32",
  class: "dp__icon"
}, Ra = /* @__PURE__ */ createElementVNode("path", { d: "M12.943 24.943l8-8c0.521-0.521 0.521-1.365 0-1.885l-8-8c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885l7.057 7.057c0 0-7.057 7.057-7.057 7.057-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0z" }, null, -1), Ia = [
  Ra
];
function Oa(e, n) {
  return openBlock(), createElementBlock("svg", Na, Ia);
}
const bn = /* @__PURE__ */ it(Pa, [["render", Oa]]), Ba = {}, Ya = {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "32",
  height: "32",
  viewBox: "0 0 32 32",
  class: "dp__icon"
}, Va = /* @__PURE__ */ createElementVNode("path", { d: "M16 1.333c-8.095 0-14.667 6.572-14.667 14.667s6.572 14.667 14.667 14.667c8.095 0 14.667-6.572 14.667-14.667s-6.572-14.667-14.667-14.667zM16 4c6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.623 0-12-5.377-12-12s5.377-12 12-12z" }, null, -1), La = /* @__PURE__ */ createElementVNode("path", { d: "M14.667 8v8c0 0.505 0.285 0.967 0.737 1.193l5.333 2.667c0.658 0.329 1.46 0.062 1.789-0.596s0.062-1.46-0.596-1.789l-4.596-2.298c0 0 0-7.176 0-7.176 0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z" }, null, -1), Ea = [
  Va,
  La
];
function Fa(e, n) {
  return openBlock(), createElementBlock("svg", Ya, Ea);
}
const Un = /* @__PURE__ */ it(Ba, [["render", Fa]]), Ua = {}, Ha = {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "32",
  height: "32",
  viewBox: "0 0 32 32",
  class: "dp__icon"
}, Wa = /* @__PURE__ */ createElementVNode("path", { d: "M24.943 19.057l-8-8c-0.521-0.521-1.365-0.521-1.885 0l-8 8c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l7.057-7.057c0 0 7.057 7.057 7.057 7.057 0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z" }, null, -1), za = [
  Wa
];
function ja(e, n) {
  return openBlock(), createElementBlock("svg", Ha, za);
}
const Hn = /* @__PURE__ */ it(Ua, [["render", ja]]), Ka = {}, xa = {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "32",
  height: "32",
  viewBox: "0 0 32 32",
  class: "dp__icon"
}, Ga = /* @__PURE__ */ createElementVNode("path", { d: "M7.057 12.943l8 8c0.521 0.521 1.365 0.521 1.885 0l8-8c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-7.057 7.057c0 0-7.057-7.057-7.057-7.057-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z" }, null, -1), Za = [
  Ga
];
function Xa(e, n) {
  return openBlock(), createElementBlock("svg", xa, Za);
}
const Wn = /* @__PURE__ */ it(Ka, [["render", Xa]]), $n = (e, n) => {
  const a = parse$1(e, n.slice(0, e.length), /* @__PURE__ */ new Date());
  return isValid(a) && isDate(a) ? a : null;
}, qa = (e, n) => {
  if (typeof n == "string")
    return $n(e, n);
  if (Array.isArray(n)) {
    let a = null;
    for (const t of n)
      if (a = $n(e, t), a)
        break;
    return a;
  }
  return typeof n == "function" ? n(e) : null;
}, w = (e) => e ? new Date(e) : /* @__PURE__ */ new Date(), Ja = (e, n) => {
  if (n) {
    const t = (e.getMonth() + 1).toString().padStart(2, "0"), o = e.getDate().toString().padStart(2, "0"), c = e.getHours().toString().padStart(2, "0"), p = e.getMinutes().toString().padStart(2, "0");
    return `${e.getFullYear()}-${t}-${o}T${c}:${p}:00.000Z`;
  }
  const a = Date.UTC(
    e.getUTCFullYear(),
    e.getUTCMonth(),
    e.getUTCDate(),
    e.getUTCHours(),
    e.getUTCMinutes(),
    e.getUTCSeconds()
  );
  return new Date(a).toISOString();
}, ze = (e) => {
  let n = w(JSON.parse(JSON.stringify(e)));
  return n = setHours(n, 0), n = setMinutes(n, 0), n = setSeconds(n, 0), n = setMilliseconds(n, 0), n;
}, Le = (e, n, a, t) => {
  let o = e ? w(e) : w();
  return (n || n === 0) && (o = setHours(o, +n)), (a || a === 0) && (o = setMinutes(o, +a)), (t || t === 0) && (o = setSeconds(o, +t)), setMilliseconds(o, 0);
}, Pe = (e, n) => !e || !n ? false : isBefore(ze(e), ze(n)), ke = (e, n) => !e || !n ? false : isEqual$2(ze(e), ze(n)), Oe = (e, n) => !e || !n ? false : isAfter(ze(e), ze(n)), zn = (e, n, a) => e && e[0] && e[1] ? Oe(a, e[0]) && Pe(a, e[1]) : e && e[0] && n ? Oe(a, e[0]) && Pe(a, n) || Pe(a, e[0]) && Oe(a, n) : false, kt = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
}), jn = () => {
  const e = (t) => {
    kt.menuFocused = t;
  }, n = (t) => {
    kt.shiftKeyInMenu !== t && (kt.shiftKeyInMenu = t);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: kt.shiftKeyInMenu, menuFocused: kt.menuFocused })),
    setMenuFocused: e,
    setShiftKey: n
  };
};
function mn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Bt = {}, Qa = {
  get exports() {
    return Bt;
  },
  set exports(e) {
    Bt = e;
  }
};
(function(e, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a;
  function a(t) {
    if (t === null || t === true || t === false)
      return NaN;
    var o = Number(t);
    return isNaN(o) ? o : o < 0 ? Math.ceil(o) : Math.floor(o);
  }
  e.exports = n.default;
})(Qa, Bt);
const el = /* @__PURE__ */ mn(Bt);
var Yt = {}, tl = {
  get exports() {
    return Yt;
  },
  set exports(e) {
    Yt = e;
  }
};
(function(e, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a;
  function a(t) {
    var o = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
    return o.setUTCFullYear(t.getFullYear()), t.getTime() - o.getTime();
  }
  e.exports = n.default;
})(tl, Yt);
const Dn = /* @__PURE__ */ mn(Yt);
function nl(e, n) {
  var a = ol(n);
  return a.formatToParts ? ll(a, e) : rl(a, e);
}
var al = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function ll(e, n) {
  try {
    for (var a = e.formatToParts(n), t = [], o = 0; o < a.length; o++) {
      var c = al[a[o].type];
      c >= 0 && (t[c] = parseInt(a[o].value, 10));
    }
    return t;
  } catch (p) {
    if (p instanceof RangeError)
      return [NaN];
    throw p;
  }
}
function rl(e, n) {
  var a = e.format(n).replace(/\u200E/g, ""), t = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(a);
  return [t[3], t[1], t[2], t[4], t[5], t[6]];
}
var Gt = {};
function ol(e) {
  if (!Gt[e]) {
    var n = new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: "America/New_York",
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), a = n === "06/25/2014, 00:00:00" || n === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
    Gt[e] = a ? new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: e,
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }) : new Intl.DateTimeFormat("en-US", {
      hourCycle: "h23",
      timeZone: e,
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }
  return Gt[e];
}
function vn(e, n, a, t, o, c, p) {
  var $ = /* @__PURE__ */ new Date(0);
  return $.setUTCFullYear(e, n, a), $.setUTCHours(t, o, c, p), $;
}
var Mn = 36e5, sl = 6e4, Zt = {
  timezone: /([Z+-].*)$/,
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-]\d{2}):?(\d{2})$/
};
function yn(e, n, a) {
  var t, o;
  if (!e || (t = Zt.timezoneZ.exec(e), t))
    return 0;
  var c;
  if (t = Zt.timezoneHH.exec(e), t)
    return c = parseInt(t[1], 10), _n(c) ? -(c * Mn) : NaN;
  if (t = Zt.timezoneHHMM.exec(e), t) {
    c = parseInt(t[1], 10);
    var p = parseInt(t[2], 10);
    return _n(c, p) ? (o = Math.abs(c) * Mn + p * sl, c > 0 ? -o : o) : NaN;
  }
  if (dl(e)) {
    n = new Date(n || Date.now());
    var $ = a ? n : il(n), O = rn($, e), R = a ? O : ul(n, O, e);
    return -R;
  }
  return NaN;
}
function il(e) {
  return vn(
    e.getFullYear(),
    e.getMonth(),
    e.getDate(),
    e.getHours(),
    e.getMinutes(),
    e.getSeconds(),
    e.getMilliseconds()
  );
}
function rn(e, n) {
  var a = nl(e, n), t = vn(
    a[0],
    a[1] - 1,
    a[2],
    a[3] % 24,
    a[4],
    a[5],
    0
  ).getTime(), o = e.getTime(), c = o % 1e3;
  return o -= c >= 0 ? c : 1e3 + c, t - o;
}
function ul(e, n, a) {
  var t = e.getTime(), o = t - n, c = rn(new Date(o), a);
  if (n === c)
    return n;
  o -= c - n;
  var p = rn(new Date(o), a);
  return c === p ? c : Math.max(c, p);
}
function _n(e, n) {
  return -23 <= e && e <= 23 && (n == null || 0 <= n && n <= 59);
}
var Tn = {};
function dl(e) {
  if (Tn[e])
    return true;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e }), Tn[e] = true, true;
  } catch {
    return false;
  }
}
var cl = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
const Kn = cl;
var Xt = 36e5, An = 6e4, fl = 2, Ie = {
  dateTimePattern: /^([0-9W+-]+)(T| )(.*)/,
  datePattern: /^([0-9W+-]+)(.*)/,
  plainTime: /:/,
  // year tokens
  YY: /^(\d{2})$/,
  YYY: [
    /^([+-]\d{2})$/,
    // 0 additional digits
    /^([+-]\d{3})$/,
    // 1 additional digit
    /^([+-]\d{4})$/
    // 2 additional digits
  ],
  YYYY: /^(\d{4})/,
  YYYYY: [
    /^([+-]\d{4})/,
    // 0 additional digits
    /^([+-]\d{5})/,
    // 1 additional digit
    /^([+-]\d{6})/
    // 2 additional digits
  ],
  // date tokens
  MM: /^-(\d{2})$/,
  DDD: /^-?(\d{3})$/,
  MMDD: /^-?(\d{2})-?(\d{2})$/,
  Www: /^-?W(\d{2})$/,
  WwwD: /^-?W(\d{2})-?(\d{1})$/,
  HH: /^(\d{2}([.,]\d*)?)$/,
  HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
  HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
  // time zone tokens (to identify the presence of a tz)
  timeZone: Kn
};
function on(e, n) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e === null)
    return /* @__PURE__ */ new Date(NaN);
  var a = n || {}, t = a.additionalDigits == null ? fl : el(a.additionalDigits);
  if (t !== 2 && t !== 1 && t !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]")
    return new Date(e.getTime());
  if (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]")
    return new Date(e);
  if (!(typeof e == "string" || Object.prototype.toString.call(e) === "[object String]"))
    return /* @__PURE__ */ new Date(NaN);
  var o = ml(e), c = vl(o.date, t), p = c.year, $ = c.restDateString, O = yl($, p);
  if (isNaN(O))
    return /* @__PURE__ */ new Date(NaN);
  if (O) {
    var R = O.getTime(), E = 0, A;
    if (o.time && (E = hl(o.time), isNaN(E)))
      return /* @__PURE__ */ new Date(NaN);
    if (o.timeZone || a.timeZone) {
      if (A = yn(o.timeZone || a.timeZone, new Date(R + E)), isNaN(A))
        return /* @__PURE__ */ new Date(NaN);
    } else
      A = Dn(new Date(R + E)), A = Dn(new Date(R + E + A));
    return new Date(R + E + A);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function ml(e) {
  var n = {}, a = Ie.dateTimePattern.exec(e), t;
  if (a ? (n.date = a[1], t = a[3]) : (a = Ie.datePattern.exec(e), a ? (n.date = a[1], t = a[2]) : (n.date = null, t = e)), t) {
    var o = Ie.timeZone.exec(t);
    o ? (n.time = t.replace(o[1], ""), n.timeZone = o[1].trim()) : n.time = t;
  }
  return n;
}
function vl(e, n) {
  var a = Ie.YYY[n], t = Ie.YYYYY[n], o;
  if (o = Ie.YYYY.exec(e) || t.exec(e), o) {
    var c = o[1];
    return {
      year: parseInt(c, 10),
      restDateString: e.slice(c.length)
    };
  }
  if (o = Ie.YY.exec(e) || a.exec(e), o) {
    var p = o[1];
    return {
      year: parseInt(p, 10) * 100,
      restDateString: e.slice(p.length)
    };
  }
  return {
    year: null
  };
}
function yl(e, n) {
  if (n === null)
    return null;
  var a, t, o, c;
  if (e.length === 0)
    return t = /* @__PURE__ */ new Date(0), t.setUTCFullYear(n), t;
  if (a = Ie.MM.exec(e), a)
    return t = /* @__PURE__ */ new Date(0), o = parseInt(a[1], 10) - 1, Sn(n, o) ? (t.setUTCFullYear(n, o), t) : /* @__PURE__ */ new Date(NaN);
  if (a = Ie.DDD.exec(e), a) {
    t = /* @__PURE__ */ new Date(0);
    var p = parseInt(a[1], 10);
    return kl(n, p) ? (t.setUTCFullYear(n, 0, p), t) : /* @__PURE__ */ new Date(NaN);
  }
  if (a = Ie.MMDD.exec(e), a) {
    t = /* @__PURE__ */ new Date(0), o = parseInt(a[1], 10) - 1;
    var $ = parseInt(a[2], 10);
    return Sn(n, o, $) ? (t.setUTCFullYear(n, o, $), t) : /* @__PURE__ */ new Date(NaN);
  }
  if (a = Ie.Www.exec(e), a)
    return c = parseInt(a[1], 10) - 1, Pn(n, c) ? Cn(n, c) : /* @__PURE__ */ new Date(NaN);
  if (a = Ie.WwwD.exec(e), a) {
    c = parseInt(a[1], 10) - 1;
    var O = parseInt(a[2], 10) - 1;
    return Pn(n, c, O) ? Cn(n, c, O) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function hl(e) {
  var n, a, t;
  if (n = Ie.HH.exec(e), n)
    return a = parseFloat(n[1].replace(",", ".")), qt(a) ? a % 24 * Xt : NaN;
  if (n = Ie.HHMM.exec(e), n)
    return a = parseInt(n[1], 10), t = parseFloat(n[2].replace(",", ".")), qt(a, t) ? a % 24 * Xt + t * An : NaN;
  if (n = Ie.HHMMSS.exec(e), n) {
    a = parseInt(n[1], 10), t = parseInt(n[2], 10);
    var o = parseFloat(n[3].replace(",", "."));
    return qt(a, t, o) ? a % 24 * Xt + t * An + o * 1e3 : NaN;
  }
  return null;
}
function Cn(e, n, a) {
  n = n || 0, a = a || 0;
  var t = /* @__PURE__ */ new Date(0);
  t.setUTCFullYear(e, 0, 4);
  var o = t.getUTCDay() || 7, c = n * 7 + a + 1 - o;
  return t.setUTCDate(t.getUTCDate() + c), t;
}
var gl = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], pl = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function xn(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function Sn(e, n, a) {
  if (n < 0 || n > 11)
    return false;
  if (a != null) {
    if (a < 1)
      return false;
    var t = xn(e);
    if (t && a > pl[n] || !t && a > gl[n])
      return false;
  }
  return true;
}
function kl(e, n) {
  if (n < 1)
    return false;
  var a = xn(e);
  return !(a && n > 366 || !a && n > 365);
}
function Pn(e, n, a) {
  return !(n < 0 || n > 52 || a != null && (a < 0 || a > 6));
}
function qt(e, n, a) {
  return !(e != null && (e < 0 || e >= 25) || n != null && (n < 0 || n >= 60) || a != null && (a < 0 || a >= 60));
}
var Vt = {}, wl = {
  get exports() {
    return Vt;
  },
  set exports(e) {
    Vt = e;
  }
}, Lt = {}, bl = {
  get exports() {
    return Lt;
  },
  set exports(e) {
    Lt = e;
  }
};
(function(e, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a;
  function a(t, o) {
    if (t == null)
      throw new TypeError("assign requires that input parameter not be null or undefined");
    for (var c in o)
      Object.prototype.hasOwnProperty.call(o, c) && (t[c] = o[c]);
    return t;
  }
  e.exports = n.default;
})(bl, Lt);
(function(e, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = o;
  var a = t(Lt);
  function t(c) {
    return c && c.__esModule ? c : { default: c };
  }
  function o(c) {
    return (0, a.default)({}, c);
  }
  e.exports = n.default;
})(wl, Vt);
const $l = /* @__PURE__ */ mn(Vt);
function Dl(e, n, a) {
  var t = on(e, a), o = yn(n, t, true), c = new Date(t.getTime() - o), p = /* @__PURE__ */ new Date(0);
  return p.setFullYear(c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate()), p.setHours(c.getUTCHours(), c.getUTCMinutes(), c.getUTCSeconds(), c.getUTCMilliseconds()), p;
}
function Ml(e, n, a) {
  if (typeof e == "string" && !e.match(Kn)) {
    var t = $l(a);
    return t.timeZone = n, on(e, t);
  }
  var o = on(e, a), c = vn(
    o.getFullYear(),
    o.getMonth(),
    o.getDate(),
    o.getHours(),
    o.getMinutes(),
    o.getSeconds(),
    o.getMilliseconds()
  ).getTime(), p = yn(n, new Date(c));
  return new Date(c + p);
}
const _l = (e, n = 3) => {
  const a = [];
  for (let t = 0; t < e.length; t += n)
    a.push([e[t], e[t + 1], e[t + 2]]);
  return a;
}, Tl = (e, n) => {
  const a = [1, 2, 3, 4, 5, 6, 7].map((c) => new Intl.DateTimeFormat(e, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${c}T00:00:00+00:00`)).slice(0, 2)), t = a.slice(0, n), o = a.slice(n + 1, a.length);
  return [a[n]].concat(...o).concat(...t);
}, Al = (e) => {
  const n = [];
  for (let a = +e[0]; a <= +e[1]; a++)
    n.push({ value: +a, text: `${a}` });
  return n;
}, Cl = (e, n) => {
  const a = new Intl.DateTimeFormat(e, { month: n, timeZone: "UTC" });
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((o) => {
    const c = o < 10 ? `0${o}` : o;
    return /* @__PURE__ */ new Date(`2017-${c}-01T00:00:00+00:00`);
  }).map((o, c) => ({
    text: a.format(o),
    value: c
  }));
}, Sl = (e) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e], Me = (e) => {
  const n = unref(e);
  return n != null && n.$el ? n == null ? void 0 : n.$el : n;
}, Pl = (e) => Object.assign({ type: "dot" }, e), Gn = (e) => Array.isArray(e) ? !!e[0] && !!e[1] : false, Et = {
  prop: (e) => `"${e}" prop must be enabled!`,
  dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
}, _e = (e) => e, Nn = (e) => e === 0 ? e : !e || isNaN(+e) ? null : +e, Rn = (e) => Object.assign(
  {
    menuAppear: "dp-menu-appear",
    open: "dp-slide-down",
    close: "dp-slide-up",
    next: "calendar-next",
    previous: "calendar-prev",
    vNext: "dp-slide-up",
    vPrevious: "dp-slide-down"
  },
  e
), Nl = (e) => Object.assign(
  {
    toggleOverlay: "Toggle overlay",
    menu: "Datepicker menu",
    input: "Datepicker input",
    calendarWrap: "Calendar wrapper",
    calendarDays: "Calendar days",
    openTimePicker: "Open time picker",
    closeTimePicker: "Close time Picker",
    incrementValue: (n) => `Increment ${n}`,
    decrementValue: (n) => `Decrement ${n}`,
    openTpOverlay: (n) => `Open ${n} overlay`,
    amPmButton: "Switch AM/PM mode",
    openYearsOverlay: "Open years overlay",
    openMonthsOverlay: "Open months overlay",
    nextMonth: "Next month",
    prevMonth: "Previous month",
    day: () => ""
  },
  e
), Rl = (e) => e === null ? 0 : typeof e == "boolean" ? e ? 2 : 0 : +e >= 2 ? +e : 2, Il = (e, n, a) => e || (typeof a == "string" ? a : n), Ol = (e) => typeof e == "boolean" ? e ? Rn({}) : false : Rn(e), Bl = () => ({
  enterSubmit: true,
  tabSubmit: true,
  openMenu: true,
  rangeSeparator: " - "
}), Yl = (e) => Object.assign({ months: [], years: [], times: { hours: [], minutes: [], seconds: [] } }, e), Ve = (e) => {
  const n = () => {
    if (e.partialRange)
      return null;
    throw new Error(Et.prop("partial-range"));
  }, a = computed(() => ({
    ariaLabels: Nl(e.ariaLabels),
    textInputOptions: Object.assign(Bl(), e.textInputOptions),
    multiCalendars: Rl(e.multiCalendars),
    previewFormat: Il(e.previewFormat, e.format, c()),
    filters: Yl(e.filters),
    transitions: Ol(e.transitions),
    startTime: d()
  })), t = (l) => {
    if (e.range)
      return l();
    throw new Error(Et.prop("range"));
  }, o = () => {
    const l = e.enableSeconds ? ":ss" : "";
    return e.is24 ? `HH:mm${l}` : `hh:mm${l} aa`;
  }, c = () => e.format ? e.format : e.monthPicker ? "MM/yyyy" : e.timePicker ? o() : e.weekPicker ? "MM/dd/yyyy" : e.yearPicker ? "yyyy" : e.enableTimePicker ? `MM/dd/yyyy, ${o()}` : "MM/dd/yyyy", p = (l, v) => {
    if (typeof e.format == "function")
      return e.format(l);
    const m = v || c(), k = e.formatLocale ? { locale: e.formatLocale } : void 0;
    return Array.isArray(l) ? `${format(l[0], m, k)} ${e.modelAuto && !l[1] ? "" : a.value.textInputOptions.rangeSeparator || "-"} ${l[1] ? format(l[1], m, k) : ""}` : format(l, m, k);
  }, $ = (l) => e.timezone ? Dl(l, e.timezone) : l, O = (l) => e.timezone ? Ml(l, e.timezone) : l, R = computed(() => (l) => {
    var v;
    return (v = e.hideNavigation) == null ? void 0 : v.includes(l);
  }), E = (l) => {
    const v = e.maxDate ? Oe($(l), $(w(e.maxDate))) : false, m = e.minDate ? Pe($(l), $(w(e.minDate))) : false, k = B(l, e.disabledDates), Z = a.value.filters.months.map((be) => +be).includes(getMonth(l)), se = e.disabledWeekDays.length ? e.disabledWeekDays.some((be) => +be === getDay(l)) : false, f = e.allowedDates.length ? !e.allowedDates.some((be) => ke($(w(be)), $(l))) : false, r = getYear(l), J = r < +e.yearRange[0] || r > +e.yearRange[1];
    return !(v || m || k || Z || J || se || f);
  }, A = (l) => {
    const v = {
      hours: getHours(w()),
      minutes: getMinutes(w()),
      seconds: getSeconds(w())
    };
    return Object.assign(v, l);
  }, d = () => e.range ? e.startTime && Array.isArray(e.startTime) ? [A(e.startTime[0]), A(e.startTime[1])] : null : e.startTime && !Array.isArray(e.startTime) ? A(e.startTime) : null, M = (l) => !E(l), U = (l) => Array.isArray(l) ? isValid(l[0]) && (l[1] ? isValid(l[1]) : true) : l ? isValid(l) : false, V = (l) => l instanceof Date ? l : parseISO(l), ee = (l) => {
    const v = startOfWeek($(l), { weekStartsOn: +e.weekStart }), m = endOfWeek($(l), { weekStartsOn: +e.weekStart });
    return [v, m];
  }, B = (l, v) => Array.isArray(v) ? v.some((m) => ke($(w(m)), $(l))) : v(l), L = (l, v, m) => {
    let k = l ? w(l) : w();
    return (v || v === 0) && (k = setMonth(k, v)), m && (k = setYear(k, m)), k;
  }, C = (l) => set(w(), { hours: getHours(l), minutes: getMinutes(l), seconds: getSeconds(l) }), x = (l) => set(w(), {
    hours: +l.hours || 0,
    minutes: +l.minutes || 0,
    seconds: +l.seconds || 0
  }), Q = (l, v, m, k) => {
    if (!l)
      return true;
    if (k) {
      const G = m === "max" ? isBefore(l, v) : isAfter(l, v), Z = { seconds: 0, milliseconds: 0 };
      return G || isEqual$2(set(l, Z), set(v, Z));
    }
    return m === "max" ? l.getTime() <= v.getTime() : l.getTime() >= v.getTime();
  }, oe = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation, P = (l) => Array.isArray(l) ? [l[0] ? C(l[0]) : null, l[1] ? C(l[1]) : null] : C(l), y = (l) => {
    const v = e.maxTime ? x(e.maxTime) : w(e.maxDate);
    return Array.isArray(l) ? Q(l[0], v, "max", !!e.maxDate) && Q(l[1], v, "max", !!e.maxDate) : Q(l, v, "max", !!e.maxDate);
  }, I = (l, v) => {
    const m = e.minTime ? x(e.minTime) : w(e.minDate);
    return Array.isArray(l) ? Q(l[0], m, "min", !!e.minDate) && Q(l[1], m, "min", !!e.minDate) && v : Q(l, m, "min", !!e.minDate) && v;
  }, W = (l) => {
    let v = true;
    if (!l || oe())
      return true;
    const m = !e.minDate && !e.maxDate ? P(l) : l;
    return (e.maxTime || e.maxDate) && (v = y(_e(m))), (e.minTime || e.minDate) && (v = I(_e(m), v)), v;
  }, N = (l, v) => {
    const m = w(JSON.parse(JSON.stringify(l))), k = [];
    for (let G = 0; G < 7; G++) {
      const Z = addDays(m, G), se = getMonth(Z) !== v;
      k.push({
        text: e.hideOffsetDates && se ? "" : Z.getDate(),
        value: Z,
        current: !se,
        classData: {}
      });
    }
    return k;
  }, K = (l, v) => {
    const m = [], k = w($(new Date(v, l))), G = w($(new Date(v, l + 1, 0))), Z = startOfWeek(k, { weekStartsOn: e.weekStart }), se = (f) => {
      const r = N(f, l);
      if (m.push({ days: r }), !m[m.length - 1].days.some(
        (J) => ke(ze(J.value), ze(G))
      )) {
        const J = addDays(f, 7);
        se(J);
      }
    };
    if (se(Z), e.sixWeeks && m.length < 6) {
      const f = 6 - m.length;
      for (let r = 1; r <= f; r++) {
        const J = m[m.length - 1], be = J.days[J.days.length - 1], we = N(addDays(be.value, 1), getMonth(k));
        m.push({ days: we });
      }
    }
    return m;
  }, te = (l, v, m) => [set(w(l), { date: 1 }), set(w(), { month: v, year: m, date: 1 })], q = (l, v) => Pe(...te(e.minDate, l, v)) || ke(...te(e.minDate, l, v)), _ = (l, v) => Oe(...te(e.maxDate, l, v)) || ke(...te(e.maxDate, l, v)), T = (l, v, m) => {
    let k = false;
    return e.maxDate && m && _(l, v) && (k = true), e.minDate && !m && q(l, v) && (k = true), k;
  };
  return {
    checkPartialRangeValue: n,
    checkRangeEnabled: t,
    getZonedDate: $,
    getZonedToUtc: O,
    formatDate: p,
    getDefaultPattern: c,
    validateDate: E,
    getDefaultStartTime: d,
    isDisabled: M,
    isValidDate: U,
    sanitizeDate: V,
    getWeekFromDate: ee,
    matchDate: B,
    setDateMonthOrYear: L,
    isValidTime: W,
    getCalendarDays: K,
    validateMonthYearInRange: (l, v, m, k) => {
      let G = false;
      return k ? e.minDate && e.maxDate ? G = T(l, v, m) : (e.minDate && q(l, v) || e.maxDate && _(l, v)) && (G = true) : G = true, G;
    },
    validateMaxDate: _,
    validateMinDate: q,
    defaults: a,
    hideNavigationButtons: R
  };
}, he = reactive({
  monthYear: [],
  calendar: [],
  time: [],
  actionRow: [],
  selectionGrid: [],
  timePicker: {
    0: [],
    1: []
  },
  monthPicker: []
}), Jt = ref(null), At = ref(false), Qt = ref(false), en = ref(false), tn = ref(false), Ne = ref(0), Ae = ref(0), Je = () => {
  const e = computed(() => At.value ? [...he.selectionGrid, he.actionRow].filter((B) => B.length) : Qt.value ? [
    ...he.timePicker[0],
    ...he.timePicker[1],
    tn.value ? [] : [Jt.value],
    he.actionRow
  ].filter((B) => B.length) : en.value ? [...he.monthPicker, he.actionRow] : [he.monthYear, ...he.calendar, he.time, he.actionRow].filter((B) => B.length)), n = (B) => {
    Ne.value = B ? Ne.value + 1 : Ne.value - 1;
    let L = null;
    e.value[Ae.value] && (L = e.value[Ae.value][Ne.value]), L || (Ne.value = B ? Ne.value - 1 : Ne.value + 1);
  }, a = (B) => {
    if (Ae.value === 0 && !B || Ae.value === e.value.length && B)
      return;
    Ae.value = B ? Ae.value + 1 : Ae.value - 1, e.value[Ae.value] ? e.value[Ae.value] && !e.value[Ae.value][Ne.value] && Ne.value !== 0 && (Ne.value = e.value[Ae.value].length - 1) : Ae.value = B ? Ae.value - 1 : Ae.value + 1;
  }, t = (B) => {
    let L = null;
    e.value[Ae.value] && (L = e.value[Ae.value][Ne.value]), L ? L.focus({ preventScroll: !At.value }) : Ne.value = B ? Ne.value - 1 : Ne.value + 1;
  }, o = () => {
    n(true), t(true);
  }, c = () => {
    n(false), t(false);
  }, p = () => {
    a(false), t(true);
  }, $ = () => {
    a(true), t(true);
  }, O = (B, L) => {
    he[L] = B;
  }, R = (B, L) => {
    he[L] = B;
  }, E = () => {
    Ne.value = 0, Ae.value = 0;
  };
  return {
    buildMatrix: O,
    buildMultiLevelMatrix: R,
    setTimePickerBackRef: (B) => {
      Jt.value = B;
    },
    setSelectionGrid: (B) => {
      At.value = B, E(), B || (he.selectionGrid = []);
    },
    setTimePicker: (B, L = false) => {
      Qt.value = B, tn.value = L, E(), B || (he.timePicker[0] = [], he.timePicker[1] = []);
    },
    setTimePickerElements: (B, L = 0) => {
      he.timePicker[L] = B;
    },
    arrowRight: o,
    arrowLeft: c,
    arrowUp: p,
    arrowDown: $,
    clearArrowNav: () => {
      he.monthYear = [], he.calendar = [], he.time = [], he.actionRow = [], he.selectionGrid = [], he.timePicker[0] = [], he.timePicker[1] = [], At.value = false, Qt.value = false, tn.value = false, en.value = false, E(), Jt.value = null;
    },
    setMonthPicker: (B) => {
      en.value = B, E();
    },
    refSets: he
    // exposed for testing
  };
}, In = (e) => Array.isArray(e), tt = (e) => Array.isArray(e), On = (e) => Array.isArray(e) && e.length === 2, Vl = (e, n, a, t, o) => {
  const {
    getDefaultStartTime: c,
    isDisabled: p,
    sanitizeDate: $,
    getWeekFromDate: O,
    setDateMonthOrYear: R,
    validateMonthYearInRange: E,
    defaults: A
  } = Ve(e), d = computed({
    get: () => e.internalModelValue,
    set: (s) => {
      !e.readonly && !e.disabled && n("update:internal-model-value", s);
    }
  }), M = ref([]);
  watch(d, () => {
    e.multiCalendars || Q();
  });
  const U = ref([{ month: getMonth(w()), year: getYear(w()) }]), V = reactive({
    hours: e.range ? [getHours(w()), getHours(w())] : getHours(w()),
    minutes: e.range ? [getMinutes(w()), getMinutes(w())] : getMinutes(w()),
    seconds: e.range ? [0, 0] : 0
  }), ee = computed(
    () => (s) => U.value[s] ? U.value[s].month : 0
  ), B = computed(
    () => (s) => U.value[s] ? U.value[s].year : 0
  ), L = computed(() => e.flow && e.flow.length ? o.value === e.flow.length : true), C = (s, b, z) => {
    var ne, h2;
    U.value[s] || (U.value[s] = { month: 0, year: 0 }), U.value[s].month = b === null ? (ne = U.value[s]) == null ? void 0 : ne.month : b, U.value[s].year = z === null ? (h2 = U.value[s]) == null ? void 0 : h2.year : z;
  }, x = (s, b) => {
    V[s] = b;
  };
  onMounted(() => {
    d.value || (e.startDate && (C(0, getMonth(w(e.startDate)), getYear(w(e.startDate))), A.value.multiCalendars && ht(0)), A.value.startTime && _()), Q(true);
  });
  const Q = (s = false) => {
    if (d.value)
      return Array.isArray(d.value) ? (M.value = d.value, W(s)) : P(d.value);
    if (e.timePicker)
      return N();
    if (e.monthPicker && !e.range)
      return K();
    if (e.yearPicker && !e.range)
      return te();
    if (A.value.multiCalendars && s && !e.startDate)
      return oe(w(), s);
  }, oe = (s, b = false) => {
    if ((!A.value.multiCalendars || !e.multiStatic || b) && C(0, getMonth(s), getYear(s)), A.value.multiCalendars)
      for (let z = 1; z < A.value.multiCalendars; z++) {
        const ne = set(w(), { month: ee.value(z - 1), year: B.value(z - 1) }), h2 = add(ne, { months: 1 });
        U.value[z] = { month: getMonth(h2), year: getYear(h2) };
      }
  }, P = (s) => {
    oe(s), x("hours", getHours(s)), x("minutes", getMinutes(s)), x("seconds", getSeconds(s));
  }, y = (s, b) => {
    oe(s[0], b);
    const z = (ne, h2) => [
      ne(s[0]),
      s[1] ? ne(s[1]) : V[h2][1]
    ];
    x("hours", z(getHours, "hours")), x("minutes", z(getMinutes, "minutes")), x("seconds", z(getSeconds, "seconds"));
  }, I = (s, b) => {
    if ((e.range || e.weekPicker) && !e.multiDates)
      return y(s, b);
    if (e.multiDates) {
      const z = s[s.length - 1];
      return P(z);
    }
  }, W = (s) => {
    const b = d.value;
    I(b, s), A.value.multiCalendars && e.multiCalendarsSolo && u();
  }, N = () => {
    if (_(), !e.range)
      d.value = Le(w(), V.hours, V.minutes, q());
    else {
      const s = V.hours, b = V.minutes;
      d.value = [
        Le(w(), s[0], b[0], q()),
        Le(w(), s[1], b[1], q(false))
      ];
    }
  }, K = () => {
    d.value = R(w(), ee.value(0), B.value(0));
  }, te = () => {
    d.value = w();
  }, q = (s = true) => e.enableSeconds ? Array.isArray(V.seconds) ? s ? V.seconds[0] : V.seconds[1] : V.seconds : 0, _ = () => {
    const s = c();
    if (s) {
      const b = Array.isArray(s), z = b ? [+s[0].hours, +s[1].hours] : +s.hours, ne = b ? [+s[0].minutes, +s[1].minutes] : +s.minutes, h2 = b ? [+s[0].seconds, +s[1].seconds] : +s.seconds;
      x("hours", z), x("minutes", ne), e.enableSeconds && x("seconds", h2);
    }
  }, T = () => Array.isArray(d.value) && d.value.length ? d.value[d.value.length - 1] : null, u = () => {
    if (Array.isArray(d.value) && d.value.length === 2) {
      const s = w(
        w(d.value[1] ? d.value[1] : addMonths(d.value[0], 1))
      ), [b, z] = [getMonth(d.value[0]), getYear(d.value[0])], [ne, h2] = [getMonth(d.value[1]), getYear(d.value[1])];
      (b !== ne || b === ne && z !== h2) && e.multiCalendarsSolo && C(1, getMonth(s), getYear(s));
    }
  }, l = (s) => {
    const b = addMonths(s, 1);
    return { month: getMonth(b), year: getYear(b) };
  }, v = (s) => {
    const b = getMonth(w(s)), z = getYear(w(s));
    if (C(0, b, z), A.value.multiCalendars > 0)
      for (let ne = 1; ne < A.value.multiCalendars; ne++) {
        const h2 = l(
          set(w(s), { year: ee.value(ne - 1), month: B.value(ne - 1) })
        );
        C(ne, h2.month, h2.year);
      }
  }, m = (s) => {
    if (d.value && Array.isArray(d.value))
      if (d.value.some((b) => ke(s, b))) {
        const b = d.value.filter((z) => !ke(z, s));
        d.value = b.length ? b : null;
      } else
        (e.multiDatesLimit && +e.multiDatesLimit > d.value.length || !e.multiDatesLimit) && d.value.push(s);
    else
      d.value = [s];
  }, k = (s, b) => {
    const z = Oe(s, b) ? b : s, ne = Oe(b, s) ? b : s;
    return eachDayOfInterval({ start: z, end: ne });
  }, G = (s) => {
    if (Array.isArray(d.value) && d.value[0]) {
      const b = differenceInCalendarDays(s, d.value[0]), z = k(d.value[0], s), ne = z.length === 1 ? 0 : z.filter((j) => p(j)).length, h2 = Math.abs(b) - ne;
      if (e.minRange && e.maxRange)
        return h2 >= +e.minRange && h2 <= +e.maxRange;
      if (e.minRange)
        return h2 >= +e.minRange;
      if (e.maxRange)
        return h2 <= +e.maxRange;
    }
    return true;
  }, Z = (s) => Array.isArray(d.value) && d.value.length === 2 ? e.fixedStart && (Oe(s, d.value[0]) || ke(s, d.value[0])) ? [d.value[0], s] : e.fixedEnd && (Pe(s, d.value[1]) || ke(s, d.value[1])) ? [s, d.value[1]] : (n("invalid-fixed-range", s), d.value) : [], se = () => {
    e.autoApply && L.value && n("auto-apply");
  }, f = () => {
    e.autoApply && n("select-date");
  }, r = (s) => !eachDayOfInterval({ start: s[0], end: s[1] }).some((z) => p(z)), J = (s) => (d.value = O(w(s.value)), se()), be = (s) => {
    const b = Le(w(s.value), V.hours, V.minutes, q());
    e.multiDates ? m(b) : d.value = b, a(), se();
  }, we = () => {
    M.value = d.value ? d.value.slice() : [], M.value.length === 2 && !(e.fixedStart || e.fixedEnd) && (M.value = []);
  }, He = (s, b) => {
    const z = [w(s.value), addDays(w(s.value), +e.autoRange)];
    r(z) && (b && v(s.value), M.value = z);
  }, Xe = (s) => {
    le(s.value) || (M.value = Z(w(s.value)));
  }, le = (s) => e.noDisabledRange ? k(M.value[0], s).some((z) => p(z)) : false, re = (s, b) => {
    if (we(), e.autoRange)
      return He(s, b);
    if (e.fixedStart || e.fixedEnd)
      return Xe(s);
    M.value[0] ? G(w(s.value)) && !le(s.value) && (Pe(w(s.value), w(M.value[0])) ? M.value.unshift(w(s.value)) : M.value[1] = w(s.value)) : M.value[0] = w(s.value);
  }, ve = (s) => {
    M.value[s] = Le(
      M.value[s],
      V.hours[s],
      V.minutes[s],
      q(s !== 1)
    );
  }, ce = () => {
    M.value.length && (M.value[0] && !M.value[1] ? ve(0) : (ve(0), ve(1), a()), d.value = M.value.slice(), M.value[0] && M.value[1] && e.autoApply && n("auto-apply"), M.value[0] && !M.value[1] && e.modelAuto && e.autoApply && n("auto-apply"));
  }, yt = (s, b = false) => {
    if (!(p(s.value) || !s.current && e.hideOffsetDates)) {
      if (e.weekPicker)
        return J(s);
      if (!e.range)
        return be(s);
      tt(V.hours) && tt(V.minutes) && !e.multiDates && (re(s, b), ce());
    }
  }, je = (s) => {
    const b = s.find((z) => z.current);
    return b ? getISOWeek(b.value) : "";
  }, ht = (s) => {
    for (let b = s - 1; b >= 0; b--) {
      const z = subMonths(set(w(), { month: ee.value(b + 1), year: B.value(b + 1) }), 1);
      C(b, getMonth(z), getYear(z));
    }
    for (let b = s + 1; b <= A.value.multiCalendars - 1; b++) {
      const z = addMonths(set(w(), { month: ee.value(b - 1), year: B.value(b - 1) }), 1);
      C(b, getMonth(z), getYear(z));
    }
  }, et = (s) => R(w(), ee.value(s), B.value(s)), gt = (s) => Le(s, V.hours, V.minutes, q()), Ht = (s, b) => {
    const z = e.monthPicker ? ee.value(s) !== b.month || !b.fromNav : B.value(s) !== b.year;
    if (C(s, b.month, b.year), A.value.multiCalendars && !e.multiCalendarsSolo && ht(s), e.monthPicker || e.yearPicker)
      if (e.range) {
        if (z) {
          let ne = d.value ? d.value.slice() : [];
          ne.length === 2 && ne[1] !== null && (ne = []), ne.length ? Pe(et(s), ne[0]) ? ne.unshift(et(s)) : ne[1] = et(s) : ne = [et(s)], d.value = ne;
        }
      } else
        d.value = et(s);
    n("update-month-year", { instance: s, month: b.month, year: b.year }), t(e.multiCalendarsSolo ? s : void 0);
  }, Wt = async (s = false) => {
    if (e.autoApply && (e.monthPicker || e.yearPicker)) {
      await nextTick();
      const b = e.monthPicker ? s : false;
      e.range ? n("auto-apply", b || !d.value || d.value.length === 1) : n("auto-apply", b);
    }
    a();
  }, Mt = (s, b) => {
    const z = set(w(), { month: ee.value(b), year: B.value(b) }), ne = s < 0 ? addMonths(z, 1) : subMonths(z, 1);
    E(getMonth(ne), getYear(ne), s < 0, e.preventMinMaxNavigation) && (C(b, getMonth(ne), getYear(ne)), A.value.multiCalendars && !e.multiCalendarsSolo && ht(b), n("update-month-year", { instance: b, month: getMonth(ne), year: getYear(ne) }), t());
  }, pt = (s) => {
    In(s) && In(d.value) && tt(V.hours) && tt(V.minutes) ? (s[0] && d.value[0] && (d.value[0] = Le(s[0], V.hours[0], V.minutes[0], q())), s[1] && d.value[1] && (d.value[1] = Le(s[1], V.hours[1], V.minutes[1], q(false)))) : e.multiDates && Array.isArray(d.value) ? d.value[d.value.length - 1] = gt(s) : !e.range && !On(s) && (d.value = gt(s)), n("time-update");
  }, zt = (s, b = true, z = false) => {
    const ne = b ? s : V.hours, h2 = !b && !z ? s : V.minutes, j = z ? s : V.seconds;
    if (e.range && On(d.value) && tt(ne) && tt(h2) && tt(j) && !e.disableTimeRangeValidation) {
      const $e = (Ee) => Le(d.value[Ee], ne[Ee], h2[Ee], j[Ee]), Te = (Ee) => setMilliseconds(d.value[Ee], 0);
      if (ke(d.value[0], d.value[1]) && (isAfter($e(0), Te(1)) || isBefore($e(1), Te(0))))
        return;
    }
    if (x("hours", ne), x("minutes", h2), x("seconds", j), d.value)
      if (e.multiDates) {
        const $e = T();
        $e && pt($e);
      } else
        pt(d.value);
    else
      e.timePicker && pt(e.range ? [w(), w()] : w());
    a();
  }, jt = (s, b) => {
    e.monthChangeOnScroll && Mt(e.monthChangeOnScroll !== "inverse" ? -s.deltaY : s.deltaY, b);
  }, Kt = (s, b, z = false) => {
    e.monthChangeOnArrows && e.vertical === z && _t(s, b);
  }, _t = (s, b) => {
    Mt(s === "right" ? -1 : 1, b);
  };
  return {
    time: V,
    month: ee,
    year: B,
    modelValue: d,
    calendars: U,
    monthYearSelect: Wt,
    isDisabled: p,
    updateTime: zt,
    getWeekNum: je,
    selectDate: yt,
    updateMonthYear: Ht,
    handleScroll: jt,
    getMarker: (s) => e.markers.find((b) => ke($(s.value), $(b.date))),
    handleArrow: Kt,
    handleSwipe: _t,
    selectCurrentDate: () => {
      e.range ? d.value && Array.isArray(d.value) && d.value[0] ? d.value = Pe(w(), d.value[0]) ? [w(), d.value[0]] : [d.value[0], w()] : d.value = [w()] : d.value = w(), f();
    },
    presetDateRange: (s, b) => {
      b || s.length && s.length <= 2 && e.range && (d.value = s.map((z) => w(z)), f(), e.multiCalendars && nextTick().then(() => Q(true)));
    }
  };
}, Ll = (e, n, a) => {
  const t = ref(), {
    getZonedToUtc: o,
    getZonedDate: c,
    formatDate: p,
    getDefaultPattern: $,
    checkRangeEnabled: O,
    checkPartialRangeValue: R,
    isValidDate: E,
    setDateMonthOrYear: A,
    defaults: d
  } = Ve(n), M = ref(""), U = toRef(n, "format");
  watch(t, () => {
    e("internal-model-change", t.value);
  }), watch(U, () => {
    l();
  });
  const V = (r) => {
    const J = r || w();
    return n.modelType ? m(J) : {
      hours: getHours(J),
      minutes: getMinutes(J),
      seconds: n.enableSeconds ? getSeconds(J) : 0
    };
  }, ee = (r) => n.modelType ? m(r) : { month: getMonth(r), year: getYear(r) }, B = (r) => Array.isArray(r) ? O(() => [
    setYear(w(), r[0]),
    r[1] ? setYear(w(), r[1]) : R()
  ]) : setYear(w(), +r), L = (r, J) => (typeof r == "string" || typeof r == "number") && n.modelType ? v(r) : J, C = (r) => Array.isArray(r) ? [
    L(
      r[0],
      Le(null, +r[0].hours, +r[0].minutes, r[0].seconds)
    ),
    L(
      r[1],
      Le(null, +r[1].hours, +r[1].minutes, r[1].seconds)
    )
  ] : L(r, Le(null, r.hours, r.minutes, r.seconds)), x = (r) => Array.isArray(r) ? O(() => [
    L(r[0], A(null, +r[0].month, +r[0].year)),
    L(
      r[1],
      r[1] ? A(null, +r[1].month, +r[1].year) : R()
    )
  ]) : L(r, A(null, +r.month, +r.year)), Q = (r) => {
    if (Array.isArray(r))
      return r.map((J) => v(J));
    throw new Error(Et.dateArr("multi-dates"));
  }, oe = (r) => {
    if (Array.isArray(r))
      return [w(r[0]), w(r[1])];
    throw new Error(Et.dateArr("week-picker"));
  }, P = (r) => n.modelAuto ? Array.isArray(r) ? [v(r[0]), v(r[1])] : n.autoApply ? [v(r)] : [v(r), null] : Array.isArray(r) ? O(() => [
    v(r[0]),
    r[1] ? v(r[1]) : R()
  ]) : v(r), y = () => {
    Array.isArray(t.value) && n.range && t.value.length === 1 && t.value.push(R());
  }, I = () => {
    const r = t.value;
    return [
      m(r[0]),
      r[1] ? m(r[1]) : R()
    ];
  }, W = () => t.value[1] ? I() : m(_e(t.value[0])), N = () => (t.value || []).map((r) => m(r)), K = () => (y(), n.modelAuto ? W() : n.multiDates ? N() : Array.isArray(t.value) ? O(() => I()) : m(_e(t.value))), te = (r) => r ? n.timePicker ? C(_e(r)) : n.monthPicker ? x(_e(r)) : n.yearPicker ? B(_e(r)) : n.multiDates ? Q(_e(r)) : n.weekPicker ? oe(_e(r)) : P(_e(r)) : null, q = (r) => {
    const J = te(r);
    E(_e(J)) ? (t.value = _e(J), l()) : (t.value = null, M.value = "");
  }, _ = () => {
    var J;
    const r = (be) => {
      var we;
      return format(be, (we = d.value.textInputOptions) == null ? void 0 : we.format);
    };
    return `${r(t.value[0])} ${(J = d.value.textInputOptions) == null ? void 0 : J.rangeSeparator} ${t.value[1] ? r(t.value[1]) : ""}`;
  }, T = () => {
    var r;
    return a.value && t.value ? Array.isArray(t.value) ? _() : format(t.value, (r = d.value.textInputOptions) == null ? void 0 : r.format) : p(t.value);
  }, u = () => {
    var r;
    return t.value ? n.multiDates ? t.value.map((J) => p(J)).join("; ") : n.textInput && typeof ((r = d.value.textInputOptions) == null ? void 0 : r.format) == "string" ? T() : p(t.value) : "";
  }, l = () => {
    !n.format || typeof n.format == "string" ? M.value = u() : M.value = n.format(t.value);
  }, v = (r) => {
    if (n.utc) {
      const J = new Date(r);
      return n.utc === "preserve" ? new Date(J.getTime() + J.getTimezoneOffset() * 6e4) : J;
    }
    return n.modelType ? n.modelType === "date" || n.modelType === "timestamp" ? c(new Date(r)) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? parse$1(r, $(), /* @__PURE__ */ new Date()) : c(parse$1(r, n.modelType, /* @__PURE__ */ new Date())) : c(new Date(r));
  }, m = (r) => n.utc ? Ja(r, n.utc === "preserve") : n.modelType ? n.modelType === "timestamp" ? +o(r) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? p(o(r)) : p(o(r), n.modelType) : o(r), k = (r) => {
    e("update:model-value", r);
  }, G = (r) => Array.isArray(t.value) ? [
    r(t.value[0]),
    t.value[1] ? r(t.value[1]) : R()
  ] : r(_e(t.value)), Z = (r) => k(_e(G(r)));
  return {
    inputValue: M,
    internalModelValue: t,
    checkBeforeEmit: () => t.value ? n.range ? n.partialRange ? t.value.length >= 1 : t.value.length === 2 : !!t.value : false,
    parseExternalModelValue: q,
    formatInputValue: l,
    emitModelValue: () => (l(), n.monthPicker ? Z(ee) : n.timePicker ? Z(V) : n.yearPicker ? Z(getYear) : n.weekPicker ? k(t.value) : k(K()))
  };
}, El = (e, n) => {
  const { validateMonthYearInRange: a, validateMaxDate: t, validateMinDate: o, defaults: c } = Ve(e), p = (A, d) => {
    let M = A;
    return c.value.filters.months.includes(getMonth(M)) ? (M = d ? addMonths(A, 1) : subMonths(A, 1), p(M, d)) : M;
  }, $ = (A, d) => {
    let M = A;
    return c.value.filters.years.includes(getYear(M)) ? (M = d ? addYears(A, 1) : subYears(A, 1), $(M, d)) : M;
  }, O = (A) => {
    const d = set(/* @__PURE__ */ new Date(), { month: e.month, year: e.year });
    let M = A ? addMonths(d, 1) : subMonths(d, 1), U = getMonth(M), V = getYear(M);
    c.value.filters.months.includes(U) && (M = p(M, A), U = getMonth(M), V = getYear(M)), c.value.filters.years.includes(V) && (M = $(M, A), V = getYear(M)), a(U, V, A, e.preventMinMaxNavigation) && R(U, V);
  }, R = (A, d) => {
    n("update-month-year", { month: A, year: d });
  }, E = computed(() => (A) => {
    if (!e.preventMinMaxNavigation || A && !e.maxDate || !A && !e.minDate)
      return false;
    const d = set(/* @__PURE__ */ new Date(), { month: e.month, year: e.year }), M = A ? addMonths(d, 1) : subMonths(d, 1), U = [getMonth(M), getYear(M)];
    return A ? !t(...U) : !o(...U);
  });
  return { handleMonthYearChange: O, isDisabled: E, updateMonthYear: R };
};
var It = /* @__PURE__ */ ((e) => (e.center = "center", e.left = "left", e.right = "right", e))(It || {});
const Fl = (e, n, a, t) => {
  const o = ref({
    top: "0",
    left: "0",
    transform: "none"
  }), c = ref(false), p = toRef(t, "teleportCenter");
  watch(p, () => {
    ee();
  });
  const $ = (P) => {
    const y = P.getBoundingClientRect();
    return {
      left: y.left + window.scrollX,
      top: y.top + window.scrollY
    };
  }, O = (P) => {
    const y = P.getBoundingClientRect();
    let I = 0, W = 0;
    for (; P && !isNaN(P.offsetLeft) && !isNaN(P.offsetTop); )
      I += P.offsetLeft - P.scrollLeft, W = y.top + P.scrollTop, P = P.offsetParent;
    return { top: W, left: I };
  }, R = (P, y) => {
    o.value.left = `${P + y}px`, o.value.transform = "translateX(-100%)";
  }, E = (P) => {
    o.value.left = `${P}px`, o.value.transform = "translateX(0)";
  }, A = (P, y, I = false) => {
    t.position === It.left && E(P), t.position === It.right && R(P, y), t.position === It.center && (o.value.left = `${P + y / 2}px`, o.value.transform = I ? "translate(-50%, -50%)" : "translateX(-50%)");
  }, d = (P) => {
    const { width: y, height: I } = P.getBoundingClientRect(), { top: W, left: N } = t.altPosition ? O(P) : $(P);
    return { top: W, left: N, width: y, height: I };
  }, M = () => {
    const P = Me(n);
    if (P) {
      const { top: y, left: I, width: W, height: N } = d(P);
      o.value.top = `${y + N / 2}px`, o.value.transform = "translateY(-50%)", A(I, W, true);
    }
  }, U = () => {
    o.value.left = "50%", o.value.top = "50%", o.value.transform = "translate(-50%, -50%)", o.value.position = "fixed";
  }, V = () => {
    const P = Me(n);
    o.value = t.altPosition(P);
  }, ee = (P = true) => {
    if (!t.inline)
      return p.value ? U() : t.altPosition && typeof t.altPosition != "boolean" ? V() : (P && a("recalculate-position"), oe());
  }, B = ({
    inputEl: P,
    menuEl: y,
    left: I,
    width: W
  }) => {
    window.screen.width > 768 && A(I, W), x(P, y);
  }, L = (P, y) => {
    const { top: I, left: W, height: N, width: K } = d(P);
    o.value.top = `${N + I + +t.offset}px`, B({ inputEl: P, menuEl: y, left: W, width: K }), c.value = false;
  }, C = (P, y) => {
    const { top: I, left: W, width: N } = d(P), { height: K } = y.getBoundingClientRect();
    o.value.top = `${I - K - +t.offset}px`, B({ inputEl: P, menuEl: y, left: W, width: N }), c.value = true;
  }, x = (P, y) => {
    if (t.autoPosition) {
      const { left: I, width: W } = d(P), { left: N, right: K } = y.getBoundingClientRect();
      if (N < 0)
        return E(I);
      if (K > document.documentElement.clientWidth)
        return R(I, W);
    }
  }, Q = (P, y) => {
    const { height: I } = y.getBoundingClientRect(), { top: W, height: N } = P.getBoundingClientRect(), te = window.innerHeight - W - N, q = W;
    return I <= te ? L(P, y) : I > te && I <= q ? C(P, y) : te >= q ? L(P, y) : C(P, y);
  }, oe = () => {
    const P = Me(n), y = Me(e);
    if (P && y)
      return t.autoPosition ? Q(P, y) : L(P, y);
  };
  return { openOnTop: c, menuPosition: o, setMenuPosition: ee, setInitialPosition: M };
}, dt = [
  { name: "clock-icon", use: ["time", "calendar"] },
  { name: "arrow-left", use: ["month-year", "calendar"] },
  { name: "arrow-right", use: ["month-year", "calendar"] },
  { name: "arrow-up", use: ["time", "calendar"] },
  { name: "arrow-down", use: ["time", "calendar"] },
  { name: "calendar-icon", use: ["month-year", "time", "calendar"] },
  { name: "day", use: ["calendar"] },
  { name: "month-overlay-value", use: ["calendar", "month-year"] },
  { name: "year-overlay-value", use: ["calendar", "month-year"] },
  { name: "year-overlay", use: ["month-year"] },
  { name: "month-overlay", use: ["month-year"] },
  { name: "month-overlay-header", use: ["month-year"] },
  { name: "year-overlay-header", use: ["month-year"] },
  { name: "hours-overlay-value", use: ["calendar", "time"] },
  { name: "minutes-overlay-value", use: ["calendar", "time"] },
  { name: "seconds-overlay-value", use: ["calendar", "time"] },
  { name: "hours", use: ["calendar", "time"] },
  { name: "minutes", use: ["calendar", "time"] },
  { name: "month", use: ["calendar", "month-year"] },
  { name: "year", use: ["calendar", "month-year"] },
  { name: "action-select", use: ["action"] },
  { name: "action-preview", use: ["action"] },
  { name: "calendar-header", use: ["calendar"] },
  { name: "marker-tooltip", use: ["calendar"] },
  { name: "now-button", use: [] },
  { name: "time-picker-overlay", use: ["calendar", "time"] },
  { name: "am-pm-button", use: ["calendar", "time"] },
  { name: "left-sidebar", use: ["menu"] },
  { name: "right-sidebar", use: ["menu"] },
  { name: "month-year", use: ["month-year"] },
  { name: "time-picker", use: ["menu"] },
  { name: "action-row", use: ["action"] }
], Ul = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }], Hl = {
  all: () => dt,
  monthYear: () => dt.filter((e) => e.use.includes("month-year")),
  input: () => Ul,
  timePicker: () => dt.filter((e) => e.use.includes("time")),
  action: () => dt.filter((e) => e.use.includes("action")),
  calendar: () => dt.filter((e) => e.use.includes("calendar")),
  menu: () => dt.filter((e) => e.use.includes("menu"))
}, rt = (e, n, a) => {
  const t = [];
  return Hl[n]().forEach((o) => {
    e[o.name] && t.push(o.name);
  }), a && a.length && a.forEach((o) => {
    o.slot && t.push(o.slot);
  }), t;
}, Ut = (e) => ({ transitionName: computed(() => (a) => e && typeof e != "boolean" ? a ? e.open : e.close : ""), showTransition: !!e }), Qe = {
  multiCalendars: { type: [Boolean, Number, String], default: null },
  modelValue: { type: [String, Date, Array, Object, Number], default: null },
  modelType: { type: String, default: null },
  position: { type: String, default: "center" },
  dark: { type: Boolean, default: false },
  format: {
    type: [String, Function],
    default: () => null
  },
  closeOnScroll: { type: Boolean, default: false },
  autoPosition: { type: Boolean, default: true },
  closeOnAutoApply: { type: Boolean, default: true },
  teleport: { type: [String, Object], default: "body" },
  altPosition: { type: [Boolean, Function], default: false },
  transitions: { type: [Boolean, Object], default: true },
  formatLocale: { type: Object, default: null },
  utc: { type: [Boolean, String], default: false },
  ariaLabels: { type: Object, default: () => ({}) },
  offset: { type: [Number, String], default: 10 },
  hideNavigation: { type: Array, default: () => [] },
  timezone: { type: String, default: null },
  vertical: { type: Boolean, default: false },
  disableMonthYearSelect: { type: Boolean, default: false },
  menuClassName: { type: String, default: null },
  dayClass: { type: Function, default: null },
  yearRange: { type: Array, default: () => [1900, 2100] },
  multiCalendarsSolo: { type: Boolean, default: false },
  calendarCellClassName: { type: String, default: null },
  enableTimePicker: { type: Boolean, default: true },
  autoApply: { type: Boolean, default: false },
  disabledDates: { type: [Array, Function], default: () => [] },
  monthNameFormat: { type: String, default: "short" },
  startDate: { type: [Date, String], default: null },
  startTime: { type: [Object, Array], default: null },
  monthYearComponent: { type: Object, default: null },
  timePickerComponent: { type: Object, default: null },
  actionRowComponent: { type: Object, default: null },
  hideOffsetDates: { type: Boolean, default: false },
  autoRange: { type: [Number, String], default: null },
  noToday: { type: Boolean, default: false },
  disabledWeekDays: { type: Array, default: () => [] },
  allowedDates: { type: Array, default: () => [] },
  showNowButton: { type: Boolean, default: false },
  nowButtonLabel: { type: String, default: "Now" },
  markers: { type: Array, default: () => [] },
  modeHeight: { type: [Number, String], default: 255 },
  escClose: { type: Boolean, default: true },
  spaceConfirm: { type: Boolean, default: true },
  monthChangeOnArrows: { type: Boolean, default: true },
  presetRanges: { type: Array, default: () => [] },
  flow: { type: Array, default: () => [] },
  preventMinMaxNavigation: { type: Boolean, default: false },
  minRange: { type: [Number, String], default: null },
  maxRange: { type: [Number, String], default: null },
  multiDatesLimit: { type: [Number, String], default: null },
  reverseYears: { type: Boolean, default: false },
  keepActionRow: { type: Boolean, default: false },
  weekPicker: { type: Boolean, default: false },
  filters: { type: Object, default: () => ({}) },
  arrowNavigation: { type: Boolean, default: false },
  multiStatic: { type: Boolean, default: true },
  disableTimeRangeValidation: { type: Boolean, default: false },
  highlight: {
    type: [Array, Function],
    default: null
  },
  highlightWeekDays: {
    type: Array,
    default: null
  },
  highlightDisabledDays: { type: Boolean, default: false },
  teleportCenter: { type: Boolean, default: false },
  locale: { type: String, default: "en-Us" },
  weekNumName: { type: String, default: "W" },
  weekStart: { type: [Number, String], default: 1 },
  weekNumbers: { type: Boolean, default: false },
  calendarClassName: { type: String, default: null },
  noSwipe: { type: Boolean, default: false },
  monthChangeOnScroll: { type: [Boolean, String], default: true },
  dayNames: {
    type: [Function, Array],
    default: null
  },
  monthPicker: { type: Boolean, default: false },
  customProps: { type: Object, default: null },
  yearPicker: { type: Boolean, default: false },
  modelAuto: { type: Boolean, default: false },
  selectText: { type: String, default: "Select" },
  cancelText: { type: String, default: "Cancel" },
  previewFormat: {
    type: [String, Function],
    default: () => ""
  },
  multiDates: { type: Boolean, default: false },
  partialRange: { type: Boolean, default: true },
  ignoreTimeValidation: { type: Boolean, default: false },
  minDate: { type: [Date, String], default: null },
  maxDate: { type: [Date, String], default: null },
  minTime: { type: Object, default: null },
  maxTime: { type: Object, default: null },
  name: { type: String, default: null },
  placeholder: { type: String, default: "" },
  hideInputIcon: { type: Boolean, default: false },
  clearable: { type: Boolean, default: true },
  state: { type: Boolean, default: null },
  required: { type: Boolean, default: false },
  autocomplete: { type: String, default: "off" },
  inputClassName: { type: String, default: null },
  inlineWithInput: { type: Boolean, default: false },
  textInputOptions: { type: Object, default: () => null },
  fixedStart: { type: Boolean, default: false },
  fixedEnd: { type: Boolean, default: false },
  timePicker: { type: Boolean, default: false },
  enableSeconds: { type: Boolean, default: false },
  is24: { type: Boolean, default: true },
  noHoursOverlay: { type: Boolean, default: false },
  noMinutesOverlay: { type: Boolean, default: false },
  noSecondsOverlay: { type: Boolean, default: false },
  hoursGridIncrement: { type: [String, Number], default: 1 },
  minutesGridIncrement: { type: [String, Number], default: 5 },
  secondsGridIncrement: { type: [String, Number], default: 5 },
  hoursIncrement: { type: [Number, String], default: 1 },
  minutesIncrement: { type: [Number, String], default: 1 },
  secondsIncrement: { type: [Number, String], default: 1 },
  range: { type: Boolean, default: false },
  uid: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  inline: { type: Boolean, default: false },
  textInput: { type: Boolean, default: false },
  onClickOutside: { type: Function, default: null },
  noDisabledRange: { type: Boolean, default: false },
  sixWeeks: { type: Boolean, default: false }
}, Wl = ["aria-label", "aria-disabled", "aria-readonly"], zl = {
  key: 1,
  class: "dp__input_wrap"
}, jl = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "onKeydown"], Kl = {
  key: 2,
  class: "dp__input_icon"
}, xl = {
  key: 4,
  class: "dp__clear_icon"
}, Gl = /* @__PURE__ */ defineComponent({
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: false },
    inputValue: { type: String, default: "" },
    ...Qe
  },
  emits: [
    "clear",
    "open",
    "update:input-value",
    "set-input-date",
    "close",
    "select-date",
    "set-empty-date",
    "toggle",
    "focus-prev",
    "focus",
    "blur"
  ],
  setup(e, { expose: n, emit: a }) {
    const t = e, { getDefaultPattern: o, isValidDate: c, defaults: p } = Ve(t), $ = ref(), O = ref(null), R = ref(false), E = computed(
      () => ({
        dp__pointer: !t.disabled && !t.readonly && !t.textInput,
        dp__disabled: t.disabled,
        dp__input_readonly: !t.textInput,
        dp__input: true,
        dp__input_icon_pad: !t.hideInputIcon,
        dp__input_valid: t.state,
        dp__input_invalid: t.state === false,
        dp__input_focus: R.value || t.isMenuOpen,
        dp__input_reg: !t.textInput,
        [t.inputClassName]: !!t.inputClassName
      })
    ), A = () => {
      a("set-input-date", null), t.autoApply && (a("set-empty-date"), $.value = null);
    }, d = (y) => {
      var I;
      return qa(y, ((I = p.value.textInputOptions) == null ? void 0 : I.format) || o());
    }, M = (y) => {
      const { rangeSeparator: I } = p.value.textInputOptions, [W, N] = y.split(`${I}`);
      if (W) {
        const K = d(W.trim()), te = N ? d(N.trim()) : null, q = K && te ? [K, te] : [K];
        $.value = K ? q : null;
      }
    }, U = (y) => {
      if (t.range)
        M(y);
      else if (t.multiDates) {
        const I = y.split(";");
        $.value = I.map((W) => d(W.trim())).filter((W) => W);
      } else
        $.value = d(y);
    }, V = (y) => {
      var W;
      const { value: I } = y.target;
      I !== "" ? ((W = p.value.textInputOptions) != null && W.openMenu && !t.isMenuOpen && a("open"), U(I), a("set-input-date", $.value)) : A(), a("update:input-value", I);
    }, ee = () => {
      var y, I;
      (y = p.value.textInputOptions) != null && y.enterSubmit && c($.value) && t.inputValue !== "" ? (a("set-input-date", $.value, true), $.value = null) : (I = p.value.textInputOptions) != null && I.enterSubmit && t.inputValue === "" && ($.value = null, a("clear"));
    }, B = () => {
      var y, I;
      (y = p.value.textInputOptions) != null && y.tabSubmit && c($.value) && t.inputValue !== "" ? (a("set-input-date", $.value, true), $.value = null) : (I = p.value.textInputOptions) != null && I.tabSubmit && t.inputValue === "" && ($.value = null, a("clear"));
    }, L = () => {
      R.value = true, a("focus");
    }, C = (y) => {
      var I;
      y.preventDefault(), y.stopImmediatePropagation(), y.stopPropagation(), t.textInput && ((I = p.value.textInputOptions) != null && I.openMenu) && !t.inlineWithInput ? t.isMenuOpen ? p.value.textInputOptions.enterSubmit && a("select-date") : a("open") : t.textInput || a("toggle");
    }, x = () => {
      R.value = false, t.isMenuOpen || a("blur"), t.autoApply && t.textInput && $.value && (a("set-input-date", $.value), a("select-date"), $.value = null);
    }, Q = () => {
      a("clear");
    }, oe = (y) => {
      t.textInput || y.preventDefault();
    };
    return n({
      focusInput: () => {
        O.value && O.value.focus({ preventScroll: true });
      }
    }), (y, I) => {
      var W;
      return openBlock(), createElementBlock("div", {
        onClick: C,
        "aria-label": (W = unref(p).ariaLabels) == null ? void 0 : W.input,
        role: "textbox",
        "aria-multiline": "false",
        "aria-disabled": y.disabled,
        "aria-readonly": y.readonly
      }, [
        y.$slots.trigger && !y.$slots["dp-input"] && !y.inline ? renderSlot(y.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !y.$slots.trigger && (!y.inline || y.inlineWithInput) ? (openBlock(), createElementBlock("div", zl, [
          y.$slots["dp-input"] && !y.$slots.trigger && !y.inline ? renderSlot(y.$slots, "dp-input", {
            key: 0,
            value: e.inputValue,
            onInput: V,
            onEnter: ee,
            onTab: B,
            onClear: Q
          }) : createCommentVNode("", true),
          y.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            ref_key: "inputRef",
            ref: O,
            id: y.uid ? `dp-input-${y.uid}` : void 0,
            name: y.name,
            class: normalizeClass(unref(E)),
            inputmode: y.textInput ? "text" : "none",
            placeholder: y.placeholder,
            disabled: y.disabled,
            readonly: y.readonly,
            required: y.required,
            value: e.inputValue,
            autocomplete: y.autocomplete,
            onInput: V,
            onKeydown: [
              withKeys(C, ["enter"]),
              withKeys(B, ["tab"])
            ],
            onBlur: x,
            onFocus: L,
            onKeypress: oe
          }, null, 42, jl)),
          y.$slots["input-icon"] && !y.hideInputIcon ? (openBlock(), createElementBlock("span", Kl, [
            renderSlot(y.$slots, "input-icon")
          ])) : createCommentVNode("", true),
          !y.$slots["input-icon"] && !y.hideInputIcon && !y.$slots["dp-input"] ? (openBlock(), createBlock(unref(Ft), {
            key: 3,
            class: "dp__input_icon dp__input_icons"
          })) : createCommentVNode("", true),
          y.$slots["clear-icon"] && e.inputValue && y.clearable && !y.disabled && !y.readonly ? (openBlock(), createElementBlock("span", xl, [
            renderSlot(y.$slots, "clear-icon", { clear: Q })
          ])) : createCommentVNode("", true),
          y.clearable && !y.$slots["clear-icon"] && e.inputValue && !y.disabled && !y.readonly ? (openBlock(), createBlock(unref(Ma), {
            key: 5,
            class: "dp__clear_icon dp__input_icons",
            "data-test": "clear-icon",
            onClick: withModifiers(Q, ["stop", "prevent"])
          }, null, 8, ["onClick"])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ], 8, Wl);
    };
  }
}), Zl = { class: "dp__selection_preview" }, Xl = { class: "dp__action_buttons" }, ql = ["onKeydown"], Jl = /* @__PURE__ */ defineComponent({
  __name: "ActionRow",
  props: {
    calendarWidth: { type: Number, default: 0 },
    menuMount: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    ...Qe
  },
  emits: ["close-picker", "select-date", "invalid-select"],
  setup(e, { emit: n }) {
    const a = e, { formatDate: t, isValidTime: o, defaults: c } = Ve(a), { buildMatrix: p } = Je(), $ = ref(null), O = ref(null);
    onMounted(() => {
      a.arrowNavigation && p([Me($), Me(O)], "actionRow");
    });
    const R = computed(() => a.range && !a.partialRange && a.internalModelValue ? a.internalModelValue.length === 2 : true), E = computed(() => !d.value || !M.value || !R.value), A = computed(() => ({
      dp__action: true,
      dp__select: true,
      dp__action_disabled: E.value
    })), d = computed(() => !a.enableTimePicker || a.ignoreTimeValidation ? true : o(a.internalModelValue)), M = computed(() => a.monthPicker ? B(a.internalModelValue) : true), U = () => {
      const C = c.value.previewFormat;
      return a.timePicker || a.monthPicker, C(_e(a.internalModelValue));
    }, V = () => {
      const C = a.internalModelValue;
      return c.value.multiCalendars > 0 ? `${t(C[0])} - ${t(C[1])}` : [t(C[0]), t(C[1])];
    }, ee = computed(() => !a.internalModelValue || !a.menuMount ? "" : typeof c.value.previewFormat == "string" ? Array.isArray(a.internalModelValue) ? a.internalModelValue.length === 2 && a.internalModelValue[1] ? V() : a.multiDates ? a.internalModelValue.map((C) => `${t(C)}`) : a.modelAuto ? `${t(a.internalModelValue[0])}` : `${t(a.internalModelValue[0])} -` : t(a.internalModelValue) : U()), B = (C) => {
      if (!a.monthPicker)
        return true;
      let x = true;
      return a.minDate && a.maxDate ? Oe(w(C), w(a.minDate)) && Pe(w(C), w(a.maxDate)) : (a.minDate && (x = Oe(w(C), w(a.minDate))), a.maxDate && (x = Pe(w(C), w(a.maxDate))), x);
    }, L = () => {
      d.value && M.value && R.value ? n("select-date") : n("invalid-select");
    };
    return (C, x) => (openBlock(), createElementBlock("div", {
      class: "dp__action_row",
      style: normalizeStyle(e.calendarWidth ? { width: `${e.calendarWidth}px` } : {})
    }, [
      C.$slots["action-row"] ? renderSlot(C.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: e.internalModelValue,
        disabled: unref(E),
        selectDate: () => C.$emit("select-date"),
        closePicker: () => C.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment$1, { key: 1 }, [
        createElementVNode("div", Zl, [
          C.$slots["action-preview"] ? renderSlot(C.$slots, "action-preview", {
            key: 0,
            value: e.internalModelValue
          }) : createCommentVNode("", true),
          C.$slots["action-preview"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment$1, { key: 1 }, [
            Array.isArray(unref(ee)) ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment$1, { key: 0 }, [
              createTextVNode(toDisplayString(unref(ee)), 1)
            ], 64)),
            Array.isArray(unref(ee)) ? (openBlock(true), createElementBlock(Fragment$1, { key: 1 }, renderList(unref(ee), (Q, oe) => (openBlock(), createElementBlock("div", { key: oe }, toDisplayString(Q), 1))), 128)) : createCommentVNode("", true)
          ], 64))
        ]),
        createElementVNode("div", Xl, [
          C.$slots["action-select"] ? renderSlot(C.$slots, "action-select", {
            key: 0,
            value: e.internalModelValue
          }) : createCommentVNode("", true),
          C.$slots["action-select"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment$1, { key: 1 }, [
            C.inline ? createCommentVNode("", true) : (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__action dp__cancel",
              ref_key: "cancelButtonRef",
              ref: $,
              tabindex: "0",
              onClick: x[0] || (x[0] = (Q) => C.$emit("close-picker")),
              onKeydown: [
                x[1] || (x[1] = withKeys((Q) => C.$emit("close-picker"), ["enter"])),
                x[2] || (x[2] = withKeys((Q) => C.$emit("close-picker"), ["space"]))
              ]
            }, toDisplayString(C.cancelText), 545)),
            createElementVNode("span", {
              class: normalizeClass(unref(A)),
              tabindex: "0",
              onKeydown: [
                withKeys(L, ["enter"]),
                withKeys(L, ["space"])
              ],
              onClick: L,
              "data-test": "select-button",
              ref_key: "selectButtonRef",
              ref: O
            }, toDisplayString(C.selectText), 43, ql)
          ], 64))
        ])
      ], 64))
    ], 4));
  }
}), Ql = ["aria-label"], er = {
  class: "dp__calendar_header",
  role: "row"
}, tr = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
}, nr = /* @__PURE__ */ createElementVNode("div", { class: "dp__calendar_header_separator" }, null, -1), ar = ["aria-label"], lr = {
  key: 0,
  role: "gridcell",
  class: "dp__calendar_item dp__week_num"
}, rr = { class: "dp__cell_inner" }, or = ["aria-selected", "aria-disabled", "aria-label", "data-test", "onClick", "onKeydown", "onMouseenter", "onMouseleave"], sr = /* @__PURE__ */ createElementVNode("div", { class: "dp__arrow_bottom_tp" }, null, -1), ir = /* @__PURE__ */ defineComponent({
  __name: "Calendar",
  props: {
    mappedDates: { type: Array, default: () => [] },
    getWeekNum: {
      type: Function,
      default: () => ""
    },
    specificMode: { type: Boolean, default: false },
    instance: { type: Number, default: 0 },
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    ...Qe
  },
  emits: [
    "select-date",
    "set-hover-date",
    "handle-scroll",
    "mount",
    "handle-swipe",
    "handle-space",
    "tooltip-open",
    "tooltip-close"
  ],
  setup(e, { expose: n, emit: a }) {
    const t = e, { buildMultiLevelMatrix: o } = Je(), { setDateMonthOrYear: c, defaults: p } = Ve(t), $ = ref(null), O = ref({ bottom: "", left: "", transform: "" }), R = ref([]), E = ref(null), A = ref(true), d = ref(""), M = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), U = computed(() => t.dayNames ? Array.isArray(t.dayNames) ? t.dayNames : t.dayNames(t.locale, +t.weekStart) : Tl(t.locale, +t.weekStart));
    onMounted(() => {
      a("mount", { cmp: "calendar", refs: R }), t.noSwipe || E.value && (E.value.addEventListener("touchstart", I, { passive: false }), E.value.addEventListener("touchend", W, { passive: false }), E.value.addEventListener("touchmove", N, { passive: false })), t.monthChangeOnScroll && E.value && E.value.addEventListener("wheel", q, { passive: false });
    });
    const V = (_) => _ ? t.vertical ? "vNext" : "next" : t.vertical ? "vPrevious" : "previous", ee = (_, T) => {
      if (t.transitions) {
        const u = ze(c(w(), t.month, t.year));
        d.value = Oe(ze(c(w(), _, T)), u) ? p.value.transitions[V(true)] : p.value.transitions[V(false)], A.value = false, nextTick(() => {
          A.value = true;
        });
      }
    }, B = computed(
      () => ({
        dp__calendar_wrap: true,
        [t.calendarClassName]: !!t.calendarClassName
      })
    ), L = computed(() => (_) => {
      const T = Pl(_);
      return {
        dp__marker_dot: T.type === "dot",
        dp__marker_line: T.type === "line"
      };
    }), C = computed(() => (_) => ke(_, $.value)), x = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: p.value.multiCalendars > 0 && t.instance !== 0
    })), Q = computed(() => (_) => t.hideOffsetDates ? _.current : true), oe = computed(() => t.specificMode ? { height: `${t.modeHeight}px` } : void 0), P = (_, T, u) => {
      var l, v;
      if (a("set-hover-date", _), (v = (l = _.marker) == null ? void 0 : l.tooltip) != null && v.length) {
        const m = Me(R.value[T][u]);
        if (m) {
          const { width: k, height: G } = m.getBoundingClientRect();
          O.value = {
            bottom: `${G}px`,
            left: `${k / 2}px`,
            transform: "translateX(-50%)"
          }, $.value = _.value, a("tooltip-open", _.value);
        }
      }
    }, y = (_) => {
      $.value && ($.value = null, a("tooltip-close", _.value));
    }, I = (_) => {
      M.value.startX = _.changedTouches[0].screenX, M.value.startY = _.changedTouches[0].screenY;
    }, W = (_) => {
      M.value.endX = _.changedTouches[0].screenX, M.value.endY = _.changedTouches[0].screenY, K();
    }, N = (_) => {
      t.vertical && !t.inline && _.preventDefault();
    }, K = () => {
      const _ = t.vertical ? "Y" : "X";
      Math.abs(M.value[`start${_}`] - M.value[`end${_}`]) > 10 && a("handle-swipe", M.value[`start${_}`] > M.value[`end${_}`] ? "right" : "left");
    }, te = (_, T, u) => {
      _ && (Array.isArray(R.value[T]) ? R.value[T][u] = _ : R.value[T] = [_]), t.arrowNavigation && o(R.value, "calendar");
    }, q = (_) => {
      t.monthChangeOnScroll && (_.preventDefault(), a("handle-scroll", _));
    };
    return n({ triggerTransition: ee }), (_, T) => {
      var u;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(x))
      }, [
        createElementVNode("div", {
          style: normalizeStyle(unref(oe))
        }, [
          e.specificMode ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
            key: 0,
            ref_key: "calendarWrapRef",
            ref: E,
            class: normalizeClass(unref(B)),
            role: "grid",
            "aria-label": (u = unref(p).ariaLabels) == null ? void 0 : u.calendarWrap
          }, [
            createElementVNode("div", er, [
              _.weekNumbers ? (openBlock(), createElementBlock("div", tr, toDisplayString(_.weekNumName), 1)) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment$1, null, renderList(unref(U), (l, v) => (openBlock(), createElementBlock("div", {
                class: "dp__calendar_header_item",
                role: "gridcell",
                key: v,
                "data-test": "calendar-header"
              }, [
                _.$slots["calendar-header"] ? renderSlot(_.$slots, "calendar-header", {
                  key: 0,
                  day: l,
                  index: v
                }) : createCommentVNode("", true),
                _.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment$1, { key: 1 }, [
                  createTextVNode(toDisplayString(l), 1)
                ], 64))
              ]))), 128))
            ]),
            nr,
            createVNode(Transition, {
              name: d.value,
              css: !!_.transitions
            }, {
              default: withCtx(() => {
                var l;
                return [
                  A.value ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: "dp__calendar",
                    role: "grid",
                    "aria-label": (l = unref(p).ariaLabels) == null ? void 0 : l.calendarDays
                  }, [
                    (openBlock(true), createElementBlock(Fragment$1, null, renderList(e.mappedDates, (v, m) => (openBlock(), createElementBlock("div", {
                      class: "dp__calendar_row",
                      role: "row",
                      key: m
                    }, [
                      _.weekNumbers ? (openBlock(), createElementBlock("div", lr, [
                        createElementVNode("div", rr, toDisplayString(e.getWeekNum(v.days)), 1)
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment$1, null, renderList(v.days, (k, G) => {
                        var Z, se, f;
                        return openBlock(), createElementBlock("div", {
                          role: "gridcell",
                          class: "dp__calendar_item",
                          ref_for: true,
                          ref: (r) => te(r, m, G),
                          key: G + m,
                          "aria-selected": k.classData.dp__active_date || k.classData.dp__range_start || k.classData.dp__range_start,
                          "aria-disabled": k.classData.dp__cell_disabled,
                          "aria-label": (se = (Z = unref(p).ariaLabels) == null ? void 0 : Z.day) == null ? void 0 : se.call(Z, k),
                          tabindex: "0",
                          "data-test": k.value,
                          onClick: withModifiers((r) => _.$emit("select-date", k), ["stop", "prevent"]),
                          onKeydown: [
                            withKeys((r) => _.$emit("select-date", k), ["enter"]),
                            withKeys((r) => _.$emit("handle-space", k), ["space"])
                          ],
                          onMouseenter: (r) => P(k, m, G),
                          onMouseleave: (r) => y(k)
                        }, [
                          createElementVNode("div", {
                            class: normalizeClass(["dp__cell_inner", k.classData])
                          }, [
                            _.$slots.day && unref(Q)(k) ? renderSlot(_.$slots, "day", {
                              key: 0,
                              day: +k.text,
                              date: k.value
                            }) : createCommentVNode("", true),
                            _.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment$1, { key: 1 }, [
                              createTextVNode(toDisplayString(k.text), 1)
                            ], 64)),
                            k.marker && unref(Q)(k) ? (openBlock(), createElementBlock("div", {
                              key: 2,
                              class: normalizeClass(unref(L)(k.marker)),
                              style: normalizeStyle(k.marker.color ? { backgroundColor: k.marker.color } : {})
                            }, null, 6)) : createCommentVNode("", true),
                            unref(C)(k.value) ? (openBlock(), createElementBlock("div", {
                              key: 3,
                              class: "dp__marker_tooltip",
                              style: normalizeStyle(O.value)
                            }, [
                              (f = k.marker) != null && f.tooltip ? (openBlock(), createElementBlock("div", {
                                key: 0,
                                class: "dp__tooltip_content",
                                onClick: T[0] || (T[0] = withModifiers(() => {
                                }, ["stop"]))
                              }, [
                                (openBlock(true), createElementBlock(Fragment$1, null, renderList(k.marker.tooltip, (r, J) => (openBlock(), createElementBlock("div", {
                                  key: J,
                                  class: "dp__tooltip_text"
                                }, [
                                  _.$slots["marker-tooltip"] ? renderSlot(_.$slots, "marker-tooltip", {
                                    key: 0,
                                    tooltip: r,
                                    day: k.value
                                  }) : createCommentVNode("", true),
                                  _.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment$1, { key: 1 }, [
                                    createElementVNode("div", {
                                      class: "dp__tooltip_mark",
                                      style: normalizeStyle(r.color ? { backgroundColor: r.color } : {})
                                    }, null, 4),
                                    createElementVNode("div", null, toDisplayString(r.text), 1)
                                  ], 64))
                                ]))), 128)),
                                sr
                              ])) : createCommentVNode("", true)
                            ], 4)) : createCommentVNode("", true)
                          ], 2)
                        ], 40, or);
                      }), 128))
                    ]))), 128))
                  ], 8, ar)) : createCommentVNode("", true)
                ];
              }),
              _: 3
            }, 8, ["name", "css"])
          ], 10, Ql))
        ], 4)
      ], 2);
    };
  }
}), ur = ["aria-label", "aria-disabled"], nn = /* @__PURE__ */ defineComponent({
  __name: "ActionIcon",
  props: {
    ariaLabel: { type: String, default: "" },
    disabled: { type: Boolean, default: false }
  },
  emits: ["activate", "set-ref"],
  setup(e, { emit: n }) {
    const a = ref(null);
    return onMounted(() => n("set-ref", a)), (t, o) => (openBlock(), createElementBlock("div", {
      class: "dp__month_year_col_nav",
      onClick: o[0] || (o[0] = (c) => t.$emit("activate")),
      onKeydown: [
        o[1] || (o[1] = withKeys((c) => t.$emit("activate"), ["enter"])),
        o[2] || (o[2] = withKeys((c) => t.$emit("activate"), ["space"]))
      ],
      tabindex: "0",
      role: "button",
      "aria-label": e.ariaLabel,
      "aria-disabled": e.disabled,
      ref_key: "elRef",
      ref: a
    }, [
      createElementVNode("div", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: e.disabled }])
      }, [
        renderSlot(t.$slots, "default")
      ], 2)
    ], 40, ur));
  }
}), dr = ["onKeydown"], cr = { class: "dp__selection_grid_header" }, fr = ["aria-selected", "aria-disabled", "data-test", "onClick", "onKeydown", "onMouseover"], mr = ["aria-label", "onKeydown"], $t = /* @__PURE__ */ defineComponent({
  __name: "SelectionGrid",
  props: {
    items: { type: Array, default: () => [] },
    modelValue: { type: [String, Number], default: null },
    multiModelValue: { type: Array, default: () => [] },
    disabledValues: { type: Array, default: () => [] },
    minValue: { type: [Number, String], default: null },
    maxValue: { type: [Number, String], default: null },
    year: { type: Number, default: 0 },
    skipActive: { type: Boolean, default: false },
    headerRefs: { type: Array, default: () => [] },
    skipButtonRef: { type: Boolean, default: false },
    monthPicker: { type: Boolean, default: false },
    yearPicker: { type: Boolean, default: false },
    escClose: { type: Boolean, default: true },
    type: { type: String, default: null },
    arrowNavigation: { type: Boolean, default: false },
    autoApply: { type: Boolean, default: false },
    textInput: { type: Boolean, default: false },
    ariaLabels: { type: Object, default: () => ({}) },
    hideNavigation: { type: Array, default: () => [] }
  },
  emits: ["update:model-value", "selected", "toggle", "reset-flow"],
  setup(e, { expose: n, emit: a }) {
    const t = e, { setSelectionGrid: o, buildMultiLevelMatrix: c, setMonthPicker: p } = Je(), { hideNavigationButtons: $ } = Ve(t), O = ref(false), R = ref(null), E = ref(null), A = ref([]), d = ref(), M = ref(null), U = ref(0), V = ref(null);
    onBeforeUpdate(() => {
      R.value = null;
    }), onMounted(() => {
      nextTick().then(() => I()), B(), ee(true);
    }), onUnmounted(() => ee(false));
    const ee = (T) => {
      var u;
      t.arrowNavigation && ((u = t.headerRefs) != null && u.length ? p(T) : o(T));
    }, B = () => {
      const T = Me(E);
      T && (t.textInput || T.focus({ preventScroll: true }), O.value = T.clientHeight < T.scrollHeight);
    }, L = computed(
      () => ({
        dp__overlay: true
      })
    ), C = computed(() => ({
      dp__overlay_col: true
    })), x = (T) => t.skipActive ? false : T.value === t.modelValue, Q = computed(() => t.items.map((T) => T.filter((u) => u).map((u) => {
      var m, k, G;
      const l = t.disabledValues.some((Z) => Z === u.value) || y(u.value), v = (m = t.multiModelValue) != null && m.length ? (k = t.multiModelValue) == null ? void 0 : k.some(
        (Z) => ke(
          Z,
          setYear(
            t.monthPicker ? setMonth(/* @__PURE__ */ new Date(), u.value) : /* @__PURE__ */ new Date(),
            t.monthPicker ? t.year : u.value
          )
        )
      ) : x(u);
      return {
        ...u,
        className: {
          dp__overlay_cell_active: v,
          dp__overlay_cell: !v,
          dp__overlay_cell_disabled: l,
          dp__overlay_cell_active_disabled: l && v,
          dp__overlay_cell_pad: true,
          dp__cell_in_between: (G = t.multiModelValue) != null && G.length ? N(u.value) : false
        }
      };
    }))), oe = computed(
      () => ({
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: O.value,
        dp__button_bottom: t.autoApply
      })
    ), P = computed(() => {
      var T, u;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((T = t.items) == null ? void 0 : T.length) <= 6,
        dp__container_block: ((u = t.items) == null ? void 0 : u.length) > 6
      };
    }), y = (T) => {
      const u = t.maxValue || t.maxValue === 0, l = t.minValue || t.minValue === 0;
      return !u && !l ? false : u && l ? +T > +t.maxValue || +T < +t.minValue : u ? +T > +t.maxValue : l ? +T < +t.minValue : false;
    }, I = () => {
      const T = Me(R), u = Me(E), l = Me(M), v = Me(V), m = l ? l.getBoundingClientRect().height : 0;
      u && (U.value = u.getBoundingClientRect().height - m), T && v && (v.scrollTop = T.offsetTop - v.offsetTop - (U.value / 2 - T.getBoundingClientRect().height) - m);
    }, W = (T) => {
      !t.disabledValues.some((u) => u === T) && !y(T) && (a("update:model-value", T), a("selected"));
    }, N = (T) => {
      const u = t.monthPicker ? t.year : T;
      return zn(
        t.multiModelValue,
        setYear(
          t.monthPicker ? setMonth(/* @__PURE__ */ new Date(), d.value || 0) : /* @__PURE__ */ new Date(),
          t.monthPicker ? u : d.value || u
        ),
        setYear(t.monthPicker ? setMonth(/* @__PURE__ */ new Date(), T) : /* @__PURE__ */ new Date(), u)
      );
    }, K = () => {
      a("toggle"), a("reset-flow");
    }, te = () => {
      t.escClose && K();
    }, q = (T, u, l, v) => {
      T && (u.value === +t.modelValue && !t.disabledValues.includes(u.value) && (R.value = T), t.arrowNavigation && (Array.isArray(A.value[l]) ? A.value[l][v] = T : A.value[l] = [T], _()));
    }, _ = () => {
      var u, l;
      const T = (u = t.headerRefs) != null && u.length ? [t.headerRefs].concat(A.value) : A.value.concat([t.skipButtonRef ? [] : [M.value]]);
      c(_e(T), (l = t.headerRefs) != null && l.length ? "monthPicker" : "selectionGrid");
    };
    return n({ focusGrid: B }), (T, u) => {
      var l;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: E,
        class: normalizeClass(unref(L)),
        role: "dialog",
        tabindex: "0",
        onKeydown: withKeys(te, ["esc"])
      }, [
        createElementVNode("div", {
          class: normalizeClass(unref(P)),
          ref_key: "containerRef",
          ref: V,
          role: "grid",
          style: normalizeStyle({ height: `${U.value}px` })
        }, [
          createElementVNode("div", cr, [
            renderSlot(T.$slots, "header")
          ]),
          T.$slots.overlay ? renderSlot(T.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment$1, { key: 1 }, renderList(unref(Q), (v, m) => (openBlock(), createElementBlock("div", {
            class: "dp__overlay_row",
            key: m,
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment$1, null, renderList(v, (k, G) => (openBlock(), createElementBlock("div", {
              role: "gridcell",
              class: normalizeClass(unref(C)),
              key: k.value,
              "aria-selected": k.value === e.modelValue && !e.disabledValues.includes(k.value),
              "aria-disabled": k.className.dp__overlay_cell_disabled,
              ref_for: true,
              ref: (Z) => q(Z, k, m, G),
              tabindex: "0",
              "data-test": k.text,
              onClick: (Z) => W(k.value),
              onKeydown: [
                withKeys((Z) => W(k.value), ["enter"]),
                withKeys((Z) => W(k.value), ["space"])
              ],
              onMouseover: (Z) => d.value = k.value
            }, [
              createElementVNode("div", {
                class: normalizeClass(k.className)
              }, [
                T.$slots.item ? renderSlot(T.$slots, "item", {
                  key: 0,
                  item: k
                }) : createCommentVNode("", true),
                T.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment$1, { key: 1 }, [
                  createTextVNode(toDisplayString(k.text), 1)
                ], 64))
              ], 2)
            ], 42, fr))), 128))
          ]))), 128))
        ], 6),
        T.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("div", {
          key: 0,
          role: "button",
          "aria-label": (l = e.ariaLabels) == null ? void 0 : l.toggleOverlay,
          class: normalizeClass(unref(oe)),
          tabindex: "0",
          ref_key: "toggleButton",
          ref: M,
          onClick: K,
          onKeydown: withKeys(K, ["enter"])
        }, [
          renderSlot(T.$slots, "button-icon")
        ], 42, mr)), [
          [vShow, !unref($)(e.type)]
        ]) : createCommentVNode("", true)
      ], 42, dr);
    };
  }
}), vr = ["aria-label"], Bn = /* @__PURE__ */ defineComponent({
  __name: "RegularPicker",
  props: {
    ariaLabel: { type: String, default: "" },
    showSelectionGrid: { type: Boolean, default: false },
    modelValue: { type: Number, default: null },
    items: { type: Array, default: () => [] },
    disabledValues: { type: Array, default: () => [] },
    minValue: { type: Number, default: null },
    maxValue: { type: Number, default: null },
    slotName: { type: String, default: "" },
    overlaySlot: { type: String, default: "" },
    headerRefs: { type: Array, default: () => [] },
    escClose: { type: Boolean, default: true },
    type: { type: String, default: null },
    transitions: { type: [Object, Boolean], default: false },
    arrowNavigation: { type: Boolean, default: false },
    autoApply: { type: Boolean, default: false },
    textInput: { type: Boolean, default: false },
    ariaLabels: { type: Object, default: () => ({}) },
    hideNavigation: { type: Array, default: () => [] }
  },
  emits: ["update:model-value", "toggle", "set-ref"],
  setup(e, { emit: n }) {
    const a = e, { transitionName: t, showTransition: o } = Ut(a.transitions), c = ref(null);
    return onMounted(() => n("set-ref", c)), (p, $) => (openBlock(), createElementBlock(Fragment$1, null, [
      createElementVNode("div", {
        class: "dp__month_year_select",
        onClick: $[0] || ($[0] = (O) => p.$emit("toggle")),
        onKeydown: [
          $[1] || ($[1] = withKeys((O) => p.$emit("toggle"), ["enter"])),
          $[2] || ($[2] = withKeys((O) => p.$emit("toggle"), ["space"]))
        ],
        role: "button",
        "aria-label": e.ariaLabel,
        tabindex: "0",
        ref_key: "elRef",
        ref: c
      }, [
        renderSlot(p.$slots, "default")
      ], 40, vr),
      createVNode(Transition, {
        name: unref(t)(e.showSelectionGrid),
        css: unref(o)
      }, {
        default: withCtx(() => [
          e.showSelectionGrid ? (openBlock(), createBlock($t, mergeProps({ key: 0 }, {
            modelValue: e.modelValue,
            items: e.items,
            disabledValues: e.disabledValues,
            minValue: e.minValue,
            maxValue: e.maxValue,
            escClose: e.escClose,
            type: e.type,
            arrowNavigation: e.arrowNavigation,
            textInput: e.textInput,
            autoApply: e.autoApply,
            ariaLabels: e.ariaLabels,
            hideNavigation: e.hideNavigation
          }, {
            "header-refs": [],
            "onUpdate:modelValue": $[3] || ($[3] = (O) => p.$emit("update:model-value", O)),
            onToggle: $[4] || ($[4] = (O) => p.$emit("toggle"))
          }), createSlots({
            "button-icon": withCtx(() => [
              p.$slots["calendar-icon"] ? renderSlot(p.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
              p.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ft), { key: 1 }))
            ]),
            _: 2
          }, [
            p.$slots[e.slotName] ? {
              name: "item",
              fn: withCtx(({ item: O }) => [
                renderSlot(p.$slots, e.slotName, { item: O })
              ]),
              key: "0"
            } : void 0,
            p.$slots[e.overlaySlot] ? {
              name: "overlay",
              fn: withCtx(() => [
                renderSlot(p.$slots, e.overlaySlot)
              ]),
              key: "1"
            } : void 0,
            p.$slots[`${e.overlaySlot}-header`] ? {
              name: "header",
              fn: withCtx(() => [
                renderSlot(p.$slots, `${e.overlaySlot}-header`)
              ]),
              key: "2"
            } : void 0
          ]), 1040)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["name", "css"])
    ], 64));
  }
}), yr = { class: "dp__month_year_row" }, hr = { class: "dp__month_year_wrap" }, gr = { class: "dp__month_picker_header" }, pr = ["aria-label"], kr = ["aria-label"], wr = ["aria-label"], br = /* @__PURE__ */ defineComponent({
  __name: "MonthYearPicker",
  props: {
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    instance: { type: Number, default: 0 },
    years: { type: Array, default: () => [] },
    months: { type: Array, default: () => [] },
    internalModelValue: { type: [Date, Array], default: null },
    ...Qe
  },
  emits: ["update-month-year", "month-year-select", "mount", "reset-flow", "overlay-closed"],
  setup(e, { expose: n, emit: a }) {
    const t = e, { defaults: o } = Ve(t), { transitionName: c, showTransition: p } = Ut(o.value.transitions), { buildMatrix: $ } = Je(), { handleMonthYearChange: O, isDisabled: R, updateMonthYear: E } = El(t, a), A = ref(false), d = ref(false), M = ref([null, null, null, null]), U = ref(null), V = ref(null), ee = ref(null);
    onMounted(() => {
      a("mount");
    });
    const B = (f) => ({
      get: () => t[f],
      set: (r) => {
        const J = f === "month" ? "year" : "month";
        a("update-month-year", { [f]: r, [J]: t[J] }), a("month-year-select", f === "year"), f === "month" ? m(true) : k(true);
      }
    }), L = computed(B("month")), C = computed(B("year")), x = (f) => {
      const r = getYear(w(f));
      return t.year === r;
    }, Q = computed(() => t.monthPicker ? Array.isArray(t.disabledDates) ? t.disabledDates.map((f) => w(f)).filter((f) => x(f)).map((f) => getMonth(f)) : [] : []), oe = computed(() => (f) => {
      const r = f === "month";
      return {
        showSelectionGrid: (r ? A : d).value,
        items: (r ? T : u).value,
        disabledValues: o.value.filters[r ? "months" : "years"].concat(Q.value),
        minValue: (r ? W : y).value,
        maxValue: (r ? N : I).value,
        headerRefs: r && t.monthPicker ? [U.value, V.value, ee.value] : [],
        escClose: t.escClose,
        transitions: o.value.transitions,
        ariaLabels: o.value.ariaLabels,
        textInput: t.textInput,
        autoApply: t.autoApply,
        arrowNavigation: t.arrowNavigation,
        hideNavigation: t.hideNavigation
      };
    }), P = computed(() => (f) => ({
      month: t.month,
      year: t.year,
      items: f === "month" ? t.months : t.years,
      instance: t.instance,
      updateMonthYear: E,
      toggle: f === "month" ? m : k
    })), y = computed(() => t.minDate ? getYear(w(t.minDate)) : null), I = computed(() => t.maxDate ? getYear(w(t.maxDate)) : null), W = computed(() => {
      if (t.minDate && y.value) {
        if (y.value > t.year)
          return 12;
        if (y.value === t.year)
          return getMonth(w(t.minDate));
      }
      return null;
    }), N = computed(() => t.maxDate && I.value ? I.value < t.year ? -1 : I.value === t.year ? getMonth(w(t.maxDate)) : null : null), K = computed(() => t.range && t.internalModelValue && (t.monthPicker || t.yearPicker) ? t.internalModelValue : []), te = (f) => f.reverse(), q = (f, r = false) => {
      const J = [], be = (we) => r ? te(we) : we;
      for (let we = 0; we < f.length; we += 3) {
        const He = [f[we], f[we + 1], f[we + 2]];
        J.push(be(He));
      }
      return r ? J.reverse() : J;
    }, _ = computed(() => {
      const f = t.months.find((r) => r.value === t.month);
      return f || { text: "", value: 0 };
    }), T = computed(() => q(t.months)), u = computed(() => q(t.years, t.reverseYears)), l = computed(() => o.value.multiCalendars ? t.multiCalendarsSolo ? true : t.instance === 0 : true), v = computed(() => o.value.multiCalendars ? t.multiCalendarsSolo ? true : t.instance === o.value.multiCalendars - 1 : true), m = (f = false) => {
      G(f), A.value = !A.value, A.value || a("overlay-closed");
    }, k = (f = false) => {
      G(f), d.value = !d.value, d.value || a("overlay-closed");
    }, G = (f) => {
      f || a("reset-flow");
    }, Z = (f = false) => {
      R.value(f) || a("update-month-year", {
        year: f ? t.year + 1 : t.year - 1,
        month: t.month,
        fromNav: true
      });
    }, se = (f, r) => {
      t.arrowNavigation && (M.value[r] = Me(f), $(M.value, "monthYear"));
    };
    return n({
      toggleMonthPicker: m,
      toggleYearPicker: k
    }), (f, r) => {
      var J, be, we, He, Xe;
      return openBlock(), createElementBlock("div", yr, [
        f.$slots["month-year"] ? renderSlot(f.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, { month: e.month, year: e.year, months: e.months, years: e.years, updateMonthYear: unref(E), handleMonthYearChange: unref(O), instance: e.instance }))) : (openBlock(), createElementBlock(Fragment$1, { key: 1 }, [
          !f.monthPicker && !f.yearPicker ? (openBlock(), createElementBlock(Fragment$1, { key: 0 }, [
            unref(l) && !f.vertical ? (openBlock(), createBlock(nn, {
              key: 0,
              "aria-label": (J = unref(o).ariaLabels) == null ? void 0 : J.prevMonth,
              disabled: unref(R)(false),
              onActivate: r[0] || (r[0] = (le) => unref(O)(false)),
              onSetRef: r[1] || (r[1] = (le) => se(le, 0))
            }, {
              default: withCtx(() => [
                f.$slots["arrow-left"] ? renderSlot(f.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                f.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(wn), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
            createElementVNode("div", hr, [
              createVNode(Bn, mergeProps({
                type: "month",
                "slot-name": "month-overlay-val",
                "overlay-slot": "overlay-month",
                "aria-label": (be = unref(o).ariaLabels) == null ? void 0 : be.openMonthsOverlay,
                modelValue: unref(L),
                "onUpdate:modelValue": r[2] || (r[2] = (le) => isRef(L) ? L.value = le : null)
              }, unref(oe)("month"), {
                onToggle: m,
                onSetRef: r[3] || (r[3] = (le) => se(le, 1))
              }), createSlots({
                default: withCtx(() => [
                  f.$slots.month ? renderSlot(f.$slots, "month", normalizeProps(mergeProps({ key: 0 }, unref(_)))) : createCommentVNode("", true),
                  f.$slots.month ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment$1, { key: 1 }, [
                    createTextVNode(toDisplayString(unref(_).text), 1)
                  ], 64))
                ]),
                _: 2
              }, [
                f.$slots["calendar-icon"] ? {
                  name: "calendar-icon",
                  fn: withCtx(() => [
                    renderSlot(f.$slots, "calendar-icon")
                  ]),
                  key: "0"
                } : void 0,
                f.$slots["month-overlay-value"] ? {
                  name: "month-overlay-val",
                  fn: withCtx(({ item: le }) => [
                    renderSlot(f.$slots, "month-overlay-value", {
                      text: le.text,
                      value: le.value
                    })
                  ]),
                  key: "1"
                } : void 0,
                f.$slots["month-overlay"] ? {
                  name: "overlay-month",
                  fn: withCtx(() => [
                    renderSlot(f.$slots, "month-overlay", normalizeProps(guardReactiveProps(unref(P)("month"))))
                  ]),
                  key: "2"
                } : void 0,
                f.$slots["month-overlay-header"] ? {
                  name: "overlay-month-header",
                  fn: withCtx(() => [
                    renderSlot(f.$slots, "month-overlay-header", { toggle: m })
                  ]),
                  key: "3"
                } : void 0
              ]), 1040, ["aria-label", "modelValue"]),
              createVNode(Bn, mergeProps({
                type: "year",
                "slot-name": "year-overlay-val",
                "overlay-slot": "overlay-year",
                "aria-label": (we = unref(o).ariaLabels) == null ? void 0 : we.openYearsOverlay,
                modelValue: unref(C),
                "onUpdate:modelValue": r[4] || (r[4] = (le) => isRef(C) ? C.value = le : null)
              }, unref(oe)("year"), {
                onToggle: k,
                onSetRef: r[5] || (r[5] = (le) => se(le, 2))
              }), createSlots({
                default: withCtx(() => [
                  f.$slots.year ? renderSlot(f.$slots, "year", {
                    key: 0,
                    year: e.year
                  }) : createCommentVNode("", true),
                  f.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment$1, { key: 1 }, [
                    createTextVNode(toDisplayString(e.year), 1)
                  ], 64))
                ]),
                _: 2
              }, [
                f.$slots["calendar-icon"] ? {
                  name: "calendar-icon",
                  fn: withCtx(() => [
                    renderSlot(f.$slots, "calendar-icon")
                  ]),
                  key: "0"
                } : void 0,
                f.$slots["year-overlay-value"] ? {
                  name: "year-overlay-val",
                  fn: withCtx(({ item: le }) => [
                    renderSlot(f.$slots, "year-overlay-value", {
                      text: le.text,
                      value: le.value
                    })
                  ]),
                  key: "1"
                } : void 0,
                f.$slots["year-overlay"] ? {
                  name: "overlay-year",
                  fn: withCtx(() => [
                    renderSlot(f.$slots, "year-overlay", normalizeProps(guardReactiveProps(unref(P)("year"))))
                  ]),
                  key: "2"
                } : void 0,
                f.$slots["year-overlay-header"] ? {
                  name: "overlay-year-header",
                  fn: withCtx(() => [
                    renderSlot(f.$slots, "year-overlay-header", { toggle: k })
                  ]),
                  key: "3"
                } : void 0
              ]), 1040, ["aria-label", "modelValue"])
            ]),
            unref(l) && f.vertical ? (openBlock(), createBlock(nn, {
              key: 1,
              "aria-label": (He = unref(o).ariaLabels) == null ? void 0 : He.prevMonth,
              disabled: unref(R)(false),
              onActivate: r[6] || (r[6] = (le) => unref(O)(false))
            }, {
              default: withCtx(() => [
                f.$slots["arrow-up"] ? renderSlot(f.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                f.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Hn), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
            unref(v) ? (openBlock(), createBlock(nn, {
              key: 2,
              ref: "rightIcon",
              disabled: unref(R)(true),
              "aria-label": (Xe = unref(o).ariaLabels) == null ? void 0 : Xe.nextMonth,
              onActivate: r[7] || (r[7] = (le) => unref(O)(true)),
              onSetRef: r[8] || (r[8] = (le) => se(le, 3))
            }, {
              default: withCtx(() => [
                f.$slots[f.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(f.$slots, f.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
                f.$slots[f.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(f.vertical ? unref(Wn) : unref(bn)), { key: 1 }))
              ]),
              _: 3
            }, 8, ["disabled", "aria-label"])) : createCommentVNode("", true)
          ], 64)) : createCommentVNode("", true),
          f.monthPicker ? (openBlock(), createBlock($t, mergeProps({ key: 1 }, unref(oe)("month"), {
            "skip-active": f.range,
            year: e.year,
            "multi-model-value": unref(K),
            "month-picker": "",
            modelValue: unref(L),
            "onUpdate:modelValue": r[17] || (r[17] = (le) => isRef(L) ? L.value = le : null),
            onToggle: m,
            onSelected: r[18] || (r[18] = (le) => f.$emit("overlay-closed"))
          }), createSlots({
            header: withCtx(() => {
              var le, re, ve;
              return [
                createElementVNode("div", gr, [
                  createElementVNode("div", {
                    class: "dp__month_year_col_nav",
                    tabindex: "0",
                    ref_key: "mpPrevIconRef",
                    ref: U,
                    onClick: r[9] || (r[9] = (ce) => Z(false)),
                    onKeydown: r[10] || (r[10] = withKeys((ce) => Z(false), ["enter"]))
                  }, [
                    createElementVNode("div", {
                      class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: unref(R)(false) }]),
                      role: "button",
                      "aria-label": (le = unref(o).ariaLabels) == null ? void 0 : le.prevMonth
                    }, [
                      f.$slots["arrow-left"] ? renderSlot(f.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                      f.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(wn), { key: 1 }))
                    ], 10, pr)
                  ], 544),
                  createElementVNode("div", {
                    class: "dp__pointer",
                    role: "button",
                    ref_key: "mpYearButtonRef",
                    ref: V,
                    "aria-label": (re = unref(o).ariaLabels) == null ? void 0 : re.openYearsOverlay,
                    tabindex: "0",
                    onClick: r[11] || (r[11] = () => k(false)),
                    onKeydown: r[12] || (r[12] = withKeys(() => k(false), ["enter"]))
                  }, [
                    f.$slots.year ? renderSlot(f.$slots, "year", {
                      key: 0,
                      year: e.year
                    }) : createCommentVNode("", true),
                    f.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment$1, { key: 1 }, [
                      createTextVNode(toDisplayString(e.year), 1)
                    ], 64))
                  ], 40, kr),
                  createElementVNode("div", {
                    class: "dp__month_year_col_nav",
                    tabindex: "0",
                    ref_key: "mpNextIconRef",
                    ref: ee,
                    onClick: r[13] || (r[13] = (ce) => Z(true)),
                    onKeydown: r[14] || (r[14] = withKeys((ce) => Z(true), ["enter"]))
                  }, [
                    createElementVNode("div", {
                      class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: unref(R)(true) }]),
                      role: "button",
                      "aria-label": (ve = unref(o).ariaLabels) == null ? void 0 : ve.nextMonth
                    }, [
                      f.$slots["arrow-right"] ? renderSlot(f.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
                      f.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(bn), { key: 1 }))
                    ], 10, wr)
                  ], 544)
                ]),
                createVNode(Transition, {
                  name: unref(c)(d.value),
                  css: unref(p)
                }, {
                  default: withCtx(() => [
                    d.value ? (openBlock(), createBlock($t, mergeProps({ key: 0 }, unref(oe)("year"), {
                      modelValue: unref(C),
                      "onUpdate:modelValue": r[15] || (r[15] = (ce) => isRef(C) ? C.value = ce : null),
                      onToggle: k,
                      onSelected: r[16] || (r[16] = (ce) => f.$emit("overlay-closed"))
                    }), createSlots({
                      "button-icon": withCtx(() => [
                        f.$slots["calendar-icon"] ? renderSlot(f.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        f.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ft), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      f.$slots["year-overlay-value"] ? {
                        name: "item",
                        fn: withCtx(({ item: ce }) => [
                          renderSlot(f.$slots, "year-overlay-value", {
                            text: ce.text,
                            value: ce.value
                          })
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1040, ["modelValue"])) : createCommentVNode("", true)
                  ]),
                  _: 3
                }, 8, ["name", "css"])
              ];
            }),
            _: 2
          }, [
            f.$slots["month-overlay-value"] ? {
              name: "item",
              fn: withCtx(({ item: le }) => [
                renderSlot(f.$slots, "month-overlay-value", {
                  text: le.text,
                  value: le.value
                })
              ]),
              key: "0"
            } : void 0
          ]), 1040, ["skip-active", "year", "multi-model-value", "modelValue"])) : createCommentVNode("", true),
          f.yearPicker ? (openBlock(), createBlock($t, mergeProps({ key: 2 }, unref(oe)("year"), {
            modelValue: unref(C),
            "onUpdate:modelValue": r[19] || (r[19] = (le) => isRef(C) ? C.value = le : null),
            "multi-model-value": unref(K),
            "skip-active": f.range,
            "skip-button-ref": "",
            "year-picker": "",
            onToggle: k,
            onSelected: r[20] || (r[20] = (le) => f.$emit("overlay-closed"))
          }), createSlots({ _: 2 }, [
            f.$slots["year-overlay-value"] ? {
              name: "item",
              fn: withCtx(({ item: le }) => [
                renderSlot(f.$slots, "year-overlay-value", {
                  text: le.text,
                  value: le.value
                })
              ]),
              key: "0"
            } : void 0
          ]), 1040, ["modelValue", "multi-model-value", "skip-active"])) : createCommentVNode("", true)
        ], 64))
      ]);
    };
  }
}), $r = {
  key: 0,
  class: "dp__time_input"
}, Dr = ["aria-label", "onKeydown", "onClick"], Mr = ["aria-label", "data-test", "onKeydown", "onClick"], _r = ["aria-label", "onKeydown", "onClick"], Tr = { key: 0 }, Ar = ["aria-label", "onKeydown"], Cr = /* @__PURE__ */ defineComponent({
  __name: "TimeInput",
  props: {
    hours: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 },
    seconds: { type: Number, default: 0 },
    closeTimePickerBtn: { type: Object, default: null },
    order: { type: Number, default: 0 },
    ...Qe
  },
  emits: [
    "set-hours",
    "set-minutes",
    "update:hours",
    "update:minutes",
    "update:seconds",
    "reset-flow",
    "mounted",
    "overlay-closed"
  ],
  setup(e, { expose: n, emit: a }) {
    const t = e, { setTimePickerElements: o, setTimePickerBackRef: c } = Je(), { defaults: p } = Ve(t), { transitionName: $, showTransition: O } = Ut(p.value.transitions), R = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), E = ref("AM"), A = ref(null), d = ref([]);
    onMounted(() => {
      a("mounted");
    });
    const M = computed(() => (u) => !!(t.maxTime && t.maxTime[u] && t.maxTime[u] < t[u] + +t[`${u}Increment`])), U = computed(() => (u) => !!(t.minTime && t.minTime[u] && t.minTime[u] > t[u] - +t[`${u}Increment`])), V = (u, l) => add(set(w(), u), l), ee = (u, l) => sub(set(w(), u), l), B = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_reg: !t.enableSeconds && t.is24,
        dp__time_col_reg_with_button: !t.enableSeconds && !t.is24,
        dp__time_col_sec: t.enableSeconds && t.is24,
        dp__time_col_sec_with_button: t.enableSeconds && !t.is24
      })
    ), L = computed(() => {
      const u = [{ type: "hours" }, { type: "", separator: true }, { type: "minutes" }];
      return t.enableSeconds ? u.concat([{ type: "", separator: true }, { type: "seconds" }]) : u;
    }), C = computed(() => L.value.filter((u) => !u.separator)), x = computed(() => (u) => {
      if (u === "hours") {
        const l = K(t.hours);
        return { text: l < 10 ? `0${l}` : `${l}`, value: l };
      }
      return { text: t[u] < 10 ? `0${t[u]}` : `${t[u]}`, value: t[u] };
    }), Q = (u) => {
      const l = t.is24 ? 24 : 12, v = u === "hours" ? l : 60, m = +t[`${u}GridIncrement`], k = u === "hours" && !t.is24 ? m : 0, G = [];
      for (let Z = k; Z < v; Z += m)
        G.push({ value: Z, text: Z < 10 ? `0${Z}` : `${Z}` });
      return u === "hours" && !t.is24 && G.push({ value: 0, text: "12" }), _l(G);
    }, oe = (u, l) => {
      const v = t.minTime && t.minTime[l], m = t.maxTime && t.maxTime[l];
      return v && m ? u < v || u > m : v ? u < v : m ? u > m : false;
    }, P = computed(() => (u) => Q(u).flat().map((v) => v.value).filter((v) => oe(v, u))), y = (u) => t[`no${u[0].toUpperCase() + u.slice(1)}Overlay`], I = (u) => {
      y(u) || (R[u] = !R[u], R[u] || a("overlay-closed"));
    }, W = (u) => u === "hours" ? getHours : u === "minutes" ? getMinutes : getSeconds, N = (u, l = true) => {
      const v = l ? V : ee;
      (l ? M.value(u) : U.value(u)) || a(
        `update:${u}`,
        W(u)(v({ [u]: +t[u] }, { [u]: +t[`${u}Increment`] }))
      );
    }, K = (u) => t.is24 ? u : (u >= 12 ? E.value = "PM" : E.value = "AM", Sl(u)), te = () => {
      E.value === "PM" ? (E.value = "AM", a("update:hours", t.hours - 12)) : (E.value = "PM", a("update:hours", t.hours + 12));
    }, q = (u) => {
      R[u] = true;
    }, _ = (u, l, v) => {
      if (u && t.arrowNavigation) {
        Array.isArray(d.value[l]) ? d.value[l][v] = u : d.value[l] = [u];
        const m = d.value.reduce(
          (k, G) => G.map((Z, se) => [...k[se] || [], G[se]]),
          []
        );
        c(t.closeTimePickerBtn), A.value && (m[1] = m[1].concat(A.value)), o(m, t.order);
      }
    }, T = (u, l) => u === "hours" && !t.is24 ? a(`update:${u}`, E.value === "PM" ? l + 12 : l) : a(`update:${u}`, l);
    return n({ openChildCmp: q }), (u, l) => {
      var v;
      return u.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", $r, [
        (openBlock(true), createElementBlock(Fragment$1, null, renderList(unref(L), (m, k) => {
          var G, Z, se;
          return openBlock(), createElementBlock("div", {
            key: k,
            class: normalizeClass(unref(B))
          }, [
            m.separator ? (openBlock(), createElementBlock(Fragment$1, { key: 0 }, [
              createTextVNode(" : ")
            ], 64)) : (openBlock(), createElementBlock(Fragment$1, { key: 1 }, [
              createElementVNode("div", {
                class: normalizeClass({
                  dp__inc_dec_button: true,
                  dp__inc_dec_button_disabled: unref(M)(m.type)
                }),
                role: "button",
                "data-test": "time-inc-btn",
                "aria-label": (G = unref(p).ariaLabels) == null ? void 0 : G.incrementValue(m.type),
                tabindex: "0",
                onKeydown: [
                  withKeys((f) => N(m.type), ["enter"]),
                  withKeys((f) => N(m.type), ["space"])
                ],
                onClick: (f) => N(m.type),
                ref_for: true,
                ref: (f) => _(f, k, 0)
              }, [
                u.$slots["arrow-up"] ? renderSlot(u.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                u.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Hn), { key: 1 }))
              ], 42, Dr),
              createElementVNode("div", {
                role: "button",
                "aria-label": (Z = unref(p).ariaLabels) == null ? void 0 : Z.openTpOverlay(m.type),
                class: normalizeClass(y(m.type) ? "" : "dp__time_display"),
                tabindex: "0",
                "data-test": `${m.type}-toggle-overlay-btn`,
                onKeydown: [
                  withKeys((f) => I(m.type), ["enter"]),
                  withKeys((f) => I(m.type), ["space"])
                ],
                onClick: (f) => I(m.type),
                ref_for: true,
                ref: (f) => _(f, k, 1)
              }, [
                u.$slots[m.type] ? renderSlot(u.$slots, m.type, {
                  key: 0,
                  text: unref(x)(m.type).text,
                  value: unref(x)(m.type).value
                }) : createCommentVNode("", true),
                u.$slots[m.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment$1, { key: 1 }, [
                  createTextVNode(toDisplayString(unref(x)(m.type).text), 1)
                ], 64))
              ], 42, Mr),
              createElementVNode("div", {
                class: normalizeClass({
                  dp__inc_dec_button: true,
                  dp__inc_dec_button_disabled: unref(U)(m.type)
                }),
                role: "button",
                "data-test": "time-dec-btn",
                "aria-label": (se = unref(p).ariaLabels) == null ? void 0 : se.decrementValue(m.type),
                tabindex: "0",
                onKeydown: [
                  withKeys((f) => N(m.type, false), ["enter"]),
                  withKeys((f) => N(m.type, false), ["space"])
                ],
                onClick: (f) => N(m.type, false),
                ref_for: true,
                ref: (f) => _(f, k, 2)
              }, [
                u.$slots["arrow-down"] ? renderSlot(u.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                u.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Wn), { key: 1 }))
              ], 42, _r)
            ], 64))
          ], 2);
        }), 128)),
        u.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Tr, [
          u.$slots["am-pm-button"] ? renderSlot(u.$slots, "am-pm-button", {
            key: 0,
            toggle: te,
            value: E.value
          }) : createCommentVNode("", true),
          u.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: A,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (v = unref(p).ariaLabels) == null ? void 0 : v.amPmButton,
            tabindex: "0",
            onClick: te,
            onKeydown: [
              withKeys(withModifiers(te, ["prevent"]), ["enter"]),
              withKeys(withModifiers(te, ["prevent"]), ["space"])
            ]
          }, toDisplayString(E.value), 41, Ar))
        ])),
        (openBlock(true), createElementBlock(Fragment$1, null, renderList(unref(C), (m, k) => (openBlock(), createBlock(Transition, {
          key: k,
          name: unref($)(R[m.type]),
          css: unref(O)
        }, {
          default: withCtx(() => [
            R[m.type] ? (openBlock(), createBlock($t, {
              key: 0,
              items: Q(m.type),
              "disabled-values": unref(p).filters.times[m.type].concat(unref(P)(m.type)),
              "esc-close": u.escClose,
              "aria-labels": unref(p).ariaLabels,
              "hide-navigation": u.hideNavigation,
              "onUpdate:modelValue": (G) => T(m.type, G),
              onSelected: (G) => I(m.type),
              onToggle: (G) => I(m.type),
              onResetFlow: l[0] || (l[0] = (G) => u.$emit("reset-flow")),
              type: m.type
            }, createSlots({
              "button-icon": withCtx(() => [
                u.$slots["clock-icon"] ? renderSlot(u.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                u.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Un), { key: 1 }))
              ]),
              _: 2
            }, [
              u.$slots[`${m.type}-overlay-value`] ? {
                name: "item",
                fn: withCtx(({ item: G }) => [
                  renderSlot(u.$slots, `${m.type}-overlay-value`, {
                    text: G.text,
                    value: G.value
                  })
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["items", "disabled-values", "esc-close", "aria-labels", "hide-navigation", "onUpdate:modelValue", "onSelected", "onToggle", "type"])) : createCommentVNode("", true)
          ]),
          _: 2
        }, 1032, ["name", "css"]))), 128))
      ]));
    };
  }
}), Sr = ["aria-label"], Pr = { class: "dp__overlay_container dp__container_flex dp__time_picker_overlay_container" }, Nr = {
  key: 1,
  class: "dp__overlay_row"
}, Rr = ["aria-label"], Ir = /* @__PURE__ */ defineComponent({
  __name: "TimePicker",
  props: {
    hours: { type: [Number, Array], default: 0 },
    minutes: { type: [Number, Array], default: 0 },
    seconds: { type: [Number, Array], default: 0 },
    internalModelValue: { type: [Date, Array], default: null },
    ...Qe
  },
  emits: [
    "update:hours",
    "update:minutes",
    "update:seconds",
    "mount",
    "reset-flow",
    "overlay-closed"
  ],
  setup(e, { expose: n, emit: a }) {
    const t = e, { buildMatrix: o, setTimePicker: c } = Je(), p = useSlots(), { hideNavigationButtons: $, defaults: O } = Ve(t), { transitionName: R, showTransition: E } = Ut(O.value.transitions), A = ref(null), d = ref(null), M = ref([]), U = ref(null);
    onMounted(() => {
      a("mount"), !t.timePicker && t.arrowNavigation ? o([Me(A.value)], "time") : c(true, t.timePicker);
    });
    const V = computed(() => t.range && t.modelAuto ? Gn(t.internalModelValue) : true), ee = ref(false), B = (N) => ({
      hours: Array.isArray(t.hours) ? t.hours[N] : t.hours,
      minutes: Array.isArray(t.minutes) ? t.minutes[N] : t.minutes,
      seconds: Array.isArray(t.seconds) ? t.seconds[N] : t.seconds
    }), L = computed(() => {
      const N = [];
      if (t.range)
        for (let K = 0; K < 2; K++)
          N.push(B(K));
      else
        N.push(B(0));
      return N;
    }), C = (N, K = false, te = "") => {
      K || a("reset-flow"), ee.value = N, t.arrowNavigation && (c(N), N || a("overlay-closed")), nextTick(() => {
        te !== "" && M.value[0] && M.value[0].openChildCmp(te);
      });
    }, x = computed(() => ({
      dp__button: true,
      dp__button_bottom: t.autoApply
    })), Q = rt(p, "timePicker"), oe = (N, K, te) => t.range ? K === 0 ? [N, L.value[1][te]] : [L.value[0][te], N] : N, P = (N) => {
      a("update:hours", N);
    }, y = (N) => {
      a("update:minutes", N);
    }, I = (N) => {
      a("update:seconds", N);
    }, W = () => {
      U.value && t.arrowNavigation && U.value.focus({ preventScroll: true });
    };
    return n({ toggleTimePicker: C }), (N, K) => {
      var te;
      return openBlock(), createElementBlock("div", null, [
        N.timePicker ? createCommentVNode("", true) : withDirectives((openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(x)),
          role: "button",
          "aria-label": (te = unref(O).ariaLabels) == null ? void 0 : te.openTimePicker,
          tabindex: "0",
          "data-test": "open-time-picker-btn",
          ref_key: "openTimePickerBtn",
          ref: A,
          onKeydown: [
            K[0] || (K[0] = withKeys((q) => C(true), ["enter"])),
            K[1] || (K[1] = withKeys((q) => C(true), ["space"]))
          ],
          onClick: K[2] || (K[2] = (q) => C(true))
        }, [
          N.$slots["clock-icon"] ? renderSlot(N.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          N.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Un), { key: 1 }))
        ], 42, Sr)), [
          [vShow, !unref($)("time")]
        ]),
        createVNode(Transition, {
          name: unref(R)(ee.value),
          css: unref(E)
        }, {
          default: withCtx(() => {
            var q;
            return [
              ee.value || N.timePicker ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "dp__overlay",
                ref_key: "overlayRef",
                ref: U,
                tabindex: "0"
              }, [
                createElementVNode("div", Pr, [
                  N.$slots["time-picker-overlay"] ? renderSlot(N.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e.hours,
                    minutes: e.minutes,
                    seconds: e.seconds,
                    setHours: P,
                    setMinutes: y,
                    setSeconds: I
                  }) : createCommentVNode("", true),
                  N.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Nr, [
                    (openBlock(true), createElementBlock(Fragment$1, null, renderList(unref(L), (_, T) => withDirectives((openBlock(), createBlock(Cr, mergeProps({ key: T }, {
                      ...N.$props,
                      order: T,
                      hours: _.hours,
                      minutes: _.minutes,
                      seconds: _.seconds,
                      closeTimePickerBtn: d.value,
                      disabled: T === 0 ? N.fixedStart : N.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: M,
                      "onUpdate:hours": (u) => P(oe(u, T, "hours")),
                      "onUpdate:minutes": (u) => y(oe(u, T, "minutes")),
                      "onUpdate:seconds": (u) => I(oe(u, T, "seconds")),
                      onMounted: W,
                      onOverlayClosed: W
                    }), createSlots({ _: 2 }, [
                      renderList(unref(Q), (u, l) => ({
                        name: u,
                        fn: withCtx((v) => [
                          renderSlot(N.$slots, u, normalizeProps(guardReactiveProps(v)))
                        ])
                      }))
                    ]), 1040, ["onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, T === 0 ? true : unref(V)]
                    ])), 128))
                  ])),
                  N.timePicker ? createCommentVNode("", true) : withDirectives((openBlock(), createElementBlock("div", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: d,
                    class: normalizeClass(unref(x)),
                    role: "button",
                    "aria-label": (q = unref(O).ariaLabels) == null ? void 0 : q.closeTimePicker,
                    tabindex: "0",
                    onKeydown: [
                      K[3] || (K[3] = withKeys((_) => C(false), ["enter"])),
                      K[4] || (K[4] = withKeys((_) => C(false), ["space"]))
                    ],
                    onClick: K[5] || (K[5] = (_) => C(false))
                  }, [
                    N.$slots["calendar-icon"] ? renderSlot(N.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    N.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ft), { key: 1 }))
                  ], 42, Rr)), [
                    [vShow, !unref($)("time")]
                  ])
                ])
              ], 512)) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
}), Or = (e, n) => {
  const { isDisabled: a, matchDate: t, getWeekFromDate: o } = Ve(n), c = ref(null), p = ref(w()), $ = (l) => {
    !l.current && n.hideOffsetDates || (c.value = l.value);
  }, O = () => {
    c.value = null;
  }, R = (l) => Array.isArray(e.value) && n.range && e.value[0] && c.value ? l ? Oe(c.value, e.value[0]) : Pe(c.value, e.value[0]) : true, E = (l, v) => {
    const m = () => e.value ? v ? e.value[0] || null : e.value[1] : null, k = e.value && Array.isArray(e.value) ? m() : null;
    return ke(w(l.value), k);
  }, A = (l) => {
    const v = Array.isArray(e.value) ? e.value[0] : null;
    return l ? !Pe(c.value || null, v) : true;
  }, d = (l, v = true) => (n.range || n.weekPicker) && Array.isArray(e.value) ? n.hideOffsetDates && !l.current ? false : ke(w(l.value), e.value[v ? 0 : 1]) : n.range ? E(l, v) && A(v) || ke(l.value, Array.isArray(e.value) ? e.value[0] : null) && R(v) : false, M = (l, v, m) => Array.isArray(e.value) && e.value[0] && e.value.length === 1 ? l ? false : m ? Oe(e.value[0], v.value) : Pe(e.value[0], v.value) : false, U = (l) => !e.value || n.hideOffsetDates && !l.current ? false : n.range ? n.modelAuto && Array.isArray(e.value) ? ke(l.value, e.value[0] ? e.value[0] : p.value) : false : n.multiDates && Array.isArray(e.value) ? e.value.some((v) => ke(v, l.value)) : ke(l.value, e.value ? e.value : p.value), V = (l) => {
    if (n.autoRange || n.weekPicker) {
      if (c.value) {
        if (n.hideOffsetDates && !l.current)
          return false;
        const v = addDays(c.value, +n.autoRange), m = o(w(c.value));
        return n.weekPicker ? ke(m[1], w(l.value)) : ke(v, w(l.value));
      }
      return false;
    }
    return false;
  }, ee = (l) => {
    if (n.autoRange || n.weekPicker) {
      if (c.value) {
        const v = addDays(c.value, +n.autoRange);
        if (n.hideOffsetDates && !l.current)
          return false;
        const m = o(w(c.value));
        return n.weekPicker ? Oe(l.value, m[0]) && Pe(l.value, m[1]) : Oe(l.value, c.value) && Pe(l.value, v);
      }
      return false;
    }
    return false;
  }, B = (l) => {
    if (n.autoRange || n.weekPicker) {
      if (c.value) {
        if (n.hideOffsetDates && !l.current)
          return false;
        const v = o(w(c.value));
        return n.weekPicker ? ke(v[0], l.value) : ke(c.value, l.value);
      }
      return false;
    }
    return false;
  }, L = (l) => zn(e.value, c.value, l.value), C = () => n.modelAuto && Array.isArray(n.internalModelValue) ? !!n.internalModelValue[0] : false, x = () => n.modelAuto ? Gn(n.internalModelValue) : true, Q = (l) => {
    if (Array.isArray(e.value) && e.value.length || n.weekPicker)
      return false;
    const v = n.range ? !d(l) && !d(l, false) : true;
    return !a(l.value) && !U(l) && !(!l.current && n.hideOffsetDates) && v;
  }, oe = (l) => n.range ? n.modelAuto ? C() && U(l) : false : U(l), P = (l) => n.highlight ? t(l.value, n.highlight) : false, y = (l) => a(l.value) && n.highlightDisabledDays === false, I = (l) => n.highlightWeekDays && n.highlightWeekDays.includes(l.value.getDay()), W = (l) => (n.range || n.weekPicker) && (!(n.multiCalendars > 0) || l.current) && x() && !(!l.current && n.hideOffsetDates) && !U(l) ? L(l) : false, N = (l) => ({
    dp__cell_offset: !l.current,
    dp__pointer: !n.disabled && !(!l.current && n.hideOffsetDates) && !a(l.value),
    dp__cell_disabled: a(l.value),
    dp__cell_highlight: !y(l) && (P(l) || I(l)) && !oe(l),
    dp__cell_highlight_active: !y(l) && (P(l) || I(l)) && oe(l),
    dp__today: !n.noToday && ke(l.value, p.value) && l.current
  }), K = (l) => ({
    dp__active_date: oe(l),
    dp__date_hover: Q(l)
  }), te = (l) => ({
    ...q(l),
    ..._(l),
    dp__range_between_week: W(l) && n.weekPicker
  }), q = (l) => ({
    dp__range_start: n.multiCalendars > 0 ? l.current && d(l) && x() : d(l) && x(),
    dp__range_end: n.multiCalendars > 0 ? l.current && d(l, false) && x() : d(l, false) && x(),
    dp__range_between: W(l) && !n.weekPicker,
    dp__date_hover_start: M(Q(l), l, true),
    dp__date_hover_end: M(Q(l), l, false)
  }), _ = (l) => ({
    ...q(l),
    dp__cell_auto_range: ee(l),
    dp__cell_auto_range_start: B(l),
    dp__cell_auto_range_end: V(l)
  }), T = (l) => n.range ? n.autoRange ? _(l) : n.modelAuto ? { ...K(l), ...q(l) } : q(l) : n.weekPicker ? te(l) : K(l);
  return {
    setHoverDate: $,
    clearHoverDate: O,
    getDayClassData: (l) => ({
      ...N(l),
      ...T(l),
      [n.dayClass ? n.dayClass(l.value) : ""]: true,
      [n.calendarCellClassName]: !!n.calendarCellClassName
    })
  };
}, Br = ["id", "onKeydown"], Yr = {
  key: 0,
  class: "dp__sidebar_left"
}, Vr = {
  key: 1,
  class: "dp__preset_ranges"
}, Lr = ["onClick"], Er = {
  key: 2,
  class: "dp__sidebar_right"
}, Fr = {
  key: 3,
  class: "dp__now_wrap"
}, Ur = /* @__PURE__ */ defineComponent({
  __name: "DatepickerMenu",
  props: {
    openOnTop: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    ...Qe
  },
  emits: [
    "close-picker",
    "select-date",
    "auto-apply",
    "time-update",
    "flow-step",
    "update-month-year",
    "invalid-select",
    "update:internal-model-value",
    "recalculate-position",
    "invalid-fixed-range",
    "tooltip-open",
    "tooltip-close"
  ],
  setup(e, { expose: n, emit: a }) {
    const t = e, { setMenuFocused: o, setShiftKey: c, control: p } = jn(), { getCalendarDays: $, defaults: O } = Ve(t), R = useSlots(), E = ref(null), A = reactive({
      timePicker: !!(!t.enableTimePicker || t.timePicker || t.monthPicker),
      monthYearInput: !!t.timePicker,
      calendar: false
    }), d = ref([]), M = ref([]), U = ref(null), V = ref(null), ee = ref(0), B = ref(false), L = ref(0);
    onMounted(() => {
      var j;
      B.value = true, !((j = t.presetRanges) != null && j.length) && !R["left-sidebar"] && !R["right-sidebar"] && je();
      const h2 = Me(V);
      if (h2 && !t.textInput && !t.inline && (o(true), y()), h2) {
        const $e = (Te) => {
          !t.monthYearComponent && !t.timePickerComponent && !Object.keys(R).length && Te.preventDefault(), Te.stopImmediatePropagation(), Te.stopPropagation();
        };
        h2.addEventListener("pointerdown", $e), h2.addEventListener("mousedown", $e);
      }
      window.addEventListener("resize", je);
    }), onUnmounted(() => {
      window.removeEventListener("resize", je);
    });
    const { arrowRight: C, arrowLeft: x, arrowDown: Q, arrowUp: oe } = Je(), P = (h2) => {
      h2 || h2 === 0 ? M.value[h2].triggerTransition(
        te.value(h2),
        q.value(h2)
      ) : M.value.forEach(
        (j, $e) => j.triggerTransition(te.value($e), q.value($e))
      );
    }, y = () => {
      const h2 = Me(V);
      h2 && h2.focus({ preventScroll: true });
    }, I = () => {
      var h2;
      (h2 = t.flow) != null && h2.length && L.value !== -1 && (L.value += 1, a("flow-step", L.value), b());
    }, W = () => {
      L.value = -1;
    }, {
      calendars: N,
      modelValue: K,
      month: te,
      year: q,
      time: _,
      updateTime: T,
      updateMonthYear: u,
      selectDate: l,
      getWeekNum: v,
      monthYearSelect: m,
      handleScroll: k,
      handleArrow: G,
      handleSwipe: Z,
      getMarker: se,
      selectCurrentDate: f,
      presetDateRange: r
    } = Vl(t, a, I, P, L), { setHoverDate: J, clearHoverDate: be, getDayClassData: we } = Or(K, t);
    watch(
      N,
      () => {
        t.openOnTop && setTimeout(() => {
          a("recalculate-position");
        }, 0);
      },
      { deep: true }
    );
    const He = rt(R, "calendar"), Xe = rt(R, "action"), le = rt(R, "timePicker"), re = rt(R, "monthYear"), ve = computed(() => t.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), ce = computed(() => Al(t.yearRange)), yt = computed(() => Cl(t.locale, t.monthNameFormat)), je = () => {
      const h2 = Me(E);
      h2 && (ee.value = h2.getBoundingClientRect().width);
    }, ht = computed(() => (h2) => $(te.value(h2), q.value(h2))), et = computed(
      () => O.value.multiCalendars > 0 && t.range ? [...Array(O.value.multiCalendars).keys()] : [0]
    ), gt = computed(
      () => (h2) => h2 === 1
    ), Ht = computed(() => t.monthPicker || t.timePicker || t.yearPicker), Wt = computed(
      () => ({
        dp__flex_display: O.value.multiCalendars > 0
      })
    ), Mt = computed(() => ({
      dp__instance_calendar: O.value.multiCalendars > 0
    })), pt = computed(() => ({
      dp__menu_disabled: t.disabled,
      dp__menu_readonly: t.readonly
    })), zt = computed(
      () => (h2) => Kt(ht, h2)
    ), jt = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !t.inline,
        dp__relative: t.inline,
        [t.menuClassName]: !!t.menuClassName
      })
    ), Kt = (h2, j) => h2.value(j).map(($e) => ({
      ...$e,
      days: $e.days.map((Te) => (Te.marker = se(Te), Te.classData = we(Te), Te))
    })), _t = (h2) => {
      h2.stopPropagation(), h2.stopImmediatePropagation();
    }, hn = () => {
      t.escClose && a("close-picker");
    }, gn = (h2, j = false) => {
      l(h2, j), t.spaceConfirm && a("select-date");
    }, Tt = (h2) => {
      var j;
      (j = t.flow) != null && j.length && (A[h2] = true, Object.keys(A).filter(($e) => !A[$e]).length || b());
    }, s = (h2, j, $e, Te, ...Ee) => {
      if (t.flow[L.value] === h2) {
        const X = Te ? j.value[0] : j.value;
        X && X[$e](...Ee);
      }
    }, b = () => {
      s("month", d, "toggleMonthPicker", true, true), s("year", d, "toggleYearPicker", true, true), s("calendar", U, "toggleTimePicker", false, false, true), s("time", U, "toggleTimePicker", false, true, true);
      const h2 = t.flow[L.value];
      (h2 === "hours" || h2 === "minutes" || h2 === "seconds") && s(h2, U, "toggleTimePicker", false, true, true, h2);
    }, z = (h2) => {
      if (t.arrowNavigation) {
        if (h2 === "up")
          return oe();
        if (h2 === "down")
          return Q();
        if (h2 === "left")
          return x();
        if (h2 === "right")
          return C();
      } else
        h2 === "left" || h2 === "up" ? G("left", 0, h2 === "up") : G("right", 0, h2 === "down");
    }, ne = (h2) => {
      c(h2.shiftKey), !t.disableMonthYearSelect && h2.code === "Tab" && h2.target.classList.contains("dp__menu") && p.value.shiftKeyInMenu && (h2.preventDefault(), h2.stopImmediatePropagation(), a("close-picker"));
    };
    return n({
      updateMonthYear: u
    }), (h2, j) => {
      var $e;
      return openBlock(), createBlock(Transition, {
        appear: "",
        name: ($e = unref(O).transitions) == null ? void 0 : $e.menuAppear,
        mode: "out-in",
        css: !!h2.transitions
      }, {
        default: withCtx(() => {
          var Te, Ee;
          return [
            createElementVNode("div", {
              id: h2.uid ? `dp-menu-${h2.uid}` : void 0,
              tabindex: "0",
              ref_key: "dpMenuRef",
              ref: V,
              role: "dialog",
              class: normalizeClass(unref(jt)),
              onMouseleave: j[14] || (j[14] = //@ts-ignore
              (...X) => unref(be) && unref(be)(...X)),
              onClick: _t,
              onKeydown: [
                withKeys(hn, ["esc"]),
                j[15] || (j[15] = withKeys(withModifiers((X) => z("left"), ["prevent"]), ["left"])),
                j[16] || (j[16] = withKeys(withModifiers((X) => z("up"), ["prevent"]), ["up"])),
                j[17] || (j[17] = withKeys(withModifiers((X) => z("down"), ["prevent"]), ["down"])),
                j[18] || (j[18] = withKeys(withModifiers((X) => z("right"), ["prevent"]), ["right"])),
                ne
              ]
            }, [
              (h2.disabled || h2.readonly) && h2.inline ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(unref(pt))
              }, null, 2)) : createCommentVNode("", true),
              !h2.inline && !h2.teleportCenter ? (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass(unref(ve))
              }, null, 2)) : createCommentVNode("", true),
              createElementVNode("div", {
                class: normalizeClass({
                  dp__menu_content_wrapper: ((Te = h2.presetRanges) == null ? void 0 : Te.length) || !!h2.$slots["left-sidebar"] || !!h2.$slots["right-sidebar"]
                })
              }, [
                h2.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", Yr, [
                  renderSlot(h2.$slots, "left-sidebar")
                ])) : createCommentVNode("", true),
                (Ee = h2.presetRanges) != null && Ee.length ? (openBlock(), createElementBlock("div", Vr, [
                  (openBlock(true), createElementBlock(Fragment$1, null, renderList(h2.presetRanges, (X, ut) => (openBlock(), createElementBlock("div", {
                    key: ut,
                    style: normalizeStyle(X.style || {}),
                    class: "dp__preset_range",
                    onClick: (ue) => unref(r)(X.range, !!X.slot)
                  }, [
                    X.slot ? renderSlot(h2.$slots, X.slot, {
                      key: 0,
                      presetDateRange: unref(r),
                      label: X.label,
                      range: X.range
                    }) : (openBlock(), createElementBlock(Fragment$1, { key: 1 }, [
                      createTextVNode(toDisplayString(X.label), 1)
                    ], 64))
                  ], 12, Lr))), 128))
                ])) : createCommentVNode("", true),
                createElementVNode("div", {
                  class: "dp__instance_calendar",
                  ref_key: "calendarWrapperRef",
                  ref: E,
                  role: "document"
                }, [
                  createElementVNode("div", {
                    class: normalizeClass(unref(Wt))
                  }, [
                    (openBlock(true), createElementBlock(Fragment$1, null, renderList(unref(et), (X, ut) => (openBlock(), createElementBlock("div", {
                      key: X,
                      class: normalizeClass(unref(Mt))
                    }, [
                      !h2.disableMonthYearSelect && !h2.timePicker ? (openBlock(), createBlock(resolveDynamicComponent(h2.monthYearComponent ? h2.monthYearComponent : br), mergeProps({
                        key: 0,
                        ref_for: true,
                        ref: (ue) => {
                          ue && (d.value[ut] = ue);
                        },
                        months: unref(yt),
                        years: unref(ce),
                        month: unref(te)(X),
                        year: unref(q)(X),
                        instance: X,
                        "internal-model-value": e.internalModelValue
                      }, h2.$props, {
                        onMount: j[0] || (j[0] = (ue) => Tt("monthYearInput")),
                        onResetFlow: W,
                        onUpdateMonthYear: (ue) => unref(u)(X, ue),
                        onMonthYearSelect: unref(m),
                        onOverlayClosed: y
                      }), createSlots({ _: 2 }, [
                        renderList(unref(re), (ue, Xn) => ({
                          name: ue,
                          fn: withCtx((xt) => [
                            renderSlot(h2.$slots, ue, normalizeProps(guardReactiveProps(xt)))
                          ])
                        }))
                      ]), 1040, ["months", "years", "month", "year", "instance", "internal-model-value", "onUpdateMonthYear", "onMonthYearSelect"])) : createCommentVNode("", true),
                      createVNode(ir, mergeProps({
                        ref_for: true,
                        ref: (ue) => {
                          ue && (M.value[ut] = ue);
                        },
                        "specific-mode": unref(Ht),
                        "get-week-num": unref(v),
                        instance: X,
                        "mapped-dates": unref(zt)(X),
                        month: unref(te)(X),
                        year: unref(q)(X)
                      }, h2.$props, {
                        "flow-step": L.value,
                        "onUpdate:flowStep": j[1] || (j[1] = (ue) => L.value = ue),
                        onSelectDate: (ue) => unref(l)(ue, !unref(gt)(X)),
                        onHandleSpace: (ue) => gn(ue, !unref(gt)(X)),
                        onSetHoverDate: j[2] || (j[2] = (ue) => unref(J)(ue)),
                        onHandleScroll: (ue) => unref(k)(ue, X),
                        onHandleSwipe: (ue) => unref(Z)(ue, X),
                        onMount: j[3] || (j[3] = (ue) => Tt("calendar")),
                        onResetFlow: W,
                        onTooltipOpen: j[4] || (j[4] = (ue) => h2.$emit("tooltip-open", ue)),
                        onTooltipClose: j[5] || (j[5] = (ue) => h2.$emit("tooltip-close", ue))
                      }), createSlots({ _: 2 }, [
                        renderList(unref(He), (ue, Xn) => ({
                          name: ue,
                          fn: withCtx((xt) => [
                            renderSlot(h2.$slots, ue, normalizeProps(guardReactiveProps({ ...xt })))
                          ])
                        }))
                      ]), 1040, ["specific-mode", "get-week-num", "instance", "mapped-dates", "month", "year", "flow-step", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
                    ], 2))), 128))
                  ], 2),
                  createElementVNode("div", null, [
                    h2.$slots["time-picker"] ? renderSlot(h2.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(_), updateTime: unref(T) }))) : (openBlock(), createElementBlock(Fragment$1, { key: 1 }, [
                      h2.enableTimePicker && !h2.monthPicker && !h2.weekPicker ? (openBlock(), createBlock(resolveDynamicComponent(h2.timePickerComponent ? h2.timePickerComponent : Ir), mergeProps({
                        key: 0,
                        ref_key: "timePickerRef",
                        ref: U,
                        hours: unref(_).hours,
                        minutes: unref(_).minutes,
                        seconds: unref(_).seconds,
                        "internal-model-value": e.internalModelValue
                      }, h2.$props, {
                        onMount: j[6] || (j[6] = (X) => Tt("timePicker")),
                        "onUpdate:hours": j[7] || (j[7] = (X) => unref(T)(X)),
                        "onUpdate:minutes": j[8] || (j[8] = (X) => unref(T)(X, false)),
                        "onUpdate:seconds": j[9] || (j[9] = (X) => unref(T)(X, false, true)),
                        onResetFlow: W,
                        onOverlayClosed: y
                      }), createSlots({ _: 2 }, [
                        renderList(unref(le), (X, ut) => ({
                          name: X,
                          fn: withCtx((ue) => [
                            renderSlot(h2.$slots, X, normalizeProps(guardReactiveProps(ue)))
                          ])
                        }))
                      ]), 1040, ["hours", "minutes", "seconds", "internal-model-value"])) : createCommentVNode("", true)
                    ], 64))
                  ])
                ], 512),
                h2.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", Er, [
                  renderSlot(h2.$slots, "right-sidebar")
                ])) : createCommentVNode("", true),
                h2.showNowButton ? (openBlock(), createElementBlock("div", Fr, [
                  h2.$slots["now-button"] ? renderSlot(h2.$slots, "now-button", {
                    key: 0,
                    selectCurrentDate: unref(f)
                  }) : createCommentVNode("", true),
                  h2.$slots["now-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
                    key: 1,
                    type: "button",
                    role: "button",
                    class: "dp__now_button",
                    onClick: j[10] || (j[10] = //@ts-ignore
                    (...X) => unref(f) && unref(f)(...X))
                  }, toDisplayString(h2.nowButtonLabel), 1))
                ])) : createCommentVNode("", true)
              ], 2),
              !h2.autoApply || h2.keepActionRow ? (openBlock(), createBlock(resolveDynamicComponent(h2.actionRowComponent ? h2.actionRowComponent : Jl), mergeProps({
                key: 2,
                "menu-mount": B.value,
                "calendar-width": ee.value,
                "internal-model-value": e.internalModelValue
              }, h2.$props, {
                onClosePicker: j[11] || (j[11] = (X) => h2.$emit("close-picker")),
                onSelectDate: j[12] || (j[12] = (X) => h2.$emit("select-date")),
                onInvalidSelect: j[13] || (j[13] = (X) => h2.$emit("invalid-select"))
              }), createSlots({ _: 2 }, [
                renderList(unref(Xe), (X, ut) => ({
                  name: X,
                  fn: withCtx((ue) => [
                    renderSlot(h2.$slots, X, normalizeProps(guardReactiveProps({ ...ue })))
                  ])
                }))
              ]), 1040, ["menu-mount", "calendar-width", "internal-model-value"])) : createCommentVNode("", true)
            ], 42, Br)
          ];
        }),
        _: 3
      }, 8, ["name", "css"]);
    };
  }
}), Hr = void 0, an = () => {
}, Wr = (e) => getCurrentScope() ? (onScopeDispose(e), true) : false, zr = (e, n, a, t) => {
  if (!e)
    return an;
  let o = an;
  const c = watch(
    () => unref(e),
    ($) => {
      o(), $ && ($.addEventListener(n, a, t), o = () => {
        $.removeEventListener(n, a, t), o = an;
      });
    },
    { immediate: true, flush: "post" }
  ), p = () => {
    c(), o();
  };
  return Wr(p), p;
}, jr = (e, n, a, t = {}) => {
  const { window: o = Hr, event: c = "pointerdown" } = t;
  return o ? zr(o, c, ($) => {
    const O = Me(e), R = Me(n);
    !O || !R || O === $.target || $.composedPath().includes(O) || $.composedPath().includes(R) || a($);
  }, { passive: true }) : void 0;
}, Kr = /* @__PURE__ */ defineComponent({
  __name: "VueDatePicker",
  props: {
    ...Qe
  },
  emits: [
    "update:model-value",
    "text-submit",
    "closed",
    "cleared",
    "open",
    "focus",
    "blur",
    "internal-model-change",
    "recalculate-position",
    "flow-step",
    "update-month-year",
    "invalid-select",
    "invalid-fixed-range",
    "tooltip-open",
    "tooltip-close"
  ],
  setup(e, { expose: n, emit: a }) {
    const t = e, o = useSlots(), c = ref(false), p = toRef(t, "modelValue"), $ = toRef(t, "timezone"), O = ref(null), R = ref(null), E = ref(false), { setMenuFocused: A, setShiftKey: d } = jn(), { clearArrowNav: M } = Je(), { validateDate: U, isValidTime: V, defaults: ee } = Ve(t);
    onMounted(() => {
      I(t.modelValue), t.inline || (window.addEventListener("scroll", _), window.addEventListener("resize", T)), t.inline && (c.value = true);
    }), onUnmounted(() => {
      t.inline || (window.removeEventListener("scroll", _), window.removeEventListener("resize", T));
    });
    const B = rt(o, "all", t.presetRanges), L = rt(o, "input");
    watch(
      [p, $],
      () => {
        I(p.value);
      },
      { deep: true }
    );
    const { openOnTop: C, menuPosition: x, setMenuPosition: Q, setInitialPosition: oe } = Fl(
      O,
      R,
      a,
      t
    ), {
      inputValue: P,
      internalModelValue: y,
      parseExternalModelValue: I,
      emitModelValue: W,
      formatInputValue: N,
      checkBeforeEmit: K
    } = Ll(a, t, E), te = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: t.dark,
        dp__theme_light: !t.dark,
        dp__flex_display: t.inline,
        dp__flex_display_with_input: t.inlineWithInput
      })
    ), q = computed(() => t.dark ? "dp__theme_dark" : "dp__theme_light"), _ = () => {
      c.value && (t.closeOnScroll ? se() : t.autoPosition && Q());
    }, T = () => {
      c.value && Q();
    }, u = () => {
      !t.disabled && !t.readonly && (oe(), c.value = true, nextTick().then(() => {
        Q(), c.value && a("open");
      }), c.value || Z(), I(t.modelValue));
    }, l = () => {
      P.value = "", Z(), a("update:model-value", null), a("cleared"), se();
    }, v = () => {
      const re = y.value;
      return !re || !Array.isArray(re) && U(re) ? true : Array.isArray(re) ? re.length === 2 && U(re[0]) && U(re[1]) ? true : U(re[0]) : false;
    }, m = () => {
      K() && v() ? (W(), se()) : a("invalid-select", y.value);
    }, k = (re) => {
      W(), t.closeOnAutoApply && !re && se();
    }, G = (re = false) => {
      t.autoApply && V(y.value) && v() && (t.range && Array.isArray(y.value) ? (t.partialRange || y.value.length === 2) && k(re) : k(re));
    }, Z = () => {
      t.textInput || (y.value = null);
    }, se = () => {
      t.inline || (c.value && (c.value = false, A(false), d(false), M(), a("closed"), oe(), P.value && I(p.value)), Z(), R.value && R.value.focusInput());
    }, f = (re, ve) => {
      if (!re) {
        y.value = null;
        return;
      }
      y.value = re, ve && (m(), a("text-submit"));
    }, r = () => {
      t.autoApply && V(y.value) && W();
    }, J = () => c.value ? se() : u(), be = (re) => {
      y.value = re;
    }, we = computed(() => t.textInput && ee.value.textInputOptions.format), He = () => {
      we.value && (E.value = true, N()), a("focus");
    }, Xe = () => {
      we.value && (E.value = false, N()), a("blur");
    }, le = (re) => {
      O.value && O.value.updateMonthYear(0, {
        month: Nn(re.month),
        year: Nn(re.year)
      });
    };
    return jr(
      O,
      R,
      t.onClickOutside ? () => t.onClickOutside(v) : se
    ), n({
      closeMenu: se,
      selectDate: m,
      clearValue: l,
      openMenu: u,
      onScroll: _,
      formatInputValue: N,
      // exposed for testing purposes
      updateInternalModelValue: be,
      // modify internal modelValue
      setMonthYear: le
    }), (re, ve) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(unref(te))
    }, [
      createVNode(Gl, mergeProps({
        ref_key: "inputRef",
        ref: R,
        "is-menu-open": c.value,
        "input-value": unref(P),
        "onUpdate:inputValue": ve[0] || (ve[0] = (ce) => isRef(P) ? P.value = ce : null)
      }, re.$props, {
        onClear: l,
        onOpen: u,
        onSetInputDate: f,
        onSetEmptyDate: unref(W),
        onSelectDate: m,
        onToggle: J,
        onClose: se,
        onFocus: He,
        onBlur: Xe
      }), createSlots({ _: 2 }, [
        renderList(unref(L), (ce, yt) => ({
          name: ce,
          fn: withCtx((je) => [
            renderSlot(re.$slots, ce, normalizeProps(guardReactiveProps(je)))
          ])
        }))
      ]), 1040, ["is-menu-open", "input-value", "onSetEmptyDate"]),
      c.value ? (openBlock(), createBlock(Teleport, {
        key: 0,
        to: re.teleport,
        disabled: re.inline
      }, [
        c.value ? (openBlock(), createBlock(Ur, mergeProps({
          key: 0,
          ref_key: "dpMenuRef",
          ref: O,
          class: unref(q),
          style: unref(x),
          "open-on-top": unref(C)
        }, re.$props, {
          "internal-model-value": unref(y),
          "onUpdate:internalModelValue": ve[1] || (ve[1] = (ce) => isRef(y) ? y.value = ce : null),
          onClosePicker: se,
          onSelectDate: m,
          onAutoApply: G,
          onTimeUpdate: r,
          onFlowStep: ve[2] || (ve[2] = (ce) => re.$emit("flow-step", ce)),
          onUpdateMonthYear: ve[3] || (ve[3] = (ce) => re.$emit("update-month-year", ce)),
          onInvalidSelect: ve[4] || (ve[4] = (ce) => re.$emit("invalid-select", unref(y))),
          onInvalidFixedRange: ve[5] || (ve[5] = (ce) => re.$emit("invalid-fixed-range", ce)),
          onRecalculatePosition: unref(Q),
          onTooltipOpen: ve[6] || (ve[6] = (ce) => re.$emit("tooltip-open", ce)),
          onTooltipClose: ve[7] || (ve[7] = (ce) => re.$emit("tooltip-close", ce))
        }), createSlots({ _: 2 }, [
          renderList(unref(B), (ce, yt) => ({
            name: ce,
            fn: withCtx((je) => [
              renderSlot(re.$slots, ce, normalizeProps(guardReactiveProps({ ...je })))
            ])
          }))
        ]), 1040, ["class", "style", "open-on-top", "internal-model-value", "onRecalculatePosition"])) : createCommentVNode("", true)
      ], 8, ["to", "disabled"])) : createCommentVNode("", true)
    ], 2));
  }
}), Zn = /* @__PURE__ */ (() => {
  const e = Kr;
  return e.install = (n) => {
    n.component("Vue3DatePicker", e);
  }, e;
})(), xr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Zn
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(xr).forEach(([e, n]) => {
  e !== "default" && (Zn[e] = n);
});
const vue_datepicker_65xHnOJJH3 = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("date-picker", Zn);
});
const vee_validate_K3WwmJMPDb = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  defineRule("required", (value) => {
    if (!value || !value.length) {
      return "This field is required";
    }
    return true;
  });
  defineRule("email", (value) => {
    if (!value || !value.length) {
      return true;
    }
    if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value)) {
      return "This field must be a valid email";
    }
    return true;
  });
});
const vee_validate_rules_WAudwGNGnr = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  defineRule("required", (value) => {
    if (!value || !value.length) {
      return "This field is required";
    }
    return true;
  });
  defineRule("email", (value) => {
    if (!value || !value.length) {
      return true;
    }
    if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value)) {
      return "This field must be a valid email";
    }
    return true;
  });
});
const _plugins = [
  plugin_vue3_A0OWXRrUgq,
  components_plugin_KR1HBZs4kY,
  unhead_KgADcZ0jPj,
  router_jmwsqit4Rs,
  plugin_1doCGnr5OF,
  vue_datepicker_65xHnOJJH3,
  vee_validate_K3WwmJMPDb,
  vee_validate_rules_WAudwGNGnr
];
function useWindowSize() {
  const width = ref(0);
  const height = ref(0);
  onUnmounted(() => {
  });
  return { width, height };
}
const _imports_0$1 = "" + __buildAssetsURL("logo.e1e7add7.png");
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$3 = {
  setup() {
    const isMenuVisible = ref(false);
    const { width } = useWindowSize();
    const isMobile = computed(() => width.value < 768);
    const isDesktop = computed(() => width.value >= 768);
    const toggleMenu = () => {
      isMenuVisible.value = !isMenuVisible.value;
    };
    return {
      isMenuVisible,
      toggleMenu,
      isMobile,
      isDesktop
    };
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$1;
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "menu" }, _attrs))} data-v-1ce28607><nav class="burger-menu" data-v-1ce28607>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<img${ssrRenderAttr("src", _imports_0$1)} data-v-1ce28607${_scopeId}>`);
      } else {
        return [
          createVNode("img", { src: _imports_0$1 })
        ];
      }
    }),
    _: 1
  }, _parent));
  if ($setup.isMobile) {
    _push(`<button class="burger-btn" data-v-1ce28607><span data-v-1ce28607></span><span data-v-1ce28607></span><span data-v-1ce28607></span></button>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.isDesktop || $setup.isMenuVisible) {
    _push(`<div class="menu-items" data-v-1ce28607><ul data-v-1ce28607><li data-v-1ce28607>`);
    _push(ssrRenderComponent(_component_NuxtLink, { to: "/flota" }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`Flota`);
        } else {
          return [
            createTextVNode("Flota")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</li><li data-v-1ce28607>`);
    _push(ssrRenderComponent(_component_NuxtLink, { to: "/sucursales" }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`Sucursales`);
        } else {
          return [
            createTextVNode("Sucursales")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</li><li data-v-1ce28607><a href="#" data-v-1ce28607>Corporativo</a><ul class="dropdown" aria-label="submenu" data-v-1ce28607><li data-v-1ce28607>`);
    _push(ssrRenderComponent(_component_NuxtLink, { to: "/paginas/operativo" }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`Leasing Operativo`);
        } else {
          return [
            createTextVNode("Leasing Operativo")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</li><li data-v-1ce28607>`);
    _push(ssrRenderComponent(_component_NuxtLink, { to: "/paginas/corporativo" }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`Planes Corporativos`);
        } else {
          return [
            createTextVNode("Planes Corporativos")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</li></ul></li><li data-v-1ce28607>`);
    _push(ssrRenderComponent(_component_NuxtLink, { to: "/clientes" }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`Maneja tu Reserva`);
        } else {
          return [
            createTextVNode("Maneja tu Reserva")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</li><li data-v-1ce28607><button data-v-1ce28607>EN</button> | <button data-v-1ce28607>ES</button></li></ul></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</nav></header>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TheNavigation.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-1ce28607"]]);
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a2;
    return ((_a2 = route.params[r.slice(1)]) == null ? void 0 : _a2.toString()) || "";
  });
};
const generateRouteKey = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a2;
    return ((_a2 = m.components) == null ? void 0 : _a2.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const Fragment = /* @__PURE__ */ defineComponent({
  name: "FragmentWrapper",
  setup(_props, { slots }) {
    return () => {
      var _a2;
      return (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
    };
  }
});
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? h(component, props === true ? {} : props, slots) : h(Fragment, {}, slots) };
};
const __nuxt_component_1 = /* @__PURE__ */ defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(routeProps, props.pageKey);
          const done = nuxtApp.deferHydration();
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          return _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive,
              h(Suspense, {
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).finally(done));
                }
              }, { default: () => h(RouteProvider, { key, routeProps, pageKey: key, hasTransition }) })
            )
          ).default();
        }
      });
    };
  }
});
function _toArray(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
}
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: _toArray(prop.onAfterLeave)
  }));
  return defu(..._props);
}
const RouteProvider = /* @__PURE__ */ defineComponent({
  name: "RouteProvider",
  // TODO: Type props
  // eslint-disable-next-line vue/require-prop-types
  props: ["routeProps", "pageKey", "hasTransition"],
  setup(props) {
    const previousKey = props.pageKey;
    const previousRoute = props.routeProps.route;
    const route = {};
    for (const key in props.routeProps.route) {
      route[key] = computed(() => previousKey === props.pageKey ? props.routeProps.route[key] : previousRoute[key]);
    }
    provide("_route", reactive(route));
    return () => {
      return h(props.routeProps.Component);
    };
  }
});
const _imports_0 = "" + __buildAssetsURL("instagram.3347813e.svg");
const _imports_1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAYAAACKAxD9AAAACXBIWXMAABcRAAAXEQHKJvM/AAAG6UlEQVR4nO2d4XHbOBCFcTf5b3ZwSgWWK7BSQZQKzq4gugqidOBUcFIHVgWRKzi5A6sDsQJnqFne8QSAAkAA3AXfN8OxR5RskXhc7AKLxW/v7+8KgN8nfwfAGQgBnIEQwBkIAZz5UPBtWCilZnTMlVIV/f6H9k47L3TmoJQ6KaX2Sqk3OoqilKihooZvj1vtHXGpSRTtcch9wbGRLITmKX/I1PDXaIXxTMfpyvvZIU0IjWlfKaWWniY+NzsSxIbxd/wfUoTwQMe9doY3NYnhibtfwVkIFTX+ivnT78qWRLHn+OU4CqGixm+OG+2sfJpIZM1NENyE8EA3qQQLcI0tXSuLLoOLEObUj0rzAYZS03Wvx/4iYwuhopvwVTszLY5kDUfrLsYcYl7QQMzURaCoK/xJ1qHSzmZgLCGs6cKn4Av48JWswjz3P87dNVQ00DI1X8CXmqKmbANSOYUwJ7WXGBKmYku+Q3JydQ0PEEEQf9J9S+435LAIjQj+1l4FPrySc51sMiu1RVhDBFG4Te1EprQIGzJtIB51J+yOSiqLsIYIknBDlmEW+4+nsAjwCdIT3WeIbREggjzcxo4mYlqExpH5R3sVpGRH2VqDiWURKq4JF4XzOdbMZSyLcGCQQJqCmq5t30lpN6WzVxeh3azj0M0751MNqH2hoftgYgjhqbAZxLqTeJrCyu0TzLXUJLTgJJehC1wWBYngSGZWYjr6DQl3oZ1xZIiPUA01R4z4Tk/URuKaBOJ+iL8wRAhPBUwiNfH4Hd1AqQLo8i10sClUCIsCRg63qYZrRyYohyFUCGJW8Fho5/lLsAKX3IfkMIQIQXq6ebZkjxHxzn30FUK7+EQqr8K/vys3vtfpKwTpq49K7Q5MrHysgo8QpFuD7wU6hn14WQUfIUi2BkcOq4lGwNkquApBujWYogiUj1VwFcJSsDWoCwh3h+AUIbkKQfITNWURKAr1r4rBRQgL4eMGUxeCchGCy+yj5MGXOlOksOjkHVwjeuKpA/f0f63T1C5CiJIKNRIps6akVXZZ0oijkWtdg2QnUSW0BnP6298E3Z9ey+4iBMmksAgV+R3S/Kbbvm6pdCGkYCU4P9Pann1CSJlsmYsUFqHXxDLHmsrWJwTrhyaMb1FvbljbFELww9rHCuHGtqIaQvCjhHtivAabEGaoblIsXhbB+GZQBMa2hRCmhzH0hRCmida+NiGMUv0TZENrX5sQNMWAotDa1yYERAxl42QRtDeB4tDa2CQEzWyA4tDa2CQEMEEgBHAGQgBnJOwNve1LusxMjPwGljmOpmJaC9pdhQufCivdp93wEXi5nIVE15AXzVvnAoSQFwgBnGGb4WQSAkrppsOYHTQCWhubhADSIcoiKFozCOLDJQNaKx9kE8KUSszkglPiq9a+NiFwGcApCU4Rg9a+EEI+OPkHWvvahKB5lWAwXCzCi/ZKjxA0xYDBcBGCsW37hHDUXgWhcFowZLT2NiEok2cJguHkHxjbtU8IRuWAILiEjtaaUhBCHrhYBGub9gnhwMRP+Elz+CFHbNaB34PLJifWrZf6hND7QSASa3teE4LVlABxvJrmGFyF8IwwshisNRaV4zS01ZwAUfS2o4sQUMtYPru+bkE5CuFgG58GYujtFlyFoGAVRHN0cfp9hACnUSZOe2345CxeNS+AHc671/gIYYNcRnE4P7w+QjjBKoiiTiUERf0NfAUZrHw2Ow3dGxrw5ugb6YUIYYNxBfZk2S1eTWSjbansQiYLQ4VwoL2WAS/q0I1Fhqx9XNPUJuBD8G74QxfBSt7WpjR2Q2aKhwqh6SL+0l4FuTkOfShjLIt/ooJXYBxq2r0tqEtoiVUfYQV/YTRWthR1H2IJ4USqxFxEXn7EShGIWTHljRZyQAx52MYcz4ldOueASCILr7Hvc4oaSk0I86i9CmLxmmIJXapiWhuIIQmtCAZFCCZSVlWDGOKSTAQqQ3m9DdVShgM5jG1KEahMdRb3iCYGsR0yh+BKroKbB1oajkEnPx5zRWE5K6+eqI7QD+0MuKSZO7jLuZ5kjBK8zSDIF3QVVnb0wGQtXTRWLeZnulikvP1HTTO5gyeQQhizKHc7JP0I6/CvFRhtuQCH6uwbciSnOJV9pG5yaat/mAsuZfpP5B3fTaS7qCnnc8al/gS3/RoO1F18KlQQXQGwWh/CdeOOfWGCuBRAdmfwGtx3cGkF8ZHGH6Q5lS/kDFdcBdAiZSufNxp/qMi52mnv4MORnv6PJGIRRUYk7AR7yTMdFd3oJf0cc5ucF/pOe6k1rCUKoeXUEYWiOHxOomh+3mqfiENbz3jfaXi2Jt8V05bAYIJguz9wBkIAZyAEcAZCAEoppX4BGxWJRISub6IAAAAASUVORK5CYII=";
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$1;
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "footer" }, _attrs))} data-v-3906dc64><section data-v-3906dc64><h3 data-v-3906dc64>Contacto</h3><p data-v-3906dc64> Reservaciones: (507) 260-0000 <br data-v-3906dc64> Asistencia 24 H: (507) 204-9550<br data-v-3906dc64> Whatsapp: (507) 6768-9626 </p></section><section data-v-3906dc64><nav data-v-3906dc64><h3 data-v-3906dc64>Servicios</h3><p data-v-3906dc64>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/paginas/coberturas" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Coberturas`);
      } else {
        return [
          createTextVNode("Coberturas")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/paginas/requisitos" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Requisitos`);
      } else {
        return [
          createTextVNode("Requisitos")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/vacantes" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Bolsa de Trabajo`);
      } else {
        return [
          createTextVNode("Bolsa de Trabajo")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</p></nav></section><section data-v-3906dc64><h3 data-v-3906dc64>Soporte</h3><p data-v-3906dc64>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/paginas/reembolso" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Politica de Reembolso`);
      } else {
        return [
          createTextVNode("Politica de Reembolso")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/paginas/tyc" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Términos y Condiciones`);
      } else {
        return [
          createTextVNode("Términos y Condiciones")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/paginas/privacidad" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Política de Privacidad`);
      } else {
        return [
          createTextVNode("Política de Privacidad")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</p></section><section class="sociales" data-v-3906dc64><h3 data-v-3906dc64>Siguenos en</h3><span data-v-3906dc64>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "https://www.instagram.com/hertzpanama/",
    taget: "_blank"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<img class="social"${ssrRenderAttr("src", _imports_0)} data-v-3906dc64${_scopeId}>`);
      } else {
        return [
          createVNode("img", {
            class: "social",
            src: _imports_0
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "https://www.facebook.com/HertzPanama",
    taget: "_blank"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<img class="social"${ssrRenderAttr("src", _imports_1)} data-v-3906dc64${_scopeId}>`);
      } else {
        return [
          createVNode("img", {
            class: "social",
            src: _imports_1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</span></section><p class="copyright" data-v-3906dc64>Copyright © 2023 Hertz Panamá</p></footer>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TheFooter.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-3906dc64"]]);
const _sfc_main$1 = {
  head() {
    return {
      bodyAttrs: {
        class: "reset-body"
      }
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_TheNavigation = __nuxt_component_0;
  const _component_NuxtPage = __nuxt_component_1;
  const _component_TheFooter = __nuxt_component_2;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_TheNavigation, null, null, _parent));
  _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
  _push(ssrRenderComponent(_component_TheFooter, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = /* @__PURE__ */ defineAsyncComponent(() => import('./error-component-86bc5f8f.mjs').then((r) => r.default || r));
    const IslandRenderer = /* @__PURE__ */ defineAsyncComponent(() => import('./island-renderer-4fa85b10.mjs').then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = callWithNuxt(nuxtApp, showError, [err]);
        onServerPrefetch(() => p);
        return false;
      }
    });
    const { islandContext } = nuxtApp.ssrContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RootComponent = _sfc_main;
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(RootComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.hooks.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { _export_sfc as _, __nuxt_component_0$1 as a, useDirectus as b, createError as c, defineStore as d, entry$1 as default, useRouter as e, useHead as f, useRoute as u };
//# sourceMappingURL=server.mjs.map
