import { _ as _export_sfc, a as __nuxt_component_0 } from "../server.mjs";
import { unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { u as usePedidoStore } from "./pedido-45937ac8.js";
import "ofetch";
import "#internal/nitro";
import "hookable";
import "unctx";
import "@vue/devtools-api";
import "destr";
import "devalue";
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
import "yup";
const _imports_0 = "" + __buildAssetsURL("paga2.08930589.png");
const clientes_vue_vue_type_style_index_0_scoped_439aafb8_lang = "";
const _sfc_main = {
  __name: "clientes",
  __ssrInlineRender: true,
  setup(__props) {
    const storePedido = usePedidoStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[--><figure data-v-439aafb8><img${ssrRenderAttr("src", _imports_0)} loading="lazy" data-v-439aafb8></figure><article class="pagar-pedido" data-v-439aafb8><h2 data-v-439aafb8> Para pagar o ver tu reserva, sólo ingresa el número de la reserva:</h2><form data-v-439aafb8><input type="text"${ssrRenderAttr("value", unref(storePedido).order_id)} required data-v-439aafb8>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/orden/" + unref(storePedido).order_id
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button data-v-439aafb8${_scopeId}>Verificar</button>`);
          } else {
            return [
              createVNode("button", null, "Verificar")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</form><p data-v-439aafb8> Al retirar el vehículo, al conductor principal se le bloqueará un depósito de seguridad en su tarjeta de crédito dependiendo de la categoría del auto. No se aceptarán tarjetas de débito ni dinero en metálico. El personal de la oficina confirmará la cantidad exacta del depósito. Tarjetas aceptadas para el deposito: American Express, MasterCard y Visa. </p><em data-v-439aafb8> Importante: No se aceptan tarjetas virtuales, ni cualquier otro tipo de tarjeta que no tenga el estampado en relieve. </em></article><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/clientes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const clientes = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-439aafb8"]]);
export {
  clientes as default
};
//# sourceMappingURL=clientes-fa66b3f9.js.map
