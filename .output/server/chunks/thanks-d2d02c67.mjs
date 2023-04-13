import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc, f as useHead } from './server.mjs';
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
import 'vee-validate';
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
  __name: "thanks",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Gracias | Hertz Rent a Car Panam\xE1"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "gracias" }, _attrs))} data-v-084ad1ec><h2 data-v-084ad1ec>Gracias por tu reserva</h2><p data-v-084ad1ec>Tu Reserva esta siendo procesada pronto recibiras un correo con los detalles.</p></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/thanks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const thanks = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-084ad1ec"]]);

export { thanks as default };
//# sourceMappingURL=thanks-d2d02c67.mjs.map
