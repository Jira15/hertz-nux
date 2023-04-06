import { defineStore } from 'pinia'

export const useFiltroStore = defineStore('filtros', {
    // a function that returns a fresh state - STATE ES COMO DATA
state: () => ({ 
    filtros:  
        {
            tipo: '',
            marca: '',
            precio_thrifty: 'precio_thrifty'
        },
    opciones: {
        tipo: ['Sedan', 'SUV', 'Pick Up', 'Panel', 'Bus'],
        marca: ['Kia', 'Hyundai', 'Suzuki', 'Toyota', 'Mitsubishi', 'Nissan', 'Isuzu', 'Jeep'],
        precio_thrifty: ['Menor a Mayor', 'Mayor a Menor'] 
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

    },
})  