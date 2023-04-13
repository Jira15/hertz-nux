import { d as defineStore, e as useRouter, u as useDirectusItems, _ as _export_sfc, b as useRoute, f as useHead } from "../server.mjs";
import { computed, withAsyncContext, mergeProps, unref, useSSRContext } from "vue";
import "hookable";
import "./index-e12b288f.js";
import "destr";
import "devalue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { g as getAssetURL } from "./get-asset-url-9698b8ce.js";
import { u as usePedidoStore } from "./pedido-45937ac8.js";
import { u as useActualizarStore } from "./actualizar-63b043bb.js";
import { u as usePaypalStore } from "./paypal-e560f6dd.js";
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
import "@paypal/paypal-js";
const useTarjetaStore = defineStore(
  "tarjeta",
  {
    state: () => ({
      orden: [],
      tarjeta: {
        ccnumber: "",
        ccexp: "",
        cvv: ""
      }
    }),
    actions: {
      async onSubmit() {
        const orderId = this.orden.pedidos_id;
        const bodyData = {
          "security_key": "MDYevJ49jVF5cA8zzZ3ySYaC5A5G7AdH",
          "first_name": this.orden.nombre,
          "last_name": this.orden.apellido,
          "address1": this.orden.retiro,
          "city": "Panama City",
          "state": "PTY",
          "zip": "12345",
          "shipping_first_name": this.orden.nombre,
          "shipping_last_name": this.orden.apellido,
          "shipping_address1": "987 State St",
          "shipping_city": "Panama City",
          "shipping_state": "PTY",
          "shipping_zip": "98765",
          "type": "sale",
          "amount": this.orden.total,
          "ccnumber": this.tarjeta.ccnumber,
          "ccexp": this.tarjeta.ccexp,
          "cvv": this.tarjeta.cvv
        };
        await $fetch("/api/tarjeta", {
          method: "POST",
          // headers: {  
          //     'Content-Type': 'application/x-www-form-urlencoded',
          // },
          params: bodyData,
          body: bodyData
        }).then(function(response) {
          const router = useRouter();
          let respuesta = response;
          let codigoAprobado = "response=1";
          let codigoTransaccionDeclinada = "response=2";
          let codigoErrorSistema = "response=3";
          if (respuesta.includes(codigoAprobado)) {
            const { updateItem } = useDirectusItems();
            console.log("Transacción Aprobada" + orderId);
            var status = { status: "Pagado" };
            updateItem({
              collection: "pedidos_hertz",
              id: orderId,
              item: status
            });
            router.push("/thanks/");
          } else if (respuesta.includes(codigoTransaccionDeclinada)) {
            console.log("Transacción Declinada");
            router.push("/error/");
          } else if (respuesta.includes(codigoErrorSistema)) {
            console.log("Error en el sistema");
            router.push("/error/");
          }
        });
      }
    }
  }
);
const _id__vue_vue_type_style_index_0_scoped_31a1e4b5_lang = "";
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    usePaypalStore();
    const storePedido = usePedidoStore();
    useActualizarStore();
    const storeTarjeta = useTarjetaStore();
    const { getItemById, getItems } = useDirectusItems();
    computed(() => {
      return storePedido.getPedido;
    });
    const route = useRoute();
    let filters = { order_id: route.params.id };
    const pedidos = ([__temp, __restore] = withAsyncContext(() => getItems({
      collection: "pedidos_hertz",
      params: {
        filter: filters
      }
    })), __temp = await __temp, __restore(), __temp);
    const pedido = pedidos[0];
    const fechaFormat = function(value) {
      if (value) {
        return hooks(value).format("DD MMM YYYY hh:mm A");
      }
    };
    const precioFormat = function(value) {
      if (value) {
        return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
      }
    };
    useHead({
      title: "Modificando Reserva | Hertz Rent a Car Panamá"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "manage-pedido" }, _attrs))} data-v-31a1e4b5><h2 data-v-31a1e4b5> Tu reserva: </h2><section class="info-pedido" data-v-31a1e4b5><header data-v-31a1e4b5><div data-v-31a1e4b5><h3 data-v-31a1e4b5>${ssrInterpolate(unref(pedido).carro.marca)} ${ssrInterpolate(unref(pedido).carro.modelo)}</h3><em data-v-31a1e4b5>o similar</em></div><figure data-v-31a1e4b5><img${ssrRenderAttr("src", unref(getAssetURL)(unref(pedido).carro.imagen))} loading="lazy" data-v-31a1e4b5></figure></header><section class="info-cliente" data-v-31a1e4b5><h6 data-v-31a1e4b5>Detalles:</h6><dl data-v-31a1e4b5><dt data-v-31a1e4b5> Nombre: </dt><dd data-v-31a1e4b5>${ssrInterpolate(unref(pedido).nombre)} ${ssrInterpolate(unref(pedido).apellido)}</dd></dl><dl data-v-31a1e4b5><dt data-v-31a1e4b5> Correo: </dt><dd data-v-31a1e4b5>${ssrInterpolate(unref(pedido).email)}</dd></dl><dl data-v-31a1e4b5><dt data-v-31a1e4b5> Telefono: </dt><dd data-v-31a1e4b5>${ssrInterpolate(unref(pedido).telefono)}</dd></dl><dl data-v-31a1e4b5><dt data-v-31a1e4b5> Licencia: </dt><dd data-v-31a1e4b5>${ssrInterpolate(unref(pedido).licencia)}</dd></dl></section><section class="info-sucursal" data-v-31a1e4b5><h6 data-v-31a1e4b5>Sucursal:</h6><dl data-v-31a1e4b5><dt data-v-31a1e4b5> Retiro:<br data-v-31a1e4b5>${ssrInterpolate(unref(pedido).retiro)}</dt><dd data-v-31a1e4b5> Retorno: <br data-v-31a1e4b5>${ssrInterpolate(unref(pedido).retorno)}</dd></dl><dl data-v-31a1e4b5><dt data-v-31a1e4b5> Día de Retiro: </dt><dd data-v-31a1e4b5>${ssrInterpolate(fechaFormat(unref(pedido).fecha_retiro))}</dd></dl><dl data-v-31a1e4b5><dt data-v-31a1e4b5> Día de Retorno: </dt><dd data-v-31a1e4b5>${ssrInterpolate(fechaFormat(unref(pedido).fecha_retorno))}</dd></dl><dl data-v-31a1e4b5><dt data-v-31a1e4b5> Drop-off </dt><dd data-v-31a1e4b5>${ssrInterpolate(precioFormat(unref(pedido).dropoff))}</dd></dl></section><section class="info-coberturas" data-v-31a1e4b5><h6 data-v-31a1e4b5>Modelo:</h6><dl data-v-31a1e4b5><dt data-v-31a1e4b5>${ssrInterpolate(unref(pedido).carro.tipo)} </dt><dd data-v-31a1e4b5>${ssrInterpolate(precioFormat(unref(pedido).carro.precio_thrifty * unref(storePedido).diffDias(unref(pedido).fecha_retorno, unref(pedido).fecha_retiro)))}</dd></dl><h6 data-v-31a1e4b5>Coberturas:</h6>`);
      if (unref(pedido).carro.tipo != "Sedan") {
        _push(`<dl data-v-31a1e4b5><dt data-v-31a1e4b5>${ssrInterpolate(unref(pedido).cobertura.nombre)}</dt><dd data-v-31a1e4b5>${ssrInterpolate(precioFormat(unref(pedido).cobertura.precio_2 * unref(storePedido).diffDias(unref(pedido).fecha_retorno, unref(pedido).fecha_retiro)))}</dd></dl>`);
      } else {
        _push(`<dl data-v-31a1e4b5><dt data-v-31a1e4b5>${ssrInterpolate(unref(pedido).cobertura.nombre)}</dt><dd data-v-31a1e4b5>${ssrInterpolate(precioFormat(unref(pedido).cobertura.precio * unref(storePedido).diffDias(unref(pedido).fecha_retorno, unref(pedido).fecha_retiro)))}</dd></dl>`);
      }
      _push(`<dl data-v-31a1e4b5><dt data-v-31a1e4b5> Asistencia Vial(ERA) </dt><dd data-v-31a1e4b5>${ssrInterpolate(precioFormat(unref(pedido).era * unref(storePedido).diffDias(unref(pedido).fecha_retorno, unref(pedido).fecha_retiro)))}</dd></dl><h6 data-v-31a1e4b5>Extras:</h6>`);
      if (unref(pedido).extras) {
        _push(`<dl class="extras" data-v-31a1e4b5><!--[-->`);
        ssrRenderList(unref(pedido).extras, (extra) => {
          _push(`<div data-v-31a1e4b5><dt data-v-31a1e4b5>${ssrInterpolate(extra.nombre)}</dt><dd data-v-31a1e4b5>${ssrInterpolate(precioFormat(extra.precio * unref(storePedido).diffDias(unref(pedido).fecha_retorno, unref(pedido).fecha_retiro)))}</dd></div>`);
        });
        _push(`<!--]--></dl>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h6 data-v-31a1e4b5>Sub-Total: </h6><dl data-v-31a1e4b5><dt data-v-31a1e4b5></dt><dd data-v-31a1e4b5> B/. ${ssrInterpolate(unref(pedido).sub_total)}</dd></dl>`);
      if (unref(pedido).impuesto_aeropuerto > 0) {
        _push(`<div data-v-31a1e4b5><h6 data-v-31a1e4b5>Impuesto de Aeropuerto: </h6><dl data-v-31a1e4b5><dt data-v-31a1e4b5></dt><dd data-v-31a1e4b5> B/. ${ssrInterpolate(unref(pedido).impuesto_aeropuerto)}</dd></dl></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h6 data-v-31a1e4b5>Impuesto: </h6><dl data-v-31a1e4b5><dt data-v-31a1e4b5></dt><dd data-v-31a1e4b5> B/. ${ssrInterpolate(unref(pedido).impuesto)}</dd></dl><h6 data-v-31a1e4b5>Total: </h6><dl data-v-31a1e4b5><dt data-v-31a1e4b5></dt><dd data-v-31a1e4b5> B/. ${ssrInterpolate(unref(pedido).total)}</dd></dl></section><footer data-v-31a1e4b5>${ssrInterpolate(unref(pedido).status)} `);
      if (unref(pedido).status === "Pagado") {
        _push(`<div class="status" data-v-31a1e4b5><h4 data-v-31a1e4b5>Esta reserva ya esta paga</h4></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(pedido).status === "Cancelado") {
        _push(`<div class="status" data-v-31a1e4b5><h4 data-v-31a1e4b5>El Pedido ha sido cancelado</h4></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(pedido).status === "Pendiente de Pago") {
        _push(`<section class="metodos" data-v-31a1e4b5><section class="tarjeta" data-v-31a1e4b5><p data-v-31a1e4b5><label data-v-31a1e4b5>Número de la Tarjeta</label><input type="text" placeholder="0000 0000 0000 000" name="ccnumber"${ssrRenderAttr("value", unref(storeTarjeta).tarjeta.ccnumber)} data-v-31a1e4b5></p><p data-v-31a1e4b5><label data-v-31a1e4b5>Fecha de Expiración</label><input type="text" placeholder="01 / 26" name="ccexp" class="ccexp"${ssrRenderAttr("value", unref(storeTarjeta).tarjeta.ccexp)} data-v-31a1e4b5></p><p data-v-31a1e4b5><label data-v-31a1e4b5>CCV</label><input type="text" placeholder="123" name="cvv" class="cvv"${ssrRenderAttr("value", unref(storeTarjeta).tarjeta.cvv)} data-v-31a1e4b5></p><button type="submit" data-v-31a1e4b5>Pagar</button></section><div id="paypal-button" data-v-31a1e4b5></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(pedido).status === "Pendiente de Pago") {
        _push(`<div class="status" data-v-31a1e4b5><button type="submit" data-v-31a1e4b5>Cancelar Reserva</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</footer></section></article>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/orden/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-31a1e4b5"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-6ce5c033.js.map
