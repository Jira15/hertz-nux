import { defineStore } from 'pinia'
import { useFiltroStore } from '@/stores/filtros'
 
export const useAutosStore = defineStore('autos', { 
state: () => ({ 
    autos: [] 
}), 
getters: {
    getAutos: (state) => { 
        return state.autos 
    },   
}, 
actions: { 
        async fetchAutos(){
            try {
                const storeFiltro = useFiltroStore();
                const { getItems } = useDirectusItems();  
                const filters =  
                { 
                    tipo: storeFiltro.filtros.tipo,
                    marca: storeFiltro.filtros.marca,
                    // precio: storeFiltro.filtros.precio
                }
                
                let tipo
                if (filters.tipo != '')  { 
                    tipo = {
                            "_in": [storeFiltro.filtros.tipo]
                            } 
                                    
                } 
                let marca
                if (filters.marca != '')  { 
                    marca = {
                            "_in": [storeFiltro.filtros.marca]
                            } 
                                    
                } 
                const precio_hertz = storeFiltro.filtros.precio_hertz 
                const autos = await getItems(
            { 
                    collection: "flota", 
                    params: 
                        { 
                            filter: {
                                tipo,
                                marca
                            },
                            fields: ["*"],
                            sort: ["sort", precio_hertz ]
                        }
                }); 
                this.autos = autos  
            } catch (error) {
                    console.error(error); 
            }
        },  
    },
})  