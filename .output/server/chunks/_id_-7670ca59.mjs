import { _ as __nuxt_component_0, a as __nuxt_component_1 } from './Desglose-93ee481e.mjs';
import { d as defineStore, u as useDirectusItems, _ as _export_sfc, b as useRoute, a as __nuxt_component_0$2 } from './server.mjs';
import { useSSRContext, defineComponent, computed, ref, mergeProps, unref, withAsyncContext, withCtx, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderComponent, ssrRenderStyle, ssrLooseEqual } from 'vue/server-renderer';
import { u as usePedidoStore } from './pedido-45937ac8.mjs';
import './ac-18281470.mjs';
import './renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'h3';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'defu';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import './get-asset-url-9698b8ce.mjs';
import './moment-470c4d3d.mjs';
import 'vue-money-format';
import 'unctx';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'cookie-es';
import 'date-fns';
import 'vee-validate';
import 'yup';

const useCoberturasStore = defineStore("coberturas", {
  // a function that returns a fresh state - STATE ES COMO DATA
  state: () => ({
    coberturas: [
      { descripcion: true }
    ]
  }),
  getters: {
    getCoberturas: (state) => {
      return state.coberturas;
    }
  },
  actions: {
    async fetchCoberturas() {
      try {
        const { getItems } = useDirectusItems();
        var filters = { marca: "Hertz" };
        const coberturas = await getItems(
          {
            collection: "coberturas",
            params: {
              filter: filters
            }
          }
        );
        this.coberturas = coberturas;
      } catch (error) {
        console.error(error);
      }
    }
  }
});
const _sfc_main$2 = {
  __name: "Coberturas",
  __ssrInlineRender: true,
  setup(__props) {
    const storePedido = usePedidoStore();
    const storeCoberturas = useCoberturasStore();
    const coberturas = computed(() => {
      return storeCoberturas.coberturas;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "coberturas" }, _attrs))} data-v-c55a053b><h2 data-v-c55a053b>Coberturas</h2><section data-v-c55a053b><ul data-v-c55a053b><!--[-->`);
      ssrRenderList(unref(coberturas), (cobertura) => {
        _push(`<li data-v-c55a053b><article data-v-c55a053b><div data-v-c55a053b><header data-v-c55a053b><h3 data-v-c55a053b>${ssrInterpolate(cobertura.nombre)} <span data-v-c55a053b>i</span></h3></header><p style="${ssrRenderStyle(cobertura.descripcion === true ? null : { display: "none" })}" data-v-c55a053b>${ssrInterpolate(cobertura.explicacion)}</p></div>`);
        if (unref(storePedido).pedido.carro.tipo != "Sedan") {
          _push(`<footer data-v-c55a053b><h4 data-v-c55a053b>B/. ${ssrInterpolate(cobertura.precio_2)} / por d\xEDa</h4><input required type="radio" name="cobertura"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(storePedido).pedido.cobertura, cobertura)) ? " checked" : ""}${ssrRenderAttr("value", cobertura)} data-v-c55a053b></footer>`);
        } else {
          _push(`<footer data-v-c55a053b><h4 data-v-c55a053b>B/. ${ssrInterpolate(cobertura.precio)} / por d\xEDa</h4><input required type="radio" name="cobertura"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(storePedido).pedido.cobertura, cobertura)) ? " checked" : ""}${ssrRenderAttr("value", cobertura)} data-v-c55a053b></footer>`);
        }
        _push(`</article></li>`);
      });
      _push(`<!--]--><li data-v-c55a053b><article data-v-c55a053b><div data-v-c55a053b><header data-v-c55a053b><h3 data-v-c55a053b>Asistencia Vial(ERA)</h3></header><p data-v-c55a053b> ERA | ASISTENCIA VIAL Esta cobertura ofrece a EL ARRENDATARIO los siguientes servicios de asistencia en carretera sin cargo alguno: P\xE9rdida de llave del autom\xF3vil, servicio de gr\xFAa, reemplazo de neum\xE1tico, asistencia al quedarse sin combustible o sin bater\xEDa. El tiempo de respuesta por parte de LA ARRENDADORA est\xE1 sujeto al d\xEDa, hora y ubicaci\xF3n del incidente. </p></div><footer data-v-c55a053b><h4 data-v-c55a053b>B/. 3.99 / por d\xEDa</h4></footer></article></li></ul></section></main>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Coberturas.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-c55a053b"]]);
const useExtrasStore = defineStore("extras", {
  state: () => ({
    extras: []
  }),
  actions: {
    async fetchExtras() {
      try {
        const { getItems } = useDirectusItems();
        const extras = await getItems(
          { collection: "extras" }
        );
        this.extras = extras;
      } catch (error) {
        console.error(error);
      }
    },
    getExtras() {
      return this.extras;
    },
    getExtraById(id) {
      return this.extras.find((extra) => extra.id === id);
    }
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Extras",
  __ssrInlineRender: true,
  setup(__props) {
    const extrasStore = useExtrasStore();
    const pedidoStore = usePedidoStore();
    const extras = computed(() => {
      return extrasStore.extras;
    });
    ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "extras" }, _attrs))} data-v-b94ae302><h2 data-v-b94ae302>Extras</h2><section data-v-b94ae302><ul data-v-b94ae302><li data-v-b94ae302><!--[-->`);
      ssrRenderList(unref(extras), (extra) => {
        _push(`<article data-v-b94ae302><header data-v-b94ae302><h3 data-v-b94ae302>${ssrInterpolate(extra.nombre)}</h3></header><footer data-v-b94ae302><input type="checkbox"${ssrRenderAttr("value", extra)}${ssrIncludeBooleanAttr(Array.isArray(unref(pedidoStore).pedido.extras) ? ssrLooseContain(unref(pedidoStore).pedido.extras, extra) : unref(pedidoStore).pedido.extras) ? " checked" : ""} data-v-b94ae302><h4 data-v-b94ae302>B/.${ssrInterpolate(extra.precio)} / por d\xEDa</h4></footer></article>`);
      });
      _push(`<!--]--></li></ul></section></main>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Extras.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-b94ae302"]]);
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const storePedido = usePedidoStore();
    const route = useRoute();
    const { getItemById } = useDirectusItems();
    [__temp, __restore] = withAsyncContext(() => getItemById({
      collection: "flota",
      id: route.params.id
    })), __temp = await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CarroSeleccionado = __nuxt_component_0;
      const _component_Desglose = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_Coberturas = __nuxt_component_3;
      const _component_Extras = __nuxt_component_4;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "auto" }, _attrs))} data-v-d7274c79><article data-v-d7274c79>`);
      _push(ssrRenderComponent(_component_CarroSeleccionado, null, null, _parent));
      _push(ssrRenderComponent(_component_Desglose, null, null, _parent));
      _push(`</article>`);
      if (unref(storePedido).pedido.cobertura.precio > 0) {
        _push(`<span class="siguiente" data-v-d7274c79>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/flota/reserva/checkout/" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button data-v-d7274c79${_scopeId}>Siguiente</button>`);
            } else {
              return [
                createVNode("button", null, "Siguiente")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="addons" data-v-d7274c79>`);
      _push(ssrRenderComponent(_component_Coberturas, { rules: "required" }, null, _parent));
      _push(ssrRenderComponent(_component_Extras, null, null, _parent));
      _push(`</section></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/flota/[reserva]/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d7274c79"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-7670ca59.mjs.map
