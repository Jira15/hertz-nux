import { _ as __nuxt_component_0 } from "./ThePrompt-070786cc.js";
import { u as useAutosStore, _ as _imports_0, a as __nuxt_component_1 } from "./promo-de413b6d.js";
import { _ as _export_sfc, b as useRoute, f as useHead, e as useRouter, a as __nuxt_component_0$1 } from "../server.mjs";
import { computed, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
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
const reserva_vue_vue_type_style_index_0_scoped_8f0b12d4_lang = "";
const _sfc_main = {
  __name: "reserva",
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
    const precioFormat = function(value) {
      if (value) {
        return value.toLocaleString("es-US", { style: "currency", currency: "USD" });
      }
    };
    const precioPrepago = function(value) {
      if (value) {
        let descuento = 5;
        const descuentoCalculado = value * (descuento / 100);
        const nuevoPrecio = value - descuentoCalculado;
        return nuevoPrecio.toLocaleString("es-US", { style: "currency", currency: "USD" });
      }
    };
    function checkBuscar(retiro, retorno, fechaRetiro, fechaRetorno, id) {
      const router = useRouter();
      if (retiro === void 0 || retorno === void 0 || fechaRetiro === void 0 || fechaRetorno === void 0) {
        storeSearch.mostrarWarning = true;
        console.log(storeSearch.mostrarWarning);
      } else {
        storeSearch.mostrarWarning = false;
        router.push("/flota/reserva/" + id);
      }
    }
    useHead({
      title: "Reservas | Hertz Rent a car Panamá"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ThePrompt = __nuxt_component_0;
      const _component_Filtros = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "auto" }, _attrs))} data-v-8f0b12d4>`);
      _push(ssrRenderComponent(_component_ThePrompt, null, null, _parent));
      _push(ssrRenderComponent(_component_Filtros, null, null, _parent));
      _push(`<div class="wrapper" data-v-8f0b12d4><!--[-->`);
      ssrRenderList(unref(autos), (auto) => {
        _push(`<article class="car-card" data-v-8f0b12d4>`);
        if (auto.status === "promocion") {
          _push(`<div class="promocion" data-v-8f0b12d4><img${ssrRenderAttr("src", _imports_0)} alt="Pasajeros" data-v-8f0b12d4></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<header class="title" data-v-8f0b12d4><h1 data-v-8f0b12d4>${ssrInterpolate(auto.marca)} ${ssrInterpolate(auto.modelo)} <em data-v-8f0b12d4>o similar</em></h1></header><figure class="modelo" data-v-8f0b12d4><img${ssrRenderAttr("src", unref(getAssetURL)(auto.imagen))} loading="lazy" data-v-8f0b12d4></figure><section class="specs" data-v-8f0b12d4>`);
        if (auto.pasajeros) {
          _push(`<div data-v-8f0b12d4><dt data-v-8f0b12d4><img${ssrRenderAttr("src", _imports_1)} alt="Pasajeros" data-v-8f0b12d4></dt><dd data-v-8f0b12d4>${ssrInterpolate(auto.pasajeros)}</dd></div>`);
        } else {
          _push(`<!---->`);
        }
        if (auto.puertas) {
          _push(`<div data-v-8f0b12d4><dt data-v-8f0b12d4><img${ssrRenderAttr("src", _imports_2)} alt="Puertas" data-v-8f0b12d4></dt><dd data-v-8f0b12d4>${ssrInterpolate(auto.puertas)}</dd></div>`);
        } else {
          _push(`<!---->`);
        }
        if (auto.maletas) {
          _push(`<div data-v-8f0b12d4><dt data-v-8f0b12d4><img${ssrRenderAttr("src", _imports_3)} alt="Maletas" data-v-8f0b12d4></dt><dd data-v-8f0b12d4>${ssrInterpolate(auto.maletas)}</dd></div>`);
        } else {
          _push(`<!---->`);
        }
        if (auto.transmision) {
          _push(`<div data-v-8f0b12d4><dt data-v-8f0b12d4><img${ssrRenderAttr("src", _imports_4)} alt="Transmision" data-v-8f0b12d4></dt><dd data-v-8f0b12d4>${ssrInterpolate(auto.transmision)}</dd></div>`);
        } else {
          _push(`<!---->`);
        }
        if (auto.motor) {
          _push(`<div data-v-8f0b12d4><dt data-v-8f0b12d4><img${ssrRenderAttr("src", _imports_5)} alt="Motor" data-v-8f0b12d4></dt><dd data-v-8f0b12d4>1200cc</dd></div>`);
        } else {
          _push(`<!---->`);
        }
        if (auto.combustible) {
          _push(`<div data-v-8f0b12d4><dt data-v-8f0b12d4><img${ssrRenderAttr("src", _imports_6)} alt="Gasolina" data-v-8f0b12d4></dt><dd data-v-8f0b12d4>${ssrInterpolate(auto.combustible)}</dd></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div data-v-8f0b12d4><dt data-v-8f0b12d4><img${ssrRenderAttr("src", _imports_7)} alt="ac" data-v-8f0b12d4></dt><dd data-v-8f0b12d4>A/C</dd></div></section>`);
        if (auto.status === "disponibilidad") {
          _push(`<section class="disponibilidad" data-v-8f0b12d4><section data-v-8f0b12d4><div data-v-8f0b12d4><em data-v-8f0b12d4>Por día</em><h4 data-v-8f0b12d4>${ssrInterpolate(precioFormat(auto.precio_hertz))}</h4></div><div data-v-8f0b12d4><em data-v-8f0b12d4>Prepago</em><h4 data-v-8f0b12d4>${ssrInterpolate(precioPrepago(auto.precio_hertz))}</h4></div></section>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "https://api.whatsapp.com/send?phone=50767689626",
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
          _push(`</section>`);
        } else {
          _push(`<!---->`);
        }
        if (auto.status === "published" || auto.status === "promocion") {
          _push(`<section class="precios" data-v-8f0b12d4><div data-v-8f0b12d4>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            onClick: ($event) => checkBuscar(unref(storeSearch).sucursal, unref(storeSearch).sucursalRetorno, unref(storeSearch).fechaRetiro, unref(storeSearch).fechaRetorno, auto.id)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Reservar <h4 data-v-8f0b12d4${_scopeId}>${ssrInterpolate(precioFormat(auto.precio_hertz))}</h4>`);
              } else {
                return [
                  createTextVNode(" Reservar "),
                  createVNode("h4", null, toDisplayString(precioFormat(auto.precio_hertz)), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><div data-v-8f0b12d4>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/flota/prepago/" + auto.id
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Reservar y pagar <h4 data-v-8f0b12d4${_scopeId}>${ssrInterpolate(precioPrepago(auto.precio_hertz))}</h4>`);
              } else {
                return [
                  createTextVNode(" Reservar y pagar "),
                  createVNode("h4", null, toDisplayString(precioPrepago(auto.precio_hertz)), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
          if (unref(storeSearch).mostrarWarning === true) {
            _push(`<section class="warning" data-v-8f0b12d4><strong data-v-8f0b12d4>Necesitas especificar la fecha y sucursal antes de continuar</strong></section>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="shape" data-v-8f0b12d4></div></article>`);
      });
      _push(`<!--]--></div></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reserva.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const reserva = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8f0b12d4"]]);
export {
  reserva as default
};
//# sourceMappingURL=reserva-80694857.js.map
