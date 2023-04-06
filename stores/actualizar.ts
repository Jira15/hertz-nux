import { defineStore, storeToRefs } from 'pinia'  
import { usePedidoStore } from '@/stores/pedido';   
import { Pedido } from '~~/types/interfaces'; 

export const useActualizarStore = defineStore
('actualizar', 
{ 
    state: () => ({
        orden: [], 
    } ), 
    getters: { 
    },
    actions: {  
        async onCancelar() { 
            const storePedido = usePedidoStore(); 
            const { updateItem  } = useDirectusItems();    
            // Submit values to API...   
            try {
                var status = {  status: 'Cancelado'  }   // var newItem = { status: "Draft" };
                await updateItem<Pedido>({ 
                    collection: "pedidos",
                    id: storePedido.pedido.pedidos_id,
                    item: status });  
                    await refreshNuxtData()
                    window.location.reload()
            } catch (e) { 
                    console.log('error') 
            } 
        }, 
    }
}) 