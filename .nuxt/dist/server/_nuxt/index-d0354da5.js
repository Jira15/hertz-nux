import { _ as _export_sfc, u as useDirectusItems, a as __nuxt_component_0$1 } from "../server.mjs";
import { withAsyncContext, mergeProps, unref, withCtx, openBlock, createBlock, Fragment, renderList, useSSRContext, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { g as getAssetURL } from "./get-asset-url-9698b8ce.js";
import { VueperSlides, VueperSlide } from "vueperslides";
import { _ as __nuxt_component_1$1 } from "./TheSearch-6c2f2ca9.js";
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
import "./pedido-45937ac8.js";
import "yup";
const vueperslides = "";
const Banner_vue_vue_type_style_index_0_scoped_ee569185_lang = "";
const _sfc_main$3 = {
  __name: "Banner",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { getItems } = useDirectusItems();
    const banner = ([__temp, __restore] = withAsyncContext(() => getItems({ collection: "banner_hertz" })), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "banner",
        id: "nserv"
      }, _attrs))} data-v-ee569185>`);
      _push(ssrRenderComponent(unref(VueperSlides), {
        "slide-ratio": 1 / 2,
        "fixed-height": "350px",
        arrows: false,
        bullets: false,
        autoplay: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(banner), (banner2) => {
              _push2(ssrRenderComponent(unref(VueperSlide), {
                key: banner2.id,
                image: unref(getAssetURL)(banner2.banner)
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(banner), (banner2) => {
                return openBlock(), createBlock(unref(VueperSlide), {
                  key: banner2.id,
                  image: unref(getAssetURL)(banner2.banner)
                }, null, 8, ["image"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Banner.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-ee569185"]]);
const Promos_vue_vue_type_style_index_0_scoped_57231f88_lang = "";
const _sfc_main$2 = {
  __name: "Promos",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { getItems } = useDirectusItems();
    const promos = ([__temp, __restore] = withAsyncContext(() => getItems({ collection: "promos_hertz" })), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "promos" }, _attrs))} data-v-57231f88><!--[-->`);
      ssrRenderList(unref(promos), (promo) => {
        _push(`<article class="blocks" data-v-57231f88><figure data-v-57231f88><img${ssrRenderAttr("src", unref(getAssetURL)(promo.imagen))} data-v-57231f88></figure></article>`);
      });
      _push(`<!--]--></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Promos.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-57231f88"]]);
const _imports_0 = "" + __buildAssetsURL("corpo1.0779bdda.jpg");
const _imports_1 = "" + __buildAssetsURL("usa1.da7d731b.jpg");
const Content_vue_vue_type_style_index_0_scoped_dc20dcae_lang = "";
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$1;
  const _component_Promos = __nuxt_component_1;
  _push(`<!--[--><main class="home-content" data-v-dc20dcae><article class="servicios" data-v-dc20dcae><figure data-v-dc20dcae><img${ssrRenderAttr("src", _imports_0)} data-v-dc20dcae></figure><section data-v-dc20dcae><h2 data-v-dc20dcae>Conoce nuestros Planes Corporativos</h2><p data-v-dc20dcae>Contamos con planes corporativos que se ajustan a las necesidades de las Empresas, con una flota amplia, renovada y variada. </p>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/paginas/corporativo" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`VER MÁS`);
      } else {
        return [
          createTextVNode("VER MÁS")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</section></article><article class="servicios" data-v-dc20dcae><figure data-v-dc20dcae><img${ssrRenderAttr("src", _imports_1)} data-v-dc20dcae></figure><section data-v-dc20dcae><h2 data-v-dc20dcae> Reservas a Estados Unidos</h2><p data-v-dc20dcae>Ahora puedes hacer tu reserva desde Panamá y te mueves en Estados Unidos. </p>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    href: "https://wa.link/n4yy20",
    target: "_blank"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`RESERVACIONES`);
      } else {
        return [
          createTextVNode("RESERVACIONES")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</section></article></main>`);
  _push(ssrRenderComponent(_component_Promos, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Content.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-dc20dcae"]]);
const _sfc_main = {
  name: "IndexPage"
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Banner = __nuxt_component_0;
  const _component_TheSearch = __nuxt_component_1$1;
  const _component_Content = __nuxt_component_2;
  _push(`<main${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_Banner, null, null, _parent));
  _push(ssrRenderComponent(_component_TheSearch, null, null, _parent));
  _push(ssrRenderComponent(_component_Content, null, null, _parent));
  _push(`</main>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  index as default
};
//# sourceMappingURL=index-d0354da5.js.map
