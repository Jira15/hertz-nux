import { _ as __nuxt_component_0, a as __nuxt_component_1 } from './Desglose-93ee481e.mjs';
import { ref, useSSRContext, computed, resolveComponent, mergeProps, unref, withCtx, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { u as usePedidoStore } from './pedido-45937ac8.mjs';
import { d as defineStore, u as useDirectusItems, _ as _export_sfc, e as useRouter } from './server.mjs';
import { useForm, Field, ErrorMessage } from 'vee-validate';
import { h as hooks } from './moment-470c4d3d.mjs';
import * as Yup from 'yup';
import axios from 'axios';
import qs from 'qs';
import { u as usePaypalStore } from './paypal-e560f6dd.mjs';
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
import 'vue-money-format';
import 'unctx';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'cookie-es';
import 'date-fns';
import '@paypal/paypal-js';

const checkoutSchema = Yup.object({
  nombre: Yup.string().required(),
  apellido: Yup.string().required(),
  email: Yup.string().required(),
  telefono: Yup.string().required(),
  licencia: Yup.string().required(),
  nacimiento: Yup.string().required()
});
const useCheckoutStore = defineStore("checkout", () => {
  const { createItems } = useDirectusItems();
  const storePedido = usePedidoStore();
  const totalPedido = storePedido.total();
  ref("none");
  const tarjeta = ref({
    ccnumber: "",
    ccexp: "",
    cvv: ""
  });
  const { errors, useFieldModel, handleSubmit, values } = useForm({
    validationSchema: checkoutSchema
  });
  const [
    nombre,
    apellido,
    email,
    telefono,
    licencia,
    nacimiento
  ] = useFieldModel([
    "nombre",
    "apellido",
    "email",
    "telefono",
    "licencia",
    "nacimiento"
  ]);
  async function onSubmit(values2, origin) {
    console.log("Submit", JSON.stringify(values2, null, 2));
    const paramsQ = {
      "security_key": "MDYevJ49jVF5cA8zzZ3ySYaC5A5G7AdH",
      "first_name": storePedido.pedido.cliente.nombre,
      "last_name": storePedido.pedido.cliente.apellido,
      "address1": storePedido.pedido.sucursal.name,
      "city": "Panama City",
      "state": "PTY",
      "zip": "12345",
      "shipping_first_name": storePedido.pedido.cliente.nombre,
      "shipping_last_name": storePedido.pedido.cliente.apellido,
      "shipping_address1": "987 State St",
      "shipping_city": "Panama City",
      "shipping_state": "PTY",
      "shipping_zip": "98765",
      "type": "sale",
      "amount": storePedido.pedido.total,
      "ccnumber": this.tarjeta.ccnumber,
      "ccexp": this.tarjeta.ccexp,
      "cvv": this.tarjeta.cvv
    };
    const url = new URL("/api/tarjeta", origin);
    console.log("Final URL:", url.toString());
    try {
      const response = await axios.post(url.toString(), qs.stringify(paramsQ), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
        params: paramsQ
      });
      const responseText = await response.data;
      console.log("Data:", responseText);
      const router = useRouter();
      let respuesta = responseText;
      let codigoAprobado = "response=1";
      let codigoTransaccionDeclinada = "response=2";
      let codigoErrorSistema = "response=3";
      if (respuesta.includes(codigoAprobado)) {
        console.log("codigoAprobado");
        var items = [
          {
            nombre: storePedido.pedido.cliente.nombre,
            apellido: storePedido.pedido.cliente.apellido,
            email: storePedido.pedido.cliente.email,
            telefono: storePedido.pedido.cliente.telefono,
            licencia: storePedido.pedido.cliente.licencia,
            nacimiento: storePedido.pedido.cliente.nacimiento,
            retiro: storePedido.pedido.sucursal.name,
            fecha_retiro: hooks(storePedido.pedido.diaRetiro).format(),
            retorno: storePedido.pedido.sucursalRetorno.name,
            fecha_retorno: hooks(storePedido.pedido.diaRetorno).format(),
            carro: storePedido.pedido.carro,
            cobertura: storePedido.pedido.cobertura,
            dropoff: storePedido.pedido.dropoff,
            sucursal_detail: storePedido.pedido.sucursal,
            sucursal_retorno_detail: storePedido.pedido.sucursalRetorno,
            extras: storePedido.pedido.extras,
            status: "Pagado",
            tipo_pago: "Tarjeta",
            total: totalPedido
          }
        ];
        createItems({ collection: "pedidos_hertz", items });
        router.push("/thanks/");
      }
      if (respuesta.includes(codigoTransaccionDeclinada)) {
        console.log("Transacci\xF3n Declinada");
        router.push("/error/");
      }
      if (respuesta.includes(codigoErrorSistema)) {
        console.log("Error en el sistema");
        router.push("/error/");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return {
    errors,
    nombre,
    apellido,
    email,
    telefono,
    licencia,
    nacimiento,
    tarjeta,
    onSubmit
  };
});
const _sfc_main$1 = {
  __name: "FormaPago",
  __ssrInlineRender: true,
  setup(__props) {
    usePaypalStore();
    const storePedido = usePedidoStore();
    const storeCheckout = useCheckoutStore();
    computed(() => {
      return storePedido.pedido;
    });
    useCheckoutStore();
    ref(null);
    ref("");
    ref("");
    ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "metodos" }, _attrs))} data-v-8da17233><form class="tarjeta" data-v-8da17233><p data-v-8da17233><label data-v-8da17233>N\xFAmero de la Tarjeta</label><input type="text" placeholder="0000 0000 0000 000" name="ccnumber"${ssrRenderAttr("value", unref(storeCheckout).tarjeta.ccnumber)} data-v-8da17233></p><p data-v-8da17233><label data-v-8da17233>Fecha de Expiraci\xF3n</label><input type="text" placeholder="01 / 26" name="ccexp" class="ccexp"${ssrRenderAttr("value", unref(storeCheckout).tarjeta.ccexp)} data-v-8da17233></p><p data-v-8da17233><label data-v-8da17233>CCV</label><input type="text" placeholder="123" name="cvv" class="cvv"${ssrRenderAttr("value", unref(storeCheckout).tarjeta.cvv)} data-v-8da17233></p><button type="submit" data-v-8da17233>Pagar</button></form><div id="paypal-button" data-v-8da17233></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FormaPago.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-8da17233"]]);
const useNoPagoStore = defineStore("nopago", () => {
  const { createItems } = useDirectusItems();
  const storePedido = usePedidoStore();
  const subTotal = storePedido.subTotal();
  const impuestoAeropuerto = storePedido.impuestoAeropuerto();
  const impuesto = storePedido.impuesto();
  const totalPedido = storePedido.total();
  const { errors, useFieldModel, handleSubmit, values } = useForm({
    validationSchema: checkoutSchema
  });
  const [
    nombre,
    apellido,
    email,
    telefono,
    licencia,
    nacimiento
  ] = useFieldModel([
    "nombre",
    "apellido",
    "email",
    "telefono",
    "licencia",
    "nacimiento"
  ]);
  async function onSubmit(values2) {
    const router = useRouter();
    var items = [
      {
        nombre: storePedido.pedido.cliente.nombre,
        apellido: storePedido.pedido.cliente.apellido,
        email: storePedido.pedido.cliente.email,
        telefono: storePedido.pedido.cliente.telefono,
        licencia: storePedido.pedido.cliente.licencia,
        nacimiento: storePedido.pedido.cliente.nacimiento,
        retiro: storePedido.pedido.sucursal.name,
        fecha_retiro: hooks(storePedido.pedido.diaRetiro).format(),
        retorno: storePedido.pedido.sucursalRetorno.name,
        fecha_retorno: hooks(storePedido.pedido.diaRetorno).format(),
        carro: storePedido.pedido.carro,
        cobertura: storePedido.pedido.cobertura,
        dropoff: storePedido.pedido.dropoff,
        sucursal_detail: storePedido.pedido.sucursal,
        sucursal_retorno_detail: storePedido.pedido.sucursalRetorno,
        extras: storePedido.pedido.extras,
        status: "Pendiente de Pago",
        tipo_pago: "Sin Pago",
        sub_total: subTotal,
        impuesto_aeropuerto: impuestoAeropuerto,
        impuesto,
        total: totalPedido
      }
    ];
    createItems({ collection: "pedidos_hertz", items });
    router.push("/thanks/");
  }
  return {
    errors,
    nombre,
    apellido,
    email,
    telefono,
    licencia,
    nacimiento,
    onSubmit
  };
});
const _sfc_main = {
  __name: "checkout",
  __ssrInlineRender: true,
  setup(__props) {
    useNoPagoStore();
    const storePedido = usePedidoStore();
    const storeCheckout = useCheckoutStore();
    const pedido = computed(() => {
      return storePedido.pedido;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CarroSeleccionado = __nuxt_component_0;
      const _component_Desglose = __nuxt_component_1;
      const _component_date_picker = resolveComponent("date-picker");
      const _component_FormaPago = __nuxt_component_2;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "auto" }, _attrs))} data-v-7459dfb0><article data-v-7459dfb0>`);
      _push(ssrRenderComponent(_component_CarroSeleccionado, null, null, _parent));
      _push(ssrRenderComponent(_component_Desglose, null, null, _parent));
      _push(`</article><section class="detalles-conductor" data-v-7459dfb0><h3 data-v-7459dfb0>Finaliza tu reserva</h3><div class="forma" data-v-7459dfb0><fieldset data-v-7459dfb0><p data-v-7459dfb0><label for="nombre" data-v-7459dfb0>Nombre</label>`);
      _push(ssrRenderComponent(unref(Field), {
        modelValue: unref(pedido).cliente.nombre,
        "onUpdate:modelValue": ($event) => unref(pedido).cliente.nombre = $event,
        type: "text",
        id: "nombre",
        name: "nombre",
        rules: "required",
        placeholder: "Nombre"
      }, null, _parent));
      _push(ssrRenderComponent(unref(ErrorMessage), { name: "nombre" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="warning" data-v-7459dfb0${_scopeId}>Todos los Campos son requeridos</p>`);
          } else {
            return [
              createVNode("p", { class: "warning" }, "Todos los Campos son requeridos")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p><p data-v-7459dfb0><label for="apellido" data-v-7459dfb0>Apellido</label>`);
      _push(ssrRenderComponent(unref(Field), {
        modelValue: unref(pedido).cliente.apellido,
        "onUpdate:modelValue": ($event) => unref(pedido).cliente.apellido = $event,
        type: "text",
        id: "apellido",
        name: "apellido",
        rules: "required",
        placeholder: "Apellido"
      }, null, _parent));
      _push(ssrRenderComponent(unref(ErrorMessage), { name: "apellido" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="warning" data-v-7459dfb0${_scopeId}>Todos los Campos son requeridos</p>`);
          } else {
            return [
              createVNode("p", { class: "warning" }, "Todos los Campos son requeridos")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p><p data-v-7459dfb0><label for="telefono" data-v-7459dfb0>Tel\xE9fono</label>`);
      _push(ssrRenderComponent(unref(Field), {
        modelValue: unref(pedido).cliente.telefono,
        "onUpdate:modelValue": ($event) => unref(pedido).cliente.telefono = $event,
        type: "text",
        id: "telefono",
        name: "telefono",
        placeholder: "Tel\xE9fono",
        rules: "required"
      }, null, _parent));
      _push(ssrRenderComponent(unref(ErrorMessage), { name: "telefono" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="warning" data-v-7459dfb0${_scopeId}>Todos los Campos son requeridos</p>`);
          } else {
            return [
              createVNode("p", { class: "warning" }, "Todos los Campos son requeridos")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p><p data-v-7459dfb0><label for="email" data-v-7459dfb0>Correo electr\xF3nico</label>`);
      _push(ssrRenderComponent(unref(Field), {
        modelValue: unref(pedido).cliente.email,
        "onUpdate:modelValue": ($event) => unref(pedido).cliente.email = $event,
        type: "text",
        id: "email",
        name: "email",
        rules: "required",
        placeholder: "Correo"
      }, null, _parent));
      _push(ssrRenderComponent(unref(ErrorMessage), { name: "email" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="warning" data-v-7459dfb0${_scopeId}>Todos los Campos son requeridos</p>`);
          } else {
            return [
              createVNode("p", { class: "warning" }, "Todos los Campos son requeridos")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p><p data-v-7459dfb0><label for="licencia" data-v-7459dfb0>Licencia</label>`);
      _push(ssrRenderComponent(unref(Field), {
        modelValue: unref(pedido).cliente.licencia,
        "onUpdate:modelValue": ($event) => unref(pedido).cliente.licencia = $event,
        type: "text",
        id: "licencia",
        name: "licencia",
        rules: "required",
        placeholder: "Licencia"
      }, null, _parent));
      _push(ssrRenderComponent(unref(ErrorMessage), { name: "licencia" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="warning" data-v-7459dfb0${_scopeId}>Todos los Campos son requeridos</p>`);
          } else {
            return [
              createVNode("p", { class: "warning" }, "Todos los Campos son requeridos")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p><p data-v-7459dfb0><label for="nacimiento" data-v-7459dfb0>Fecha de Nacimiento</label>`);
      _push(ssrRenderComponent(_component_date_picker, {
        enableTimePicker: false,
        modelValue: unref(pedido).cliente.nacimiento,
        "onUpdate:modelValue": ($event) => unref(pedido).cliente.nacimiento = $event,
        locale: "es",
        name: "nacimiento",
        rules: "required",
        id: "nacimiento"
      }, null, _parent));
      _push(ssrRenderComponent(unref(ErrorMessage), { name: "nacimiento" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="warning" data-v-7459dfb0${_scopeId}>Todos los Campos son requeridos</p>`);
          } else {
            return [
              createVNode("p", { class: "warning" }, "Todos los Campos son requeridos")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></fieldset>`);
      if (unref(storePedido).pedido.reserva === "reserva") {
        _push(`<div class="reserva" data-v-7459dfb0><button type="submit" data-v-7459dfb0>Reservar</button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(storePedido).pedido.reserva === "prepago") {
        _push(`<div class="reserva" data-v-7459dfb0><button type="submit" data-v-7459dfb0> Siguiente </button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(storeCheckout).metodos === "metodos") {
        _push(`<div data-v-7459dfb0><h2 data-v-7459dfb0>Metodos de Pago</h2>`);
        _push(ssrRenderComponent(_component_FormaPago, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/flota/[reserva]/checkout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const checkout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7459dfb0"]]);

export { checkout as default };
//# sourceMappingURL=checkout-33bfbef6.mjs.map
