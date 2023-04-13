import { _ as _export_sfc, u as useDirectusItems, b as useRoute } from "../server.mjs";
import { withAsyncContext, mergeProps, unref, useSSRContext } from "vue";
import "hookable";
import "destr";
import "devalue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { g as getAssetURL } from "./get-asset-url-9698b8ce.js";
import { u as useActualizarStore } from "./actualizar-63b043bb.js";
import { u as usePedidoStore } from "./pedido-45937ac8.js";
import { h as hooks } from "./moment-470c4d3d.js";
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
import "yup";
const maneja_vue_vue_type_style_index_0_scoped_0e1450fb_lang = "";
const _sfc_main = {
  __name: "maneja",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { getItemById } = useDirectusItems();
    useActualizarStore();
    usePedidoStore();
    useRoute();
    const pedido = ([__temp, __restore] = withAsyncContext(() => getItemById({
      collection: "pedidos_hertz",
      id: "6d1ced9e-ae42-43a8-a736-a601f44c2d00"
    })), __temp = await __temp, __restore(), __temp);
    const fechaFormat = function(value) {
      if (value) {
        return hooks(value).format("DD MMM YYYY");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "manage-pedido" }, _attrs))} data-v-0e1450fb><h2 data-v-0e1450fb> Tu reserva: </h2><section class="info-pedido" data-v-0e1450fb><header data-v-0e1450fb><div data-v-0e1450fb><h3 data-v-0e1450fb>${ssrInterpolate(unref(pedido).carro.marca)} ${ssrInterpolate(unref(pedido).carro.marca)}</h3><em data-v-0e1450fb>o similar</em></div><figure data-v-0e1450fb><img${ssrRenderAttr("src", unref(getAssetURL)(unref(pedido).carro.imagen))} loading="lazy" data-v-0e1450fb></figure></header><section class="info-cliente" data-v-0e1450fb><h6 data-v-0e1450fb>Detalles:</h6><dl data-v-0e1450fb><dt data-v-0e1450fb> Nombre: </dt><dd data-v-0e1450fb>${ssrInterpolate(unref(pedido).nombre)} ${ssrInterpolate(unref(pedido).apellido)}</dd></dl><dl data-v-0e1450fb><dt data-v-0e1450fb> Correo: </dt><dd data-v-0e1450fb>${ssrInterpolate(unref(pedido).email)}</dd></dl><dl data-v-0e1450fb><dt data-v-0e1450fb> Telefono: </dt><dd data-v-0e1450fb>${ssrInterpolate(unref(pedido).telefono)}</dd></dl><dl data-v-0e1450fb><dt data-v-0e1450fb> Licencia: </dt><dd data-v-0e1450fb>${ssrInterpolate(unref(pedido).licencia)}</dd></dl><h6 data-v-0e1450fb>Modelo:</h6><dl data-v-0e1450fb><dt data-v-0e1450fb>${ssrInterpolate(unref(pedido).carro.tipo)}</dt><dd data-v-0e1450fb>${ssrInterpolate(unref(pedido).carro.precio_thrifty)}</dd></dl></section><section class="info-sucursal" data-v-0e1450fb><h6 data-v-0e1450fb>Sucursal:</h6><dl data-v-0e1450fb><dt data-v-0e1450fb> Retiro:<br data-v-0e1450fb>${ssrInterpolate(unref(pedido).retiro)}</dt><dd data-v-0e1450fb> Retorno: <br data-v-0e1450fb>${ssrInterpolate(unref(pedido).retorno)}</dd></dl><dl data-v-0e1450fb><dt data-v-0e1450fb> Día de Retiro: </dt><dd data-v-0e1450fb>${ssrInterpolate(fechaFormat(unref(pedido).fecha_retiro))} ${ssrInterpolate(unref(pedido).hora_retiro)}</dd></dl><dl data-v-0e1450fb><dt data-v-0e1450fb> Día de Retorno: </dt><dd data-v-0e1450fb>${ssrInterpolate(fechaFormat(unref(pedido).fecha_retorno))} ${ssrInterpolate(unref(pedido).hora_retorno)}</dd></dl></section><section class="info-coberturas" data-v-0e1450fb><h6 data-v-0e1450fb>Coberturas:</h6><dl data-v-0e1450fb><dt data-v-0e1450fb>${ssrInterpolate(unref(pedido).cobertura.nombre)}</dt><dd data-v-0e1450fb>${ssrInterpolate(unref(pedido).cobertura.precio)}</dd></dl><dl data-v-0e1450fb><dt data-v-0e1450fb> Asistencia Vial(ERA) </dt><dd data-v-0e1450fb>${ssrInterpolate(unref(pedido).era)}</dd></dl></section><footer data-v-0e1450fb><h6 data-v-0e1450fb>Sub-Total: </h6><dl data-v-0e1450fb><dt data-v-0e1450fb></dt><dd data-v-0e1450fb> B/. ${ssrInterpolate(unref(pedido).total)}</dd></dl> ${ssrInterpolate(unref(pedido).status)} `);
      if (unref(pedido).status === "Pagado") {
        _push(`<div class="status" data-v-0e1450fb><h4 data-v-0e1450fb>Esta reserva ya esta paga</h4></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(pedido).status === "Cancelado") {
        _push(`<div class="status" data-v-0e1450fb><h4 data-v-0e1450fb>El Pedido ha sido cancelado</h4></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(pedido).status === "Pendiente de Pago") {
        _push(`<div class="status" data-v-0e1450fb><button type="submit" data-v-0e1450fb>Cancelar Reserva</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</footer></section>`);
      if (unref(pedido).status === "Pendiente de Pago") {
        _push(`<section class="metodos" data-v-0e1450fb><h4 data-v-0e1450fb>Metodos de Pago</h4><section class="tarjeta" data-v-0e1450fb><p data-v-0e1450fb><label data-v-0e1450fb>CC Number</label><div id="demoCcnumber" data-v-0e1450fb></div></p><p data-v-0e1450fb><label data-v-0e1450fb>CVV Collect</label><div id="demoCvv" data-v-0e1450fb></div></p><p data-v-0e1450fb><label data-v-0e1450fb>MM/YY</label><div id="demoCcexp" data-v-0e1450fb></div></p></section><div id="paypal-button" data-v-0e1450fb></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</article>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/maneja.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const maneja = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0e1450fb"]]);
export {
  maneja as default
};
//# sourceMappingURL=maneja-4cbe9403.js.map
