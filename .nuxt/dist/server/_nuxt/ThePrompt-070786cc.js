import { u as useSearchStore, _ as __nuxt_component_1$1 } from "./TheSearch-6c2f2ca9.js";
import { a as __nuxt_component_0$1, b as useRoute } from "../server.mjs";
import { ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { u as usePedidoStore } from "./pedido-45937ac8.js";
import { h as hooks } from "./moment-470c4d3d.js";
import "hookable";
import "destr";
import "devalue";
const TheProgress_vue_vue_type_style_index_0_lang = "";
const _sfc_main$1 = {
  __name: "TheProgress",
  __ssrInlineRender: true,
  setup(__props) {
    const storeSearch = useSearchStore();
    const storePedido = usePedidoStore();
    function tiempoMinimoAntesDeReserva(date2, hours) {
      const newDate = new Date(date2);
      newDate.setHours(newDate.getHours() + hours);
      return newDate;
    }
    ref({
      hours: (/* @__PURE__ */ new Date()).getHours(),
      minutes: (/* @__PURE__ */ new Date()).getMinutes()
    });
    const date = /* @__PURE__ */ new Date();
    const tiempoMinimo = tiempoMinimoAntesDeReserva(date, 1);
    ref({ hours: tiempoMinimo.getHours(), minutes: 0 });
    const fechaFormat = function(value) {
      if (value) {
        return hooks(value).format("DD MMM  hh:mm");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "progreso" }, _attrs))}><div>`);
      if (unref(storeSearch).sucursal) {
        _push(`<section class="retiro"><h3>${ssrInterpolate(unref(storeSearch).sucursal.name)}</h3><p>${ssrInterpolate(fechaFormat(unref(storePedido).pedido.diaRetiro))}</p></section>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(storeSearch).sucursalRetorno) {
        _push(`<section class="retorno"><h3>${ssrInterpolate(unref(storeSearch).sucursalRetorno.name)}</h3><p>${ssrInterpolate(fechaFormat(unref(storePedido).pedido.diaRetorno))}</p></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="siguiente">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        onClick: ($event) => unref(storeSearch).searchIs = "TheSearch"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Cambiar `);
          } else {
            return [
              createTextVNode(" Cambiar ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></aside>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TheProgress.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main$1;
const ThePrompt_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  __name: "ThePrompt",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const storeSearch = useSearchStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TheSearch = __nuxt_component_1$1;
      const _component_TheProgress = __nuxt_component_1;
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "prompt" }, _attrs))}>`);
      if (unref(storeSearch).searchIs === "ThePrompt") {
        _push(`<header><h2> Haz Tu reserva </h2></header>`);
      } else if (unref(storeSearch).searchIs === "TheSearch") {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_TheSearch, null, null, _parent));
        _push(`</div>`);
      } else if (unref(storeSearch).searchIs === "TheProgress") {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_TheProgress, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</aside>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ThePrompt.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = _sfc_main;
export {
  __nuxt_component_0 as _
};
//# sourceMappingURL=ThePrompt-070786cc.js.map
