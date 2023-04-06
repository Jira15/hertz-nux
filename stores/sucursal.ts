import { defineStore } from 'pinia' 
 
export const useSucursalStore = defineStore('sucursal', {
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
        return state.sucursales 
    },  
    // GETTER SON COMO COMPUTED getters receive the state as first parameter 
},
// optional   ACTIONS SON COMO METHODS
actions: {
        async fetchSucursales(){
                try {
                    const { getItems } = useDirectusItems(); 
                    const sucursales = await getItems(
                        { collection: "sucursal", params : { fields: ["*","picture.*"] }});
                        this.sucursales = sucursales
                } catch (error) {
                        console.error(error); 
                }
            },  
        // sucursalABuscador(selected){
        //     storeSearch.sucursal = selected
        // },  
    },
})  