import { _ as __nuxt_component_0 } from './ThePrompt-070786cc.mjs';
import { computed, unref, useSSRContext } from 'vue';
import { _ as _export_sfc, g as useLenguajesStore, b as useRoute, u as useDirectusItems, f as useHead } from './server.mjs';
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { g as getAssetURL } from './get-asset-url-9698b8ce.mjs';
import './TheSearch-6c2f2ca9.mjs';
import 'vee-validate';
import './pedido-45937ac8.mjs';
import 'yup';
import './moment-470c4d3d.mjs';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'destr';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'h3';
import 'ufo';
import 'cookie-es';
import 'ohash';
import 'date-fns';
import 'defu';
import './node-server.mjs';
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

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const storeLenguaje = useLenguajesStore();
    const route = useRoute();
    useDirectusItems();
    const pagina = computed(() => {
      return storeLenguaje.paginas;
    });
    useHead({
      title: route.params.id + " | Hertz Rent a car Panam\xE1"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ThePrompt = __nuxt_component_0;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_ThePrompt, null, null, _parent));
      _push(`<figure data-v-ddcc18ee><img${ssrRenderAttr("src", unref(getAssetURL)(unref(pagina).banner_hertz))} loading="lazy" data-v-ddcc18ee></figure><article class="page-content" data-v-ddcc18ee><h2 data-v-ddcc18ee>${ssrInterpolate(unref(pagina).titulo)}</h2><div class="format-content" data-v-ddcc18ee>${unref(pagina).contenido_hertz}</div></article><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/paginas/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ddcc18ee"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-22740ea8.mjs.map
