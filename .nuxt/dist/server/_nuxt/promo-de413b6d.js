import { computed, resolveComponent, mergeProps, withCtx, unref, createVNode, withDirectives, openBlock, createBlock, Fragment, renderList, toDisplayString, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { d as defineStore, u as useDirectusItems } from "../server.mjs";
const useFiltroStore = defineStore("filtros", {
  // a function that returns a fresh state - STATE ES COMO DATA
  state: () => ({
    filtros: {
      tipo: "",
      marca: "",
      precio_thrifty: "precio_thrifty"
    },
    opciones: {
      tipo: ["Sedan", "SUV", "Pick Up", "Panel", "Bus"],
      marca: ["Kia", "Hyundai", "Suzuki", "Toyota", "Mitsubishi", "Nissan", "Isuzu", "Jeep"],
      precio_thrifty: ["Menor a Mayor", "Mayor a Menor"]
    }
  }),
  // optional getters GETTER SON COMO COMPUTED 
  getters: {
    // GETTER SON COMO COMPUTED getters receive the state as first parameter 
  },
  // optional actions ACTIONS SON COMO METHODS
  actions: {
    // TODO HACER SECCION DE MARCAS, MODELOS Y DEMAS FILTROS EN INLAND PARA PODER LOOPEAR DESDE AQUI
    // async fetchMarcas(){
    //             try {
    //                 const { getItems } = useDirectusItems(); 
    //                 const marcas = await getItems(
    //                     { collection: "flota", params : { fields: ["marca"] }});  
    //                 this.opciones.marca = marcas
    //             } catch (error) {
    //                     console.error(error); 
    //             }
    //         }, 
  }
});
const useAutosStore = defineStore("autos", {
  state: () => ({
    autos: []
  }),
  getters: {
    getAutos: (state) => {
      return state.autos;
    }
  },
  actions: {
    async fetchAutos() {
      try {
        const storeFiltro = useFiltroStore();
        const { getItems } = useDirectusItems();
        const filters = {
          tipo: storeFiltro.filtros.tipo,
          marca: storeFiltro.filtros.marca
          // precio: storeFiltro.filtros.precio
        };
        let tipo;
        if (filters.tipo != "") {
          tipo = {
            "_in": [storeFiltro.filtros.tipo]
          };
        }
        let marca;
        if (filters.marca != "") {
          marca = {
            "_in": [storeFiltro.filtros.marca]
          };
        }
        const precio_thrifty = storeFiltro.filtros.precio_thrifty;
        const autos = await getItems(
          {
            collection: "flota",
            params: {
              filter: {
                tipo,
                marca
              },
              fields: ["*"],
              sort: ["sort", precio_thrifty]
            }
          }
        );
        this.autos = autos;
      } catch (error) {
        console.error(error);
      }
    }
  }
});
const Filtros_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  __name: "Filtros",
  __ssrInlineRender: true,
  setup(__props) {
    const storeAutos = useAutosStore();
    const storeFiltro = useFiltroStore();
    const opciones = computed(() => {
      return storeFiltro.opciones;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_fieldet = resolveComponent("fieldet");
      _push(ssrRenderComponent(_component_fieldet, mergeProps({ class: "filtros" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p${_scopeId}><label for="marca"${_scopeId}>Marca</label><select name="marca"${_scopeId}><option value=""${_scopeId}>Todas </option><!--[-->`);
            ssrRenderList(unref(opciones).marca, (option) => {
              _push2(`<option${ssrRenderAttr("value", option)}${_scopeId}>${ssrInterpolate(option)}</option>`);
            });
            _push2(`<!--]--></select></p><p${_scopeId}><label for="ciudad"${_scopeId}>Categoria</label><select name="ciudad"${_scopeId}><option value=""${_scopeId}>Todas </option><!--[-->`);
            ssrRenderList(unref(opciones).tipo, (option) => {
              _push2(`<option${ssrRenderAttr("value", option)}${_scopeId}>${ssrInterpolate(option)}</option>`);
            });
            _push2(`<!--]--></select></p><button${_scopeId}> Filtrar</button>`);
          } else {
            return [
              createVNode("p", null, [
                createVNode("label", { for: "marca" }, "Marca"),
                withDirectives(createVNode("select", {
                  name: "marca",
                  "onUpdate:modelValue": ($event) => unref(storeFiltro).filtros.marca = $event
                }, [
                  createVNode("option", { value: "" }, "Todas "),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(opciones).marca, (option) => {
                    return openBlock(), createBlock("option", {
                      key: option,
                      value: option
                    }, toDisplayString(option), 9, ["value"]);
                  }), 128))
                ], 8, ["onUpdate:modelValue"]), [
                  [vModelSelect, unref(storeFiltro).filtros.marca]
                ])
              ]),
              createVNode("p", null, [
                createVNode("label", { for: "ciudad" }, "Categoria"),
                withDirectives(createVNode("select", {
                  name: "ciudad",
                  "onUpdate:modelValue": ($event) => unref(storeFiltro).filtros.tipo = $event
                }, [
                  createVNode("option", { value: "" }, "Todas "),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(opciones).tipo, (option) => {
                    return openBlock(), createBlock("option", {
                      key: option,
                      value: option
                    }, toDisplayString(option), 9, ["value"]);
                  }), 128))
                ], 8, ["onUpdate:modelValue"]), [
                  [vModelSelect, unref(storeFiltro).filtros.tipo]
                ])
              ]),
              createVNode("button", {
                onClick: ($event) => unref(storeAutos).fetchAutos()
              }, " Filtrar", 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Filtros.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main;
const _imports_0 = "data:image/png;base64,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";
export {
  _imports_0 as _,
  __nuxt_component_1 as a,
  useAutosStore as u
};
//# sourceMappingURL=promo-de413b6d.js.map
