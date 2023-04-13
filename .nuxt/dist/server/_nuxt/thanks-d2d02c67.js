import "./index-e12b288f.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import "./pedido-45937ac8.js";
import { _ as _export_sfc, f as useHead } from "../server.mjs";
import "unhead";
import "yup";
import "ofetch";
import "#internal/nitro";
import "hookable";
import "unctx";
import "@vue/devtools-api";
import "destr";
import "devalue";
import "@unhead/ssr";
import "@unhead/shared";
import "vue-router";
import "h3";
import "ufo";
import "cookie-es";
import "ohash";
import "date-fns";
import "vee-validate";
import "defu";
const thanks_vue_vue_type_style_index_0_scoped_084ad1ec_lang = "";
const _sfc_main = {
  __name: "thanks",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Gracias | Hertz Rent a Car Panamá"
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
export {
  thanks as default
};
//# sourceMappingURL=thanks-d2d02c67.js.map
