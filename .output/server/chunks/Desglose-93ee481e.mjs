import { useSSRContext, computed, unref, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { _ as _imports_1, a as _imports_2, b as _imports_3, c as _imports_4, d as _imports_5, e as _imports_6, f as _imports_7 } from './ac-18281470.mjs';
import { g as getAssetURL } from './get-asset-url-9698b8ce.mjs';
import { u as usePedidoStore } from './pedido-45937ac8.mjs';
import { _ as _export_sfc } from './server.mjs';
import { h as hooks } from './moment-470c4d3d.mjs';
import MoneyFormat from 'vue-money-format';

const _sfc_main$1 = {
  __name: "CarroSeleccionado",
  __ssrInlineRender: true,
  setup(__props) {
    const storePedido = usePedidoStore();
    const auto = computed(() => {
      return storePedido.pedido.carro;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)} data-v-257ab4b2><header data-v-257ab4b2><div data-v-257ab4b2><h3 data-v-257ab4b2>${ssrInterpolate(unref(auto).marca)} ${ssrInterpolate(unref(auto).modelo)}</h3><em data-v-257ab4b2>o similar</em></div><figure data-v-257ab4b2><img${ssrRenderAttr("src", unref(getAssetURL)(unref(auto).imagen))} loading="lazy" data-v-257ab4b2></figure></header><dl class="specs" data-v-257ab4b2>`);
      if (unref(auto).pasajeros) {
        _push(`<div data-v-257ab4b2><dt data-v-257ab4b2><img${ssrRenderAttr("src", _imports_1)} alt="Pasajeros" data-v-257ab4b2></dt><dd data-v-257ab4b2>${ssrInterpolate(unref(auto).pasajeros)}</dd></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(auto).puertas) {
        _push(`<div data-v-257ab4b2><dt data-v-257ab4b2><img${ssrRenderAttr("src", _imports_2)} alt="Puertas" data-v-257ab4b2></dt><dd data-v-257ab4b2>${ssrInterpolate(unref(auto).puertas)}</dd></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(auto).maletas) {
        _push(`<div data-v-257ab4b2><dt data-v-257ab4b2><img${ssrRenderAttr("src", _imports_3)} alt="Maletas" data-v-257ab4b2></dt><dd data-v-257ab4b2>${ssrInterpolate(unref(auto).maletas)}</dd></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(auto).transmision) {
        _push(`<div data-v-257ab4b2><dt data-v-257ab4b2><img${ssrRenderAttr("src", _imports_4)} alt="Transmision" data-v-257ab4b2></dt><dd data-v-257ab4b2>${ssrInterpolate(unref(auto).transmision)}</dd></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(auto).motor) {
        _push(`<div data-v-257ab4b2><dt data-v-257ab4b2><img${ssrRenderAttr("src", _imports_5)} alt="Motor" data-v-257ab4b2></dt><dd data-v-257ab4b2>1200cc</dd></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(auto).combustible) {
        _push(`<div data-v-257ab4b2><dt data-v-257ab4b2><img${ssrRenderAttr("src", _imports_6)} alt="Gasolina" data-v-257ab4b2></dt><dd data-v-257ab4b2>${ssrInterpolate(unref(auto).combustible)}</dd></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div data-v-257ab4b2><dt data-v-257ab4b2><img${ssrRenderAttr("src", _imports_7)} alt="ac" data-v-257ab4b2></dt><dd data-v-257ab4b2>A/C</dd></div></dl></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CarroSeleccionado.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-257ab4b2"]]);
const __default__ = {
  components: {
    "money-format": MoneyFormat
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "Desglose",
  __ssrInlineRender: true,
  setup(__props) {
    const pedidoStore = usePedidoStore();
    const pedido = computed(() => {
      return pedidoStore.pedido;
    });
    const precioDropoff = computed(() => {
      return pedidoStore.pedido.dropoff = pedidoStore.checkDropoff(pedidoStore.pedido.sucursal.LocationCode, pedidoStore.pedido.sucursalRetorno.LocationCode);
    });
    computed(() => {
      return pedidoStore.pedido.totalDeDias = pedidoStore.diffDias(pedidoStore.pedido.diaRetorno, pedidoStore.pedido.diaRetiro);
    });
    const impuestoPedido = computed(() => {
      return pedidoStore.pedido.impuesto = pedidoStore.impuesto();
    });
    const impuestoAeropuerto = computed(() => {
      return pedidoStore.pedido.impuesto_aeropuerto = pedidoStore.impuestoAeropuerto();
    });
    const subTotal = computed(() => {
      return pedidoStore.pedido.sub_total = pedidoStore.subTotal();
    });
    const totalPedido = computed(() => {
      return pedidoStore.pedido.total = pedidoStore.total();
    });
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
    const prepago = function(precio) {
      let descuento = 5;
      const descuentoCalculado = precio * (descuento / 100);
      const nuevoPrecio = precio - descuentoCalculado;
      console.log("precio" + precio + "descuento" + descuento + "descuento calculado" + descuentoCalculado + "nuevo precio" + nuevoPrecio);
      pedidoStore.pedido.carro.precio_prepago = nuevoPrecio;
      return nuevoPrecio.toLocaleString("en-US", { style: "currency", currency: "USD" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "desglose" }, _attrs))}><h6>Detalles:</h6><dl><dt> Retiro:<br>${ssrInterpolate(unref(pedido).sucursal.name)}</dt><dd> Retorno: <br>${ssrInterpolate(unref(pedido).sucursalRetorno.name)}</dd></dl><dl><dt> D\xEDa de Retiro: </dt><dd>${ssrInterpolate(fechaFormat(unref(pedido).diaRetiro))}</dd></dl><dl><dt> D\xEDa de Retorno: </dt><dd>${ssrInterpolate(fechaFormat(unref(pedido).diaRetorno))}</dd></dl>`);
      if (unref(precioDropoff) > 0) {
        _push(`<dl><dt> Drop-off </dt><dd>${ssrInterpolate(precioFormat(unref(precioDropoff)))}</dd></dl>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h6>Modelo:</h6><dl><dt>${ssrInterpolate(unref(pedido).carro.marca)} ${ssrInterpolate(unref(pedido).carro.modelo)}</dt>`);
      if (unref(pedido).reserva === "prepago") {
        _push(`<dd>${ssrInterpolate(prepago(unref(pedido).carro.precio_thrifty * unref(pedidoStore).diffDias(unref(pedido).diaRetorno, unref(pedido).diaRetiro)))}</dd>`);
      } else {
        _push(`<dd>${ssrInterpolate(precioFormat(unref(pedido).carro.precio_thrifty * unref(pedidoStore).diffDias(unref(pedido).diaRetorno, unref(pedido).diaRetiro)))}</dd>`);
      }
      _push(`</dl><h6>Coberturas:</h6>`);
      if (unref(pedido).carro.tipo != "Sedan") {
        _push(`<dl>`);
        if (unref(pedido).cobertura.nombre) {
          _push(`<dt>${ssrInterpolate(unref(pedido).cobertura.nombre)}</dt>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<dd>${ssrInterpolate(precioFormat(unref(pedido).cobertura.precio_2 * unref(pedidoStore).diffDias(unref(pedido).diaRetorno, unref(pedido).diaRetiro)))}</dd></dl>`);
      } else {
        _push(`<dl><dt>${ssrInterpolate(unref(pedido).cobertura.nombre)}</dt><dd>${ssrInterpolate(precioFormat(unref(pedido).cobertura.precio * unref(pedidoStore).diffDias(unref(pedido).diaRetorno, unref(pedido).diaRetiro)))}</dd></dl>`);
      }
      _push(`<dl><dt> Asistencia Vial(ERA) </dt><dd>${ssrInterpolate(precioFormat(unref(pedido).era * unref(pedidoStore).diffDias(unref(pedido).diaRetorno, unref(pedido).diaRetiro)))}</dd></dl><h6>Extras:</h6>`);
      if (unref(pedido).extras) {
        _push(`<dl class="extras"><!--[-->`);
        ssrRenderList(unref(pedido).extras, (extra) => {
          _push(`<div><dt>${ssrInterpolate(extra.nombre)}</dt><dd>${ssrInterpolate(precioFormat(extra.precio * unref(pedidoStore).diffDias(unref(pedido).diaRetorno, unref(pedido).diaRetiro)))}</dd></div>`);
        });
        _push(`<!--]--></dl>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h6>Sub-Total: </h6><dl><dt> Sub-Total </dt><dd>${ssrInterpolate(precioFormat(unref(subTotal)))}</dd></dl>`);
      if (unref(impuestoAeropuerto) > 0) {
        _push(`<dl><dt> Impuesto de Aeropuerto </dt><dd>${ssrInterpolate(precioFormat(unref(impuestoAeropuerto)))}</dd></dl>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<dl><dt> ITBMS </dt><dd>${ssrInterpolate(precioFormat(unref(impuestoPedido)))}</dd></dl><h6>Total: </h6>`);
      if (unref(totalPedido)) {
        _push(`<dl><dt></dt><dd> B/. ${ssrInterpolate(precioFormat(unref(totalPedido)))}</dd></dl>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(pedido).cobertura.precio) {
        _push(`<dl><dt class="warn"> Te Falta elegir un tipo de cobertura para poder continuar </dt><dd></dd></dl>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Desglose.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main;

export { __nuxt_component_0 as _, __nuxt_component_1 as a };
//# sourceMappingURL=Desglose-93ee481e.mjs.map
