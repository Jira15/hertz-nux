import { _ as __nuxt_component_0 } from "./ThePrompt-070786cc.js";
import { computed, unref, useSSRContext } from "vue";
import "hookable";
import "./index-e12b288f.js";
import { _ as _export_sfc, g as useLenguajesStore, b as useRoute, u as useDirectusItems, f as useHead } from "../server.mjs";
import "destr";
import "devalue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { g as getAssetURL } from "./get-asset-url-9698b8ce.js";
import "./TheSearch-6c2f2ca9.js";
import "vee-validate";
import "./pedido-45937ac8.js";
import "yup";
import "./moment-470c4d3d.js";
import "unhead";
import "ofetch";
import "#internal/nitro";
import "unctx";
import "@vue/devtools-api";
import "@unhead/ssr";
import "@unhead/shared";
import "vue-router";
import "h3";
import "ufo";
import "cookie-es";
import "ohash";
import "date-fns";
import "defu";
const _id__vue_vue_type_style_index_0_scoped_ddcc18ee_lang = "";
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
      title: route.params.id + " | Hertz Rent a car Panamá"
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
export {
  _id_ as default
};
//# sourceMappingURL=_id_-22740ea8.js.map
