import { defineStore } from 'pinia' 
 
export const useSucursalStore = defineStore('sucursal', {
    // a function that returns a fresh state - STATE ES COMO DATA
state: () => ({ 
    sucursales: [
            {
                sucursal: {
                    id: 0,
                    mapa: {},
                    imagen: '',
                    name: '',
                    telefono_1: '',
                    telefono_2: null,
                    horario_cierre: 0,
                    LocationCode: '',
                    horario_apertura: 0,
                    horario_cierre_sabado: 0,
                    horario_cierre_domingo: 0,
                    horario_apertura_sabado: 0,
                    horario_apertura_domingo: 0,
                    festivo: 0,
                    dias_festivos: '',
                  },
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
                        { collection: "sucursal_hertz", params : { fields: ["*","picture.*"] }});
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