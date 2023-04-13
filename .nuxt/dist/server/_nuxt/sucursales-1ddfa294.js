import { _ as __nuxt_component_0 } from "./ThePrompt-070786cc.js";
import { _ as _export_sfc, f as useHead, a as __nuxt_component_0$1 } from "../server.mjs";
import { computed, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import "./index-e12b288f.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { a as useSucursalStore, u as useSearchStore } from "./TheSearch-6c2f2ca9.js";
import { g as getAssetURL } from "./get-asset-url-9698b8ce.js";
import { GoogleMap, Marker } from "vue3-google-map";
import "./pedido-45937ac8.js";
import "yup";
import "./moment-470c4d3d.js";
import "hookable";
import "destr";
import "devalue";
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
const sucursales_vue_vue_type_style_index_0_scoped_a1013b5b_lang = "";
const _sfc_main = {
  __name: "sucursales",
  __ssrInlineRender: true,
  setup(__props) {
    const storeSucursal = useSucursalStore();
    const storeSearch = useSearchStore();
    const sucursales2 = computed(() => {
      return storeSucursal.sucursales;
    });
    const sucursalABuscador = function(value) {
      storeSearch.sucursal = value;
      storeSearch.searchIs = "TheSearch";
    };
    useHead({
      title: "Sucursales | Hertz Rent a Car Panamá"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ThePrompt = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<main${ssrRenderAttrs(mergeProps({
        class: "sucursal",
        id: "prompt"
      }, _attrs))} data-v-a1013b5b>`);
      _push(ssrRenderComponent(_component_ThePrompt, null, null, _parent));
      _push(`<h2 data-v-a1013b5b>Sucursales</h2><div data-v-a1013b5b><!--[-->`);
      ssrRenderList(unref(sucursales2), (sucursal) => {
        _push(`<article data-v-a1013b5b><figure data-v-a1013b5b><img${ssrRenderAttr("src", unref(getAssetURL)(sucursal.imagen))} loading="lazy" data-v-a1013b5b></figure><section data-v-a1013b5b><h3 data-v-a1013b5b>${ssrInterpolate(sucursal.name)}</h3><p data-v-a1013b5b> Telefonos: ${ssrInterpolate(sucursal.telefono_1)} <br data-v-a1013b5b> ${ssrInterpolate(sucursal.telefono_2)}</p>`);
        if (sucursal.horario_apertura === 0 && sucursal.horario_apertura_domingo === 0) {
          _push(`<p data-v-a1013b5b> Abierto 24 horas </p>`);
        } else {
          _push(`<!---->`);
        }
        if (sucursal.horario_apertura != 24 && sucursal.horario_apertura != 0) {
          _push(`<p data-v-a1013b5b> Lunes a Viernes: ${ssrInterpolate(sucursal.horario_apertura)}:00 a ${ssrInterpolate(sucursal.horario_cierre)}:00 </p>`);
        } else {
          _push(`<!---->`);
        }
        if (sucursal.horario_apertura_sabado > 0 && sucursal.horario_cierre_sabado != 24) {
          _push(`<p data-v-a1013b5b> Sabados: ${ssrInterpolate(sucursal.horario_apertura_sabado)}:00 a ${ssrInterpolate(sucursal.horario_cierre_sabado)}:00 </p>`);
        } else {
          _push(`<!---->`);
        }
        if (sucursal.horario_apertura_sabado === 24) {
          _push(`<p data-v-a1013b5b> Sabados: Cerrados </p>`);
        } else {
          _push(`<!---->`);
        }
        if (sucursal.horario_apertura_domingo === 24) {
          _push(`<p data-v-a1013b5b> Domingos: Cerrados </p>`);
        } else {
          _push(`<!---->`);
        }
        if (sucursal.horario_apertura_domingo > 0 && sucursal.horario_apertura_domingo != 24) {
          _push(`<p data-v-a1013b5b> Domingos: ${ssrInterpolate(sucursal.horario_apertura_domingo)}:00 a ${ssrInterpolate(sucursal.horario_cierre_domingo)}:00 </p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section>`);
        if (sucursal.imagen) {
          _push(`<aside data-v-a1013b5b>`);
          _push(ssrRenderComponent(unref(GoogleMap), {
            "api-key": "AIzaSyB3lYFwl2_OLMyM71Je6JWd7yOyvv5T0yA",
            class: "mapa",
            center: { lat: sucursal.mapa.coordinates[1], lng: sucursal.mapa.coordinates[0] },
            zoom: 15
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(Marker), {
                  options: {
                    position: { lat: sucursal.mapa.coordinates[1], lng: sucursal.mapa.coordinates[0] }
                  }
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(Marker), {
                    options: {
                      position: { lat: sucursal.mapa.coordinates[1], lng: sucursal.mapa.coordinates[0] }
                    }
                  }, null, 8, ["options"])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</aside>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "#prompt",
          class: "verificar",
          onClick: ($event) => sucursalABuscador(sucursal)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Reservar Aqui `);
            } else {
              return [
                createTextVNode(" Reservar Aqui ")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</article>`);
      });
      _push(`<!--]--></div></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sucursales.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const sucursales = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a1013b5b"]]);
export {
  sucursales as default
};
//# sourceMappingURL=sucursales-1ddfa294.js.map
