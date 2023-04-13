import { _ as __nuxt_component_0 } from "./ThePrompt-070786cc.js";
import { u as useAutosStore, _ as _imports_0, a as __nuxt_component_1 } from "./promo-de413b6d.js";
import { _ as _export_sfc, b as useRoute, f as useHead, a as __nuxt_component_0$1 } from "../server.mjs";
import { computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import "hookable";
import "./index-e12b288f.js";
import "destr";
import "devalue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _imports_1, a as _imports_2, b as _imports_3, c as _imports_4, d as _imports_5, e as _imports_6, f as _imports_7 } from "./ac-18281470.js";
import { g as getAssetURL } from "./get-asset-url-9698b8ce.js";
import { u as useSearchStore } from "./TheSearch-6c2f2ca9.js";
import "./pedido-45937ac8.js";
import "yup";
import "./moment-470c4d3d.js";
import "ofetch";
import "#internal/nitro";
import "unctx";
import "@vue/devtools-api";
import "@unhead/ssr";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "h3";
import "ufo";
import "cookie-es";
import "ohash";
import "date-fns";
import "vee-validate";
import "defu";
const index_vue_vue_type_style_index_0_scoped_dd8a3ff3_lang = "";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const storeSearch = useSearchStore();
    const storeAutos = useAutosStore();
    computed(() => {
      return storeAutos.getAutos;
    });
    const autos = computed(() => {
      return storeAutos.autos;
    });
    useHead({
      title: "Flota | Hertz Rent a Car Panamá"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ThePrompt = __nuxt_component_0;
      const _component_Filtros = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<main${ssrRenderAttrs(mergeProps({
        class: "auto",
        id: "prompt"
      }, _attrs))} data-v-dd8a3ff3>`);
      _push(ssrRenderComponent(_component_ThePrompt, null, null, _parent));
      _push(`<h2 data-v-dd8a3ff3>Flota</h2>`);
      _push(ssrRenderComponent(_component_Filtros, null, null, _parent));
      _push(`<div class="wrapper" data-v-dd8a3ff3><!--[-->`);
      ssrRenderList(unref(autos), (auto) => {
        _push(`<article data-v-dd8a3ff3>`);
        if (auto.status === "promocion") {
          _push(`<div class="promocion" data-v-dd8a3ff3><img${ssrRenderAttr("src", _imports_0)} alt="Pasajeros" data-v-dd8a3ff3></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<figure data-v-dd8a3ff3><img${ssrRenderAttr("src", unref(getAssetURL)(auto.imagen))} loading="lazy" data-v-dd8a3ff3></figure><section data-v-dd8a3ff3><header data-v-dd8a3ff3><h3 data-v-dd8a3ff3>${ssrInterpolate(auto.marca)} ${ssrInterpolate(auto.modelo)}</h3><em data-v-dd8a3ff3>o similar</em></header><dl class="specs" data-v-dd8a3ff3>`);
        if (auto.pasajeros) {
          _push(`<div data-v-dd8a3ff3><dt data-v-dd8a3ff3><img${ssrRenderAttr("src", _imports_1)} alt="Pasajeros" data-v-dd8a3ff3></dt><dd data-v-dd8a3ff3>${ssrInterpolate(auto.pasajeros)}</dd></div>`);
        } else {
          _push(`<!---->`);
        }
        if (auto.puertas) {
          _push(`<div data-v-dd8a3ff3><dt data-v-dd8a3ff3><img${ssrRenderAttr("src", _imports_2)} alt="Puertas" data-v-dd8a3ff3></dt><dd data-v-dd8a3ff3>${ssrInterpolate(auto.puertas)}</dd></div>`);
        } else {
          _push(`<!---->`);
        }
        if (auto.maletas) {
          _push(`<div data-v-dd8a3ff3><dt data-v-dd8a3ff3><img${ssrRenderAttr("src", _imports_3)} alt="Maletas" data-v-dd8a3ff3></dt><dd data-v-dd8a3ff3>${ssrInterpolate(auto.maletas)}</dd></div>`);
        } else {
          _push(`<!---->`);
        }
        if (auto.transmision) {
          _push(`<div data-v-dd8a3ff3><dt data-v-dd8a3ff3><img${ssrRenderAttr("src", _imports_4)} alt="Transmision" data-v-dd8a3ff3></dt><dd data-v-dd8a3ff3>${ssrInterpolate(auto.transmision)}</dd></div>`);
        } else {
          _push(`<!---->`);
        }
        if (auto.motor) {
          _push(`<div data-v-dd8a3ff3><dt data-v-dd8a3ff3><img${ssrRenderAttr("src", _imports_5)} alt="Motor" data-v-dd8a3ff3></dt><dd data-v-dd8a3ff3>1200cc</dd></div>`);
        } else {
          _push(`<!---->`);
        }
        if (auto.combustible) {
          _push(`<div data-v-dd8a3ff3><dt data-v-dd8a3ff3><img${ssrRenderAttr("src", _imports_6)} alt="Gasolina" data-v-dd8a3ff3></dt><dd data-v-dd8a3ff3>${ssrInterpolate(auto.combustible)}</dd></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div data-v-dd8a3ff3><dt data-v-dd8a3ff3><img${ssrRenderAttr("src", _imports_7)} alt="ac" data-v-dd8a3ff3></dt><dd data-v-dd8a3ff3>A/C</dd></div></dl></section>`);
        if (auto.status === "disponibilidad") {
          _push(`<div class="disponibilidad" data-v-dd8a3ff3>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "https://api.whatsapp.com/send?phone=50766785406",
            target: "_blank"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Consulta disponibilidad `);
              } else {
                return [
                  createTextVNode(" Consulta disponibilidad ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (auto.status === "published" || auto.status === "promocion") {
          _push(`<div class="verificar" data-v-dd8a3ff3>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "#prompt",
            onClick: ($event) => unref(storeSearch).searchIs = "TheSearch"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Reservar `);
              } else {
                return [
                  createTextVNode(" Reservar ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</article>`);
      });
      _push(`<!--]--></div></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/flota/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dd8a3ff3"]]);
export {
  index as default
};
//# sourceMappingURL=index-491b2275.js.map
