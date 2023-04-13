import "./index-e12b288f.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { _ as _export_sfc, f as useHead } from "../server.mjs";
import "unhead";
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
const vacanteGracias_vue_vue_type_style_index_0_scoped_113349f3_lang = "";
const _sfc_main = {
  __name: "vacante-gracias",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Vacante solicitada | Hertz Rent a Car Panamá"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "gracias" }, _attrs))} data-v-113349f3><h2 data-v-113349f3>Gracias! hemos recibido tu formulario.</h2><p data-v-113349f3></p></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/vacante-gracias.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vacanteGracias = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-113349f3"]]);
export {
  vacanteGracias as default
};
//# sourceMappingURL=vacante-gracias-6f02de6b.js.map
