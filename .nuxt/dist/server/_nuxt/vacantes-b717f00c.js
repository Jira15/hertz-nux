import { ref, computed, unref, useSSRContext } from "vue";
import "./index-e12b288f.js";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { d as defineStore, u as useDirectusItems, e as useRouter, _ as _export_sfc, f as useHead } from "../server.mjs";
import "hookable";
import "destr";
import "devalue";
import "unhead";
import "ofetch";
import "#internal/nitro";
import "unctx";
import "@vue/devtools-api";
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
const useVacantesStore = defineStore("vacantes", {
  // a function that returns a fresh state - STATE ES COMO DATA
  state: () => ({
    vacantes: []
  }),
  // optional getters GETTER SON COMO COMPUTED 
  getters: {
    getVacantes: (state) => {
      return state.vacantes;
    }
  },
  // optional   ACTIONS SON COMO METHODS
  actions: {
    async fetchVacantes() {
      try {
        const { getItems } = useDirectusItems();
        const vacantes2 = await getItems(
          { collection: "bolsa_trabajo", params: { fields: ["*", "picture.*"] } }
        );
        this.vacantes = vacantes2;
      } catch (error) {
        console.error(error);
      }
    }
  }
});
const useCandidatoStore = defineStore("candidato", () => {
  const { createItems } = useDirectusItems();
  const nombre = ref("");
  const apellido = ref("");
  const telefono = ref("");
  const email = ref("");
  const cv = ref(null);
  function handleFileUpload(event) {
    cv.value = event.target.files[0];
  }
  async function handleSubmit() {
    try {
      const formData = new FormData();
      formData.append("cv", cv.value);
      const fileResponse = await fetch("https://admin.intermarketing.com.pa/files", {
        method: "POST",
        headers: {
          "Authorization": "uiN-pHJwLhUKcmbMCH8PXfJjKT9D5cfh",
          "Accept-Encoding": "multipart/form-data"
        },
        body: formData
      }).then((response) => response.json()).then(function(data) {
        const itemResponse = createItems({
          collection: "candidatos",
          items: {
            nombre: nombre.value,
            apellido: apellido.value,
            email: email.value,
            telefono: telefono.value,
            cv: data.data.id
          }
        });
        console.log("esto es data", data.data.id);
        console.log("item response", itemResponse);
      }).catch((error) => console.error(error));
      const router = useRouter();
      router.push("/vacante-gracias/");
    } catch (error) {
      console.error(error);
    }
  }
  return {
    nombre,
    apellido,
    email,
    telefono,
    cv,
    handleFileUpload,
    handleSubmit
  };
});
const vacantes_vue_vue_type_style_index_0_scoped_dbb2d4a7_lang = "";
const _sfc_main = {
  __name: "vacantes",
  __ssrInlineRender: true,
  setup(__props) {
    const storeVacantes = useVacantesStore();
    const storeCandidato = useCandidatoStore();
    const vacantes2 = computed(() => {
      return storeVacantes.vacantes;
    });
    const candidato = computed(() => {
      return storeCandidato;
    });
    useHead({
      title: "Lista de Vacantes | Hertz Rent a Car Panamá"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(_attrs)} data-v-dbb2d4a7><h2 data-v-dbb2d4a7>Vacantes Abiertas:</h2><section class="card-wrap" data-v-dbb2d4a7><!--[-->`);
      ssrRenderList(unref(vacantes2), (vacante) => {
        _push(`<article class="vacante" data-v-dbb2d4a7><header data-v-dbb2d4a7><h3 data-v-dbb2d4a7>${ssrInterpolate(vacante.vacante)}</h3><h3 data-v-dbb2d4a7>${ssrInterpolate(vacante.area)}</h3></header><h4 data-v-dbb2d4a7>Requisitos:</h4><ul data-v-dbb2d4a7><!--[-->`);
        ssrRenderList(vacante.requisitos, (requisito) => {
          _push(`<li data-v-dbb2d4a7>${ssrInterpolate(requisito)}</li>`);
        });
        _push(`<!--]--></ul><h4 data-v-dbb2d4a7>Funciones:</h4><ul data-v-dbb2d4a7><!--[-->`);
        ssrRenderList(vacante.funciones, (funcion) => {
          _push(`<li data-v-dbb2d4a7>${ssrInterpolate(funcion)}</li>`);
        });
        _push(`<!--]--></ul><h4 data-v-dbb2d4a7>Ofrecemos:</h4><ul data-v-dbb2d4a7><!--[-->`);
        ssrRenderList(vacante.ofrecemos, (ofrecemos) => {
          _push(`<li data-v-dbb2d4a7>${ssrInterpolate(ofrecemos)}</li>`);
        });
        _push(`<!--]--></ul></article>`);
      });
      _push(`<!--]--></section><section class="candidato" data-v-dbb2d4a7><h3 data-v-dbb2d4a7>Dejanos tu Información</h3><div data-v-dbb2d4a7><fieldset data-v-dbb2d4a7><p data-v-dbb2d4a7><label for="nombre" data-v-dbb2d4a7>Nombre</label><input type="text"${ssrRenderAttr("value", unref(candidato).nombre)} id="nombre" name="nombre" required placeholder="Nombre" data-v-dbb2d4a7></p><p data-v-dbb2d4a7><label for="apellido" data-v-dbb2d4a7>Apellido</label><input type="text"${ssrRenderAttr("value", unref(candidato).apellido)} id="apellido" name="apellido" required placeholder="Apellido" data-v-dbb2d4a7></p><p data-v-dbb2d4a7><label for="telefono" data-v-dbb2d4a7>Teléfono</label><input type="tel"${ssrRenderAttr("value", unref(candidato).telefono)} id="telefono" name="telefono" required placeholder="Teléfono" pattern="\\d+" title="Solo se permiten números en el teléfono" data-v-dbb2d4a7></p><p data-v-dbb2d4a7><label for="email" data-v-dbb2d4a7>Correo electrónico</label><input type="email"${ssrRenderAttr("value", unref(candidato).email)} id="email" name="email" required placeholder="Correo" data-v-dbb2d4a7></p><p data-v-dbb2d4a7><label for="cv" data-v-dbb2d4a7>Hoja de vida(solo archivos docx o PDF):</label><input type="file" required data-v-dbb2d4a7></p></fieldset><button type="submit" data-v-dbb2d4a7>Enviar</button></div></section></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/vacantes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vacantes = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dbb2d4a7"]]);
export {
  vacantes as default
};
//# sourceMappingURL=vacantes-b717f00c.js.map
