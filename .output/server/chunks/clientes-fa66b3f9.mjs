import { b as buildAssetsURL } from './renderer.mjs';
import { _ as _export_sfc, a as __nuxt_component_0$2 } from './server.mjs';
import { unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { u as usePedidoStore } from './pedido-45937ac8.mjs';
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
import 'unctx';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'cookie-es';
import 'date-fns';
import 'vee-validate';
import 'yup';

const _imports_0 = "" + buildAssetsURL("paga2.08930589.png");
const _sfc_main = {
  __name: "clientes",
  __ssrInlineRender: true,
  setup(__props) {
    const storePedido = usePedidoStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<!--[--><figure data-v-439aafb8><img${ssrRenderAttr("src", _imports_0)} loading="lazy" data-v-439aafb8></figure><article class="pagar-pedido" data-v-439aafb8><h2 data-v-439aafb8> Para pagar o ver tu reserva, s\xF3lo ingresa el n\xFAmero de la reserva:</h2><form data-v-439aafb8><input type="text"${ssrRenderAttr("value", unref(storePedido).order_id)} required data-v-439aafb8>`);
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
      _push(`</form><p data-v-439aafb8> Al retirar el veh\xEDculo, al conductor principal se le bloquear\xE1 un dep\xF3sito de seguridad en su tarjeta de cr\xE9dito dependiendo de la categor\xEDa del auto. No se aceptar\xE1n tarjetas de d\xE9bito ni dinero en met\xE1lico. El personal de la oficina confirmar\xE1 la cantidad exacta del dep\xF3sito. Tarjetas aceptadas para el deposito: American Express, MasterCard y Visa. </p><em data-v-439aafb8> Importante: No se aceptan tarjetas virtuales, ni cualquier otro tipo de tarjeta que no tenga el estampado en relieve. </em></article><!--]-->`);
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

export { clientes as default };
//# sourceMappingURL=clientes-fa66b3f9.mjs.map
