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
                var status = {  status: 'Cancel'  }   // var newItem = { status: "Draft" };
                await updateItem<Pedido>({ 
                    collection: "pedidos_hertz",
                    id: storePedido.pedido.pedidos_hertz_id,
                    item: status });  
                    await refreshNuxtData()
                    window.location.reload()
            } catch (e) { 
                    console.log('error') 
            } 
        }, 
    }
}) 