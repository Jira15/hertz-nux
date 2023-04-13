import { _ as _export_sfc, a as __nuxt_component_0 } from "../server.mjs";
import { mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
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
const error_vue_vue_type_style_index_0_scoped_be5202f6_lang = "";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<main${ssrRenderAttrs(mergeProps({ class: "error" }, _attrs))} data-v-be5202f6><h5 data-v-be5202f6> Ha ocurrido un error en su compra, esto se debe a una de las siguientes opciones: </h5><p data-v-be5202f6>La Tarjeta ha sido declinada</p><p data-v-be5202f6>Informacion erronea en la tarjeta</p>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/clientes" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Volver a pagina de pago`);
      } else {
        return [
          createTextVNode("Volver a pagina de pago")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</main>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const error = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-be5202f6"]]);
export {
  error as default
};
//# sourceMappingURL=error-d4356d7a.js.map
