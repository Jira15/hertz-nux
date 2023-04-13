import { ref, computed, resolveComponent, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import "hookable";
import { d as defineStore, e as useRouter, u as useDirectusItems } from "../server.mjs";
import "destr";
import "devalue";
import { useForm } from "vee-validate";
import { u as usePedidoStore } from "./pedido-45937ac8.js";
import * as Yup from "yup";
const schema = Yup.object({
  sucursal: Yup.object().required(),
  fechaRetiro: Yup.date().required(),
  sucursalRetorno: Yup.object().required(),
  fechaRetorno: Yup.date().required()
});
const useSearchStore = defineStore("search", () => {
  let searchIs = ref("default");
  const storePedido = usePedidoStore();
  const router = useRouter();
  const mostrarWarning = ref(false);
  const { errors, useFieldModel, handleSubmit, values } = useForm({
    validationSchema: schema
  });
  const [
    sucursal,
    fechaRetiro,
    fechaRetorno,
    sucursalRetorno
  ] = useFieldModel([
    "sucursal",
    "fechaRetiro",
    "fechaRetorno",
    "sucursalRetorno"
  ]);
  const siguiente = handleSubmit((values2) => {
    storePedido.pedido.sucursal = values2.sucursal;
    storePedido.pedido.diaRetiro = values2.fechaRetiro;
    storePedido.pedido.sucursalRetorno = values2.sucursalRetorno;
    storePedido.pedido.diaRetorno = values2.fechaRetorno;
    searchIs = ref("TheProgress");
    router.push("/reserva/");
  });
  return {
    errors,
    sucursal,
    fechaRetiro,
    fechaRetorno,
    sucursalRetorno,
    siguiente,
    mostrarWarning,
    searchIs
  };
});
const useSucursalStore = defineStore("sucursal", {
  // a function that returns a fresh state - STATE ES COMO DATA
  state: () => ({
    sucursales: [
      {
        sucursal: {
          id: Number,
          mapa: Object,
          imagen: String,
          name: String,
          telefono_1: String,
          telefono_2: null,
          horario_cierre: Number,
          LocationCode: String,
          horario_apertura: Number,
          horario_cierre_sabado: Number,
          horario_cierre_domingo: Number,
          horario_apertura_sabado: Number,
          horario_apertura_domingo: Number,
          festivo: Number,
          dias_festivos: String
        }
      }
    ]
  }),
  // optional getters GETTER SON COMO COMPUTED 
  getters: {
    getSucursales: (state) => {
      return state.sucursales;
    }
    // GETTER SON COMO COMPUTED getters receive the state as first parameter 
  },
  // optional   ACTIONS SON COMO METHODS
  actions: {
    async fetchSucursales() {
      try {
        const { getItems } = useDirectusItems();
        const sucursales = await getItems(
          { collection: "sucursal_hertz", params: { fields: ["*", "picture.*"] } }
        );
        this.sucursales = sucursales;
      } catch (error) {
        console.error(error);
      }
    }
    // sucursalABuscador(selected){
    //     storeSearch.sucursal = selected
    // },  
  }
});
const TheSearch_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  __name: "TheSearch",
  __ssrInlineRender: true,
  setup(__props) {
    ref(/* @__PURE__ */ new Date());
    const storeSearch = useSearchStore();
    const storeSucursal = useSucursalStore();
    const sucursales = computed(() => {
      return storeSucursal.sucursales;
    });
    function minimoDeDias(date, days) {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    }
    const startTime = ref({ hours: 10, minutes: 15 });
    function getWorkingHours(openingTime, closingTime) {
      let workingHours = [];
      for (let i = openingTime; i < closingTime; i++) {
        workingHours.push({ text: `${i}`, value: i });
      }
      return workingHours;
    }
    function domingoCerrados(domingoApertura, domingoCierre) {
      if (domingoApertura === 0 && domingoCierre === 0) {
        return [0];
      }
    }
    const minutesArray = [
      { text: "00", value: 0 },
      { text: "15", value: 15 },
      { text: "30", value: 30 },
      { text: "45", value: 45 }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_date_picker = resolveComponent("date-picker");
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "reservador" }, _attrs))}><article><h2>Reserva tu vehículo</h2><div class="sucursales"><section><legend>sucursal de retiro</legend><label class="sucursal"><select name="sucursal" as="select" rules="required"><option disabled value="">Selecciona una sucursal</option><!--[-->`);
      ssrRenderList(unref(sucursales), (option) => {
        _push(`<option${ssrRenderAttr("value", option)}>${ssrInterpolate(option.name)}</option>`);
      });
      _push(`<!--]--></select></label></section><section><legend>sucursal de retorno</legend><label class="sucursal"><select name="sucursalRetorno" as="select" rules="required"><option disabled value="">Selecciona una sucursal</option><!--[-->`);
      ssrRenderList(unref(sucursales), (option) => {
        _push(`<option${ssrRenderAttr("value", option)}>${ssrInterpolate(option.name)}</option>`);
      });
      _push(`<!--]--></select></label></section></div><section class="fechas">`);
      if (unref(storeSearch).sucursal) {
        _push(`<div><label>Fecha de Retiro </label>`);
        _push(ssrRenderComponent(_component_date_picker, {
          "start-time": startTime.value,
          locale: "es",
          modelValue: unref(storeSearch).fechaRetiro,
          "onUpdate:modelValue": ($event) => unref(storeSearch).fechaRetiro = $event,
          minDate: /* @__PURE__ */ new Date(),
          "disabled-week-days": domingoCerrados(
            unref(storeSearch).sucursal.horario_apertura_domingo,
            unref(storeSearch).sucursal.horario_cierre_domingo
          ),
          highlight: unref(storeSearch).sucursal.dias_festivos,
          "disabled-dates": unref(storeSearch).sucursal.dias_festivos,
          "highlight-disabled-days": ""
        }, {
          "time-picker": withCtx(({ time, updateTime }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="custom-time-picker-component"${_scopeId}><select class="select-input"${ssrRenderAttr("value", time.hours)}${_scopeId}><!--[-->`);
              ssrRenderList(getWorkingHours(
                unref(storeSearch).sucursal.horario_apertura,
                unref(storeSearch).sucursal.horario_cierre
              ), (h) => {
                _push2(`<option${ssrRenderAttr("value", h.value)}${_scopeId}>${ssrInterpolate(h.text)}</option>`);
              });
              _push2(`<!--]--></select><select class="select-input"${ssrRenderAttr("value", time.minutes)}${_scopeId}><!--[-->`);
              ssrRenderList(minutesArray, (m) => {
                _push2(`<option${ssrRenderAttr("value", m.value)}${_scopeId}>${ssrInterpolate(m.text)}</option>`);
              });
              _push2(`<!--]--></select></div>`);
            } else {
              return [
                createVNode("div", { class: "custom-time-picker-component" }, [
                  createVNode("select", {
                    class: "select-input",
                    value: time.hours,
                    onChange: ($event) => updateTime(+$event.target.value)
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(getWorkingHours(
                      unref(storeSearch).sucursal.horario_apertura,
                      unref(storeSearch).sucursal.horario_cierre
                    ), (h) => {
                      return openBlock(), createBlock("option", {
                        key: h.value,
                        value: h.value
                      }, toDisplayString(h.text), 9, ["value"]);
                    }), 128))
                  ], 40, ["value", "onChange"]),
                  createVNode("select", {
                    class: "select-input",
                    value: time.minutes,
                    onChange: ($event) => updateTime(+$event.target.value, false)
                  }, [
                    (openBlock(), createBlock(Fragment, null, renderList(minutesArray, (m) => {
                      return createVNode("option", {
                        key: m.value,
                        value: m.value
                      }, toDisplayString(m.text), 9, ["value"]);
                    }), 64))
                  ], 40, ["value", "onChange"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(storeSearch).sucursalRetorno) {
        _push(`<div><label>Fecha de Retorno</label>`);
        _push(ssrRenderComponent(_component_date_picker, {
          locale: "es",
          "start-time": startTime.value,
          modelValue: unref(storeSearch).fechaRetorno,
          "onUpdate:modelValue": ($event) => unref(storeSearch).fechaRetorno = $event,
          minDate: minimoDeDias(
            unref(storeSearch).fechaRetiro,
            unref(storeSearch).sucursalRetorno.minimo_dias
          ),
          "disabled-week-days": domingoCerrados(
            unref(storeSearch).sucursalRetorno.horario_apertura_domingo,
            unref(storeSearch).sucursalRetorno.horario_cierre_domingo
          ),
          highlight: unref(storeSearch).sucursalRetorno.dias_festivos,
          "disabled-dates": unref(storeSearch).sucursalRetorno.dias_festivos,
          "highlight-disabled-days": ""
        }, {
          "time-picker": withCtx(({ time, updateTime }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="custom-time-picker-component"${_scopeId}><select class="select-input"${ssrRenderAttr("value", time.hours)}${_scopeId}><!--[-->`);
              ssrRenderList(getWorkingHours(
                unref(storeSearch).sucursalRetorno.horario_apertura,
                unref(storeSearch).sucursalRetorno.horario_cierre
              ), (h) => {
                _push2(`<option${ssrRenderAttr("value", h.value)}${_scopeId}>${ssrInterpolate(h.text)}</option>`);
              });
              _push2(`<!--]--></select><select class="select-input"${ssrRenderAttr("value", time.minutes)}${_scopeId}><!--[-->`);
              ssrRenderList(minutesArray, (m) => {
                _push2(`<option${ssrRenderAttr("value", m.value)}${_scopeId}>${ssrInterpolate(m.text)}</option>`);
              });
              _push2(`<!--]--></select></div>`);
            } else {
              return [
                createVNode("div", { class: "custom-time-picker-component" }, [
                  createVNode("select", {
                    class: "select-input",
                    value: time.hours,
                    onChange: ($event) => updateTime(+$event.target.value)
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(getWorkingHours(
                      unref(storeSearch).sucursalRetorno.horario_apertura,
                      unref(storeSearch).sucursalRetorno.horario_cierre
                    ), (h) => {
                      return openBlock(), createBlock("option", {
                        key: h.value,
                        value: h.value
                      }, toDisplayString(h.text), 9, ["value"]);
                    }), 128))
                  ], 40, ["value", "onChange"]),
                  createVNode("select", {
                    class: "select-input",
                    value: time.minutes,
                    onChange: ($event) => updateTime(+$event.target.value, false)
                  }, [
                    (openBlock(), createBlock(Fragment, null, renderList(minutesArray, (m) => {
                      return createVNode("option", {
                        key: m.value,
                        value: m.value
                      }, toDisplayString(m.text), 9, ["value"]);
                    }), 64))
                  ], 40, ["value", "onChange"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section><div class="verificar-wrap"><button class="verificar" type="submit"> Siguiente </button></div></article></form>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TheSearch.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main;
export {
  __nuxt_component_1 as _,
  useSucursalStore as a,
  useSearchStore as u
};
//# sourceMappingURL=TheSearch-6c2f2ca9.js.map
