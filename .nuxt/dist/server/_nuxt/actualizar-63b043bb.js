import { d as defineStore, u as useDirectusItems } from "../server.mjs";
import "vue";
import "hookable";
import "destr";
import "devalue";
import { u as usePedidoStore } from "./pedido-45937ac8.js";
async function refreshNuxtData(keys) {
  {
    return Promise.resolve();
  }
}
const useActualizarStore = defineStore(
  "actualizar",
  {
    state: () => ({
      orden: []
    }),
    getters: {},
    actions: {
      async onCancelar() {
        const storePedido = usePedidoStore();
        const { updateItem } = useDirectusItems();
        try {
          var status = { status: "Cancelado" };
          await updateItem({
            collection: "pedidos_hertz",
            id: storePedido.pedido.pedidos_id,
            item: status
          });
          await refreshNuxtData();
          window.location.reload();
        } catch (e) {
          console.log("error");
        }
      }
    }
  }
);
export {
  useActualizarStore as u
};
//# sourceMappingURL=actualizar-63b043bb.js.map
